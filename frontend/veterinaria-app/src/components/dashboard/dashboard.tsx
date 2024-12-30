"use client";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";

type homeNavbarProps = {
  children: ReactNode;
};

export const Dashboard = ({ children }: homeNavbarProps) => {
  const [currentPath, setCurrentPath] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  const workspaces = [
    { path: "/home", title: "Inicio" },
    { path: "/propietarios", title: "Propietarios" },
    { path: "/mascotas/", title: "Mascotas" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8F8F8] overflow-auto">
      {/* Botón del menú */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-[#4CAF50] text-white rounded-full shadow hover:bg-[#45A049] transition"
        >
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-20 w-64 bg-[#EFEFEF] transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:translate-x-0 lg:static shadow-md`}
      >
        <div className="p-6 text-lg font-semibold flex items-center text-gray-700">
          <span className="mr-2">🐾</span> Veterinaria
        </div>

        <ul className="menu p-4 text-gray-700">
          {workspaces.map((path, index) => {
            const currentSection = currentPath.split("/")[1];
            const linkSection = path.path.split("/")[1];
            const isActive = currentSection === linkSection;

            return (
              <li key={index} className="py-1">
                <Link
                  href={path.path}
                  className={`block px-4 py-2 rounded-md ${
                    isActive
                      ? "bg-[#E0F4E0] text-gray-900 border-l-4 border-[#4CAF50] font-semibold"
                      : "bg-white text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                  }`}
                >
                  {path.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Contenido principal */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <header className="bg-white p-2 shadow-md flex justify-end items-center">
          {/* <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700">
          </h1> */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-compact sm:menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-40 sm:w-52 p-2 shadow-md"
            >
              <li>
                <a className="justify-between text-gray-700 hover:text-[#4CAF50]">
                  Perfil <span className="badge">Nuevo</span>
                </a>
              </li>
              <li>
                <a className="hover:text-[#4CAF50]">Configuración</a>
              </li>
              <li>
                <a className="hover:text-[#4CAF50]">Cerrar Sesión</a>
              </li>
            </ul>
          </div>
        </header>

        <main className="p-6 ">{children}</main>
      </div>
    </div>
  );
};
