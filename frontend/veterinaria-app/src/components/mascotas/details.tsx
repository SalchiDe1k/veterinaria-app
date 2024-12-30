"use client";
import { TableCitaMascosta, TableDiagnosticosMascosta } from "@/components";
import { useState } from "react";
export const DetallesMascotaPage = () => {
  const [activeTab, setActiveTab] = useState("diagnosticos");

  const diagnosticos = [
    {
      fecha: "2024-12-01",
      diagnostico: "Alergia",
      notas: "Prescrito antihistamínicos",
    },
    {
      fecha: "2024-11-15",
      diagnostico: "Infección de oído",
      notas: "Limpieza y tratamiento con antibióticos",
    },
  ];

  const citas = [
    {
      fecha: "2024-12-10",
      motivo: "Vacunación",
      veterinario: "Dr. Juan Pérez",
    },
    { fecha: "2024-11-20", motivo: "Revisión", veterinario: "Dra. Ana López" },
  ];

  return (
    <div className="p-6 space-y-6 bg-[#F8F8F8] min-h-screen">
      {/* Encabezado */}
      <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Fluffy</h1>
          <p className="text-sm text-gray-600">
            Golden Retriever - Propietario: Juan Pérez
          </p>
        </div>
        <button className="btn bg-[#4CAF50] text-white hover:bg-[#45A049] rounded-lg shadow">
          Añadir Nuevo Registro
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-300">
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "diagnosticos"
              ? "text-[#4CAF50] border-b-4 border-[#4CAF50]"
              : "text-gray-700 hover:text-[#4CAF50]"
          }`}
          onClick={() => setActiveTab("diagnosticos")}
        >
          Diagnósticos
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "citas"
              ? "text-[#4CAF50] border-b-4 border-[#4CAF50]"
              : "text-gray-700 hover:text-[#4CAF50]"
          }`}
          onClick={() => setActiveTab("citas")}
        >
          Citas
        </button>
      </div>

      {/* Contenido de las Pestañas */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {activeTab === "diagnosticos" && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Diagnósticos
            </h2>
            <TableDiagnosticosMascosta diagnosticos={diagnosticos}></TableDiagnosticosMascosta>
          </div>
        )}
        {activeTab === "citas" && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Citas</h2>
            <TableCitaMascosta citas={citas}></TableCitaMascosta>
          </div>
        )}
      </div>
    </div>
  );
};
