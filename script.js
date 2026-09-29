// =============================================================
// Este archivo se encarga de: estado de la aplicación, interfaz,
// localStorage, respuestas, estadísticas, historial y reportes.
// El ALGORITMO de selección de preguntas vive aparte, en
// selection-engine.js (función selectSessionQuestions), que se
// carga antes que este archivo en index.html.
// =============================================================

// =============================================================
// 1. Datos del cuestionario
//    Cada pregunta tiene un "id" único: es la clave que se usa
//    para guardar su progreso en localStorage, así que si editas
//    las preguntas, no repitas ids ni los cambies sin querer
//    (cambiar un id hace que esa pregunta "empiece de cero").
// =============================================================
const QUESTIONS = [
  {
    id: "consecuencias-iniciales-violencia",
    question: "¿Cuáles son algunas de las preconcepciones que tienden a justificar, naturalizar e incluso promover la violencia contra ciertas personas que presentan características diferentes, siendo discriminadas o perseguidas socialmente por no ajustarse a lo que dicta la norma sociocultural?",
    options: [
      "Estereotipos y prejuicios sociales",
      "Normas y leyes establecidas",
      "Diferencias culturales y religiosas",
      "Todas las anteriores"
    ],
    correctIndex: 0,
    explanation: "El protocolo (pág. 16) indica que la violencia psicológica se manifiesta con actitudes violentas basadas en estereotipos y prejuicios sociales, que tienden a justificar, naturalizar e incluso promover la violencia."
  },
  {
    id: "medidas-violencia-fisica",
    question: "¿Qué medidas se deben tomar en caso de que se presente un caso de violencia física en una Unidad Educativa?",
    options: [
      "Se debe informar a los padres del agresor y del agredido y dejar que ellos resuelvan el problema.",
      "Se debe informar a las autoridades policiales y dejar que ellos resuelvan el problema.",
      "Se debe informar a las autoridades educativas y tomar medidas disciplinarias contra el agresor.",
      "Se debe ignorar el problema y esperar a que se resuelva por sí solo."
    ],
    correctIndex: 2,
    explanation: "El protocolo establece que cualquier miembro de la comunidad educativa debe comunicar inmediatamente a la directora o director, quien inicia el proceso administrativo correspondiente (págs. 53-54)."
  },
  {
    id: "violencia-omision-negligencia",
    question: "¿En qué consiste la violencia por omisión o negligencia?",
    options: [
      "Es una forma pasiva de violencia, correspondiente a la omisión y/o descuido por parte de las personas adultas en el cuidado y protección de los estudiantes.",
      "Se manifiesta a través de golpes, puñetazos, patadas, pellizcos, bofetadas, torceduras, empujones, intentos de ahogamiento, agresiones con objetos contundentes o arma blanca, sujeción, provocación de mutilaciones o deformaciones, fracturas, quemaduras, ingestión forzada de drogas o bebidas alcohólicas y otras formas de castigo físico.",
      "Es una forma de violencia que se ejerce exclusivamente por parte de los estudiantes hacia los adultos de la comunidad educativa.",
      "Es una forma de violencia que se ejerce exclusivamente por parte de los adultos de la comunidad educativa hacia los estudiantes."
    ],
    correctIndex: 0,
    explanation: "El protocolo (págs. 16-17) define la violencia por omisión o negligencia como una forma pasiva de violencia, correspondiente a la omisión y/o descuido por parte de las personas adultas en el cumplimiento de sus obligaciones o responsabilidades."
  },
  {
    id: "deteccion-posible-violencia",
    question: "¿Cuál de las siguientes acciones se deben tomar en caso de detectar un posible caso de violencia en una unidad educativa o centro de educación especial?",
    options: [
      "Ignorar la situación y esperar a que se resuelva sola",
      "Actuar oportunamente y brindar especial atención, denunciando los hechos a las autoridades correspondientes y realizando el respectivo seguimiento",
      "Resolver el conflicto de manera violenta",
      "No hacer nada y esperar a que los estudiantes involucrados resuelvan el problema por sí mismos."
    ],
    correctIndex: 1,
    explanation: "El protocolo (pág. 48) señala que se debe actuar oportunamente y brindar especial atención, denunciando los hechos a las autoridades correspondientes y realizando el respectivo seguimiento."
  },
  {
    id: "acoso-sexual",
    question: "Es Acoso Sexual:",
    options: [
      "Valiéndose de una posición jerárquica o poder de cualquier índole hostigue, persiga, exija, apremie, amenace con producirle un daño o perjuicio en base a comportamientos de contenido sexual.",
      "Quien, mediante seducción o engaño, tuviera acceso carnal con persona de uno y otro sexo.",
      "Por cualquier medio de engaño, intimidación, abuso de poder, indujere a privación de libertad, acogida o recepción de personas.",
      "Todas las anteriores"
    ],
    correctIndex: 0,
    explanation: "El protocolo (pág. 20, Tabla 1) define el Acoso Sexual como la conducta de quien, valiéndose de una posición jerárquica o poder de cualquier índole, hostigue, persiga, exija, apremie o amenace con producir un daño o perjuicio en base a comportamientos de contenido sexual."
  },
  {
    id: "consecuencias-iniciales",
    question: "Niña, niño o adolescente que han sufrido algún tipo de violencia, suelen tener estas consecuencias iniciales:",
    options: [
      "En lo Emocional; aparece la estigmatización, en lo Cognitivo; Fracaso escolar, y en lo Conductual; Consumo de alcohol",
      "En lo Emocional; cambio drástico de ánimo, en lo Cognitivo; Baja su rendimiento académico, y en lo Conductual; aislamiento social",
      "En lo Emocional; pierden las ganas de vivir, en lo Cognitivo; prefieren abandonar la Unidad Educativa, y en lo Conductual; se autolesionan",
      "Todas las anteriores"
    ],
    correctIndex: 1,
    explanation: "El protocolo (pág. 24, Tabla 2) en 'Consecuencias a corto plazo': Emocional: cambios bruscos en el estado de ánimo; Cognitivo: disminución del rendimiento escolar; Conductual: aislamiento o marginación social."
  },
  {
    id: "consecuencias-finales",
    question: "Niña, niño o adolescente que han sufrido algún tipo de violencia, suelen tener estas consecuencias finales:",
    options: [
      "En lo Emocional; aparece la estigmatización, en lo Cognitivo; Fracaso escolar, y en lo Conductual; Consumo de alcohol",
      "En lo Emocional; cambio drástico de ánimo, en lo Cognitivo; Baja su rendimiento académico, y en lo Conductual; aislamiento social",
      "En lo Emocional; baja autoestima, en lo Cognitivo; prefieren abandonar la Unidad Educativa, y en lo Conductual; tienen tendencia delincuencial",
      "Todas las anteriores."
    ],
    correctIndex: 2,
    explanation: "El protocolo (págs. 24-25, Tabla 2) en 'Consecuencias a largo plazo': Emocional: baja autoestima y pobre autoconcepto; Cognitivo: fracaso escolar; Conductual: conductas delictivas."
  },
  {
    id: "plazo-denuncia-24-horas",
    question: "Cualquier integrante de la comunidad educativa que tenga conocimiento de hechos de violencia en contra de niñas, niños o adolescentes están obligados:",
    options: [
      "A denunciarlos en un plazo máximo de VEINTICUATRO (24) HORAS de conocido el hecho, ante las Defensorías de la Niñez y Adolescencia o cualquier otra autoridad competente.",
      "A denunciarlos en un plazo máximo de SETENTA Y DOS (72) HORAS de conocido el hecho, ante el Ministerio Público o cualquier otra autoridad competente.",
      "A denunciarlos en un plazo máximo de CUARENTA Y OCHO (48) HORAS de conocido el hecho, ante las Defensorías de la Niñez y Adolescencia o cualquier otra autoridad competente.",
      "Todas son correctas"
    ],
    correctIndex: 0,
    explanation: "El protocolo (pág. 53) establece que la denuncia debe realizarse en un plazo máximo de veinticuatro (24) horas de conocido el hecho, ante las Defensorías de la Niñez y Adolescencia o cualquier otra autoridad competente."
  },
  {
    id: "objeto-protocolo",
    question: "El objeto del Protocolo de Prevención, Actuación y Denuncia en casos de Violencia Física, Psicológica y Sexual en las Unidades Educativas y Centros de Educación Especial, es...",
    options: [
      "Orientar la actuación de todas las personas que conforman la comunidad educativa frente a situaciones de violencia intrafamiliar y/o en el entorno más cercano contra la o el estudiante",
      "Definir los lineamientos directrices y procedimientos para la prevención, actuación, denuncia y protección a las víctimas en casos de violencia física, psicológica y sexual en Unidades Educativas y Centros de Educación Especial por parte de cualquier miembro adulto de la comunidad educativa (directoras, directores, maestras, maestros, personal administrativo, madres, padres y/o tutores) hacia las y los estudiantes (niñas, niños y adolescentes), cometidas o detectadas en el ámbito educativo.",
      "Garantizar la prevención, identificación temprana y la referencia oportuna, de casos de violencia física, psicológica y sexual ocurrido en unidades educativas y centros de Educación Especial",
      "Ninguna de las anteriores"
    ],
    correctIndex: 1,
    explanation: "El protocolo (pág. 13) establece que su objeto es definir los lineamientos, directrices y procedimientos para la prevención, actuación, denuncia y protección a las víctimas en casos de violencia física, psicológica y sexual en unidades educativas y centros de educación especial."
  },
  {
    id: "efectos-violencia-sexual-corto-plazo",
    question: "¿Cuáles son los efectos de la violencia sexual a corto plazo en el periodo inicial de la agresión?",
    options: [
      "Trastornos ansiosos, trastornos de sueño, terrores nocturnos, insomnio, trastornos alimenticios.",
      "Sentimientos de tristeza y desamparo, cambios bruscos de estado de ánimo, irritabilidad, rebeldía, temores diversos, vergüenza y culpa",
      "Prostitución, consumo de Alcohol hasta la dependencia del mismo, drogadicción, conductas delictivas, inadaptación social",
      "Inasistencia consecutiva a las unidades educativas o centros educativos."
    ],
    correctIndex: 1,
    explanation: "El protocolo (pág. 24, Tabla 2) en 'Consecuencias emocionales a corto plazo' lista: sentimientos de tristeza y desamparo, cambios bruscos de estado de ánimo, irritabilidad, temores, vergüenza y culpa. La opción A corresponde a consecuencias a mediano plazo."
  },
  {
    id: "prevenir-violencia-ambito-educativo",
    question: "¿Cómo prevenir la violencia en el Ámbito Educativo?",
    options: [
      "Indagando permanentemente a las niñas, niños y adolescentes que muestran conductas que dejen presumir situaciones irregulares para hacer que nos cuenten los que les pasa.",
      "Observando detenidamente a las niñas, niños y adolescentes en horas de recreo y durante las clases para detectar conductas irregulares que nos dejen la sospecha de que pasa algo malo",
      "A través de acciones que faciliten a las niñas, niños y adolescentes empoderarse y ser capaces de tomar decisiones respecto a sus proyectos de vida de manera consciente, libre y autónoma; adquirir valores y principios mediante la práctica, desarrollar habilidades de autocuidado y reconocimiento de los factores de riesgo.",
      "Diagnosticar el tipo de violencia."
    ],
    correctIndex: 2,
    explanation: "El protocolo (pág. 23) indica que las acciones de prevención deben facilitar que los estudiantes se empoderen, tomen decisiones conscientes, libres y autónomas, adquieran valores y desarrollen habilidades de autocuidado y reconocimiento de factores de riesgo."
  },
  {
    id: "medidas-prevencion-maestros",
    question: "Son medidas de prevención de la violencia que involucran a maestros y maestras.",
    options: [
      "No podrá permanecer a solas con una o un/a estudiante en el aula u otro ambiente de la Unidad Educativa o Centro de Educación Especial.",
      "Comunicarse de manera individual con las y los estudiantes cuando se trata de temas ajenos a la escuela.",
      "Ser un observador pasivo de conflictos que pudieren tener niñas, niños o adolescentes, evitando intervenir en la resolución de sus conflictos",
      "Ninguna es correcta"
    ],
    correctIndex: 0,
    explanation: "El protocolo (pág. 41) establece que el maestro no podrá permanecer a solas con una o un estudiante en el aula u otro ambiente, ni comunicarse de manera individual por teléfono o redes sociales para fines ajenos a lo pedagógico."
  },
  {
    id: "acciones-prevencion-estudiantes",
    question: "Las y los estudiantes de todos los niveles de escolaridad, deben asumir las siguientes acciones de prevención de la violencia:",
    options: [
      "Cumplir los mandatos del director, maestros y personal administrativo",
      "Conocer y comprender el alcance de sus derechos, deberes y obligaciones, especialmente el derecho al respeto, dignidad, corresponsabilidad y los mecanismos y condiciones de denuncia al interior de la Unidad Educativa y/o Centro de Educación Especial",
      "Poner en conocimiento del director y maestros cuando una actividad no es de su agrado.",
      "Evaluar factores de riesgo."
    ],
    correctIndex: 1,
    explanation: "El protocolo (pág. 43) establece que los estudiantes deben conocer y comprender el alcance de sus derechos, deberes y obligaciones, especialmente el derecho al respeto, dignidad, corresponsabilidad y los mecanismos y condiciones de denuncia."
  },
  {
    id: "violencia-sexual-manifestacion",
    question: "Es Violencia Sexual:",
    options: [
      "Enamorar con alguien que tienen una diferencia de edad en un parámetro de 10 años",
      "Toqueteos, caricias, manoseos o acercamientos de una persona hacia una niña, niño o adolescente.",
      "Consolidan relaciones de dominación, exclusión, desigualdad y discriminación, naturalizando la subordinación de las mujeres."
    ],
    correctIndex: 1,
    explanation: "El protocolo (págs. 16-17) en las manifestaciones de la violencia sexual incluye: toqueteos, caricias, manoseos o acercamientos de una persona hacia una niña, niño o adolescente, consentidos o no por parte de la víctima."
  },
  {
    id: "estupro",
    question: "Estupro: Quien, mediante seducción o engaño, tuviera acceso carnal con persona de uno y otro sexo;",
    options: [
      "Mayor de doce (12) y menor de dieciocho (18) años, será sancionado con privación de libertad de ocho a doce años.",
      "Mayor de catorce (14) y menor de dieciséis (16) años, será sancionado con privación de libertad de tres a seis años.",
      "Mayor de catorce (14) y menor de dieciocho (18) años, será sancionado con privación de libertad de tres a seis años."
    ],
    correctIndex: 2,
    explanation: "El protocolo (pág. 20, Tabla 1) define el Estupro: quien mediante seducción o engaño tuviera acceso carnal con persona mayor de catorce (14) y menor de dieciocho (18) años, será sancionado con privación de libertad de tres a seis años."
  },
  {
    id: "protocolo-intervencion-confidencialidad",
    question: "Un protocolo de intervención es:",
    options: [
      "La Directora o el Director debe llamar a una asamblea general para asumir políticas que se debe tomar en cuenta como Institución Educativa.",
      "La Directora o el Director debe asegurarse que la indagación e investigación del personal docente, administrativo, sean en el marco de la confidencialidad, obteniendo así información de la víctima.",
      "La Directora o el Director debe asegurarse que las actuaciones del personal docente, administrativo, sean en el marco de la confidencialidad, evitando la revictimización."
    ],
    correctIndex: 2,
    explanation: "El protocolo (pág. 50) establece que la directora o director debe asegurarse que las actuaciones del personal docente y administrativo sean en un marco de confidencialidad, garantizando la no revictimización de la niña, niño o adolescente."
  },
  {
    id: "principios-protocolo",
    question: "¿Cuáles son los principios bajo los que se rige el Protocolo de Prevención, Actuación y Denuncia en casos de Violencia Física, Psicológica y Sexual?",
    options: [
      "Interés superior de la niña, niño o adolescente; Cultura de paz; Lucha contra el racismo y toda forma de discriminación; Respeto a la identidad, integridad y dignidad; Prioridad absoluta y atención preferente; Equidad de género e igualdad de derechos; Desarrollo integral; Oportunidad y celeridad en la prevención y atención; Corresponsabilidad de los miembros de la comunidad educativa; Participación.",
      "Solo el interés superior del niño y la cultura de paz.",
      "La confidencialidad, la revictimización y la denuncia obligatoria.",
      "Ninguna de las anteriores."
    ],
    correctIndex: 0,
    explanation: "El protocolo (pág. 13) establece 10 principios: interés superior, cultura de paz, lucha contra el racismo, respeto a la identidad, prioridad absoluta, equidad de género, desarrollo integral, oportunidad y celeridad, corresponsabilidad y participación."
  },
  {
    id: "definicion-violencia",
    question: "Según el protocolo, ¿qué se entiende por violencia?",
    options: [
      "'Constituye violencia, la acción u omisión, por cualquier medio, que ocasione privaciones, lesiones, daños, sufrimientos, perjuicios en la salud física, mental, afectiva, sexual, desarrollo deficiente e incluso la muerte de la niña, el niño o adolescente'. (Art. 147, párrafo I, Ley N° 548)",
      "Solo la agresión física directa.",
      "Únicamente el abuso sexual.",
      "La violencia psicológica y física, excluyendo la omisión o negligencia."
    ],
    correctIndex: 0,
    explanation: "El protocolo (pág. 15) cita el Art. 147, párrafo I, de la Ley N° 548: 'Constituye violencia, la acción u omisión, por cualquier medio, que ocasione privaciones, lesiones, daños, sufrimientos, perjuicios en la salud física, mental, afectiva, sexual, desarrollo deficiente e incluso la muerte de la niña, el niño o adolescente'."
  },
  {
    id: "amonestacion-falta-no-grave",
    question: "¿Qué debe hacer la Directora o el Director de la Unidad Educativa en caso de que la denuncia no corresponda a una situación de falta grave o no se constituya en delito?",
    options: [
      "Debe amonestar por escrito a la maestra o maestro que ha ejercido malos tratos contra una o un estudiante, para que reflexione sobre las causas de su comportamiento e informarle las alternativas para el manejo de la situación.",
      "Debe despedir inmediatamente al maestro o maestra.",
      "Debe ignorar la situación por no ser grave.",
      "Debe remitir el caso directamente a la justicia ordinaria."
    ],
    correctIndex: 0,
    explanation: "El protocolo (pág. 57) establece que si la denuncia no corresponde a falta grave o delito, el director debe amonestar por escrito al maestro o maestra que ejerció malos tratos, para que reflexione sobre las causas de su comportamiento."
  },
  {
    id: "plazo-reporte-distrital-48-horas",
    question: "¿Cuál es el plazo máximo que tiene el Director Distrital de Educación para reportar el hecho a la Dirección Departamental de Educación, luego de recibir una denuncia por violencia?",
    options: [
      "24 horas.",
      "48 horas.",
      "72 horas.",
      "5 días."
    ],
    correctIndex: 1,
    explanation: "El protocolo (pág. 61, Ruta 1, Paso 3) indica que el Director Distrital Educativa debe reportar el hecho a la Dirección Departamental de Educación en un plazo máximo de 48 horas."
  }
];

