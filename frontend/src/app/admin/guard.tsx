"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAdminGuard() {
  const router = useRouter();
  useEffect(() => {
    // Simulación: buscar token y rol en localStorage
    const token = localStorage.getItem("lumic_token");
    const role = localStorage.getItem("lumic_role");
    if (!token || role !== "admin") {
      router.replace("/login");
    }
  }, [router]);
}
