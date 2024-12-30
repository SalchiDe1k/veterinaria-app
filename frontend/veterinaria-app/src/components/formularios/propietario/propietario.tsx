'use client';

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";

interface PropsPropietarioFormulario {
  routeCancel: string;
  initialData?: Partial<FormData>; // Datos iniciales para modo edición
  onSubmitHandler: (data: FormData) => void; // Función para manejar el envío del formulario
}

const schema = yup.object({
  primerNombre: yup.string().required("Primer nombre es obligatorio"),
  segundoNombre: yup.string().optional(),
  primerApellido: yup.string().required("Primer apellido es obligatorio"),
  segundoApellido: yup.string().optional(),
  telefono: yup
    .string()
    .matches(/^\d+$/, "El teléfono solo debe contener números")
    .required("Teléfono es obligatorio"),
  numeroDocumento: yup
    .string()
    .matches(/^\d+$/, "El número de documento solo debe contener números")
    .required("Número de documento es obligatorio"),
  correo: yup
    .string()
    .email("Ingrese un correo válido")
    .required("El correo es obligatorio"),
});

type FormData = yup.InferType<typeof schema>;

export const PropietarioFormulario = ({
  routeCancel,
  initialData = {},
  onSubmitHandler,
}: PropsPropietarioFormulario) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData, // Valores iniciales del formulario
  });

  const formFields = [
    {
      label: "Primer Nombre",
      name: "primerNombre",
      placeholder: "Ingrese su primer nombre",
    },
    {
      label: "Segundo Nombre",
      name: "segundoNombre",
      placeholder: "Ingrese su segundo nombre",
    },
    {
      label: "Primer Apellido",
      name: "primerApellido",
      placeholder: "Ingrese su primer apellido",
    },
    {
      label: "Segundo Apellido",
      name: "segundoApellido",
      placeholder: "Ingrese su segundo apellido",
    },
    {
      label: "Teléfono",
      name: "telefono",
      placeholder: "Ingrese su número de teléfono",
    },
    {
      label: "Número Documento",
      name: "numeroDocumento",
      placeholder: "Ingrese su número de documento",
    },
    {
      label: "Correo Electrónico",
      name: "correo",
      placeholder: "Ingrese su correo electrónico",
    },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="space-y-6"
      aria-label="Formulario para registrar o editar propietario"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formFields.map((field) => (
          <div key={field.name} className="w-full">
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {field.label}
            </label>
            <input
              type="text"
              id={field.name}
              placeholder={field.placeholder}
              {...register(field.name as keyof FormData)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors[field.name as keyof FormData]
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-green-500"
              }`}
              aria-invalid={!!errors[field.name as keyof FormData]}
            />
            {errors[field.name as keyof FormData] && (
              <p
                className="mt-1 text-sm text-red-500"
                role="alert"
                aria-live="assertive"
              >
                {errors[field.name as keyof FormData]?.message}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-end space-x-4 mt-6">
        <Link
          href={routeCancel}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
        >
          Cancelar
        </Link>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};