// Nombres de cada nivel de dominio, en orden (índice = nivel)
const LEVEL_NAMES = [
  "Nueva",
  "Necesita refuerzo",
  "En aprendizaje",
  "Conocida",
  "Dominada",
  "Dominio sólido"
];
const MAX_LEVEL = LEVEL_NAMES.length - 1; // 5
const MIN_LEVEL = 0;

// Etiquetas legibles para cada modo de estudio (se usan en la
// pantalla de historial). Las sesiones antiguas de la V2 no
// tienen "mode" guardado; ver renderHistory más abajo.
const MODE_LABELS = {
  smart: "Estudio inteligente",
  all: "Todas las preguntas",
  errors: "Solo errores"
};

// =============================================================
// 2. Almacenamiento en localStorage
//    Todo el progreso vive bajo una sola clave, como un objeto:
//    {
//      questionStats: { [id]: { attempts, correct, incorrect,
//                                streakCorrect, streakIncorrect,
//                                lastAnswer, lastAttemptDate,
//                                lastCorrectDate, level } },
//      sessionHistory: [ { date, total, correct, incorrect,
//                           percentage, mode } ],
//      questionReports: [ { id, questionId, questionText,
//                           type, comment, date } ]
//    }
// =============================================================
const STORAGE_KEY = "quizProgressV1";

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { questionStats: {}, sessionHistory: [], questionReports: [] };
    const parsed = JSON.parse(raw);
    // Nos aseguramos de que todas las propiedades existan aunque
    // el dato guardado sea antiguo o esté incompleto.
    return {
      questionStats: parsed.questionStats || {},
      sessionHistory: parsed.sessionHistory || [],
      questionReports: parsed.questionReports || []
    };
  } catch (error) {
    // Si localStorage no está disponible o el JSON está dañado,
    // seguimos funcionando igual, solo que sin progreso guardado.
    console.warn("No se pudo leer el progreso guardado:", error);
    return { questionStats: {}, sessionHistory: [], questionReports: [] };
  }
}

