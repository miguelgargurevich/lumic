"use client";

export default function ProductsPage() {
  // Redirigir a la página de bienvenida del catálogo
  if (typeof window !== "undefined") {
    window.location.replace("/products/catalog-welcome");
    return null;
  }
  return null;
}