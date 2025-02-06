'use client';
import { propietarioService } from "@/application/services";
import { Loading, PropietarioFormulario, PropietarioFormularioSkeleton } from "@/components";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Propietario } from "@/domain/models/propietario/propietario";
import React, { useState, useEffect } from "react";
import { redirect, useParams } from "next/navigation";
import Swal from "sweetalert2";

export default function EditarPropietarioPage() {
    const { id } = useParams(); // Obtener ID desde la URL
    const breadcrumbItems = [
        { label: "Inicio", link: "/home" },
        { label: "Propietarios", link: "/propietarios" },
        { label: "Editar Propietario" },
    ];

    const [propietario, setPropietario] = useState<Propietario | null>(null);
    const [loading, setLoading] = useState(true);
    const [loadingFetch, setLoadingFetch] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            setLoading(true);
            propietarioService
                .getById(id as string)
                .then((response) => {
                    setPropietario(response.toObjectFormulario());
                    setLoading(false);
                })
                .catch(() => {
                    setError("No se pudo cargar la información del propietario.");
                    setLoading(false);
                });
        }
    }, [id]);

    const handlerSubmit = async (data: Propietario) => {
        try {
            setLoadingFetch(true);

            await propietarioService.update(id as string, data);
            setLoadingFetch(false);

            await Swal.fire({
                title: "Propietario actualizado",
                icon: "success",
                text: "El propietario ha sido actualizado correctamente.",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            });

        } catch (error) {
            setError("Hubo un error al actualizar el propietario.");
            setLoadingFetch(false);
        }
        
        redirect("/propietarios");

    };

    return (

        <div className="p-6 space-y-2 bg-gray-50">
            {loadingFetch &&
                (<Loading texto="Actualizando"></Loading>)}
            {/* Breadcrumbs */}
            <Breadcrumbs items={breadcrumbItems} />

            {/* Encabezado */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h1 className="text-3xl font-bold text-gray-800">Editar Propietario</h1>
                <p className="text-sm text-gray-500 mt-2">
                    Modifique los campos necesarios para actualizar la información del propietario.
                </p>
            </div>

            {/* Formulario */}
            <div className="bg-white p-8 rounded-lg shadow-lg">

                {loading ? (
                    <PropietarioFormularioSkeleton />
                ) : error ? (
                    <div className="text-center text-red-500">{error}</div>
                ) : (
                    <PropietarioFormulario
                        onSubmitHandler={handlerSubmit}
                        routeCancel="/propietarios"
                        initialData={propietario}
                    />
                )}
            </div>
        </div>
    );
}
