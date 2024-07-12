const GENRES = [
  { name: "Female", value: "F" },
  { name: "Male", value: "M" },
  { name: "Diverse", value: "X" },
];

const SUPERADMIN = "superadmin";
const ADMIN = "admin";
const INSTRUCTOR = "instructor";
const CLIENT = "client";

const ROLES_SELECTOR = [
  { name: "Administrador", value: ADMIN },
  { name: "Instructor", value: INSTRUCTOR },
  { name: "Cliente", value: CLIENT },
]
const ADMIN_ROLES = [SUPERADMIN, ADMIN];
const PAGE_SIZE = 10;

const defaultValueDynamicForm = {
  "day": "monday",
  "start_time": "10:00",
  "duration": 1
}

const AUTOAGENDADO = "Autoagendado";
const CORTESIA = "Cortesía";
const FRANJAS = "Franjas horarias";
const HORA_INICIO = "Hora de inicio fija";
const SIN_RESTRICCIONES = "Sin restricciones";


const CREATE_PLAN_ACTION = "create";
const UPDATE_PLAN_ACTION = "update";
const PLAN_ACTIONS = {
  create: CREATE_PLAN_ACTION,
  update: UPDATE_PLAN_ACTION,
}

export { CREATE_PLAN_ACTION, UPDATE_PLAN_ACTION, PLAN_ACTIONS }
export { GENRES, SUPERADMIN, ADMIN, ADMIN_ROLES, PAGE_SIZE, ROLES_SELECTOR, INSTRUCTOR, defaultValueDynamicForm }
export {
  AUTOAGENDADO,
  CORTESIA,
  FRANJAS,
  HORA_INICIO,
  SIN_RESTRICCIONES,
}


export const CALENDAR_COLORS = [
  "#03a9f4", "#ff4569", "#d500f9", "#f73378", "#9c27b0", "#00e676", "#ff9800",
  "#6d1b7b", "#a2cf6e", "#35baf6", "#f44336", "#af52bf", "#b22a00",
  "#ed4b82", "#0276aa", "#618833", "#ff1744", "#dd33fa", "#9500ae",
  "#b2102f", "#a31545", "#f6685e", "#00a152", "#33eb91", "#ab003c",
  "#f50057", , "#6d1b7b", "#af52bf", "#9c27b0", "#ffac33",
  "#b26a00", "#4dabf5", "#aa2e25", "#8bc34a", "#a2cf6e", "#00e676",
  "#2196f3", "#ff3d00", "#1769aa", "#e91e63", "#35baf6"
]


