'use client';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';

const schema = yup.object({
    // Propietario
    fecha: yup
        .string()
        .required("La fecha de la cita es obligatoria"),
    motivo: yup
        .string()
        .required("El motivo de la cita es obligatorio"),
    primerNombre: yup.string().required('Primer nombre es obligatorio'),
    segundoNombre: yup.string().optional(),
    primerApellido: yup.string().required('Primer apellido es obligatorio'),
    segundoApellido: yup.string().optional(),
    telefono: yup
        .string()
        .matches(/^\d+$/, 'El teléfono solo debe contener números')
        .required('Teléfono es obligatorio'),
    numeroDocumento: yup
        .string()
        .matches(/^\d+$/, 'El número de documento solo debe contener números')
        .required('Número de documento es obligatorio'),
    correo: yup
        .string()
        .email('Ingrese un correo válido')
        .required('El correo es obligatorio'),

    // Mascota
    nombreMascota: yup.string().required("El nombre de la mascota es obligatorio"),
    especie: yup.string().required("Seleccione una especie"),
    raza: yup.string().optional(),
    sexo: yup.string().required("Seleccione un género"),
    edad: yup
        .number()
        .nullable()
        .transform((value: unknown, originalValue: unknown) =>
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
        .when("edad", (edad: string[]) => {
            if (edad[0]) {
                return yup.string().required("La unidad de edad es obligatoria si se ingresa una edad");
            }
            return yup.string().nullable();
        }),
    peso: yup
        .number()
        .nullable()
        .transform((value: unknown, originalValue: unknown) =>
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
        .when("peso", (peso: string[]) => {
            if (peso[0]) {
                console.log("peso", peso);
                return yup.string().required("La unidad de peso es obligatoria si se ingresa un peso");
            }
            return yup.string().nullable();
        }),
    color: yup.string().optional(),
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

const formFieldsCita = [
    {
        label: "Fecha y Hora",
        name: "fecha",
        type: "datetime-local",
        placeholder: "Seleccione la fecha y hora de la cita",
    },
    {
        label: "Motivo de la Cita",
        name: "motivo",
        type: "text",
        placeholder: "Ingrese el motivo de la cita",
    },
];

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

type FormData = yup.InferType<typeof schema>;

interface PropsFormularioCombinado {
    routeCancel: string;
    buttonCancelShow?: boolean;
    initialData?: Partial<FormData>;
    onSubmitHandler: (data: FormData) => void;
}

export const CitaGeneral = ({
    routeCancel,
    buttonCancelShow = true,
    initialData = {},
    onSubmitHandler,
}: PropsFormularioCombinado) => {
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
            className="space-y-8"
            aria-label="Formulario para registrar propietario y mascota"
        >
            <fieldset>
                <legend className="text-lg font-semibold text-gray-800 mb-4">Información de la cita</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Campos del Formulario */}
                    {formFieldsCita.map((field) => (
                        <div key={field.name} className="w-full">
                            <label
                                htmlFor={field.name}
                                className="block text-sm font-medium text-gray-700 mb-1"
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
            </fieldset>
            {/* Sección Propietario */}
            <fieldset>
                <legend className="text-lg font-semibold text-gray-800 mb-4">Información del Propietario</legend>
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
            </fieldset>

            {/* Sección Mascota */}
            <fieldset>
                <legend className="text-lg font-semibold text-gray-800 mb-4">Información de la Mascota</legend>
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

            </fieldset>



            {/* Botones */}
            <div className="flex justify-end space-x-4">
                {buttonCancelShow && (
                    <Link
                        href={routeCancel}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                    >
                        Cancelar
                    </Link>
                )}
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                    Guardar
                </button>
            </div>
        </form>
    );
};
