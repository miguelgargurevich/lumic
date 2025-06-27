"use client";
import React from "react";

export default function TerminosPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12 text-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-primary">Términos y Condiciones & Política de Cookies</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mt-8 mb-2">1. Uso de Cookies</h2>
        <p className="mb-2">En Lumic utilizamos cookies y tecnologías similares para mejorar tu experiencia de navegación, analizar el tráfico del sitio y personalizar el contenido y los anuncios.</p>
        <ul className="list-disc pl-6 mb-2">
          <li><b>Cookies esenciales:</b> necesarias para el funcionamiento básico del sitio (por ejemplo, mantener tu carrito de compras).</li>
          <li><b>Cookies de análisis:</b> nos ayudan a entender cómo los usuarios interactúan con el sitio para mejorar nuestros servicios.</li>
          <li><b>Cookies de personalización:</b> permiten recordar tus preferencias y mostrarte contenido relevante.</li>
        </ul>
        <p className="mb-2">Puedes gestionar o eliminar las cookies desde la configuración de tu navegador. Al continuar navegando, aceptas el uso de cookies según nuestra política.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mt-8 mb-2">2. Términos y Condiciones de Uso</h2>
        <ul className="list-decimal pl-6 mb-2">
          <li>El uso de este sitio implica la aceptación de estos términos y condiciones.</li>
          <li>La información, precios y disponibilidad de productos pueden cambiar sin previo aviso.</li>
          <li>Las imágenes de productos son referenciales y pueden variar respecto al producto real.</li>
          <li>El usuario es responsable de la veracidad de los datos proporcionados en compras y registros.</li>
          <li>Nos reservamos el derecho de cancelar pedidos por errores de stock, precio o información incorrecta.</li>
          <li>El uso de los productos adquiridos es responsabilidad exclusiva del usuario.</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mt-8 mb-2">3. Privacidad y Protección de Datos</h2>
        <p className="mb-2 font-semibold text-primary">No almacenamos ni tratamos datos personales de los usuarios.</p>
        <p className="mb-2">La navegación y compra en este sitio no requiere el ingreso de datos personales sensibles. No recopilamos, almacenamos ni compartimos información personal identificable.</p>
        <p className="mb-2">Las cookies utilizadas son únicamente para fines técnicos y de experiencia de usuario, sin asociarse a datos personales.</p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mt-8 mb-2">4. Contacto</h2>
        <p>Si tienes dudas sobre nuestra política de cookies, privacidad o términos y condiciones, puedes contactarnos en <a href="mailto:info@lumic.com" className="underline text-primary">info@lumic.com</a>.</p>
      </section>
    </main>
  );
}