function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.warn("No se pudo guardar el progreso:", error);
  }
}

// -------------------------------------------------------------
// Migración silenciosa V2 → V3.
// Las estadísticas guardadas por la V2 no tienen "streakCorrect",
// "streakIncorrect" ni "lastCorrectDate". En vez de borrar o
// reiniciar nada, completamos esos campos con valores por defecto
// la primera vez que se cargan, y si hubo que completar algo,
// guardamos ese resultado para no repetir el trabajo la próxima vez.
// -------------------------------------------------------------
function migrateProgress(rawProgress) {
  let didMigrate = false;

  Object.values(rawProgress.questionStats).forEach((stats) => {
    if (stats.streakCorrect === undefined) {
      stats.streakCorrect = 0;
      didMigrate = true;
    }
    if (stats.streakIncorrect === undefined) {
      stats.streakIncorrect = 0;
      didMigrate = true;
    }
    if (stats.lastCorrectDate === undefined) {
      stats.lastCorrectDate = null;
      didMigrate = true;
    }
  });

  return didMigrate;
}

// Progreso cargado una vez al inicio y mantenido en memoria
// mientras el usuario usa la página; cada cambio se persiste.
let progress = loadProgress();
if (migrateProgress(progress)) {
  saveProgress(progress);
}

function getStatsFor(questionId) {
  if (!progress.questionStats[questionId]) {
    progress.questionStats[questionId] = {
      attempts: 0,
      correct: 0,
      incorrect: 0,
      streakCorrect: 0,
      streakIncorrect: 0,
      lastAnswer: null,
      lastAttemptDate: null,
      lastCorrectDate: null,
      level: 0
    };
  }
  return progress.questionStats[questionId];
}

