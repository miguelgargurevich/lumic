// Página de administración (solo accesible para admin autenticado)
"use client";
import React, { useEffect, useState } from "react";
import { useAdminGuard } from "./guard";
import LogoutButton from "@/components/ui/LogoutButton";
import dynamic from "next/dynamic";

const AdminAnalytics = dynamic(() => import("./analytics"), { ssr: false });

export default function AdminPage() {
  useAdminGuard();
  const [adminName, setAdminName] = useState<string>("");

  useEffect(() => {
    setAdminName(localStorage.getItem("lumic_admin_name") || "");
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 to-white p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-0 border border-primary/10 flex flex-col md:flex-row overflow-hidden">
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
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-primary/10 rounded-xl p-6 flex flex-col items-center shadow">
              <span className="text-3xl font-bold text-primary mb-2">3</span>
              <span className="font-semibold">Secciones clave</span>
              <span className="text-xs text-muted-foreground mt-1 text-center">
                Gestión de productos, pedidos y usuarios
              </span>
            </div>
            <div className="bg-green-100 rounded-xl p-6 flex flex-col items-center shadow">
              <span className="text-3xl font-bold text-green-600 mb-2">Analítica</span>
              <span className="font-semibold">Panel visual</span>
              <span className="text-xs text-muted-foreground mt-1 text-center">
                Gráficos y métricas de ventas y stock
              </span>
            </div>
            <div className="bg-yellow-100 rounded-xl p-6 flex flex-col items-center shadow">
              <span className="text-3xl font-bold text-yellow-600 mb-2">Admin</span>
              <span className="font-semibold">Herramientas</span>
              <span className="text-xs text-muted-foreground mt-1 text-center">
                Acceso exclusivo para administradores
              </span>
            </div>
          </div>
          <ul className="space-y-4 mt-8">
            <li className="border-b pb-4">
              <span className="font-semibold">Gestión de productos</span>
              <p className="text-muted-foreground text-sm">Agregar, editar o eliminar productos del catálogo.</p>
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
          <div className="mt-8">
            <LogoutButton />
          </div>
        </aside>
        {/* Panel derecho: analíticas y gráficos */}
        <section className="flex-1 p-8 md:p-12 bg-white min-h-[600px] flex flex-col justify-center">
          <AdminAnalytics />
        </section>
      </div>
    </main>
  );
}
