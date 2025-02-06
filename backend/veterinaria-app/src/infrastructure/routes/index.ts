import citaRoutes from "./cita/cita-routes";
import mascotaRoutes from "./mascota/mascota-routes";
import propietariosRoutes from "./propietario/propietario-routes";
import authRoutes from "./auth/auth-routes";
const routes = [
    {path : '/api/auth', router: authRoutes},
    { path: '/api/date', router: citaRoutes },
    { path: '/api/pet', router: mascotaRoutes },
    { path: '/api/owner', router: propietariosRoutes }
]

export default routes; 