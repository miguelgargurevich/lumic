"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const categories = [
	{
		name: "Aros LED",
		href: "/products/list?category=Aros%20LED",
		image:
			"https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
		description:
			"Aros LED profesionales para streaming, fotografía y maquillaje. Logra una iluminación uniforme y sin sombras en cada toma.",
	},
	{
		name: "Luminarias",
		href: "/products/list?category=Luminarias",
		image:
			"https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
		description:
			"Luminarias de diseño moderno y eficiente. Transforma tus ambientes con luz cálida, fría o regulable para cada espacio.",
	},
	{
		name: "Tiras LED",
		href: "/products/list?category=Tiras%20LED",
		image:
			"https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
		description:
			"Tiras LED flexibles, multicolor y blancas. Ideales para decoración, resaltar detalles y crear ambientes únicos en tu hogar o negocio.",
	},
	{
		name: "Accesorios",
		href: "/products/list?category=Accesorios",
		image:
			"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",
		description:
			"Soportes, trípodes, adaptadores y todo lo que necesitas para complementar tu experiencia de iluminación.",
	},
];

export default function CatalogWelcome() {
	return (
		<main className="min-h-screen bg-gradient-to-br from-primary/5 to-white flex flex-col justify-center items-center px-4 sm:px-0 py-8 sm:p-8">
			<h1 className="text-3xl sm:text-5xl font-extrabold text-primary mb-4 mt-4 sm:mb-8 sm:mt-8 text-center drop-shadow-lg">
				Bienvenido al Catálogo Lumic
			</h1>
			<p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl text-center px-4">
				Descubre la mejor selección de productos de iluminación para cada
				necesidad. Elige una categoría y explora opciones modernas, eficientes
				y con la mejor calidad. ¡Haz brillar tus espacios con Lumic!
			</p>
			<div className="w-full max-w-5xl flex flex-col gap-6">
				{categories.map((cat, idx) => (
					<motion.div
						key={cat.name}
						initial={{ opacity: 0, y: 40 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							delay: idx * 0.15,
							duration: 0.7,
							type: "spring",
						}}
						className="group relative overflow-hidden rounded-3xl shadow-2xl bg-white flex flex-col sm:flex-row items-center hover:scale-[1.02] transition-transform border border-primary/10 py-6 sm:py-0"
					>
						<div className="w-full sm:w-1/3 h-44 sm:h-60 relative">
							<Image
								src={cat.image}
								alt={cat.name}
								fill
								className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
								loading="lazy"
								sizes="(max-width: 768px) 100vw, 340px"
								priority={false}
								style={{ objectFit: "cover" }}
							/>
						</div>
						<div className="flex-1 p-6 sm:p-10 flex flex-col justify-center items-center sm:items-start text-center sm:text-left">
							<h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2 group-hover:underline underline-offset-4 transition">
								{cat.name}
							</h2>
							<p className="text-muted-foreground mb-4 text-base sm:text-lg">
								{cat.description}
							</p>
							<Link
								href={cat.href}
								scroll={true}
								prefetch={true}
								className="inline-block px-6 py-2 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/90 transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 animate-fade-in"
							>
								Ver productos
							</Link>
						</div>
					</motion.div>
				))}
			</div>
		</main>
	);
}
