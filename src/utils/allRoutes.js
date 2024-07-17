import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DescriptionIcon from '@mui/icons-material/Description';

const clientRoutes = ["comprar", "dashboard", "pagos", "profile", "payment-callback"];
const publicRoutes = ["login", "logout", "signup", "/"];
const adminRoutes = ["checkin", "company", "dashboard", "expenses", "payments", "plans", "schedules", "users"];
const allRoutes = [
  ...clientRoutes,
  ...publicRoutes,
  ...adminRoutes,
]


const menuOptions = [
  { name: "Archivos", route: "/media", type: "admin", icon: <DescriptionIcon /> },
  { name: "Salir", route: "/logout", type: "admin", icon: <ExitToAppIcon /> },
]

const menuUserOptions = [
]

export default menuOptions;
export { menuUserOptions, clientRoutes, publicRoutes, adminRoutes, allRoutes };
