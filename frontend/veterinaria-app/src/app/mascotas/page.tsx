"use client";
import {  SkeletonPropietarioTable } from "@/components";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { MascotasTable } from "@/components/tables/mascotas/mascotatable";
import { mascotaRepository } from "@/infrastructure/repositories";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const breadcrumbItems = [
    { label: "Inicio", link: "/home" },
    { label: "Mascotas" },
  ];

  const [propietario, setPropietarios] = useState({
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

  const [filteredPropietarios, setFilteredPropietarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async (url: string) => {
    if (!url) return;
    try {
      setLoading(true);
      const response = await mascotaRepository.getMascotas(url);
      response.links = response.links.slice(1, -1);
      setPropietarios(response);
      setFilteredPropietarios(response.data);
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await mascotaRepository.getMascotas();
        response.links = response.links.slice(1, -1);
        console.log(response);
        
        setPropietarios(response);
        setFilteredPropietarios(response.data);
      } catch (err: unknown) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const changePage = async (url: string | null) => {
    await fetchItems(url!);
  };


  return (
    <div className="p-6 space-y-6">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Mascotas</h1>
        <Link
          className="btn btn-sm bg-green-600 text-white hover:bg-green-700"
          href="/mascotas/registrar"
        >
          + Agregar
        </Link>
      </div>

    
      <div className="bg-white rounded-lg shadow-md">
        {loading && <SkeletonPropietarioTable />}
        {error && (
          <div className="text-center text-red-500 py-4">
            Error al cargar datos: {error}
          </div>
        )}
        {!loading && !error && filteredPropietarios.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            No hay propietarios que coincidan con la búsqueda.
          </div>
        )}
        {!loading && !error && filteredPropietarios.length > 0 && (
          <MascotasTable
            rows={filteredPropietarios}
            // onMascotasLinkClick={handleMascotasLinkClick}
          />
        )}
      </div>

      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          className={`btn btn-sm btn-outline ${
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
            className={`btn btn-sm btn-outline ${
              link.active ? "btn-primary btn-disabled" : ""
            }`}
            onClick={() => changePage(link.url)}
            disabled={link.active}
          >
            {link.label}
          </button>
        ))}
        <button
          className={`btn btn-sm btn-outline ${
            !propietario.next_page_url ? "btn-disabled" : ""
          }`}
          onClick={() => changePage(propietario.next_page_url)}
          disabled={!propietario.next_page_url}
        >
          Siguiente »
        </button>
      </div>
    </div>
  );
}
