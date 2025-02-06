import { PropietarioResponse } from "../propietario/propietario";

export interface MascotaResponse {
  id: string;
  nombre: string;
  especie: string;
  raza?: string;
  edad?: number;
  unidadEdad?: "años" | "meses";
  peso?: number;
  unidadPeso?: "gramos" | "kilogramos";
  color?: string;
  propietario: PropietarioResponse;
  createdAt: string;
  updatedAt: string;
}
