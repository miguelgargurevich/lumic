'use client';

import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/data/products';
import { ShieldCheck, Truck, LifeBuoy, ArrowRight } from 'lucide-react';

// Nueva data de prueba para categorías (más moderna y realista)
const categories = [
	{
		name: 'Aros LED',
		href: '/products?category=Aro+LED',
		imageSrc:
			'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
		imageHint: 'aro led moderno',
		description: 'Iluminación profesional para fotos y videos.',
	},
	{
		name: 'Luminarias',
		href: '/products?category=Luminaria',
		imageSrc:
			'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
		imageHint: 'luminaria de diseño',
		description: 'Diseños modernos para cada ambiente.',
	},
	{
		name: 'Accesorios',
		href: '/products?category=Accesorio',
		imageSrc:
			'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
		imageHint: 'accesorios de iluminación',
		description: 'Soportes, trípodes y más complementos.',
	},
];

export default function Hero() {
	const featuredProducts = products.slice(0, 4);

	return (
		<>
			<div className="flex flex-col relative">
				{/* Hero Section - Visual impact, gradient, glassmorphism, CTA */}
				<section className="relative h-[60vh] sm:h-[80vh] w-full flex items-center justify-center text-center text-white overflow-hidden border-b-8 border-primary/70 shadow-xl mb-0 focus-within:ring-4 focus-within:ring-primary/40">
					<Image
						src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
						alt="Ambiente iluminado moderno con productos Lumic"
						fill
						className="object-cover -z-10 scale-105 blur-[2px] brightness-75"
						priority
						aria-hidden="true"
					/>
					<div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/30 to-transparent z-0" aria-hidden="true" />
					<div className="z-10 container mx-auto px-4 flex flex-col items-center justify-center h-full">
						<h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-extrabold font-headline drop-shadow-2xl mb-4 sm:mb-6 tracking-tight animate-fade-in-up focus:outline-none focus:ring-4 focus:ring-primary/40">
							Ilumina Tu Mundo con{' '}
							<span className="text-primary">LUMIC</span>
						</h1>
						<p className="text-base xs:text-lg sm:text-xl md:text-2xl mb-6 sm:mb-10 max-w-xs xs:max-w-md sm:max-w-2xl mx-auto drop-shadow-lg animate-fade-in-up delay-100">
							Tecnología, diseño y calidez para cada espacio. Vive la experiencia
							de la mejor iluminación.
						</p>
						<Link
							href="/products"
							className="inline-block px-6 sm:px-10 py-3 sm:py-4 rounded-full bg-primary text-white font-bold text-base sm:text-lg shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/40 transition-all animate-fade-in-up delay-200 animate-pulse hover:scale-105 active:scale-95"
							tabIndex={0}
							aria-label="Explorar productos Lumic"
						>
							Explorar Productos
						</Link>
					</div>
				</section>

				{/* Categorías - Cards igualados y rediseñados (debajo del hero) */}
				<section className="py-8 xs:py-10 md:py-16 bg-background border-b-8 border-muted/40">
					<div className="container mx-auto px-4">
						<div className="text-center mb-10 md:mb-14">
							<h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold font-headline mb-2">
								Categorías
							</h2>
							<p className="text-base sm:text-lg text-muted-foreground">
								Elige tu categoría favorita:
							</p>
						</div>
						<div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-10 place-items-center">
							{categories.map((category) => (
								<Link
									href={category.href}
									key={category.name}
									className="group block h-full focus:outline-none focus:ring-4 focus:ring-primary/40"
									aria-label={`Ver productos de la categoría ${category.name}`}
								>
									<div className="relative flex flex-col justify-end overflow-hidden rounded-2xl shadow-xl h-[220px] xs:h-[260px] sm:h-[320px] aspect-[4/3] bg-white/95 border border-muted group-hover:scale-105 group-hover:shadow-2xl group-active:scale-95 transition-all animate-fade-in-up">
										<Image
											src={category.imageSrc}
											alt={category.imageHint}
											fill
											className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 group-active:scale-100"
											aria-hidden="true"
										/>
										<div
											className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
											aria-hidden="true"
										/>
										<div className="relative z-10 p-6 flex flex-col gap-1">
											<h3 className="text-2xl font-bold font-headline text-white drop-shadow-lg mb-0">
												{category.name}
											</h3>
											<p className="text-white/80 text-sm mb-1 line-clamp-2">
												{category.description}
											</p>
											<span className="inline-flex items-center text-primary-foreground font-semibold text-base group-hover:underline">
												Ver más{' '}
												<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
											</span>
										</div>
									</div>
								</Link>
							))}
						</div>
					</div>
				</section>

				{/* Featured Products - Modern cards, hover, shadow, CTA */}
				<section className="py-10 xs:py-12 md:py-16 bg-gradient-to-b from-muted/60 to-background" id="catalogo">
					<div className="container mx-auto px-4">
						<h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold font-headline text-center mb-6 sm:mb-10 md:mb-14">
							Productos Destacados
						</h2>
						<div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 place-items-center">
							{featuredProducts.map((product) => (
								<div
									key={product.id}
									className="bg-white rounded-2xl shadow-xl flex flex-col items-center border border-muted h-[260px] xs:h-[320px] sm:h-[370px] aspect-[4/5] relative overflow-hidden group hover:scale-105 hover:shadow-2xl transition-all"
								>
									<div className="w-full h-[90px] xs:h-[120px] sm:h-[140px] flex items-center justify-center overflow-hidden rounded-xl mt-2 xs:mt-4">
										<Image
											src={product.images?.[0] || 'https://placehold.co/300x200.png'}
											alt={product.name}
											width={220}
											height={140}
											className="object-cover aspect-video group-hover:shadow-2xl transition w-full h-full"
										/>
									</div>
									<div className="flex-1 flex flex-col justify-between w-full px-4 pb-4 pt-2">
										<h3 className="text-lg font-bold font-headline mb-1 text-center line-clamp-2">
											{product.name}
										</h3>
										<p className="text-muted-foreground text-center mb-2 text-sm line-clamp-2">
											{product.description}
										</p>
										<span className="text-primary font-bold text-xl mb-2 block text-center">
											${product.price}
										</span>
										<Link
											href={`/products/${product.id}`}
											className="px-4 xs:px-6 py-2 rounded-full bg-primary text-white font-semibold shadow hover:bg-primary/90 transition-all w-full text-center text-sm sm:text-base"
										>
											Ver Detalle
										</Link>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Why Choose Us */}
				<section className="py-16 md:py-20 bg-background border-b-8 border-muted/40">
					<div className="container mx-auto px-4">
						<div className="text-center mb-10 md:mb-14">
							<h2 className="text-4xl md:text-5xl font-extrabold font-headline mb-2">
								¿Por qué elegir LUMIC?
							</h2>
							<p className="text-lg text-muted-foreground">
								Calidad, confianza y el mejor servicio, siempre.
							</p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mb-8 md:mb-12">
							<div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 flex flex-col items-center hover:scale-105 transition-transform">
								<ShieldCheck className="h-8 w-8 text-primary mb-4" />
								<h3 className="text-xl font-bold font-headline mb-2">
									Calidad Garantizada
								</h3>
								<p className="text-muted-foreground text-center">
									Solo los mejores materiales y productos para asegurar durabilidad
									y rendimiento.
								</p>
							</div>
							<div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 flex flex-col items-center hover:scale-105 transition-transform">
								<Truck className="h-8 w-8 text-primary mb-4" />
								<h3 className="text-xl font-bold font-headline mb-2">
									Envío Rápido y Seguro
								</h3>
								<p className="text-muted-foreground text-center">
									Recibe tus productos en la puerta de tu casa, con embalaje seguro
									y en tiempo récord.
								</p>
							</div>
							<div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 flex flex-col items-center hover:scale-105 transition-transform">
								<LifeBuoy className="h-8 w-8 text-primary mb-4" />
								<h3 className="text-xl font-bold font-headline mb-2">
									Soporte Experto
								</h3>
								<p className="text-muted-foreground text-center">
									Nuestro equipo está siempre disponible para asesorarte y resolver
									cualquier duda.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* CTA Section - Impact, glass, color, WhatsApp */}
				<section className="bg-gradient-to-r from-primary to-black text-primary-foreground py-16 md:py-20">
					<div className="container mx-auto px-4 text-center flex flex-col items-center justify-center">
						<h2 className="text-4xl md:text-5xl font-extrabold font-headline mb-4 animate-fade-in-up">
							¿Listo para transformar tu espacio?
						</h2>
						<p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto animate-fade-in-up delay-100">
							Nuestro equipo de expertos está aquí para ayudarte. Contáctanos si
							tienes alguna pregunta.
						</p>
						<Link
							href="https://wa.me/1234567890?text=Hola,%20estoy%20interesado%20en%20sus%20productos."
							target="_blank"
							rel="noopener noreferrer"
							className="inline-block text-lg py-4 px-10 rounded-full bg-white text-primary font-bold shadow-lg hover:bg-white/90 transition-all animate-fade-in-up delay-200 animate-pulse hover:scale-105 active:scale-95"
						>
							Hablemos por WhatsApp
						</Link>
					</div>
				</section>

				{/* Botón flotante de WhatsApp (verde intenso y moderno) */}
				<a
					href="https://wa.me/1234567890?text=Hola,%20estoy%20interesado%20en%20sus%20productos."
					target="_blank"
					rel="noopener noreferrer"
					className="fixed z-50 bottom-6 right-6 md:bottom-8 md:right-8 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full shadow-2xl p-4 flex items-center justify-center transition-all animate-bounce focus:outline-none focus:ring-4 focus:ring-green-300"
					aria-label="WhatsApp"
					tabIndex={0}
					role="button"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-8 h-8"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M20.52 3.48A11.94 11.94 0 0012 0C5.37 0 0 5.37 0 12c0 2.12.55 4.13 1.6 5.92L0 24l6.18-1.62A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.63-.5-5.18-1.44l-.37-.22-3.67.96.98-3.58-.23-.37A9.96 9.96 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.07-7.75c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.41-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.19-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.62-.47-.16-.01-.36-.01-.56-.01-.19 0-.5.07-.76.34-.26.27-1 1-.97 2.43.03 1.43 1.03 2.81 1.18 3.01.15.2 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"
						/>
					</svg>
				</a>
			</div>
		</>
	);
}
