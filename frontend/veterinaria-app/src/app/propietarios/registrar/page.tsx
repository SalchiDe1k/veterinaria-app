"use client";
import { propietarioService } from "@/application/services";
import { Loading, PropietarioFormulario } from "@/components";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Propietario } from "@/domain/models/propietario/propietario";
import { redirect } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Home() {
  const breadcrumbItems = [
    { label: "Inicio", link: "/home" },
    { label: "Propietarios", link: "/propietarios" },
    { label: "Registrar" },
  ];

  const handlerSubmit = async (data: Propietario) => {
    try {
      setLoadingFetch(true);
      await propietarioService.create(data);
      setLoadingFetch(false);

      await Swal.fire({
        title: "Propietario creado",
        icon: "success",
        text: "El propietario ha sido creado correctamente.",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });


    } catch (error) {
      setError("Hubo un error al crear el propietario.");
      setLoadingFetch(false);
    }

    redirect("/propietarios");

  };
  const [loadingFetch, setLoadingFetch] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="p-6 space-y-2 bg-gray-50 ">
      {loadingFetch &&
        (<Loading texto="Actualizando"></Loading>)
      }
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Encabezado */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800">
          Registrar Propietario
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Complete los campos requeridos para registrar un nuevo propietario.
        </p>
      </div>

      {/* Formulario */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        {error && (
          <div className="text-center text-red-500">{error}</div>
        )}
        <PropietarioFormulario
          onSubmitHandler={handlerSubmit}
          routeCancel="/propietarios"
        />
      </div>
    </div>
  );
}