// Actualiza el progreso de UNA pregunta después de responderla
// y lo guarda de inmediato en localStorage.
function registerAnswer(questionId, isCorrect, answerText) {
  const stats = getStatsFor(questionId);
  const now = new Date().toISOString();

  stats.attempts += 1;
  stats.lastAnswer = answerText;
  stats.lastAttemptDate = now;

  if (isCorrect) {
    stats.correct += 1;
    stats.streakCorrect += 1;
    stats.streakIncorrect = 0;
    stats.lastCorrectDate = now;
    stats.level = Math.min(MAX_LEVEL, stats.level + 1);
  } else {
    stats.incorrect += 1;
    stats.streakIncorrect += 1;
    stats.streakCorrect = 0;
    stats.level = Math.max(MIN_LEVEL, stats.level - 1);
  }

  saveProgress(progress);
  return stats;
}

// Guarda un resumen de la sesión completa (una vuelta al cuestionario).
// "mode" queda preparado para poder mostrar estadísticas por modo
// más adelante, sin romper las sesiones antiguas que no lo tienen.
function registerSession(total, correct, incorrect, mode) {
  const percentage = Math.round((correct / total) * 100);

  progress.sessionHistory.push({
    date: new Date().toISOString(),
    total,
    correct,
    incorrect,
    answered: total,
    unanswered: 0,
    percentage,
    mode,
    status: "completed"
  });

  saveProgress(progress);
}

