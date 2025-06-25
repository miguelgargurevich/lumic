"use client";
import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import CartDrawer from "./CartDrawer";
import { useCart } from "@/context/CartContext";

export default function CartButton() {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [animate, setAnimate] = useState(false);

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
        }`}
        onClick={handleClick}
      >
        <ShoppingCart size={20} />
        <span>Carrito</span>
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
