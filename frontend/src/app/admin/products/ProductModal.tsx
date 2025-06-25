"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";

import { Product } from "@/data/products";

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: ProductFormData) => void;
  initialData?: Product;
  categories: string[];
}

// Definir tipo para el formulario (sin id ni descripción)
interface ProductFormData {
  name: string;
  category: string;
  price: number;
  stock: number;
  images: File[];
}

export default function ProductModal({ open, onClose, onSave, initialData, categories }: ProductModalProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [price, setPrice] = useState(initialData?.price?.toString() || "");
  const [stock, setStock] = useState(initialData?.stock?.toString() || "");
  const [images, setImages] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>(initialData?.images || []);
  const fileInput = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(files);
      setPreview(files.map(f => URL.createObjectURL(f)));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, category, price: parseFloat(price), stock: parseInt(stock), images });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative border border-gray-200 animate-fade-in">
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="product-name" className="block text-base font-semibold mb-2 text-gray-900">Nombre</label>
            <input
              id="product-name"
              type="text"
              placeholder="Nombre del producto"
              className="input input-bordered w-full rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-gray-900 bg-gray-50"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="product-category" className="block text-base font-semibold mb-2 text-gray-900">Categoría</label>
            <select
              id="product-category"
              className="input input-bordered w-full rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-gray-900 bg-gray-50"
              value={category}
              onChange={e => setCategory(e.target.value)}
              required
            >
              <option value="">Selecciona una categoría</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="product-price" className="block text-base font-semibold mb-2 text-gray-900">Precio</label>
              <input
                id="product-price"
                type="number"
                placeholder="Precio"
                className="input input-bordered w-full rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-gray-900 bg-gray-50"
                value={price}
                onChange={e => setPrice(e.target.value)}
                min={0}
                step={0.01}
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="product-stock" className="block text-base font-semibold mb-2 text-gray-900">Stock</label>
              <input
                id="product-stock"
                type="number"
                placeholder="Stock"
                className="input input-bordered w-full rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-gray-900 bg-gray-50"
                value={stock}
                onChange={e => setStock(e.target.value)}
                min={0}
                step={1}
                required
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
              className="input input-bordered w-full rounded-lg border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-gray-900 bg-gray-50"
              ref={fileInput}
              onChange={handleImageChange}
            />
            {/* Previsualización de imágenes */}
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
          <div className="flex gap-3 justify-end mt-6">
            <button
              type="button"
              className="px-5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold shadow-sm border border-gray-200 transition"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-primary text-white font-bold shadow-md hover:bg-primary/90 transition border border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