function resetProgress() {
  progress = { questionStats: {}, sessionHistory: [], questionReports: [] };
  saveProgress(progress);
}

function registerIncompleteSession(total, answered, correct, incorrect, mode) {
  const unanswered = total - answered;
  const percentage = answered > 0
    ? Math.round((correct / answered) * 100)
    : 0;

  progress.sessionHistory.push({
    date: new Date().toISOString(),
    total,
    correct,
    incorrect,
    answered,
    unanswered,
    percentage,
    mode,
    status: "incomplete"
  });

  saveProgress(progress);
}

// -------------------------------------------------------------
// 2.b. Reportes de preguntas
// -------------------------------------------------------------
const REPORT_TYPE_LABELS = {
  "respuesta-incorrecta": "Respuesta incorrecta",
  "pregunta-confusa": "Pregunta mal formulada",
  "explicacion-incorrecta": "Explicación incorrecta",
  "ortografia": "Ortografía / redacción",
  "otro": "Otro"
};

function saveQuestionReport(questionId, type, comment) {
  const q = QUESTIONS.find((item) => item.id === questionId);
  const questionText = q ? q.question : "(pregunta no encontrada)";

  progress.questionReports.push({
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    questionId,
    questionText,
    type,
    comment: (comment || "").trim(),
    date: new Date().toISOString()
  });

  saveProgress(progress);
}

function clearAllReports() {
  progress.questionReports = [];
  saveProgress(progress);
}

// =============================================================
// 3. Estado de la aplicación (en memoria, no persistente)
// =============================================================
// quizState controla qué pantalla del bloque "Cuestionario" se ve:
//  "setup"   → eligiendo modo y cantidad
//  "playing" → respondiendo la sesión actual
//  "finished"→ viendo el resultado final
let quizState = "setup";

let selectedMode = "smart";
let selectedAmount = 20; // número, o "all"

let sessionQuestions = []; // preguntas elegidas para la sesión activa
let sessionMode = null; // modo con el que se generó sessionQuestions

let currentIndex = 0;
let score = 0;
let selectedOption = null;
let answered = false;

// =============================================================
// 4. Referencias al DOM
// =============================================================
const counterEl = document.getElementById("counter");
const scoreEl = document.getElementById("score");
const progressFillEl = document.getElementById("progressFill");

const setupScreen = document.getElementById("setupScreen");
const modeGrid = document.getElementById("modeGrid");
const amountGrid = document.getElementById("amountGrid");
const setupWarning = document.getElementById("setupWarning");
const startSessionBtn = document.getElementById("startSessionBtn");

const levelBadgeEl = document.getElementById("levelBadge");
const questionTextEl = document.getElementById("questionText");
const optionsListEl = document.getElementById("optionsList");
const feedbackEl = document.getElementById("feedback");
const feedbackVerdictEl = document.getElementById("feedbackVerdict");
const feedbackExplanationEl = document.getElementById("feedbackExplanation");

const answerBtn = document.getElementById("answerBtn");
const nextBtn = document.getElementById("nextBtn");
const finishSessionBtn = document.getElementById("finishSessionBtn");

const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");
const finalScoreEl = document.getElementById("finalScore");
const resultMessageEl = document.getElementById("resultMessage");
const restartBtn = document.getElementById("restartBtn");

const statsScreen = document.getElementById("statsScreen");
const statsSummaryGrid = document.getElementById("statsSummaryGrid");
const statsLevelGrid = document.getElementById("statsLevelGrid");
const resetBtn = document.getElementById("resetBtn");

const historyScreen = document.getElementById("historyScreen");
const historyList = document.getElementById("historyList");

const reportsScreen = document.getElementById("reportsScreen");
const reportsList = document.getElementById("reportsList");
const reportsBadge = document.getElementById("reportsBadge");
const copyReportsBtn = document.getElementById("copyReportsBtn");
const clearReportsBtn = document.getElementById("clearReportsBtn");

const reportQuestionBtn = document.getElementById("reportQuestionBtn");
const reportModal = document.getElementById("reportModal");
const reportQuestionPreview = document.getElementById("reportQuestionPreview");
const reportTypeSelect = document.getElementById("reportType");
const reportCommentInput = document.getElementById("reportComment");
const cancelReportBtn = document.getElementById("cancelReportBtn");
const submitReportBtn = document.getElementById("submitReportBtn");

const navButtons = document.querySelectorAll(".nav__btn");

const LETTERS = ["A", "B", "C", "D", "E", "F"];

// =============================================================
// 5. Navegación entre vistas (Cuestionario / Estadísticas /
//    Historial / Reportes)
// =============================================================
function switchView(view) {
  const isQuiz = view === "quiz";

  if (isQuiz) {
    renderQuizState();
  } else {
    setupScreen.hidden = true;
    quizScreen.hidden = true;
    resultScreen.hidden = true;
  }

  statsScreen.hidden = view !== "stats";
  historyScreen.hidden = view !== "history";
  reportsScreen.hidden = view !== "reports";

  navButtons.forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.view === view);
  });

  if (view === "stats") renderStats();
  if (view === "history") renderHistory();
  if (view === "reports") renderReports();
}

