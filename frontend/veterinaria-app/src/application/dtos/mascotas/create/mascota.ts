import { MascotaRequest } from "@/domain/interfaces";
import { MascotaModel } from "@/domain/models";

export class MascotaCreateDTO implements MascotaRequest {
  especie: string;
  raza: string;
  sexo: string;
  propietarioId: string;
  nombre: string;
  edad?: number;
  unidadEdad?: "meses" | "años";
  peso?: number;
  unidadPeso?: "gramos" | "kilogramos";
  color?: string;

  constructor(data: MascotaModel) {
    this.especie = data.especie ?? "";
    this.raza = data.raza ?? "";
    this.sexo = data.sexo ?? "";
    this.propietarioId = data.propietarioId ?? "";
    this.nombre = data.nombreMascota ?? "";
    this.edad = data.edad ?? undefined;
    this.unidadEdad = data.unidadEdad ?? undefined;
    this.peso = data.peso ?? undefined;
    this.unidadPeso = data.unidadPeso ?? undefined;
    this.color = data.color ?? undefined;
  }

  toObject(): MascotaRequest {
    const {
      nombre,
      especie,
      sexo,
      propietarioId,
      raza,
      edad,
      unidadEdad,
      peso,
      unidadPeso,
      color,
    } = this;

    return {
      nombre,
      especie,
      sexo,
      propietarioId,
      ...(raza && { raza }),
      ...(edad && { edad }),
      ...(unidadEdad && { unidadEdad }),
      ...(peso && { peso }),
      ...(unidadPeso && { unidadPeso }),
      ...(color && { color }),
    };
  }
}
