import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";

type homeNavbarProps = {
  children: ReactNode;
};

export const AsideDashboard = () => {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    // Asegurarse de que el código se ejecute solo en el cliente
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  const workspaces = [
    {
      path: "/home",
      title: "Home",
    },
    {
      path: "/propietarios",
      title: "Propietarios",
    },
    {
      path: "/mascotas/",
      title: "Mascotas",
    },
    {
      path: "/citas",
      title: "Agendamiento Citas",
    },
    {
      path: "/usuarios",
      title: "Registro Usuarios",
    },
  ];
  return (
      <aside className="w-64 bg-base-200">
        <div className="p-4 text-xl font-bold">Veterinaria</div>
        <ul className="menu p-4">
          {workspaces.map((path, index) => {
            const currentSection = currentPath.split("/")[1];
            const linkSection = path.path.split("/")[1];
  
            const isActive = currentSection === linkSection;
            return (
              <li className="py-0.5" key={index}>
                <Link
                  className={isActive ? "active" : ""}
                  href={path.path}
                >
                  {path.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
  );
};
