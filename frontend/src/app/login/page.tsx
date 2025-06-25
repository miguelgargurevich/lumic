// Página de Login (solo se carga cuando se accede a /login)
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { adminUsers } from "@/data/adminUsers";

const DEMO_USER = { email: "usuario@lumic.com", password: "usuario123" };

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
      // Notificar a otros componentes que el rol cambió
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("lumic_role_changed"));
      }
      router.replace("/admin");
      return;
    }
    // Usuario normal (demo)
    if (email === DEMO_USER.email && password === DEMO_USER.password) {
      localStorage.setItem("lumic_token", "demo-jwt-token");
      localStorage.setItem("lumic_role", "user");
      // Notificar a otros componentes que el rol cambió
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("lumic_role_changed"));
      }
      router.replace("/");
      return;
    }
    setError("Credenciales inválidas");
  };

  function fillAdmin(adminIdx: number = 0) {
    setEmail(adminUsers[adminIdx].email);
    setPassword(adminUsers[adminIdx].password);
    setError("");
  }
  function fillUser() {
    setEmail(DEMO_USER.email);
    setPassword(DEMO_USER.password);
    setError("");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 to-white">
      <div className="w-full max-w-md p-8 bg-white/90 rounded-2xl shadow-2xl border border-primary/20 relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <img src="/globe.svg" alt="Lumic" className="w-16 h-16 mb-2 drop-shadow" />
          <span className="text-primary font-extrabold text-2xl tracking-tight drop-shadow">Lumic</span>
        </div>
        <h1 className="text-2xl font-bold mb-6 text-center mt-10">Iniciar sesión</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="border-2 border-primary/30 rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary/40 outline-none"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoFocus
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="border-2 border-primary/30 rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary/40 outline-none"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-500 text-sm mb-2 text-center">{error}</div>}
          <button type="submit" className="px-4 py-2 rounded-xl bg-primary text-white font-bold shadow hover:bg-primary/90 transition-all">Entrar</button>
        </form>
        <div className="flex flex-col gap-2 mt-6">
          <span className="text-xs text-muted-foreground text-center mb-1">Prueba rápida:</span>
          <div className="flex gap-2 justify-center flex-wrap">
            <button onClick={() => fillAdmin(0)} className="px-3 py-1 rounded bg-primary/10 text-primary font-semibold text-xs hover:bg-primary/20 transition">Admin principal</button>
            <button onClick={() => fillAdmin(1)} className="px-3 py-1 rounded bg-primary/10 text-primary font-semibold text-xs hover:bg-primary/20 transition">Admin María</button>
            <button onClick={() => fillAdmin(2)} className="px-3 py-1 rounded bg-primary/10 text-primary font-semibold text-xs hover:bg-primary/20 transition">Admin Juan</button>
            <button onClick={fillUser} className="px-3 py-1 rounded bg-gray-200 text-gray-700 font-semibold text-xs hover:bg-gray-300 transition">Usuario demo</button>
          </div>
        </div>
        <div className="mt-6 bg-primary/5 rounded-xl p-3 text-xs text-gray-700">
          <b>Credenciales de prueba:</b>
          <ul className="mt-1 ml-4 list-disc">
            <li><b>Admin principal:</b> admin@lumic.com / admin123</li>
            <li><b>Admin María:</b> maria@lumic.com / maria2025</li>
            <li><b>Admin Juan:</b> juan@lumic.com / juansecure</li>
            <li><b>Usuario demo:</b> usuario@lumic.com / usuario123</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
