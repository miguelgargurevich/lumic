"use client";
import React, { useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, TimeScale, LineElement, PointElement } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, TimeScale, LineElement, PointElement);

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

// Simulación de stock por producto (puedes reemplazar por datos reales)
const stockPorProducto = [
	{ nombre: "Lámpara LED", stock: 12 },
	{ nombre: "Aplique Pared", stock: 8 },
	{ nombre: "Colgante Moderno", stock: 3 },
	{ nombre: "Foco Exterior", stock: 2 },
];

// Calcular ventas totales por mes (simulado)
const ventasPorMes = [
	{ mes: "2025-01", total: 120 },
	{ mes: "2025-02", total: 150 },
	{ mes: "2025-03", total: 180 },
	{ mes: "2025-04", total: 210 },
	{ mes: "2025-05", total: 170 },
	{ mes: "2025-06", total: 240 },
];

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

// Pie: distribución de ventas por producto
const pieData = {
	labels: ventasPorProducto.map((p) => p.nombre),
	datasets: [
		{
			label: "Distribución de ventas",
			data: ventasPorProducto.map((p) => p.ventas),
			backgroundColor: ["#6366f1", "#f59e42", "#ef4444", "#10b981"],
		},
	],
};
// Bar: stock de productos
const barDataStock = {
	labels: stockPorProducto.map((p) => p.nombre),
	datasets: [
		{
			label: "Stock disponible",
			data: stockPorProducto.map((p) => p.stock),
			backgroundColor: "#10b981",
		},
	],
};

const lineData = {
	labels: ventasPorMes.map((v) => v.mes),
	datasets: [
		{
			label: "Ventas totales por mes",
			data: ventasPorMes.map((v) => v.total),
			borderColor: "#6366f1",
			backgroundColor: "#6366f133",
			fill: true,
			tension: 0.3,
			pointRadius: 4,
			pointBackgroundColor: "#6366f1",
		},
	],
};

export default function AdminAnalytics() {
	// Simulación de sesión admin
	const session = { user: { role: "admin" } };

	if (!session || session.user.role !== "admin") {
		return (
			<div className="p-8 text-center text-red-500 font-bold">
				Acceso restringido solo para administradores
			</div>
		);
	}

	// Eliminar el filtrado por rango de fechas y usar ventas totales
	const ventasPorRango = ventasPorProducto.map((p) => ({ nombre: p.nombre, total: p.ventas }));
	const masVendido = ventasPorRango.reduce(
		(max, p) => (p.total > max.total ? p : max),
		ventasPorRango[0]
	);
	const menosVendido = ventasPorRango.reduce(
		(min, p) => (p.total < min.total ? p : min),
		ventasPorRango[0]
	);

	return (
		<div className="max-w-5xl mx-auto px-2 sm:px-8 py-4">
			<div className="flex flex-col gap-6 sm:gap-10">
                <div className="bg-white rounded-2xl shadow-lg p-2 sm:p-6 flex flex-col justify-between items-center w-full overflow-x-auto">
					<h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Ventas totales por mes</h2>
					<div className="w-full min-w-0 max-w-full sm:max-w-2xl mx-auto" style={{ minHeight: 220 }}>
						<Line data={lineData} options={{
							responsive: true,
							maintainAspectRatio: false,
							plugins: { legend: { labels: { font: { size: 12 } } } },
							scales: {
								x: {
									title: { display: true, text: "Mes" },
									grid: { display: false },
								},
								y: {
									title: { display: true, text: "Ventas" },
									beginAtZero: true,
								},
							},
						}} height={220} />
					</div>
				</div>
				<div className="bg-white rounded-2xl shadow-lg p-2 sm:p-6 flex flex-col justify-between items-center w-full overflow-x-auto">
					<h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Distribución de ventas por producto</h2>
					<div className="w-full min-w-0 max-w-full sm:max-w-md mx-auto" style={{ minHeight: 180 }}>
						<Pie data={pieData} options={{ maintainAspectRatio: false, responsive: true, aspectRatio: 1.2, plugins: { legend: { labels: { font: { size: 12 } } } } }} height={180} />
					</div>
				</div>
				<div className="bg-white rounded-2xl shadow-lg p-2 sm:p-6 flex flex-col justify-between items-center w-full overflow-x-auto">
					<h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Stock de productos</h2>
					<div className="w-full min-w-0 max-w-full sm:max-w-md mx-auto" style={{ minHeight: 180 }}>
						<Bar data={barDataStock} options={{ maintainAspectRatio: false, responsive: true, aspectRatio: 1.2, plugins: { legend: { labels: { font: { size: 12 } } } } }} height={180} />
					</div>
				</div>
				<div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
					<div className="flex-1 bg-green-50 rounded-xl shadow p-3 sm:p-6 flex flex-col items-center mb-2 sm:mb-0">
						<h2 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-green-700">Más vendido en el rango</h2>
						<div className="text-center text-lg sm:text-2xl font-bold text-green-700">
							{masVendido.nombre} <span className="text-xs sm:text-base">({masVendido.total} ventas)</span>
						</div>
					</div>
					<div className="flex-1 bg-red-50 rounded-xl shadow p-3 sm:p-6 flex flex-col items-center">
						<h2 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-red-700">Menos vendido en el rango</h2>
						<div className="text-center text-lg sm:text-2xl font-bold text-red-700">
							{menosVendido.nombre} <span className="text-xs sm:text-base">({menosVendido.total} ventas)</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
