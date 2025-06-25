"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CartButton from "@/components/cart/CartButton";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
	{ href: "/", label: "Inicio", show: () => true },
	{ href: "/products", label: "Catálogo", show: () => true },
	{ href: "/admin", label: "Analítica", show: (role: string) => role === "admin" },
];

export default function Navbar() {
	const pathname = usePathname();
	const [role, setRole] = useState<string>("");
	const [open, setOpen] = useState(false);
	const [adminName, setAdminName] = useState<string>("");
	const [showUserMenu, setShowUserMenu] = useState(false);

	// Escuchar cambios en localStorage (login/logout en otras pestañas o tras login)
	useEffect(() => {
		function syncRole() {
			setRole(typeof window !== "undefined" ? localStorage.getItem("lumic_role") || "" : "");
			setAdminName(typeof window !== "undefined" ? localStorage.getItem("lumic_admin_name") || "" : "");
		}
		syncRole();
		window.addEventListener("storage", syncRole);
		// También escuchar eventos personalizados para cambios inmediatos tras login
		window.addEventListener("lumic_role_changed", syncRole);
		return () => {
			window.removeEventListener("storage", syncRole);
			window.removeEventListener("lumic_role_changed", syncRole);
		};
	}, []);

	return (
		<nav className="w-full flex items-center justify-between px-2 sm:px-4 py-2 sm:py-3 bg-white shadow-sm sticky top-0 z-40 border-b border-primary/10">
			<div className="flex items-center gap-4 sm:gap-8 min-w-0">
				<Link href="/" className="text-xl sm:text-2xl font-extrabold text-primary font-poppins tracking-tight flex items-center gap-2 min-w-0">
					<Image src="/globe.svg" alt="Lumic" width={28} height={28} className="w-7 h-7 min-w-[28px]" />
					<span className="truncate">Lumic</span>
				</Link>
				<ul className="hidden md:flex gap-2 sm:gap-4 items-center">
					{navLinks
						.filter(link => link.show(role))
						.map(link => (
							<li key={link.href}>
								<Link
									href={link.href}
									className={`hover:text-primary transition font-medium text-sm sm:text-base ${pathname === link.href ? "text-primary underline" : "text-foreground"}`}
								>
									{link.label}
								</Link>
							</li>
						))}
				</ul>
			</div>
			<div className="flex items-center gap-2 sm:gap-4">
				{role !== "admin" && <CartButton />}
				{role ? (
					<div className="relative">
						<button
							className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 hover:bg-primary/20 transition"
							onClick={() => setShowUserMenu(v => !v)}
							aria-haspopup="true"
							aria-expanded={showUserMenu}
						>
							<span className="inline-block w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
								{adminName ? adminName[0] : "U"}
							</span>
							<span className="font-semibold text-primary text-sm">
								{adminName || "Usuario"}
							</span>
							{role === "admin" && (
								<span className="ml-2 px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs font-bold border border-green-300">Admin</span>
							)}
						</button>
						{showUserMenu && (
							<div className="absolute right-0 mt-2 w-40 bg-white border border-primary/10 rounded shadow-lg z-50">
								<ul className="py-2">
									<li>
										<button
											className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-primary/10 transition"
											onClick={() => {
												setShowUserMenu(false);
												localStorage.removeItem("lumic_token");
												localStorage.removeItem("lumic_role");
												localStorage.removeItem("lumic_admin_name");
												window.location.href = "/login";
											}}
										>
											Cerrar sesión
										</button>
									</li>
								</ul>
							</div>
						)}
					</div>
				) : (
					<Link href="/login" className="px-4 py-2 rounded-xl bg-primary text-white font-bold shadow hover:bg-primary/90 transition-all text-sm">Login</Link>
				)}
				{/* Menú móvil */}
				<button className="md:hidden ml-1 p-2 rounded-lg hover:bg-primary/10 focus:bg-primary/20 transition" onClick={() => setOpen(true)}>
					<Menu size={24} />
				</button>
			</div>
			{/* Drawer móvil mejorado */}
			{open && (
				<div className="fixed inset-0 z-50 bg-black/40 flex justify-end md:hidden">
					<div className="w-4/5 max-w-xs bg-white h-full shadow-lg p-6 flex flex-col gap-6 animate-slide-in-right">
						<button className="self-end mb-4 p-2 rounded-full hover:bg-primary/10" onClick={() => setOpen(false)}>
							<X size={28} />
						</button>
						<ul className="flex flex-col gap-4">
							{navLinks
								.filter(link => link.show(role))
								.map(link => (
									<li key={link.href}>
										<Link
											href={link.href}
											className={`hover:text-primary transition font-medium text-base ${pathname === link.href ? "text-primary underline" : "text-foreground"}`}
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
