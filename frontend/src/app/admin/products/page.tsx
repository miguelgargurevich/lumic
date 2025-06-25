"use client";
import React, { useState } from "react";
import ProductModal from "./ProductModal";

// Demo de categorías y productos
const categories = ["Lámparas", "Tiras LED", "Apliques", "Decoración"];
const demoProducts = [
  { id: 1, name: "Lámpara Moderna", category: "Lámparas", price: 49.99, images: ["/demo-lamp.png"], stock: 10 },
  { id: 2, name: "Tira LED RGB", category: "Tiras LED", price: 19.99, images: ["/demo-strip.png"], stock: 25 },
  { id: 3, name: "Aplique Minimalista", category: "Apliques", price: 34.99, images: ["/demo-wall.png"], stock: 5 },
];

export default function ProductsAdminPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<any | null>(null);
  const [products, setProducts] = useState(demoProducts);
  const pageSize = 2;

  // Filtros
  const filtered = products.filter(
    p =>
      (!selectedCategory || p.category === selectedCategory) &&
      (!search || p.name.toLowerCase().includes(search.toLowerCase()))
  );
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  const handleSave = (data: any) => {
    if (editData) {
      setProducts(products.map(p => p.id === editData.id ? { ...p, ...data } : p));
    } else {
      setProducts([
        ...products,
        { ...data, id: products.length + 1, images: data.images.map((f: File) => URL.createObjectURL(f)) },
      ]);
    }
    setModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-5xl mx-auto bg-white rounded shadow p-8">
        <h2 className="text-2xl font-bold mb-6 text-primary">Mantenimiento de Productos</h2>
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <select
            className="input input-bordered"
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Buscar producto..."
            className="input input-bordered"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="btn btn-primary ml-auto" onClick={() => { setEditData(null); setModalOpen(true); }}>Agregar producto</button>
        </div>
        <table className="w-full mb-6">
          <thead>
            <tr className="border-b">
              <th className="py-2">Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Imágenes</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginated.map(p => (
              <tr key={p.id} className="border-b">
                <td className="py-2">{p.name}</td>
                <td>{p.category}</td>
                <td>${p.price.toFixed(2)}</td>
                <td>{p.stock}</td>
                <td>
                  <div className="flex gap-2">
                    {p.images.map((img, i) => (
                      <img key={i} src={img} alt={p.name} className="w-10 h-10 object-contain rounded" />
                    ))}
                  </div>
                </td>
                <td>
                  <button className="btn btn-sm btn-outline mr-2" onClick={() => { setEditData(p); setModalOpen(true); }}>Editar</button>
                  <button className="btn btn-sm btn-danger">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Paginado */}
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`btn btn-sm ${page === i + 1 ? "btn-primary" : "btn-outline"}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
        {/* Modal de agregar/editar producto y upload de imágenes se implementaría aquí */}
        <ProductModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          initialData={editData}
          categories={categories}
        />
      </div>
    </main>
  );
}
