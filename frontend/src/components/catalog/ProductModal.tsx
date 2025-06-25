import React from "react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import Image from "next/image";

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  name: string;
  price: number;
  image: string;
  description: string;
}

export default function ProductModal({ open, onClose, name, price, image, description }: ProductModalProps) {
  const { addToCart } = useCart();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={onClose}>&times;</button>
        <Image src={image} alt={name} width={160} height={160} className="w-40 h-40 object-contain mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2 font-poppins">{name}</h2>
        <span className="text-primary text-xl font-semibold mb-2 block">${price.toFixed(2)}</span>
        <p className="text-muted-foreground mb-4">{description}</p>
        <button
          className="btn btn-primary w-full"
          onClick={() => {
            addToCart({ name, price, image });
            toast.success("Producto agregado al carrito", { description: name });
            onClose();
          }}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
