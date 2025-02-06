'use client';

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import { mascotaService, propietarioService } from "@/application/services";
import Swal from "sweetalert2";

interface PropsCitasFormulario {
  routeCancel: string;
  buttonCancelShow?: boolean; // Mostrar o no el botón de cancelar
  mascotas: { id: string; nombre: string }[]; // Lista de mascotas asociadas
  initialData?: Partial<FormData>; // Datos iniciales para edición
  onSubmitHandler: (data: FormData) => void; // Función para manejar el envío del formulario
}

const schema = yup.object({
  mascotaId: yup
    .string()
    .required("Debe seleccionar una mascota"),
  fecha: yup
    .string()
    .required("La fecha de la cita es obligatoria"),
  motivo: yup
    .string()
    .required("El motivo de la cita es obligatorio")
    .min(5, "El motivo debe tener al menos 5 caracteres")
    .max(100, "El motivo no puede exceder los 100 caracteres"),
  propietario: yup
    .object({
      value: yup.string().required("Debe seleccionar un dueño"),
      label: yup.string().required(),
    })
    .nullable()
    .required("Debe seleccionar un dueño")
    .test(
      "propietario-completo",
      "El propietario seleccionado no es válido",
      (value) => {
        // Validar que `value` y `label` existan y no estén vacíos
        return !!(value?.value && value?.label);
      }
    ),
});

type FormData = yup.InferType<typeof schema>;
interface Options {
  label: string;
  value: string;
}

const filterPropietarios = async (inputValue: string): Promise<Options[]> => {
  try {
    const datos = await propietarioService.search(inputValue);
    return datos.map((data) => data.toSelectOption());
  } catch (error) {
    console.error("Error al buscar propietarios:", error);
    return [];
  }
};

const loadOptions = (inputValue: string): Promise<Options[]> => {
  return new Promise((resolve) => {
    resolve(filterPropietarios(inputValue));
  });
};

export const CitasFormulario = ({
  routeCancel,
  buttonCancelShow = true,
  initialData = {},
  onSubmitHandler,
}: PropsCitasFormulario) => {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData, // Valores iniciales del formulario
  });

  const formFields = [
    // {
    //   label: "Fecha y Hora",
    //   name: "fecha",
    //   type: "datetime-local",
    //   placeholder: "Seleccione la fecha y hora de la cita",
    // },
    {
      label: "Motivo de la Cita",
      name: "motivo",
      type: "text",
      placeholder: "Ingrese el motivo de la cita",
    },
  ];

  // const [isClient, setIsClient] = useState(false);
  // const [selectedOption, setSelectedOption] = useState<Options | null>(null);
  const [mascotasOption, setMascotasOption] = useState([]);

  const handleChange = (selected: Options) => {
    // setSelectedOption(selected);
    Swal.fire({
      title: "Buscando datos...",
      html: "Por favor, espera mientras buscamos la información.",
      allowOutsideClick: false, // Deshabilitar cierre al hacer clic fuera del modal
      showConfirmButton: false, // Sin botón de confirmación mientras carga
      didOpen: async () => {
        Swal.showLoading(); // Mostrar el spinner de carga
        setMascotasOption([]);

        try {
          // Llamada a la API (reemplaza la URL con tu servicio)
          const response = await mascotaService.getByPropietarioId(selected.value);

          // Cerrar el modal de carga
          Swal.close();

          // Mostrar resultados (ajusta según lo que haga tu aplicación con los datos)
          Swal.fire({
            title: "Datos encontrados",
            text: `Se encontraron las mascotas.`,
            icon: "success",
            confirmButtonText: "OK",
          });

          setMascotasOption(response);

        } catch (error) {
          // Cerrar el modal de carga antes de mostrar el error
          Swal.close();

          // Manejo de errores
          Swal.fire({
            title: "Error",
            text: error.message || "No se pudieron obtener los datos.",
            icon: "error",
            confirmButtonText: "Intentar de nuevo",
          });
        }
      },
    });


  };

  useEffect(() => {
    // setIsClient(true);
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="space-y-6"
      aria-label="Formulario para registrar o editar una cita"
    >
      <div className="grid grid-cols-1 md:grid-cols-1 gap-2 mt-1">
        <div>
          <label
            htmlFor={"fechaInicio"}
            className="block text-sm font-medium text-gray-700 mt-1"
          >
            Fecha y Hora
          </label>
          <input
            type={'datetime-local'}
            id={'fecha'}
            disabled
            placeholder={''}
            {...register('fecha' as keyof FormData)}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors['fecha' as keyof FormData]
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-green-500"
              }`}
            aria-invalid={!!errors['fecha' as keyof FormData]}
          />
        </div>
        {/* Selector de Dueño */}
        <div>

          <label
            htmlFor="propietario"
            className="block text-sm font-medium text-gray-700 mt-1"
          >
            Dueño
          </label>
          <Controller
            name="propietario"
            control={control}
            render={({ field }) => (
              <AsyncSelect
                {...field}
                cacheOptions
                placeholder="Buscar propietario"
                className={`h-10 ${errors.propietario ? "border-red-500" : ""}`}
                onChange={(selected) => {
                  setValue('mascotaId', '')
                  if (selected && selected.value && selected.label) {
                    setValue("propietario", selected); // Registrar el valor
                    handleChange(selected as Options); // Llamar la lógica de selección
                  }
                }}
                loadOptions={loadOptions}
                defaultOptions
                aria-labelledby="propietario"
              />
            )}
          />
          {errors.propietario && (
            <p
              className="mt-1 text-sm text-red-500"
              role="alert"
              aria-live="assertive"
            >
              {errors.propietario.message}
            </p>
          )}
        </div>

        {/* Selección de Mascota */}
        <div>
          <label
            htmlFor="mascotaId"
            className="block text-sm font-medium text-gray-700 mt-1"
          >
            Seleccione una Mascota
          </label>
          <select
            id="mascotaId"
            {...register("mascotaId")}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.mascotaId
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-green-500"
              }`}
            aria-invalid={!!errors.mascotaId}
          >
            <option value="">Seleccione una mascota</option>
            {mascotasOption.map((mascota) => (
              <option key={mascota.id} value={mascota.id}>
                {mascota.nombre}
              </option>
            ))}
          </select>
          {errors.mascotaId && (
            <p
              className="mt-1 text-sm text-red-500"
              role="alert"
              aria-live="assertive"
            >
              {errors.mascotaId.message}
            </p>
          )}
        </div>

        {/* Campos del Formulario */}
        {formFields.map((field) => (
          <div key={field.name} className="w-full">
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700 mt-1"
            >
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.name}
              placeholder={field.placeholder}
              {...register(field.name as keyof FormData)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors[field.name as keyof FormData]
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
        {buttonCancelShow && (
          <Link
            href={routeCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Cancelar
          </Link>
        )}
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
