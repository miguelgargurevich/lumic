"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CartButton from "@/components/cart/CartButton";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
	{ href: "/", label: "Inicio", show: () => true },
	{ href: "/products", label: "Catálogo", show: () => true },
	{ href: "/login", label: "Login", show: (role: string) => !role },
	{ href: "/admin", label: "Analítica", show: (role: string) => role === "admin" },
];

export default function Navbar() {
	const pathname = usePathname();
	const [role, setRole] = useState<string>("");
	const [open, setOpen] = useState(false);
	useEffect(() => {
		setRole(typeof window !== "undefined" ? localStorage.getItem("lumic_role") || "" : "");
	}, []);
	return (
		<nav className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-sm sticky top-0 z-40">
			<div className="flex items-center gap-8">
				<Link href="/" className="text-2xl font-extrabold text-primary font-poppins tracking-tight">
					Lumic
				</Link>
				<ul className="hidden md:flex gap-4">
					{navLinks
						.filter(link => link.show(role))
						.map(link => (
							<li key={link.href}>
								<Link
									href={link.href}
									className={`hover:text-primary transition font-medium ${pathname === link.href ? "text-primary underline" : "text-foreground"}`}
								>
									{link.label}
								</Link>
							</li>
						))}
					{role && (
						<li>
							<button
								className="text-sm text-muted-foreground hover:text-primary underline"
								onClick={() => {
									localStorage.removeItem("lumic_token");
									localStorage.removeItem("lumic_role");
									localStorage.removeItem("lumic_admin_name");
									window.location.href = "/login";
								}}
							>
								Cerrar sesión
							</button>
						</li>
					)}
				</ul>
				{/* Menú móvil */}
				<button className="md:hidden ml-2" onClick={() => setOpen(true)}>
					<Menu size={28} />
				</button>
			</div>
			<CartButton />
			{/* Drawer móvil */}
			{open && (
				<div className="fixed inset-0 z-50 bg-black/40 flex justify-end md:hidden">
					<div className="w-64 bg-white h-full shadow-lg p-6 flex flex-col gap-6">
						<button className="self-end mb-4" onClick={() => setOpen(false)}>
							<X size={28} />
						</button>
						<ul className="flex flex-col gap-4">
							{navLinks
								.filter(link => link.show(role))
								.map(link => (
									<li key={link.href}>
										<Link
											href={link.href}
											className={`hover:text-primary transition font-medium ${pathname === link.href ? "text-primary underline" : "text-foreground"}`}
											onClick={() => setOpen(false)}
										>
											{link.label}
										</Link>
									</li>
								))}
							{role && (
								<li>
									<button
										className="text-sm text-muted-foreground hover:text-primary underline"
										onClick={() => {
											localStorage.removeItem("lumic_token");
											localStorage.removeItem("lumic_role");
											localStorage.removeItem("lumic_admin_name");
											window.location.href = "/login";
										}}
									>
										Cerrar sesión
									</button>
								</li>
							)}
						</ul>
					</div>
				</div>
			)}
		</nav>
	);
}
