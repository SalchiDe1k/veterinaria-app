"use client";
import { propietarioService } from "@/application/services";
import { PropietarioFormulario } from "@/components";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Propietario } from "@/domain/models/propietario/propietario";

export default function Home() {
  const breadcrumbItems = [
    { label: "Inicio", link: "/home" },
    { label: "Propietarios", link: "/propietarios" },
    { label: "Registrar Propietario" },
  ];

  const handlerSubmit = async (data: Propietario) => {
    const response =  await propietarioService.create(data);
    if (response) {
      alert('creado')
    }
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 ">
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
        <PropietarioFormulario
          onSubmitHandler={handlerSubmit}
          routeCancel="/propietarios"
        />
      </div>
    </div>
  );
}
