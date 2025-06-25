import React, { useRef, useState } from "react";
import Image from "next/image";
import type { Product } from "@/data/products";

interface ProductModalFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (p: Product) => void;
  categories: string[];
  product?: Product;
}

export default function ProductModalForm({ open, onClose, onSave, categories, product }: ProductModalFormProps) {
  const [form, setForm] = useState<Product>(product ?? {
    id: 0,
    name: "",
    category: categories[0] ?? "",
    price: 0,
    images: [],
    stock: 0,
    description: ""
  });
  const dropRef = useRef<HTMLDivElement>(null);

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const fileList = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
    if (fileList.length) {
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
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white/90 border border-primary/30 rounded-2xl shadow-2xl p-0 w-full max-w-lg relative overflow-hidden">
        <button
          className="absolute top-4 right-4 text-3xl text-primary bg-white/80 rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-primary/90 hover:text-white transition-all z-10"
          onClick={onClose}
          aria-label="Cerrar"
        >
          &times;
        </button>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-8 pt-4">
          <h2 className="text-2xl font-bold mb-4 text-primary/90 text-center drop-shadow">{product ? 'Editar' : 'Nuevo'} producto</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Nombre</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Nombre del producto" className="border-2 border-primary/30 rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary/40 outline-none" required />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Categoría</label>
              <select name="category" value={form.category} onChange={handleChange} className="border-2 border-primary/30 rounded-xl px-4 py-2">
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Precio</label>
              <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Precio" className="border-2 border-primary/30 rounded-xl px-4 py-2" required min={0} step={0.01} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Stock</label>
              <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Stock disponible" className="border-2 border-primary/30 rounded-xl px-4 py-2" required min={0} />
            </div>
            <div className="flex flex-col gap-1 sm:col-span-2">
              <label className="font-semibold">Descripción</label>
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Descripción detallada del producto" className="border-2 border-primary/30 rounded-xl px-4 py-2" rows={3} />
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <label className="font-semibold">Imágenes</label>
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
                    <Image src={img} alt="preview" width={72} height={72} className="rounded-xl object-cover aspect-square border-2 border-primary/30 shadow transition-all group-hover:brightness-75" style={{ width: '72px', height: 'auto', aspectRatio: '1/1' }} objectFit="cover" />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-white/80 text-red-600 rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-red-500 hover:text-white transition-all opacity-80 group-hover:opacity-100"
                      onClick={() => {
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
            </div>
          </div>
          <div className="flex gap-2 justify-end mt-4">
            <button type="button" className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 font-semibold shadow" onClick={onClose}>Cancelar</button>
            <button type="submit" className="px-4 py-2 rounded-xl bg-primary text-white font-bold shadow hover:bg-primary/90">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
