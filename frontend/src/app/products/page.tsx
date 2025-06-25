"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { products as productsData, type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/catalog/ProductCard";
import type { ProductCardAction } from "@/components/catalog/ProductCard";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const categories = Array.from(new Set(productsData.map(p => p.category)));
const sortOptions = [
  { label: "A-Z", value: "az" },
  { label: "Z-A", value: "za" },
  { label: "Mayor precio", value: "price_desc" },
  { label: "Menor precio", value: "price_asc" },
];

const pageSize = 6;

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("az");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<null | { mode: 'create' | 'edit' | 'view'; product?: Product }>(null);
  const [allProducts, setAllProducts] = useState<Product[]>(productsData);
  const [isAdmin, setIsAdmin] = useState(false); // Toggle de rol
  const [cart, setCart] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Sincroniza el estado con los query params
  React.useEffect(() => {
    const pageParam = Number(searchParams.get("page"));
    const searchParam = searchParams.get("search") || "";
    const categoryParam = searchParams.get("category") || "";
    const sortParam = searchParams.get("sort") || "az";
    if (!isNaN(pageParam) && pageParam > 0 && pageParam !== page) setPage(pageParam);
    if (searchParam !== search) setSearch(searchParam);
    if (categoryParam !== category) setCategory(categoryParam);
    if (sortParam !== sort) setSort(sortParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Cuando cambia algún filtro, búsqueda o página, actualiza los query params
  React.useEffect(() => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("page", String(page));
    params.set("search", search);
    params.set("category", category);
    params.set("sort", sort);
    router.replace(`?${params.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search, category, sort]);

  // Filtros y orden
  let filtered = allProducts.filter(p =>
    (!search || p.name.toLowerCase().includes(search.toLowerCase())) &&
    (!category || p.category === category)
  );
  if (sort === "az") filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "za") filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
  if (sort === "price_desc") filtered = filtered.sort((a, b) => b.price - a.price);
  if (sort === "price_asc") filtered = filtered.sort((a, b) => a.price - b.price);

  // Paginado
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page-1)*pageSize, page*pageSize);

  // CRUD handlers (simulados en memoria)
  function handleDelete(id: number) {
    setAllProducts(ps => ps.filter(p => p.id !== id));
  }
  function handleSave(product: Product) {
    if (modal?.mode === 'edit') {
      setAllProducts(ps => ps.map(p => p.id === product.id ? product : p));
    } else {
      setAllProducts(ps => [...ps, { ...product, id: Date.now() }]);
    }
    setModal(null);
  }
  function handleAddToCart(product: Product) {
    addToCart({
      name: product.name,
      price: product.price,
      image: product.images[0] || '',
    });
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-end mb-4">
        <button
          className={`px-4 py-2 rounded font-bold border ${isAdmin ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setIsAdmin(v => !v)}
        >
          {isAdmin ? 'Modo Admin' : 'Modo Usuario'}
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-8">Buscar y gestionar productos</h1>
      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-end">
        <div className="flex-1">
          <label className="block text-sm font-semibold mb-1">Nombre</label>
          <input
            type="text"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="w-full border rounded px-3 py-2"
            placeholder="Buscar por nombre..."
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Categoría</label>
          <select
            value={category}
            onChange={e => { setCategory(e.target.value); setPage(1); }}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Todas</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Relevancia</label>
          <select
            value={sort}
            onChange={e => { setSort(e.target.value); setPage(1); }}
            className="w-full border rounded px-3 py-2"
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        {isAdmin && (
          <button className="bg-primary text-white px-6 py-2 rounded font-bold hover:bg-primary/90 transition" onClick={() => setModal({mode:'create'})}>Nuevo producto</button>
        )}
      </div>

      {/* Listado de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {paginated.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground">No hay productos para mostrar.</div>
        )}
        {paginated.map(product => {
          const actions: ProductCardAction[] = isAdmin
            ? [
                {
                  label: "Ver",
                  type: "view",
                  onClick: () => setModal({ mode: "view", product }),
                  icon: (
                    <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' /><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' /></svg>
                  ),
                },
                {
                  label: "Editar",
                  type: "edit",
                  onClick: () => setModal({ mode: "edit", product }),
                  icon: (
                    <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 10-4-4l-8 8v3z' /><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7l-1.5-1.5' /></svg>
                  ),
                },
                {
                  label: "Eliminar",
                  type: "delete",
                  onClick: () => handleDelete(product.id),
                  icon: (
                    <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' /></svg>
                  ),
                },
              ]
            : [
                {
                  label: "Ver detalles",
                  type: "view",
                  onClick: () => setModal({ mode: "view", product }),
                  icon: (
                    <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' /><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' /></svg>
                  ),
                },
                {
                  label: "Agregar al carrito",
                  type: "add",
                  onClick: () => handleAddToCart(product),
                  icon: (
                    <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 007.6 19h8.8a2 2 0 001.95-2.3L17 13M7 13V6a1 1 0 011-1h3m4 0h2a1 1 0 011 1v7' /></svg>
                  ),
                },
              ] as ProductCardAction[];
          return (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.images[0]}
              description={product.description}
              actions={actions}
            />
          );
        })}
      </div>

      {/* Paginado visual mejorado */}
      <div className="flex justify-center items-center gap-2 mb-8 select-none">
        <button
          className="px-4 py-2 rounded-xl font-semibold border border-primary text-primary bg-white shadow hover:bg-primary/10 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={page === 1}
          onClick={() => setPage(p => Math.max(1, p-1))}
          aria-label="Página anterior"
        >
          &larr;
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i+1}
            className={`w-10 h-10 rounded-full font-bold border-2 mx-1 transition-all shadow-sm ${page === i+1 ? 'bg-primary text-white border-primary scale-110' : 'bg-white text-primary border-primary/30 hover:bg-primary/10'}`}
            onClick={() => setPage(i+1)}
            aria-current={page === i+1 ? 'page' : undefined}
          >
            {i+1}
          </button>
        ))}
        <button
          className="px-4 py-2 rounded-xl font-semibold border border-primary text-primary bg-white shadow hover:bg-primary/10 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage(p => p+1)}
          aria-label="Página siguiente"
        >
          &rarr;
        </button>
      </div>

      {/* Modal CRUD (simulado) */}
      {modal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white/90 border border-primary/30 rounded-2xl shadow-2xl p-0 w-full max-w-lg relative overflow-hidden">
            <button
              className="absolute top-4 right-4 text-3xl text-primary bg-white/80 rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-primary/90 hover:text-white transition-all z-10"
              onClick={() => setModal(null)}
              aria-label="Cerrar"
            >
              &times;
            </button>
            {modal.mode === 'view' && modal.product && (
              <div className="p-8 pt-4 flex flex-col gap-2">
                <h2 className="text-3xl font-extrabold mb-2 text-center text-primary drop-shadow">{modal.product.name}</h2>
                {/* Carrusel de imágenes */}
                <ProductImageCarousel images={modal.product.images} />
                <div className="grid grid-cols-2 gap-2 mt-4 text-base">
                  <div className="mb-1"><b>Categoría:</b> {modal.product.category}</div>
                  <div className="mb-1"><b>Precio:</b> <span className="font-bold text-primary">${modal.product.price}</span></div>
                  <div className="mb-1"><b>Stock:</b> {modal.product.stock}</div>
                  <div className="mb-1 col-span-2"><b>Descripción:</b> {modal.product.description}</div>
                </div>
              </div>
            )}
            {(modal.mode === 'edit' || modal.mode === 'create') && (
              <div className="p-8 pt-4">
                <ProductForm
                  product={modal.product}
                  categories={categories}
                  onSave={handleSave}
                  onCancel={() => setModal(null)}
                />
              </div>
            )}
          </div>
        </div>
      )}
      {/* Mostrar feedback de carrito */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50 bg-primary text-white px-6 py-3 rounded-full shadow-lg animate-fade-in-up">
          {cart.length} producto{cart.length > 1 ? 's' : ''} en el carrito
        </div>
      )}
    </div>
  );
}

