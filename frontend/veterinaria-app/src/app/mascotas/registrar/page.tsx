"use client";
import { propietarioService } from "@/application/services";
import { MascotaDetalles, PropietariosTable, SkeletonPropietarioTable } from "@/components";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Paginacion } from "@/domain/interfaces/api/response/paginacion/paginacion";
import { PropietarioResponse } from "@/domain/interfaces/api/response/propietario/propietario";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const breadcrumbItems = [
    { label: "Inicio", link: "/home" },
    { label: "Propietarios y Mascotas" },
  ];

  const [propietario, setPropietarios] = useState<
    Paginacion<PropietarioResponse>
  >({
    current_page: 0,
    data: [],
    first_page_url: "",
    from: 0,
    last_page: 0,
    last_page_url: "",
    links: [],
    next_page_url: null,
    path: "",
    per_page: 0,
    prev_page_url: null,
    to: 0,
    total: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async (url: string) => {
    if (!url) return;
    try {
      setLoading(true);
      const response = await propietarioService.getAll(url);
      setPropietarios(response);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await propietarioService.getAll();
        setPropietarios(response);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const changePage = async (url: string | null) => {
    await fetchItems(url!);
  };

  const handleMascotasLinkClick = (id: string) => {
    console.log("click");
    
    return redirect(`/propietarios-&-mascotas/mascotas-propietario/${id}`);
  };

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />
      <div className="flex justify-between items-center my-1">
        <h1 className="text-2xl font-bold">Propietarios</h1>
        <Link
          className="btn btn-primary"
          href="/propietarios-&-mascotas/registro-propietario"
        >
          + Registrar Dueño
        </Link>
      </div>

      <div className="bg-base-100 rounded-lg shadow-md">
        {loading && <SkeletonPropietarioTable />}
        {error && (
          <div className="text-center text-error">
            Error al cargar datos: {error}
          </div>
        )}
        {!loading && !error && propietario.data.length === 0 && (
          <div className="text-center text-gray-500">
            No hay propietarios registrados.
          </div>
        )}
        {!loading && !error && propietario.data.length > 0 && (
          <PropietariosTable
            rows={propietario.data}
            onMascotasLinkClick={handleMascotasLinkClick}
          />
        )}
      </div>

      <div className="flex justify-center items-center  mb-5 mt-4 space-x-2">
        <button
          className={`btn btn-outline ${
            !propietario.prev_page_url ? "btn-disabled" : ""
          }`}
          onClick={() => changePage(propietario.prev_page_url)}
          disabled={!propietario.prev_page_url}
        >
          « Anterior
        </button>
        {propietario.links.map((link, index) => (
          <button
            key={index}
            className={`btn btn-outline ${
              link.active ? "btn-primary btn-disabled" : ""
            }`}
            onClick={() => changePage(link.url)}
            disabled={link.active}
          >
            {link.label}
          </button>
        ))}
        <button
          className={`btn btn-outline ${
            !propietario.next_page_url ? "btn-disabled" : ""
          }`}
          onClick={() => changePage(propietario.next_page_url)}
          disabled={!propietario.next_page_url}
        >
          Siguiente »
        </button>
      </div>
      <MascotaDetalles></MascotaDetalles>
    </div>
  );
}
