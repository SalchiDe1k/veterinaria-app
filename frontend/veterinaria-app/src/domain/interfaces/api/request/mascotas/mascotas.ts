export interface mascotaRequest {
  especie: string;
  raza?: string;
  sexo: string;
  propietarioId: string;
  nombre: string;
  edad?: number;
  unidadEdad?: "meses" | "años";
  peso?: number;
  unidadPeso?: "gramos" | "kilogramos";
  color?: string;
}
