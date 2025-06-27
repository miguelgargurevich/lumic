"use client";
import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import CartDrawer from "./CartDrawer";
import { useCart } from "@/context/CartContext";

export default function CartButton({ iconOnly = false }: { iconOnly?: boolean }) {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [animate, setAnimate] = useState(false);
  const [hover, setHover] = useState(false);

  const handleClick = () => {
    setAnimate(true);
    setOpen(true);
    setTimeout(() => setAnimate(false), 400); // Duración de la animación
  };

  return (
    <>
      <button
        className={`relative btn btn-outline flex items-center gap-2 transition-transform ${
          animate ? "scale-110 animate-bounce" : ""
        } ${hover ? "animate-bounce" : ""}`}
        onClick={handleClick}
        aria-label="Carrito"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <ShoppingCart size={20} className="mr-1 transition-transform" />
        {!iconOnly && <span className="font-semibold">Carrito</span>}
        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full px-2 text-xs font-bold">
            {count}
          </span>
        )}
      </button>
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
