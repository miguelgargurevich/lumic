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
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-primary">Panel de Administración</h1>
            {adminName && (
              <span className="text-sm text-muted-foreground">
                Bienvenido, <b>{adminName}</b>
              </span>
            )}
          </div>
          <LogoutButton />
        </div>
        <ul className="space-y-4">
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
      </div>
      <div className="max-w-4xl mx-auto mt-8">
        <AdminAnalytics />
      </div>
    </main>
  );
}
