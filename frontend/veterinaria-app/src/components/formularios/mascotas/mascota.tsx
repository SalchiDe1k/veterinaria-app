'use client';

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Link from "next/link";

const schema = yup.object({
  nombre: yup.string().required("El nombre es obligatorio"),
  especie: yup.string().required("La especie es obligatoria"),
  raza: yup.string().required("La raza es obligatoria"),
  genero: yup.string().required("El género es obligatorio"),
  edad: yup
    .number()
    .typeError("La edad debe ser un número")
    .positive("La edad debe ser un número positivo")
    .integer("La edad debe ser un número entero")
    .required("La edad es obligatoria"),
  color: yup.string().required("El color es obligatorio"),
});

interface MascotasFormularioProps {
  routeCancel: string;
}

export const MascotasFormulario = ({ routeCancel }: MascotasFormularioProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log("Datos del formulario:", data);
    // Lógica para manejar el envío de datos al backend
  };

  const formFields: { label: string; name: keyof typeof schema.fields; type: string; placeholder: string }[] = [
    { label: "Nombre", name: "nombre", type: "text", placeholder: "Nombre" },
    { label: "Especie", name: "especie", type: "text", placeholder: "Especie" },
    { label: "Raza", name: "raza", type: "text", placeholder: "Raza" },
    { label: "Edad", name: "edad", type: "text", placeholder: "Edad" },
    { label: "Color", name: "color", type: "text", placeholder: "Color" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        {formFields.map((field) => (
          <div key={field.name}>
            <label className="form-control w-full max-w-xs">
              <span className="label-text">{field.label}</span>
              <input
                type={field.type}
                placeholder={field.placeholder}
                className={`input input-bordered w-full max-w-xs ${
                  errors[field.name] ? "input-error" : ""
                }`}
                {...register(field.name)}
              />
              {errors[field.name] && (
                <span className="text-error">
                  {errors[field.name]?.message as string}
                </span>
              )}
            </label>
          </div>
        ))}
        <div>
          <label className="form-control w-full max-w-xs">
            <span className="label-text">Género</span>
            <select
              className={`select select-bordered ${
                errors.genero ? "select-error" : ""
              }`}
              {...register("genero")}
              defaultValue=""
            >
              <option value="" disabled>
                Seleccione
              </option>
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
            {errors.genero && (
              <span className="text-error">{errors.genero.message}</span>
            )}
          </label>
        </div>
      </div>
      <div className="card-actions justify-end mt-4">
        <Link href={routeCancel} className="btn btn-neutral">
          Cancelar
        </Link>
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </div>
    </form>
  );
};
