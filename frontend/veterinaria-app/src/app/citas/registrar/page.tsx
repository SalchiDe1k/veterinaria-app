"use client";

import { CitaCreateDTO } from "@/application/dtos/cita/request/citaCreateDTO";
import { citaService } from "@/application/services/cita/cita";
import { CitaGeneral, CitasFormulario } from "@/components";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Home() {
    const [isClient, setIsClient] = useState(false);
    const [isRegisteredUser, setIsRegisteredUser] = useState(true); // Estado para alternar entre usuario registrado y no registrado
    const [propietario, setPropietario] = useState<{ fecha?: string } | null>(null);

    useEffect(() => {
        const startDate = sessionStorage.getItem("start-date");
        console.log("Fecha obtenida:", startDate);

        if (startDate) {
            const formattedDate = new Date(sessionStorage.getItem("start-date") || "").toISOString().slice(0, 16);
            setPropietario({ fecha: formattedDate });
        } else {
            setPropietario({}); // Inicializa aunque no haya fecha para evitar `null`
        }
        setIsClient(true);
    }, []);

    if (!isClient || propietario === null) {
        // Asegúrate de no renderizar hasta que el estado esté cargado
        return <div>Cargando...</div>;
    }

    async function handleSubmitCita(data: { propietario: { value: string } }) {
        const citaCreateDTO = new CitaCreateDTO(data as unknown as { mascotaId: string, fecha: string, finCita: string, motivo: string, propietarioId: string });
        citaCreateDTO.finCita = sessionStorage.getItem('end-date');
        citaCreateDTO.inicioCita = sessionStorage.getItem('start-date');
        citaCreateDTO.propietarioID = data.propietario.value;

        await citaService.create(citaCreateDTO)
        await Swal.fire({
            title: "Cita Asignada",
            icon: "success",
            text: "La cita ha sido asignada correctamente.",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
        });

        sessionStorage.removeItem('end-date')
        sessionStorage.removeItem('start-date')
        redirect("/citas");

    }

    return (
        <div className="p-6">
            <div className="space-y-2=">
                <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
                    Tipo de Dueño
                </label>
                <select
                    id="userType"
                    value={isRegisteredUser ? "registered" : "unregistered"}
                    onChange={(e) => setIsRegisteredUser(e.target.value === "registered")}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    <option value="registered">Dueño Registrado</option>
                    <option value="unregistered">Dueño No Registrado</option>
                </select>
            </div>
            {isRegisteredUser ? (
                <CitasFormulario
                    routeCancel={"/citas"}
                    mascotas={[]}
                    initialData={propietario}
                    onSubmitHandler={handleSubmitCita}
                />
            ) : (
                <CitaGeneral
                    routeCancel={"/citas"}
                    initialData={propietario}
                    onSubmitHandler={function (data: { primerNombre?: string; segundoNombre?: string; primerApellido?: string; segundoApellido?: string; telefono?: string; numeroDocumento?: string; correo?: string; nombreMascota?: string; especie?: string; raza?: string; sexo?: string; edad?: number; unidadEdad?: "meses" | "años"; peso?: number; unidadPeso?: "kilogramos" | "gramos"; color?: string }): void {
                        console.log("Formulario General Data: ", data);
                    }}
                />
            )}
        </div>
    );
}
