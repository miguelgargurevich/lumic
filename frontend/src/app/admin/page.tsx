// Página de administración (solo accesible para admin autenticado)
"use client";
import React, { useEffect, useState } from "react";
import { useAdminGuard } from "./guard";
import dynamic from "next/dynamic";

const AdminAnalytics = dynamic(() => import("./analytics"), { ssr: false });

export default function AdminPage() {
  useAdminGuard();
  const [adminName, setAdminName] = useState<string>("");

  useEffect(() => {
    setAdminName(localStorage.getItem("lumic_admin_name") || "");
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 to-white flex flex-col justify-center items-center px-4 sm:px-0 py-8 sm:p-8">
      <div className="w-full max-w-5xl flex flex-col gap-6">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-0 border border-primary/10 flex flex-col md:flex-row overflow-hidden w-full">
          {/* Panel lateral izquierdo: administración y opciones */}
          <aside className="w-full md:w-80 bg-primary/5 border-r border-primary/10 p-8 flex flex-col gap-8">
            <div>
              <h1 className="text-3xl font-extrabold text-primary mb-2 flex items-center gap-2">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                </svg>
                Panel de Administración
              </h1>
              {adminName && (
                <span className="text-base text-muted-foreground">
                  Bienvenido, <b>{adminName}</b>
                </span>
              )}
            </div>
            <ul className="space-y-4 mt-8">
              <li className="border-b pb-4">
                <a
                  href="/products/list"
                  className="group block font-semibold text-primary hover:text-primary-foreground hover:bg-primary/20 transition-colors duration-300 relative rounded-xl px-2 py-1"
                >
                  <span className="inline-block transition-transform group-hover:translate-x-1 group-hover:scale-105">
                    Gestión de productos
                  </span>
                  <span className="block text-muted-foreground text-sm group-hover:text-primary/90 group-hover:underline transition-all">
                    Agregar, editar o eliminar productos del catálogo.
                  </span>
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-primary">
                    &rarr;
                  </span>
                </a>
              </li>
              <li className="border-b pb-4">
                <span className="font-semibold">Pedidos</span>
                <p className="text-muted-foreground text-sm">Ver y gestionar pedidos de clientes.</p>
              </li>
              <li>
                <span className="font-semibold">Usuarios</span>
                <p className="text-muted-foreground text-sm">Administrar cuentas y permisos de usuarios.</p>
              </li>
            </ul>
          </aside>
          {/* Panel derecho: analíticas y gráficos */}
          <section className="flex-1 w-full min-w-0 p-0 md:p-12 bg-white min-h-[600px] flex flex-col justify-center overflow-x-visible max-w-6xl mx-auto">
            <AdminAnalytics />
          </section>
        </div>
      </div>
    </main>
  );
}
