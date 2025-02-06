'use client';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";

const schema = yup.object().shape({
  nombreMascota: yup.string().required("El nombre de la mascota es obligatorio"),
  especie: yup.string().required("Seleccione una especie"),
  raza: yup.string().optional(),
  sexo: yup.string().required("Seleccione un género"),
  edad: yup
    .number()
    .nullable()
    .transform((value, originalValue) =>
      originalValue === "" ? null : value
    )
    .typeError("La edad debe ser un número válido")
    .min(0, "La edad debe ser un número positivo")
    .optional().test("edad", "La edad es obligatoria si se ingresa una unidad de edad", function (value) {
      if (this.parent.unidadEdad) {
        return value !== null;
      }
      return true;
    }),
  unidadEdad: yup
    .string()
    .oneOf(["meses", "años"], "Seleccione una unidad de edad válida")
    .optional()
    .when("edad", (edad) => {
      if (edad[0]) {
        return yup.string().required("La unidad de edad es obligatoria si se ingresa una edad");
      }
      return yup.string().nullable();
    }),
  peso: yup
    .number()
    .nullable()
    .transform((value, originalValue) =>
      originalValue === "" ? null : value
    )
    .typeError("El peso debe ser un número válido")
    .min(0.1, "El peso debe ser mayor a 0")
    .optional().test("peso", "El peso es obligatorio si se ingresa una unidad de peso", function (value) {
      if (this.parent.unidadPeso) {
        return value !== null;
      }
      return true;
    }),
  unidadPeso: yup
    .string().nullable()
    .oneOf(["kilogramos", "gramos"], "Seleccione una unidad de peso válida")
    .optional()
    .when("peso", (peso) => {
      if (peso[0]) {
        console.log("peso", peso);
        return yup.string().required("La unidad de peso es obligatoria si se ingresa un peso");
      }
      return yup.string().nullable();
    }),
  color: yup.string().optional(),
});

type FormData = yup.InferType<typeof schema>;

interface PropsFormularioMascota {
  routeCancel: string;
  buttonCancelShow?: boolean;
  initialData?: Partial<FormData>;
  onSubmitHandler?: (data: FormData) => void;
}

const InputField = ({
  label,
  name,
  placeholder,
  register,
  error,
}: {
  label: string;
  name: keyof FormData;
  placeholder: string;
  register: ReturnType<typeof useForm>["register"];
  error?: string;
}) => (
  <div className="space-y-1">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type="text"
      id={name}
      placeholder={placeholder}
      {...register(name)}
      className={`w-full input input-bordered focus:outline-none focus:ring-2 ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"
        }`}
      aria-invalid={!!error}
    />
    {error && (
      <p className="text-sm text-red-500" role="alert" aria-live="assertive">
        {error}
      </p>
    )}
  </div>
);

const SelectField = ({
  label,
  name,
  options,
  register,
  error,
}: {
  label: string;
  name: keyof FormData;
  options: { value: string; label: string }[];
  register: ReturnType<typeof useForm>["register"];
  error?: string;
}) => (
  <div className="space-y-1">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <select
      id={name}
      {...register(name)}
      className={`select select-bordered w-full focus:outline-none focus:ring-2 ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"
        }`}
      aria-invalid={!!error}
    >
      <option value="">Seleccione una opción</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && (
      <p className="text-sm text-red-500" role="alert" aria-live="assertive">
        {error}
      </p>
    )}
  </div>
);

export const FormularioMascota = ({
  routeCancel,
  buttonCancelShow = true,
  initialData = {},
  onSubmitHandler,
}: PropsFormularioMascota) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: initialData,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="space-y-4"
      aria-label="Formulario para registrar mascota"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <InputField
          label="Nombre"
          name="nombreMascota"
          placeholder="Ingrese el nombre de la mascota"
          register={register}
          error={errors.nombreMascota?.message}
        />
        <InputField
          label="Raza"
          name="raza"
          placeholder="Ingrese la raza"
          register={register}
          error={errors.raza?.message}
        />
        <SelectField
          label="Especie"
          name="especie"
          options={[
            { value: "Perro", label: "Perro" },
            { value: "Gato", label: "Gato" },
            { value: "Ave", label: "Ave" },
          ]}
          register={register}
          error={errors.especie?.message}
        />
        <SelectField
          label="Género"
          name="sexo"
          options={[
            { value: "Macho", label: "Macho" },
            { value: "Hembra", label: "Hembra" },
          ]}
          register={register}
          error={errors.sexo?.message}
        />
        <InputField
          label="Edad"
          name="edad"
          placeholder="Ingrese la edad"
          register={register}
          error={errors.edad?.message}
        />
        <SelectField
          label="Unidad de Edad"
          name="unidadEdad"
          options={[
            { value: "meses", label: "Meses" },
            { value: "años", label: "Años" },
          ]}
          register={register}
          error={errors.unidadEdad?.message}
        />
        <InputField
          label="Peso"
          name="peso"
          placeholder="Ingrese el peso"
          register={register}
          error={errors.peso?.message}
        />
        <SelectField
          label="Unidad de Peso"
          name="unidadPeso"
          options={[
            { value: "kilogramos", label: "Kilogramos" },
            { value: "gramos", label: "Gramos" },
          ]}
          register={register}
          error={errors.unidadPeso?.message}
        />
        <InputField
          label="Color"
          name="color"
          placeholder="Ingrese el color"
          register={register}
          error={errors.color?.message}
        />
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