import BarChartIcon from '@mui/icons-material/BarChart';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import SettingsIcon from '@mui/icons-material/Settings';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import TuneIcon from '@mui/icons-material/Tune';
import Inventory2Icon from '@mui/icons-material/Inventory2';


const clientRoutes = ["comprar", "dashboard", "pagos", "profile", "payment-callback"];
const publicRoutes = ["login", "logout", "signup", "/"];
const adminRoutes = ["checkin", "company", "dashboard", "expenses", "payments", "plans", "schedules", "users"];
const allRoutes = [
  ...clientRoutes,
  ...publicRoutes,
  ...adminRoutes,
]


const menuOptions = [
  { name: "Dashboard", route: "/admin/dashboard", type: "admin", icon: <BarChartIcon /> },
  { name: "Usuarios", route: "/admin/users", type: "admin", icon: <AccessibilityNewIcon /> },
  { name: "Planes", route: "/admin/plans", type: "admin", icon: <SettingsIcon /> },
  { name: "Paquetes", route: "/admin/bundles", type: "admin", icon: <Inventory2Icon /> },
  { name: "Pagos", route: "/admin/payments", type: "admin", icon: <AttachMoneyIcon /> },
  { name: "Gastos", route: "/admin/expenses", type: "admin", icon: <TrendingDownIcon /> },
  { name: "Horarios", route: "/admin/schedules", type: "admin", icon: <CalendarMonthIcon /> },
  { name: "Ingresos", route: "/admin/checkin", type: "admin", icon: <PermContactCalendarIcon /> },
  { name: "Configuración", route: "/admin/company", type: "admin", icon: <TuneIcon /> },
  { name: "Salir", route: "/logout", type: "admin", icon: <ExitToAppIcon /> },
]

export default menuOptions;


const menuUserOptions = [
  { name: "Mi horario", route: "/user/dashboard", type: "user", icon: <PermContactCalendarIcon /> },
  { name: "Comprar", route: "/user/comprar", type: "user", icon: <ShoppingCartIcon /> },
  { name: "Mis pagos", route: "/user/pagos", type: "user", icon: <AttachMoneyIcon /> },
  { name: "Mi perfil", route: "/user/profile", type: "user", icon: <AccessibilityNewIcon /> },
  { name: "Salir", route: "/logout", type: "user", icon: <ExitToAppIcon /> },
]

export { menuUserOptions, clientRoutes, publicRoutes, adminRoutes, allRoutes };