navButtons.forEach((btn) => {
  btn.addEventListener("click", () => switchView(btn.dataset.view));
});

// Muestra la pantalla correcta dentro del bloque "Cuestionario"
// según el valor actual de quizState, sin tocar ningún dato.
function renderQuizState() {
  setupScreen.hidden = quizState !== "setup";
  quizScreen.hidden = quizState !== "playing";
  resultScreen.hidden = quizState !== "finished";
}

// =============================================================
// 6. Pantalla de configuración de sesión (modo + cantidad)
// =============================================================
modeGrid.querySelectorAll(".mode-card").forEach((card) => {
  card.addEventListener("click", () => {
    selectedMode = card.dataset.mode;
    modeGrid.querySelectorAll(".mode-card").forEach((c) => {
      c.classList.toggle("is-active", c === card);
    });
    updateSetupPreview();
  });
});

amountGrid.querySelectorAll(".amount-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const raw = btn.dataset.amount;
    selectedAmount = raw === "all" ? "all" : Number(raw);
    amountGrid.querySelectorAll(".amount-btn").forEach((b) => {
      b.classList.toggle("is-active", b === btn);
    });
    updateSetupPreview();
  });
});

// Recalcula, sin iniciar todavía la sesión, cuántas preguntas hay
// disponibles para el modo elegido y muestra un aviso si hace
// falta (cantidad pedida mayor a la disponible, o "Solo errores"
// sin ninguna pregunta fallada todavía).
function updateSetupPreview() {
  let availableAmount;
  if (selectedMode === "errors") {
    availableAmount = QUESTIONS.filter((q) => {
      const stats = progress.questionStats[q.id];
      return stats && stats.incorrect > 0;
    }).length;
  } else {
    availableAmount = QUESTIONS.length;
  }

  if (selectedMode === "errors" && availableAmount === 0) {
    setupWarning.hidden = false;
    setupWarning.textContent =
      "Todavía no tienes preguntas falladas para repasar. Responde el cuestionario en otro modo primero.";
    startSessionBtn.disabled = true;
    return;
  }

  startSessionBtn.disabled = false;

  if (selectedAmount !== "all" && selectedAmount > availableAmount) {
    const plural = availableAmount === 1 ? "" : "s";
    setupWarning.hidden = false;
    setupWarning.textContent = `El banco contiene ${availableAmount} pregunta${plural} disponible${plural}. Has seleccionado ${selectedAmount}. Se utilizarán las ${availableAmount} disponibles.`;
  } else {
    setupWarning.hidden = true;
  }
}

// Arma la sesión usando el motor de selección (selection-engine.js)
// y arranca el cuestionario con el resultado.
function startSession() {
  const result = selectSessionQuestions(QUESTIONS, progress.questionStats, {
    mode: selectedMode,
    amount: selectedAmount
  });

  if (result.usedAmount === 0) {
    // Solo puede pasar en "Solo errores" sin preguntas falladas.
    updateSetupPreview();
    return;
  }

  sessionQuestions = result.questions;
  sessionMode = result.mode;
  currentIndex = 0;
  score = 0;

  quizState = "playing";
  renderQuizState();
  renderQuestion();
}

startSessionBtn.addEventListener("click", startSession);

// =============================================================
// 7. Renderizado de una pregunta
// =============================================================
function renderQuestion() {
  const total = sessionQuestions.length;
  const q = sessionQuestions[currentIndex];
  const stats = getStatsFor(q.id);

  // Marcador
  counterEl.innerHTML = `${String(currentIndex + 1).padStart(2, "0")}<span class="stat__of">/${String(total).padStart(2, "0")}</span>`;
  scoreEl.textContent = String(score).padStart(3, "0");
  progressFillEl.style.width = `${(currentIndex / total) * 100}%`;

  // Insignia de nivel de dominio de esta pregunta
  levelBadgeEl.hidden = false;
  levelBadgeEl.textContent = `Nivel ${stats.level} · ${LEVEL_NAMES[stats.level]}`;

  // Botón de reportar: reiniciar texto por si quedó en "Reportado"
  reportQuestionBtn.textContent = "⚠ Reportar";
  reportQuestionBtn.disabled = false;

  // Pregunta
  questionTextEl.textContent = q.question;

  // Opciones
  optionsListEl.innerHTML = "";
  q.options.forEach((optionText, index) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.type = "button";
    btn.innerHTML = `<span class="option__letter">${LETTERS[index]}</span><span>${optionText}</span>`;
    btn.addEventListener("click", () => selectOption(index));
    optionsListEl.appendChild(btn);
  });

  // Reinicia estado de la pregunta
  selectedOption = null;
  answered = false;
  feedbackEl.hidden = true;
  feedbackEl.classList.remove("feedback--correct", "feedback--wrong");
  answerBtn.hidden = false;
  answerBtn.disabled = true;
  nextBtn.hidden = true;
}

// =============================================================
// 8. Selección de una opción (antes de confirmar)
// =============================================================
function selectOption(index) {
  if (answered) return;

  selectedOption = index;
  answerBtn.disabled = false;

  const optionButtons = optionsListEl.querySelectorAll(".option");
  optionButtons.forEach((btn, i) => {
    btn.classList.toggle("is-selected", i === index);
  });
}

