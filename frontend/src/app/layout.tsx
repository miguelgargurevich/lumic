import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/ui/Navbar";
import { Toaster } from "sonner";
import Footer from "@/components/ui/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lumic | Tienda de Iluminación Moderna y Accesorios",
  description:
    "Descubre en Lumic la mejor selección de lámparas, luces LED y accesorios de iluminación para tu hogar o negocio. Envíos a todo el país. Compra fácil y seguro.",
  keywords: [
    "iluminación",
    "lámparas",
    "luces LED",
    "accesorios de iluminación",
    "tienda online",
    "hogar",
    "decoración",
    "Lumic",
  ],
  openGraph: {
    title: "Lumic | Tienda de Iluminación Moderna y Accesorios",
    description:
      "Descubre en Lumic la mejor selección de lámparas, luces LED y accesorios de iluminación para tu hogar o negocio. Envíos a todo el país. Compra fácil y seguro.",
    url: "https://lumic.com/",
    siteName: "Lumic",
    images: [
      {
        url: "/public/globe.svg",
        width: 1200,
        height: 630,
        alt: "Lumic Iluminación",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumic | Tienda de Iluminación Moderna y Accesorios",
    description:
      "Descubre en Lumic la mejor selección de lámparas, luces LED y accesorios de iluminación para tu hogar o negocio.",
    site: "@lumic_iluminacion",
    images: ["/public/globe.svg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <Toaster position="top-right" richColors />
          <Navbar />
          {children}
          {/* Footer moderno con redes sociales */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
