import mascotaRoutes from "./mascota/mascota-routes";
import propietariosRoutes from "./propietario/propietario-routes";

const routes = [
    { path: '/api/pet', router: mascotaRoutes },
    { path: '/api/owner', router: propietariosRoutes }
]

export default routes; 