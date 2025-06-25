// Página de Login (solo se carga cuando se accede a /login)
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { adminUsers } from "@/data/adminUsers";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validar contra la data de admins
    const admin = adminUsers.find(u => u.email === email && u.password === password);
    if (admin) {
      localStorage.setItem("lumic_token", "demo-jwt-token");
      localStorage.setItem("lumic_role", "admin");
      localStorage.setItem("lumic_admin_name", admin.name);
      router.replace("/admin");
      return;
    }
    // Usuario normal (demo)
    if (email && password) {
      localStorage.setItem("lumic_token", "demo-jwt-token");
      localStorage.setItem("lumic_role", "user");
      router.replace("/");
      return;
    }
    setError("Credenciales inválidas");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            className="input input-bordered w-full mb-4"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="input input-bordered w-full mb-6"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <button type="submit" className="btn btn-primary w-full">Entrar</button>
        </form>
      </div>
    </main>
  );
}
