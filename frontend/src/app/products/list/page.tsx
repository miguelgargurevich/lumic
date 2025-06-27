"use client";

import React, { useState, Suspense, useEffect } from "react";
import Image from "next/image";
import { products as productsData, type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/catalog/ProductCard";
import type { ProductCardAction } from "@/components/catalog/ProductCard";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, X } from "lucide-react";
import ProductModal from "@/app/admin/products/ProductModal";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

const categories = Array.from(new Set(productsData.map(p => p.category)));
const sortOptions = [
  { label: "A-Z", value: "az" },
  { label: "Z-A", value: "za" },
  { label: "Mayor precio", value: "price_desc" },
  { label: "Menor precio", value: "price_asc" },
];

const pageSize = 6;

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Cargando productos...</div>}>
      <ProductsPageContent />
    </Suspense>
  );
}

function ProductsPageContent() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("az");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<null | { mode: 'create' | 'edit' | 'view'; product?: Product }>(null);
  const [allProducts, setAllProducts] = useState<Product[]>(productsData);
  const [isAdmin, setIsAdmin] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  // Sincroniza el estado con los query params
  useEffect(() => {
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
  useEffect(() => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("page", String(page));
    params.set("search", search);
    params.set("category", category);
    params.set("sort", sort);
    router.replace(`?${params.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search, category, sort]);

  // Filtros y orden (normaliza para evitar problemas de tildes, mayúsculas, etc)
  function normalize(str: string) {
    return str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
  }
  let filtered = allProducts.filter(p =>
    (!search || normalize(p.name).includes(normalize(search))) &&
    (!category || normalize(p.category) === normalize(category))
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
    toast.success("Producto agregado al carrito", { description: product.name });
  }

  // Detectar rol real desde localStorage
  useEffect(() => {
    function syncRole() {
      setIsAdmin(typeof window !== "undefined" && localStorage.getItem("lumic_role") === "admin");
    }
    syncRole();
    window.addEventListener("storage", syncRole);
    window.addEventListener("lumic_role_changed", syncRole);
    return () => {
      window.removeEventListener("storage", syncRole);
      window.removeEventListener("lumic_role_changed", syncRole);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-white flex flex-col px-4 sm:px-0 py-8 sm:p-8">
      {/* Header refinado: igual al de catalog-welcome, sin fondo degradado */}
      <section className="relative shadow-none border-none p-0 mb-8 flex flex-col items-center text-center w-full max-w-none mx-0 overflow-hidden animate-fade-in bg-transparent">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-primary mb-4 mt-4 sm:mb-8 sm:mt-8 text-center drop-shadow-lg">
				Bienvenido al Catálogo Lumic
			</h1>
			
      </section>

      <div className="flex justify-between items-center mb-8 gap-4 px-2 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Catálogo de productos</h1>
        {/* Botón para abrir filtros en mobile */}
        <button
          className="md:hidden flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/90 transition"
          onClick={() => setShowFilters(true)}
        >
          <Filter className="w-5 h-5" /> Filtros
        </button>
      </div>
      {/* Drawer/modal de filtros para mobile */}
      {showFilters && (
        <div className="fixed inset-0 z-50 flex items-end md:hidden bg-black/40" onClick={() => setShowFilters(false)}>
          <div className="bg-white w-full rounded-t-2xl p-6 shadow-lg" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold">Filtrar productos</span>
              <button onClick={() => setShowFilters(false)}><X className="w-6 h-6" /></button>
            </div>
            {/* Filtros en mobile */}
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Nombre</label>
                <input
                  type="text"
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1); }}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Buscar por nombre..."
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-1">Categoría</label>
                  <select
                    value={category}
                    onChange={e => { setCategory(e.target.value); setPage(1); }}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Todas</option>
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Ordenar por</label>
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
            </div>
            <button
              className="mt-6 w-full py-2 rounded-lg bg-primary text-white font-bold shadow hover:bg-primary/90"
              onClick={() => setShowFilters(false)}
            >
              Aplicar filtros
            </button>
          </div>
        </div>
      )}
      {/* Filtros siempre visibles en desktop */}
      <div className="hidden md:flex flex-col gap-4 mb-10 px-2 sm:px-6">
        <div className="flex gap-6 items-end">
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1">Nombre</label>
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="w-full border rounded px-4 py-2"
              placeholder="Buscar por nombre..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Categoría</label>
            <select
              value={category}
              onChange={e => { setCategory(e.target.value); setPage(1); }}
              className="w-full border rounded px-4 py-2"
            >
              <option value="">Todas</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Ordenar por</label>
            <select
              value={sort}
              onChange={e => { setSort(e.target.value); setPage(1); }}
              className="w-full border rounded px-4 py-2"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          {isAdmin && (
            <button className="bg-primary text-white px-8 py-2 rounded font-bold hover:bg-primary/90 transition flex items-center gap-2" onClick={() => setModal({mode:'create'})}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Nuevo producto
            </button>
          )}
        </div>
        {/* Panel de filtros activos solo en desktop */}
        <div className="text-left text-sm min-h-[24px] px-0 py-3 rounded-2xl font-medium flex items-center gap-4 flex-wrap w-full">
          <div className="flex-1">
            {search || category || sort !== 'az' ? (
              <>
                <span className="font-semibold">Mostrando</span>
                {category && (
                  <> productos de <span className="font-bold underline underline-offset-2">{category}</span></>
                )}
                {search && (
                  <> que coinciden con <span className="font-bold">&quot;{search}&quot;</span></>
                )}
                {sort !== 'az' && (
                  <> ordenados por <span className="font-bold">{sortOptions.find(opt => opt.value === sort)?.label}</span></>
                )}
                .
              </>
            ) : (
              <>Mostrando todos los productos.</>
            )}
          </div>
          {(search || category || sort !== 'az') && (
            <button
              className="ml-auto px-5 py-2 rounded-lg bg-primary text-white font-semibold text-xs shadow hover:bg-primary/90 transition-all flex items-center gap-2"
              onClick={() => { setSearch(''); setCategory(''); setSort('az'); setPage(1); }}
              aria-label="Limpiar filtros"
            >
              <X className="w-4 h-4" />
              Limpiar filtros
            </button>
          )}
        </div>
      </div>
      {/* Panel de filtros activos en mobile (fuera del panel de filtros) */}
      <div className="md:hidden mb-10 text-left text-sm min-h-[24px] px-2 sm:px-6 py-5 rounded-2xl font-medium bg-primary/10 text-primary border border-primary/20 shadow-sm flex items-center gap-4 flex-wrap w-full mx-auto">
        <div className="flex-1">
          {search || category || sort !== 'az' ? (
            <>
              <span className="font-semibold">Mostrando</span>
              {category && (
                <> productos de <span className="font-bold underline underline-offset-2">{category}</span></>
              )}
              {search && (
                <> que coinciden con <span className="font-bold">&quot;{search}&quot;</span></>
              )}
              {sort !== 'az' && (
                <> ordenados por <span className="font-bold">{sortOptions.find(opt => opt.value === sort)?.label}</span></>
              )}
              .
            </>
          ) : (
            <>Mostrando todos los productos.</>
          )}
        </div>
        {(search || category || sort !== 'az') && (
          <button
            className="ml-auto px-5 py-2 rounded-lg bg-primary text-white font-semibold text-xs shadow hover:bg-primary/90 transition-all"
            onClick={() => { setSearch(''); setCategory(''); setSort('az'); setPage(1); }}
            aria-label="Limpiar filtros"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Listado de productos */}
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16 w-full max-w-6xl mx-auto place-items-center bg-transparent">
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
                <button
                  className="mt-6 px-6 py-2 rounded-lg bg-primary text-white font-bold shadow-md hover:bg-primary/90 transition border border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/40 inline-flex items-center gap-2 justify-center w-full text-base"
                  onClick={() => modal.product && handleAddToCart(modal.product)}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Agregar al carrito
                </button>
              </div>
            )}
            {(modal.mode === 'edit' || modal.mode === 'create') && (
              // Usar el modal global/admin real
              <ProductModal
                open={true}
                initialData={modal.product}
                categories={categories}
                onSave={handleSave}
                onClose={() => setModal(null)}
              />
            )}
          </div>
        </div>
      )}
      {/* Botón flotante para agregar producto en mobile solo para admin */}
      {isAdmin && (!modal || (modal.mode !== 'create' && modal.mode !== 'edit')) && (
        <button
          className="fixed bottom-5 right-5 z-50 bg-primary text-white rounded-full shadow-lg w-14 h-14 flex items-center justify-center text-3xl md:hidden"
          onClick={() => setModal({mode:'create'})}
          aria-label="Nuevo producto"
        >
          +
        </button>
      )}
    </div>
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
