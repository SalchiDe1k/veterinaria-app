export interface mascota {
  especie: string;
  raza: string;
  sexo: string;
  nombreMascota: string;
  propietarioId?: string;
  edad?: number;
  unidadEdad?: "meses" | "años";
  peso?: number;
  unidadPeso?: "gramos" | "kilogramos";
  color?: string;
}
