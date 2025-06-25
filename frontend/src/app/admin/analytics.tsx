"use client";
import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

// Simulación de datos, reemplazar por fetch real a backend
const ventasPorProducto = [
	{
		nombre: "Lámpara LED",
		ventas: 120,
		fechas: [
			{ fecha: "2025-06-01", cantidad: 10 },
			{ fecha: "2025-06-10", cantidad: 40 },
			{ fecha: "2025-06-20", cantidad: 70 },
		],
	},
	{
		nombre: "Aplique Pared",
		ventas: 80,
		fechas: [
			{ fecha: "2025-06-01", cantidad: 20 },
			{ fecha: "2025-06-10", cantidad: 30 },
			{ fecha: "2025-06-20", cantidad: 30 },
		],
	},
	{
		nombre: "Colgante Moderno",
		ventas: 60,
		fechas: [
			{ fecha: "2025-06-01", cantidad: 10 },
			{ fecha: "2025-06-10", cantidad: 20 },
			{ fecha: "2025-06-20", cantidad: 30 },
		],
	},
	{
		nombre: "Foco Exterior",
		ventas: 30,
		fechas: [
			{ fecha: "2025-06-01", cantidad: 5 },
			{ fecha: "2025-06-10", cantidad: 10 },
			{ fecha: "2025-06-20", cantidad: 15 },
		],
	},
];
const stocksBajos = [
	{ nombre: "Colgante Moderno", stock: 3 },
	{ nombre: "Foco Exterior", stock: 2 },
];

export default function AdminAnalytics() {
	// Simulación de sesión admin
	const session = { user: { role: "admin" } };
	const [fechaInicio, setFechaInicio] = useState("2025-06-01");
	const [fechaFin, setFechaFin] = useState("2025-06-20");

	if (!session || session.user.role !== "admin") {
		return (
			<div className="p-8 text-center text-red-500 font-bold">
				Acceso restringido solo para administradores
			</div>
		);
	}

	// Filtrar ventas por rango de fechas
	const ventasPorRango = ventasPorProducto.map((p) => {
		const total = p.fechas
			.filter((f) => f.fecha >= fechaInicio && f.fecha <= fechaFin)
			.reduce((sum, f) => sum + f.cantidad, 0);
		return { nombre: p.nombre, total };
	});
	const masVendido = ventasPorRango.reduce(
		(max, p) => (p.total > max.total ? p : max),
		ventasPorRango[0]
	);
	const menosVendido = ventasPorRango.reduce(
		(min, p) => (p.total < min.total ? p : min),
		ventasPorRango[0]
	);

	const barData = {
		labels: ventasPorProducto.map((p) => p.nombre),
		datasets: [
			{
				label: "Ventas por producto",
				data: ventasPorProducto.map((p) => p.ventas),
				backgroundColor: "#6366f1",
			},
		],
	};

	const pieData = {
		labels: stocksBajos.map((p) => p.nombre),
		datasets: [
			{
				label: "Stock bajo",
				data: stocksBajos.map((p) => p.stock),
				backgroundColor: ["#f59e42", "#ef4444"],
			},
		],
	};

	return (
		<div className="max-w-5xl mx-auto p-8">
			<div className="flex flex-col gap-10">
				<div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between items-center">
					<h2 className="text-lg font-semibold mb-4">Ventas por producto</h2>
					<div className="w-full max-w-md mx-auto">
						<Bar data={barData} options={{ maintainAspectRatio: false, aspectRatio: 2 }} height={260} />
					</div>
				</div>
				<div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between items-center">
					<h2 className="text-lg font-semibold mb-4">Productos con stock bajo</h2>
					<div className="w-full max-w-md mx-auto">
						<Pie data={pieData} options={{ maintainAspectRatio: false, aspectRatio: 2 }} height={260} />
					</div>
				</div>
				<div className="flex flex-col md:flex-row gap-8">
					<div className="flex-1 bg-green-50 rounded-xl shadow p-6 flex flex-col items-center mb-4 md:mb-0">
						<h2 className="text-lg font-semibold mb-2 text-green-700">Más vendido en el rango</h2>
						<div className="text-center text-2xl font-bold text-green-700">
							{masVendido.nombre} <span className="text-base">({masVendido.total} ventas)</span>
						</div>
					</div>
					<div className="flex-1 bg-red-50 rounded-xl shadow p-6 flex flex-col items-center">
						<h2 className="text-lg font-semibold mb-2 text-red-700">Menos vendido en el rango</h2>
						<div className="text-center text-2xl font-bold text-red-700">
							{menosVendido.nombre} <span className="text-base">({menosVendido.total} ventas)</span>
						</div>
					</div>
				</div>
				<div className="mb-6 flex gap-4 items-center justify-center">
					<label className="font-semibold">
						Desde:
						<input
							type="date"
							value={fechaInicio}
							onChange={(e) => setFechaInicio(e.target.value)}
							className="ml-2 border rounded px-2 py-1"
						/>
					</label>
					<label className="font-semibold">
						Hasta:
						<input
							type="date"
							value={fechaFin}
							onChange={(e) => setFechaFin(e.target.value)}
							className="ml-2 border rounded px-2 py-1"
						/>
					</label>
				</div>
			</div>
		</div>
	);
}
