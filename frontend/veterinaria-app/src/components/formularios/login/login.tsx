"use client";
import { propsLogin } from "@/domain/interfaces/components/Formularios/Login/propsLogin";
import { FormEvent, useState } from "react";

export const Login = ({ onSubmit }: propsLogin) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form className="card-body" onSubmit={handleSubmit}>
      {/* Campo de Email */}
      <div className="form-control">
        <label className="label" htmlFor="email">
          <span className="label-text">Email</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="email"
          className="input input-bordered"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Campo de Contraseña */}
      <div className="form-control">
        <label className="label" htmlFor="password">
          <span className="label-text">Password</span>
        </label>
        <input
          id="password"
          type="password"
          placeholder="password"
          className="input input-bordered"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="label justify-between">
          {/* <Link href="/home">
            <a className="btn btn-neutral">Formulario</a>
          </Link>
          <Link href="/forgot-password">
            <a className="label-text-alt link link-hover">Forgot password?</a>
          </Link> */}
        </div>
      </div>

      {/* Botón de Login */}
      <div className="form-control mt-6">
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </div>
    </form>
  );
};
