"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { Product } from "@/data/products";
import { toast } from "sonner";

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: Product) => void;
  initialData?: Product;
  categories: string[];
}

export default function ProductModal({ open, onClose, onSave, initialData, categories }: ProductModalProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [price, setPrice] = useState(initialData?.price?.toString() || "");
  const [stock, setStock] = useState(initialData?.stock?.toString() || "");
  const [preview, setPreview] = useState<string[]>(initialData?.images || []);
  const [description, setDescription] = useState(initialData?.description || "");
  const [saving, setSaving] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setPreview(files.map(f => URL.createObjectURL(f)));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await Promise.resolve(onSave({
        id: initialData?.id || Date.now(),
        name,
        category,
        price: parseFloat(price),
        stock: parseInt(stock),
        images: preview,
        description
      }));
      toast.success("Producto guardado correctamente", { description: name });
      onClose();
    } catch (err) {
      toast.error("Error al guardar el producto");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary/30 via-white/80 to-primary/10 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl mx-auto rounded-3xl shadow-2xl border border-primary/30 bg-white/95 flex flex-col overflow-hidden max-h-[96vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 bg-gradient-to-r from-primary/90 to-primary/60 text-white rounded-t-3xl shadow-md">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight drop-shadow">{initialData ? 'Editar producto' : 'Nuevo producto'}</h2>
          <button
            className="text-3xl bg-white/20 hover:bg-white/40 text-white rounded-full w-11 h-11 flex items-center justify-center shadow transition-all border border-white/30"
            onClick={onClose}
            aria-label="Cerrar"
            type="button"
            disabled={saving}
          >
            &times;
          </button>
        </div>
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-8 px-8 py-6 overflow-y-auto" id="product-modal-form">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <label className="font-semibold text-primary/90">Nombre</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Nombre del producto" className="rounded-lg border-2 border-primary/30 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 px-4 py-2 bg-white shadow-sm text-base transition-all" required disabled={saving} />
              <label className="font-semibold text-primary/90 mt-4">Categoría</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="rounded-lg border-2 border-primary/30 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 px-4 py-2 bg-white shadow-sm text-base transition-all" disabled={saving}>
                <option value="">Selecciona una categoría</option>
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <label className="font-semibold text-primary/90 mt-4">Descripción</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descripción detallada del producto" className="rounded-lg border-2 border-primary/30 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 px-4 py-2 bg-white shadow-sm text-base min-h-[80px] transition-all" rows={4} disabled={saving} />
            </div>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-primary/90">Precio</label>
                  <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Precio" className="rounded-lg border-2 border-primary/30 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 px-4 py-2 bg-white shadow-sm text-base transition-all" required min={0} step={0.01} disabled={saving} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-primary/90">Stock</label>
                  <input type="number" value={stock} onChange={e => setStock(e.target.value)} placeholder="Stock disponible" className="rounded-lg border-2 border-primary/30 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 px-4 py-2 bg-white shadow-sm text-base transition-all" required min={0} disabled={saving} />
                </div>
              </div>
              <label className="font-semibold text-primary/90 mt-4">Imágenes</label>
              <div className="flex flex-col gap-2 border-2 border-dashed border-primary/30 rounded-xl p-4 bg-primary/5 hover:bg-primary/10 min-h-[110px] items-center justify-center transition-all">
                <div className="flex flex-wrap gap-3 mb-2 min-h-[88px] justify-center">
                  {preview.map((src, i) => (
                    <div key={i} className="relative group">
                      <Image
                        src={src}
                        alt={`Preview ${i+1}`}
                        width={80}
                        height={80}
                        className="rounded-xl border-2 border-primary/30 object-cover shadow-md bg-white"
                        style={{ width: '80px', height: 'auto', aspectRatio: '1/1' }}
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-white/90 text-red-600 rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-red-500 hover:text-white transition-all opacity-80 group-hover:opacity-100 border border-red-200"
                        onClick={() => setPreview(preview.filter((_, idx) => idx !== i))}
                        aria-label="Eliminar imagen"
                        disabled={saving}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <label className="w-20 h-20 flex items-center justify-center border-2 border-dashed border-primary/30 rounded-xl cursor-pointer bg-white/80 hover:bg-primary/10 transition-all relative">
                    <span className="text-primary text-2xl font-bold">+</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      ref={fileInput}
                      onChange={handleImageChange}
                      className="absolute opacity-0 w-full h-full left-0 top-0 cursor-pointer"
                      tabIndex={-1}
                      disabled={saving}
                    />
                  </label>
                </div>
                <span className="text-xs text-gray-500 text-center">Haz clic en + para agregar imágenes.</span>
              </div>
            </div>
          </div>
        </form>
        {/* Footer visualmente destacado y sticky */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-end items-center px-8 py-6 bg-gradient-to-t from-primary/10 via-white to-white border-t border-primary/20 rounded-b-3xl sticky bottom-0 z-20 shadow-xl">
          <button type="button" className="px-7 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold shadow border border-gray-300 transition text-base w-full sm:w-auto" onClick={onClose} disabled={saving}>Cancelar</button>
          <button type="submit" form="product-modal-form" className="px-7 py-2.5 rounded-xl bg-primary text-white font-bold shadow-md hover:bg-primary/90 transition border border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/40 text-base w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed" disabled={saving}>{saving ? 'Guardando...' : 'Guardar'}</button>
        </div>
      </div>
    </div>
  );
}
