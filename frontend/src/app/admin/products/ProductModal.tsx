"use client";
import React, { useRef, useState } from "react";

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
  categories: string[];
}

export default function ProductModal({ open, onClose, onSave, initialData, categories }: ProductModalProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [price, setPrice] = useState(initialData?.price || "");
  const [stock, setStock] = useState(initialData?.stock || "");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={onClose}>&times;</button>
        <h2 className="text-2xl font-bold mb-4">{initialData ? "Editar producto" : "Agregar producto"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre"
            className="input input-bordered w-full"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <select
            className="input input-bordered w-full"
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
          >
            <option value="">Selecciona categoría</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Precio"
            className="input input-bordered w-full"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
            min={0}
            step={0.01}
          />
          <input
            type="number"
            placeholder="Stock"
            className="input input-bordered w-full"
            value={stock}
            onChange={e => setStock(e.target.value)}
            required
            min={0}
          />
          <div>
            <label className="block mb-2 font-semibold">Imágenes</label>
            <input
              type="file"
              multiple
              accept="image/*"
              ref={fileInput}
              onChange={handleImageChange}
              className="input input-bordered w-full"
            />
            <div className="flex gap-2 mt-2 flex-wrap">
              {preview.map((img, i) => (
                <img key={i} src={img} alt="preview" className="w-16 h-16 object-cover rounded" />
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