// =============================================================
// 9. Confirmar respuesta, mostrar retroalimentación y guardar progreso
// =============================================================
function submitAnswer() {
  if (selectedOption === null || answered) return;

  answered = true;
  const q = sessionQuestions[currentIndex];
  const isCorrect = selectedOption === q.correctIndex;

  if (isCorrect) score++;

  // Guarda el intento en localStorage
  const stats = registerAnswer(q.id, isCorrect, q.options[selectedOption]);
  levelBadgeEl.textContent = `Nivel ${stats.level} · ${LEVEL_NAMES[stats.level]}`;

  const optionButtons = optionsListEl.querySelectorAll(".option");
  optionButtons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correctIndex) btn.classList.add("is-correct");
    if (i === selectedOption && !isCorrect) btn.classList.add("is-wrong");
  });

  feedbackEl.hidden = false;
  feedbackEl.classList.add(isCorrect ? "feedback--correct" : "feedback--wrong");
  feedbackVerdictEl.textContent = isCorrect ? "✓ Correcto" : "✗ Incorrecto";
  feedbackExplanationEl.textContent = q.explanation;

  scoreEl.textContent = String(score).padStart(3, "0");
  progressFillEl.style.width = `${((currentIndex + 1) / sessionQuestions.length) * 100}%`;

  answerBtn.hidden = true;
  nextBtn.hidden = false;
}

// =============================================================
// 10. Terminar un intento antes de completar todas las preguntas
// =============================================================
function finishSession() {
  if (quizState !== "playing") return;

  const total = sessionQuestions.length;
  const answeredCount = currentIndex + (answered ? 1 : 0);
  const incorrect = answeredCount - score;
  const unanswered = total - answeredCount;

  const confirmed = confirm(
    `¿Quieres terminar este intento?\n\n` +
    `Respondidas: ${answeredCount}/${total}\n` +
    `Correctas: ${score}\n` +
    `Incorrectas: ${incorrect}\n` +
    `Sin responder: ${unanswered}\n\n` +
    `El intento quedará registrado como "No completado".`
  );

  if (!confirmed) return;

  registerIncompleteSession(
    total,
    answeredCount,
    score,
    incorrect,
    sessionMode
  );

  // Volvemos a la pantalla de configuración.
  sessionQuestions = [];
  sessionMode = null;
  currentIndex = 0;
  score = 0;
  selectedOption = null;
  answered = false;

  quizState = "setup";
  renderQuizState();
  updateSetupPreview();
}

// =============================================================
// 11. Avanzar a la siguiente pregunta o mostrar resultado
// =============================================================
function goToNext() {
  currentIndex++;
  if (currentIndex < sessionQuestions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

// =============================================================
// 12. Pantalla de resultado final (y registro de la sesión)
// =============================================================
function showResult() {
  quizState = "finished";
  renderQuizState();

  const total = sessionQuestions.length;
  const incorrect = total - score;
  finalScoreEl.textContent = `${score}/${total}`;

  // Guarda esta sesión en el historial, incluyendo el modo usado.
  registerSession(total, score, incorrect, sessionMode);

  const ratio = score / total;
  let message;
  if (ratio === 1) {
    message = "Puntaje perfecto. Dominas el tema.";
  } else if (ratio >= 0.7) {
    message = "Muy buen resultado.";
  } else if (ratio >= 0.4) {
    message = "Buen intento, hay espacio para mejorar.";
  } else {
    message = "Vale la pena repasar el tema e intentarlo de nuevo.";
  }
  resultMessageEl.textContent = message;
}

// =============================================================
// 13. Volver a la configuración de sesión (nueva vuelta, no borra progreso)
// =============================================================
function goToSetup() {
  quizState = "setup";
  renderQuizState();
  updateSetupPreview();
}

restartBtn.addEventListener("click", goToSetup);

// =============================================================
// 14. Pantalla de estadísticas
// =============================================================
function renderStats() {
  // --- Resumen general (acumulado de todas las sesiones) ---
  let totalCorrect = 0;
  let totalIncorrect = 0;
  let answeredQuestions = 0;
  const levelCounts = new Array(LEVEL_NAMES.length).fill(0);

  QUESTIONS.forEach((q) => {
    const stats = getStatsFor(q.id);
    totalCorrect += stats.correct;
    totalIncorrect += stats.incorrect;
    if (stats.attempts > 0) answeredQuestions++;
    levelCounts[stats.level]++;
  });

  const totalAnswers = totalCorrect + totalIncorrect;
  const accuracy = totalAnswers > 0 ? Math.round((totalCorrect / totalAnswers) * 100) : 0;

  const summaryCards = [
    { value: answeredQuestions, label: "Preguntas respondidas" },
    { value: totalCorrect, label: "Correctas" },
    { value: totalIncorrect, label: "Incorrectas" },
    { value: `${accuracy}%`, label: "Porcentaje de aciertos" }
  ];

  statsSummaryGrid.innerHTML = summaryCards
    .map(
      (card) => `
      <div class="stat-card">
        <span class="stat-card__value">${card.value}</span>
        <span class="stat-card__label">${card.label}</span>
      </div>`
    )
    .join("");

  // --- Desglose por nivel de dominio ---
  statsLevelGrid.innerHTML = LEVEL_NAMES.map(
    (name, level) => `
    <div class="stat-card">
      <span class="stat-card__value">${levelCounts[level]}</span>
      <span class="stat-card__label">${name}</span>
    </div>`
  ).join("");
}

resetBtn.addEventListener("click", () => {
  const confirmed = confirm(
    "¿Seguro que quieres borrar todo tu progreso? Esta acción no se puede deshacer."
  );
  if (!confirmed) return;

  resetProgress();
  renderStats();
  renderHistory();
  renderReports();
  updateReportsBadge();
});

// =============================================================
// 15. Pantalla de historial de sesiones
// =============================================================
function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function renderHistory() {
  if (progress.sessionHistory.length === 0) {
    historyList.innerHTML = `
      <p class="empty-state">
        Aún no hay sesiones registradas.
        Completa un cuestionario para ver tu historial aquí.
      </p>`;
    return;
  }

  // Mostramos las sesiones más recientes primero.
  const sessions = [...progress.sessionHistory].reverse();

  historyList.innerHTML = sessions
    .map((session) => {
      const modeTag = session.mode
        ? `<span class="history-item__mode">
             ${MODE_LABELS[session.mode] || session.mode}
           </span>`
        : "";

      const isIncomplete = session.status === "incomplete";

      const statusTag = isIncomplete
        ? `<span class="history-item__status history-item__status--incomplete">
             ⚠ No completado
           </span>`
        : `<span class="history-item__status history-item__status--completed">
             ✓ Completado
           </span>`;

      const answered = session.answered !== undefined
        ? session.answered
        : session.total;

      const unanswered = session.unanswered !== undefined
        ? session.unanswered
        : 0;

      const detail = isIncomplete
        ? `${answered}/${session.total} respondidas · ${session.correct} correctas · ${session.incorrect} incorrectas · ${unanswered} sin responder`
        : `${session.total} preguntas · ${session.correct} correctas · ${session.incorrect} incorrectas`;

      return `
        <div class="history-item">
          <div>
            <div class="history-item__date">
              ${formatDate(session.date)}
            </div>

            <div class="history-item__detail">
              ${detail}
            </div>

            ${modeTag}

            ${statusTag}
          </div>

          <div class="history-item__pct">
            ${session.percentage}%
          </div>
        </div>
      `;
    })
    .join("");
}

// =============================================================
// 16. Modal de reportes
// =============================================================
function openReportModal() {
  if (quizState !== "playing") return;
  const q = sessionQuestions[currentIndex];
  if (!q) return;

  reportQuestionPreview.textContent = q.question;
  reportTypeSelect.value = "respuesta-incorrecta";
  reportCommentInput.value = "";
  reportModal.hidden = false;
  reportCommentInput.focus();
}

function closeReportModal() {
  reportModal.hidden = true;
}

function submitReport() {
  if (quizState !== "playing") return;
  const q = sessionQuestions[currentIndex];
  if (!q) return;

  saveQuestionReport(q.id, reportTypeSelect.value, reportCommentInput.value);

  closeReportModal();
  updateReportsBadge();

  // Pequeña confirmación visual sin bloquear la UI.
  reportQuestionBtn.textContent = "✓ Reportado";
  reportQuestionBtn.disabled = true;
  setTimeout(() => {
    reportQuestionBtn.textContent = "⚠ Reportar";
    reportQuestionBtn.disabled = false;
  }, 1800);
}

reportQuestionBtn.addEventListener("click", openReportModal);
cancelReportBtn.addEventListener("click", closeReportModal);
submitReportBtn.addEventListener("click", submitReport);
reportModal.querySelector("[data-close-modal]").addEventListener("click", closeReportModal);

// Cerrar el modal con la tecla Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !reportModal.hidden) closeReportModal();
});