// Formulario para crear/editar productos with upload múltiple de imágenes
function ProductForm({ product, categories, onSave, onCancel }: {
  product?: Product,
  categories: string[],
  onSave: (p: Product) => void,
  onCancel: () => void
}) {
  const [form, setForm] = useState<Product>(product ?? {
    id: 0,
    name: "",
    category: categories[0] ?? "",
    price: 0,
    images: [],
    stock: 0,
    description: ""
  });
  const [files, setFiles] = useState<File[]>([]);
  const dropRef = useRef<HTMLDivElement>(null);

  // Drag & drop handlers
  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const fileList = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
    if (fileList.length) {
      setFiles(prev => [...prev, ...fileList]);
      setForm(f => ({ ...f, images: [...f.images, ...fileList.map(f => URL.createObjectURL(f))] }));
    }
  }
  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    if (dropRef.current) dropRef.current.classList.add("ring-2", "ring-primary");
  }
  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    if (dropRef.current) dropRef.current.classList.remove("ring-2", "ring-primary");
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files ? Array.from(e.target.files) : [];
    setFiles(fileList);
    setForm(f => ({ ...f, images: fileList.map(f => URL.createObjectURL(f)) }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === 'price' || name === 'stock' ? Number(value) : value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-4 text-primary/90 text-center drop-shadow">{product ? 'Editar' : 'Nuevo'} producto</h2>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Nombre" className="border-2 border-primary/30 rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary/40 outline-none" required />
      <select name="category" value={form.category} onChange={handleChange} className="border-2 border-primary/30 rounded-xl px-4 py-2">
        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>
      <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Precio" className="border-2 border-primary/30 rounded-xl px-4 py-2" required min={0} step={0.01} />
      <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Stock" className="border-2 border-primary/30 rounded-xl px-4 py-2" required min={0} />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Descripción" className="border-2 border-primary/30 rounded-xl px-4 py-2" rows={3} />
      <label className="block text-sm font-semibold mb-1">Imágenes (puedes subir varias):</label>
      <div
        ref={dropRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className="flex flex-col gap-2 transition-all"
      >
        <div className="flex flex-wrap gap-2 mb-2 min-h-[88px]">
          {form.images.map((img, i) => (
            <div key={i} className="relative group">
              <Image src={img} alt="preview" width={72} height={72} className="rounded-xl object-cover aspect-square border-2 border-primary/30 shadow transition-all group-hover:brightness-75" />
              <button
                type="button"
                className="absolute top-1 right-1 bg-white/80 text-red-600 rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-red-500 hover:text-white transition-all opacity-80 group-hover:opacity-100"
                onClick={() => {
                  setFiles(files => files.filter((_, idx) => idx !== i));
                  setForm(f => ({ ...f, images: f.images.filter((_, idx) => idx !== i) }));
                }}
                aria-label="Eliminar imagen"
              >
                &times;
              </button>
            </div>
          ))}
          <label className="w-20 h-20 flex items-center justify-center border-2 border-dashed border-primary/30 rounded-xl cursor-pointer bg-primary/5 hover:bg-primary/10 transition-all relative">
            <span className="text-primary text-2xl font-bold">+</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="absolute opacity-0 w-full h-full left-0 top-0 cursor-pointer"
              tabIndex={-1}
            />
          </label>
        </div>
        <small className="text-xs text-muted-foreground">Arrastra o haz click para agregar imágenes. Puedes eliminar cada una antes de guardar.</small>
      </div>
      <div className="flex gap-2 justify-end mt-2">
        <button type="button" className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 font-semibold shadow" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="px-4 py-2 rounded-xl bg-primary text-white font-bold shadow hover:bg-primary/90">Guardar</button>
      </div>
    </form>
  );
}

// Carrusel simple de imágenes para el modal de detalle
function ProductImageCarousel({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  if (images.length === 0) return null;
  return (
    <div className="flex flex-col items-center mb-2">
      <div className="relative w-full flex justify-center">
        <Image
          src={images[idx]}
          alt={`Imagen ${idx+1}`}
          width={340}
          height={240}
          className="rounded-2xl object-cover aspect-video border-2 border-primary/20 shadow-lg"
        />
        {images.length > 1 && (
          <>
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-primary/80 text-white rounded-full px-3 py-2 text-lg shadow hover:bg-primary"
              onClick={() => setIdx(i => (i-1+images.length)%images.length)}
              aria-label="Anterior"
            >&lt;</button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary/80 text-white rounded-full px-3 py-2 text-lg shadow hover:bg-primary"
              onClick={() => setIdx(i => (i+1)%images.length)}
              aria-label="Siguiente"
            >&gt;</button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-1 mt-2">
          {images.map((_, i) => (
            <button
              key={i}
              className={`w-3 h-3 rounded-full border-2 ${i===idx ? 'bg-primary border-primary' : 'bg-gray-200 border-primary/30 hover:bg-primary/10'}`}
              onClick={() => setIdx(i)}
              aria-label={`Ir a imagen ${i+1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
