// =============================================================
// MOTOR DE SELECCIÓN DE PREGUNTAS (V3)
//
// Este archivo NO toca el DOM ni localStorage. Solo recibe datos
// (el banco de preguntas + el progreso guardado) y devuelve datos
// (la selección de preguntas para una sesión). Esto lo mantiene
// fácil de probar y de ampliar más adelante con funciones nuevas
// como repetición espaciada, fechas de próxima revisión, dificultad,
// categorías/temas, preguntas relacionadas o simulacros de examen:
// esas features futuras pueden agregar su propia función de
// selección o su propia función de peso reutilizando las mismas
// piezas (shuffleArray / weightedSampleWithoutReplacement) que ya
// están aquí.
// =============================================================

// -------------------------------------------------------------
// Peso relativo de cada nivel de dominio (0 a 5), usado por el
// modo "Estudio inteligente" (y dentro de "Solo errores"). A mayor
// peso, mayor probabilidad de que la pregunta sea elegida.
// Ajustar estos números no requiere tocar el algoritmo.
// -------------------------------------------------------------
const LEVEL_WEIGHTS = {
  0: 8,    // Nueva              → prioridad muy alta
  1: 10,   // Necesita refuerzo  → prioridad máxima
  2: 6,    // En aprendizaje     → prioridad alta
  3: 3,    // Conocida           → prioridad media
  4: 1.5,  // Dominada           → prioridad baja
  5: 0.5   // Dominio sólido     → prioridad muy baja
};
const DEFAULT_LEVEL_WEIGHT = LEVEL_WEIGHTS[0];

function getWeightForLevel(level) {
  return LEVEL_WEIGHTS[level] !== undefined ? LEVEL_WEIGHTS[level] : DEFAULT_LEVEL_WEIGHT;
}

// -------------------------------------------------------------
// Baraja un arreglo SIN modificar el original (Fisher-Yates).
// Se usa para el modo "Todas las preguntas", donde todas tienen
// la misma probabilidad de aparecer.
// -------------------------------------------------------------
function shuffleArray(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// -------------------------------------------------------------
// Muestreo aleatorio ponderado SIN reemplazo.
// A cada elemento se le asigna una "clave" aleatoria influida por
// su peso (algoritmo de Efraimidis-Spirakis: key = random ^ (1/peso)).
// Se ordena por esa clave y se toman los primeros "amount".
//
// Por qué funciona así:
// - Un peso mayor empuja la clave hacia valores más altos con más
//   frecuencia → esas preguntas tienden a salir elegidas más seguido.
// - Como Math.random() interviene en cada pregunta, el resultado
//   nunca es un orden fijo por nivel: cambia en cada sesión.
// - Cada pregunta aparece como máximo una vez en el resultado
//   (se selecciona de una lista sin duplicarla), así que nunca hay
//   preguntas repetidas dentro de la misma sesión.
// -------------------------------------------------------------
function weightedSampleWithoutReplacement(items, weightFn, amount) {
  const keyed = items.map((item) => {
    // Math.max evita pesos en 0 (que romperían la fórmula).
    const weight = Math.max(weightFn(item), 0.0001);
    const key = Math.pow(Math.random(), 1 / weight);
    return { item, key };
  });

  keyed.sort((a, b) => b.key - a.key);

  return keyed.slice(0, amount).map((entry) => entry.item);
}

// -------------------------------------------------------------
// Punto de entrada principal del motor.
//
// Parámetros:
//  - allQuestions: arreglo completo del banco de preguntas
//  - questionStats: progreso guardado, indexado por id de pregunta
//    (tal como vive en localStorage: { [id]: { level, incorrect, ... } })
//  - options.mode: "smart" | "all" | "errors"
//  - options.amount: un número, o el string "all" para el banco completo
//
// Devuelve:
//  {
//    questions,        // arreglo final para la sesión (sin repetidos)
//    mode,
//    requestedAmount,  // lo que el usuario pidió
//    availableAmount,  // cuántas preguntas había disponibles para ese modo
//    usedAmount,       // cuántas se usaron realmente (questions.length)
//    wasClamped        // true si se pidió más de lo disponible
//  }
//
// La interfaz decide qué hacer con esa información (mostrar un
// aviso, bloquear el inicio si usedAmount es 0, etc.) — este
// archivo no conoce el DOM ni decide mensajes de UI.
// -------------------------------------------------------------
function selectSessionQuestions(allQuestions, questionStats, options) {
  const mode = options.mode;
  const requestedAmount = options.amount;

  // 1. Determinar el conjunto de preguntas candidatas según el modo.
  let candidates;
  if (mode === "errors") {
    candidates = allQuestions.filter((q) => {
      const stats = questionStats[q.id];
      return stats && stats.incorrect > 0;
    });
  } else {
    // "smart" y "all" parten del banco completo. Las preguntas
    // dominadas NUNCA se quitan del banco: solo pesan menos.
    candidates = allQuestions;
  }

  const availableAmount = candidates.length;

  // 2. Resolver cuántas preguntas se usarán realmente (sin exceder
  //    lo disponible: así nunca hay repetidos dentro de la sesión).
  const wantsAll = requestedAmount === "all";
  const numericAmount = wantsAll
    ? availableAmount
    : Math.min(requestedAmount, availableAmount);
  const wasClamped = !wantsAll && requestedAmount > availableAmount;

  // 3. Seleccionar preguntas según el modo.
  let questions;
  if (candidates.length === 0) {
    questions = [];
  } else if (mode === "all") {
    questions = shuffleArray(candidates).slice(0, numericAmount);
  } else {
    // "smart" y "errors" comparten la misma ponderación por nivel;
    // en "errors" esto sigue priorizando, dentro de las preguntas
    // falladas, a las que tienen nivel más bajo.
    questions = weightedSampleWithoutReplacement(
      candidates,
      (q) => {
        const stats = questionStats[q.id];
        const level = stats ? stats.level : 0;
        return getWeightForLevel(level);
      },
      numericAmount
    );
  }

  return {
    questions,
    mode,
    requestedAmount,
    availableAmount,
    usedAmount: questions.length,
    wasClamped
  };
}