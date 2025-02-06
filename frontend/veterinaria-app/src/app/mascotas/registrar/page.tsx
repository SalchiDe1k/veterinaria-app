'use client';
import { mascotaService, propietarioService } from "@/application/services";
import { useEffect, useState } from "react";
import AsyncSelect from 'react-select/async';
import { MascotasFormulario, PropietarioFormulario } from "@/components";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Propietario } from "@/domain/models/propietario/propietario";
import Swal from "sweetalert2";
import { PropietarioResponseDTO } from "@/application/dtos";
import { Response } from "@/domain/interfaces/api/Response";
import { MascotaModel } from "@/domain/models";
import { redirect } from "next/navigation";

interface options {
  label: string,
  value: string,
}

const filterPropietarios = async (inputValue: string) => {
  try {
    const datos = await propietarioService.search(inputValue);
    return datos.map((data) => data.toSelectOption());
  } catch (error) {
    console.error(error);
  }
};

const loadOptions = (inputValue: string) => {
  return new Promise<options[]>((resolve) => {
    resolve(filterPropietarios(inputValue));
  });
}


export default function RegisterPetFormIntermediate() {
  const [isAddingOwner, setIsAddingOwner] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState<string | null | string[]>(null);
  // const [loading, setLoading] = useState(false);
  const [selectError, setSelectError] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (data: MascotaModel) => {
    let isSuccessful = false;

    try {
      if (!selectedOption || selectedOption.value === "addNew") {
        setSelectError("Debe seleccionar un propietario");
        return;
      }

      setSelectError(null);
      setError(null);

      // Asignar el ID del propietario al objeto de datos
      const propietarioId = selectedOption.value;
      const payload = { ...data, propietarioId };

      await mascotaService.create(payload);

      // Mostrar mensaje de éxito
      await Swal.fire({
        title: "Mascota creada",
        icon: "success",
        text: "La mascota ha sido creada correctamente.",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });

      isSuccessful = true; // Marcar como exitoso
    } catch (error: unknown) {
      // Manejo del error con tipado y validación
      if (error && typeof error === "object" && "data" in error && "messages" in error) {
        const { messages } = error as { messages: string };
        setError(messages || "Hubo un error al crear el propietario.");
      } else {
        console.error("Error inesperado:", error);
        setError("Hubo un error al crear el propietario.");
      }
    } finally {
      // setLoading(false); // Asegurarse de desactivar el estado de carga
    }

    // Redirigir solo si todo fue exitoso
    if (isSuccessful) {
      redirect("/mascotas");
    }



  };

  const handleChange = (selected: options) => {
    setSelectedOption(selected);
    setIsAddingOwner(selected && selected.value === "addNew");
  };

  const handleSubmitPropietario = async (data: Propietario) => {
    setError(null);
    // setLoading(true);

    try {

      const response = await propietarioService.create(data);
      const propietarioDTO = new PropietarioResponseDTO(response.data);
      setIsAddingOwner(false);
      setSelectedOption(propietarioDTO.toSelectOption());
      // setLoading(false);
      Swal.fire({
        title: "Propietario creado",
        icon: "success",
        text: "El propietario ha sido creado correctamente.",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });

    } catch (error: unknown) {

      const response = error as Response<unknown>;

      if (response.data && response.messages) {
        setError(response.messages);
      } else {
        setError("Hubo un error al crear el propietario.");
      }
      // setLoading(false);
    }

  };

  const breadcrumbItems = [
    { label: "Inicio", link: "/home" },
    { label: "Mascotas", link: "/mascotas" },
    { label: "Registrar" },
  ];

  return (
    <div className="p-6 space-y-4 bg-gray-50">

      <Breadcrumbs items={breadcrumbItems} />

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800">
          Registrar Mascota
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Complete los campos requeridos para registrar un nuevo propietario.
        </p>
      </div>

      {Array.isArray(error) && error.map((error, index) => (
        <div key={index} className="text-center text-red-500">{error}</div>
      )
      )}
      {typeof error == 'string' && (
        <div className="text-center text-red-500">{error}</div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-lg space-y-2 ">

        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Buscar propietario</span>
            <span className="label-text-alt text-gray-500">
              Puedes buscar por nombre, correo, número de identificación o teléfono.
            </span>
          </label>
          {isClient ? (
            <AsyncSelect
              cacheOptions
              value={selectedOption}
              placeholder="Buscar propietario"
              className="h-10"
              onChange={handleChange}
              loadOptions={loadOptions}
              defaultOptions
            />
          ) : (
            <div className="h-10 skeleton-placeholder">
              <div className="h-10 skeleton rounded"></div>
            </div>
          )}
          {selectError && (
            <p className="mt-1 text-sm text-red-500" role="alert" aria-live="assertive">
              {selectError}
            </p>
          )}
        </div>

        {isAddingOwner && (
          <PropietarioFormulario
            buttonCancelShow={false}
            routeCancel=""
            onSubmitHandler={handleSubmitPropietario}
          />
        )}
      </div>


      <div className="bg-white p-6 rounded-lg shadow-lg space-y-2">
        <MascotasFormulario onSubmitHandler={handleSubmit} routeCancel={'/mascotas'} />
      </div>

    </div>
  );
}
