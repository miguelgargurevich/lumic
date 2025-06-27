import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  name: string;
  price: number;
  image: string;
  description: string;
  isAdmin?: boolean;
}

export default function ProductModal({ open, onClose, name, price, image, description, isAdmin }: ProductModalProps) {
  const { addToCart } = useCart();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white/90 border border-primary/30 rounded-2xl shadow-2xl p-0 w-full max-w-lg relative overflow-hidden">
        <button
          className="absolute top-4 right-4 text-3xl text-primary bg-white/80 rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-primary/90 hover:text-white transition-all z-10"
          onClick={onClose}
          aria-label="Cerrar"
        >
          &times;
        </button>
        <div className="p-8 pt-4 flex flex-col gap-2">
          <h2 className="text-3xl font-extrabold mb-2 text-center text-primary drop-shadow">{name}</h2>
          <div className="flex items-center justify-center mb-4">
            <Image src={image} alt={name} width={200} height={200} className="rounded-2xl object-cover border-2 border-primary/20 shadow-lg bg-white" style={{ width: 200, height: 200 }} unoptimized />
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4 text-base">
            <div className="mb-1 col-span-2"><b>Precio:</b> <span className="font-bold text-primary">${price.toFixed(2)}</span></div>
            <div className="mb-1 col-span-2"><b>Descripción:</b> {description}</div>
          </div>
          {!isAdmin && (
            <button
              className="mt-6 px-6 py-2 rounded-lg bg-primary text-white font-bold shadow-md hover:bg-primary/90 transition border border-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/40 inline-flex items-center gap-2 justify-center w-full text-base"
              onClick={() => {
                addToCart({ name, price, image });
                toast.success("Producto agregado al carrito", { description: name });
                onClose();
              }}
            >
              <ShoppingCart className="w-5 h-5" />
              Agregar al carrito
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
