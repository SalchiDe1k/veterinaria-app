"use client";

import { Login } from "@/components/formularios/login";
import { LoginModel } from "@/domain/models/login/login";
import { baseUrlBackend, httpBackendApi } from "@/infrastructure/helpers/connections/config";
import { useRouter } from "next/navigation"; // ✅ Usar useRouter()

export default function Home() {
  const router = useRouter(); // ✅ Instancia de router

  const handleLoginSubmit = async (data: LoginModel) => {
    const response = await httpBackendApi.post<{token : string}>(baseUrlBackend + "/auth", data); // ✅ Enviar datos al servidor
    localStorage.setItem("token", response.token); // ✅ Guardar token en localStorage
    httpBackendApi.setToken(response.token); // ✅ Establecer token en el cliente HTTP
    router.push("/home"); // ✅ Redirigir correctamente
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Inicia Sesión!</h1>
            <p className="py-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reiciendis, doloribus ex harum dolor veritatis corporis obcaecati
              voluptas sint voluptatem architecto illum unde quasi, nam ipsa
              assumenda, pariatur neque explicabo dignissimos.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <Login onSubmit={handleLoginSubmit}></Login>
          </div>
        </div>
      </div>
    </div>
  );
}