// =============================================================
// 17. Pantalla de reportes
// =============================================================
function updateReportsBadge() {
  const count = progress.questionReports.length;
  if (count > 0) {
    reportsBadge.hidden = false;
    reportsBadge.textContent = String(count);
  } else {
    reportsBadge.hidden = true;
  }
}

// Pequeño helper para evitar inyección HTML desde comentarios
// escritos por el usuario.
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderReports() {
  const reports = [...progress.questionReports].reverse();

  if (reports.length === 0) {
    reportsList.innerHTML = `
      <p class="empty-state">
        No has enviado ningún reporte todavía.
        Si encuentras una pregunta con error, usa el botón "Reportar"
        mientras la estás respondiendo.
      </p>`;
    copyReportsBtn.hidden = true;
    clearReportsBtn.hidden = true;
    return;
  }

  copyReportsBtn.hidden = false;
  clearReportsBtn.hidden = false;

  reportsList.innerHTML = reports
    .map((report) => {
      const typeLabel = REPORT_TYPE_LABELS[report.type] || report.type;
      const comment = report.comment
        ? `<p class="report-card__comment">${escapeHtml(report.comment)}</p>`
        : `<p class="report-card__comment report-card__comment--empty">(sin comentario)</p>`;

      return `
        <div class="report-card">
          <div class="report-card__head">
            <span class="report-card__type">${typeLabel}</span>
            <span class="report-card__date">${formatDate(report.date)}</span>
          </div>
          <p class="report-card__question">${escapeHtml(report.questionText)}</p>
          ${comment}
        </div>
      `;
    })
    .join("");
}

// Copiar todos los reportes al portapapeles como texto plano
copyReportsBtn.addEventListener("click", async () => {
  if (progress.questionReports.length === 0) return;

  const text = progress.questionReports
    .map((r) => {
      const typeLabel = REPORT_TYPE_LABELS[r.type] || r.type;
      return [
        `ID: ${r.questionId}`,
        `Tipo: ${typeLabel}`,
        `Fecha: ${formatDate(r.date)}`,
        `Pregunta: ${r.questionText}`,
        `Comentario: ${r.comment || "(sin comentario)"}`
      ].join("\n");
    })
    .join("\n\n---\n\n");

  try {
    await navigator.clipboard.writeText(text);
    copyReportsBtn.textContent = "✓ Copiado";
    setTimeout(() => {
      copyReportsBtn.textContent = "Copiar todos los reportes";
    }, 1800);
  } catch (err) {
    console.warn("No se pudo copiar al portapapeles:", err);
    // Fallback: mostrar en un alert si el navegador no lo permite.
    alert("No se pudo copiar automáticamente. Aquí tienes los reportes:\n\n" + text);
  }
});

clearReportsBtn.addEventListener("click", () => {
  const confirmed = confirm(
    "¿Seguro que quieres borrar TODOS los reportes? Esta acción no se puede deshacer."
  );
  if (!confirmed) return;
  clearAllReports();
  renderReports();
  updateReportsBadge();
});

// =============================================================
// 18. Eventos y arranque
// =============================================================
answerBtn.addEventListener("click", submitAnswer);
nextBtn.addEventListener("click", goToNext);
finishSessionBtn.addEventListener("click", finishSession);

renderQuizState();
updateSetupPreview();
updateReportsBadge();