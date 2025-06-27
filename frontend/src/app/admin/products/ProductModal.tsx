"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";

import { Product } from "@/data/products";

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
  const fileInput = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setPreview(files.map(f => URL.createObjectURL(f)));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: initialData?.id || Date.now(),
      name,
      category,
      price: parseFloat(price),
      stock: parseInt(stock),
      images: preview,
      description
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all">
      <div className="bg-white rounded-t-2xl shadow-2xl p-8 max-w-lg w-full relative border border-gray-200 animate-fade-in max-h-[90vh] overflow-y-auto sm:max-h-[80vh] flex flex-col" style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-primary text-3xl font-bold focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-full transition"
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          &times;
        </button>
        <h2 className="text-3xl font-extrabold mb-6 text-primary text-center tracking-tight">
          {initialData ? "Editar producto" : "Agregar producto"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6 flex-1" id="product-modal-form">
          {/* Campo nombre en una línea */}
          <div className="w-full">
            <label htmlFor="product-name" className="block text-base font-semibold mb-2 text-gray-900">Nombre del producto</label>
            <input
              id="product-name"
              type="text"
              className="input input-bordered w-full rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-gray-900 bg-white shadow-sm"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              aria-describedby="desc-nombre"
            />
          </div>
          {/* Campo categoría en una línea nueva SIEMPRE */}
          <div className="w-full">
            <label htmlFor="product-category" className="block text-base font-semibold mb-2 text-gray-900">Categoría</label>
            <select
              id="product-category"
              className="input input-bordered w-full rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-gray-900 bg-white shadow-sm"
              value={category}
              onChange={e => setCategory(e.target.value)}
              required
              aria-describedby="desc-categoria"
            >
              <option value="">Selecciona una categoría</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          {/* Campo descripción */}
          <div className="w-full">
            <label htmlFor="product-description" className="block text-base font-semibold mb-2 text-gray-900">Descripción</label>
            <textarea
              id="product-description"
              className="input input-bordered w-full rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-gray-900 bg-white shadow-sm min-h-[60px]"
              value={description}
              onChange={e => setDescription(e.target.value)}
              aria-describedby="desc-descripcion"
            />
          </div>
          {/* Precio y stock en la siguiente fila */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="product-price" className="block text-base font-semibold mb-2 text-gray-900">Precio</label>
              <input
                id="product-price"
                type="number"
                className="input input-bordered w-full rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-gray-900 bg-white shadow-sm"
                value={price}
                onChange={e => setPrice(e.target.value)}
                min={0}
                step={0.01}
                required
                aria-describedby="desc-precio"
              />
            </div>
            <div>
              <label htmlFor="product-stock" className="block text-base font-semibold mb-2 text-gray-900">Stock</label>
              <input
                id="product-stock"
                type="number"
                className="input input-bordered w-full rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-gray-900 bg-white shadow-sm"
                value={stock}
                onChange={e => setStock(e.target.value)}
                min={0}
                step={1}
                required
                aria-describedby="desc-stock"
              />
            </div>
          </div>
          <div>
            <label htmlFor="product-images" className="block text-base font-semibold mb-2 text-gray-900">Imágenes</label>
            <input
              id="product-images"
              type="file"
              accept="image/*"
              multiple
              className="input input-bordered w-full rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-gray-900 bg-white shadow-sm"
              ref={fileInput}
              onChange={handleImageChange}
              aria-describedby="desc-imagenes"
            />
            {preview.length > 0 && (
              <div className="flex gap-3 mt-3 flex-wrap">
                {preview.map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    alt={`Preview ${i+1}`}
                    width={70}
                    height={70}
                    className="rounded-lg border-2 border-primary/30 object-cover shadow-sm bg-white"
                  />
                ))}
              </div>
            )}
          </div>
        </form>
        {/* Botones SIEMPRE al borde inferior del modal */}
        <div className="flex gap-3 justify-end px-8 py-4 bg-white border-t border-gray-100 rounded-b-2xl fixed left-1/2 -translate-x-1/2 bottom-0 w-full max-w-lg z-20">
          <button
            type="button"
            className="px-5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold shadow-sm border border-gray-200 transition"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="px-5 py-2 rounded-lg bg-primary text-white font-bold shadow-md hover:bg-primary/90 transition border border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/40"
            onClick={() => document.getElementById('product-modal-form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
