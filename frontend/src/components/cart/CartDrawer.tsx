"use client";
import React from "react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function handleCheckout() {
    alert('¡Gracias por tu compra! (flujo demo)');
    clearCart();
    onClose();
  } 
 
  return (
    <div className={`fixed inset-0 z-50 flex justify-end bg-black/40 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div
        className={`w-full max-w-md h-full bg-white shadow-lg p-6 flex flex-col transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Carrito</h2>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-primary border-2 border-primary shadow hover:bg-primary hover:text-white transition-all text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-primary/40"
            onClick={onClose}
            aria-label="Cerrar carrito"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        {cart.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">El carrito está vacío</div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto mb-4 divide-y">
              {cart.map((item, i) => (
                <li key={i} className="py-3 flex items-center gap-4">
                  <Image src={item.image} alt={item.name} width={48} height={48} className="w-12 h-12 object-contain rounded" />
                  <div className="flex-1">
                    <div className="font-semibold">{item.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-lg flex items-center justify-center shadow hover:bg-primary/20 transition disabled:opacity-40 disabled:cursor-not-allowed"
                        onClick={() => updateQuantity(item.name, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        aria-label="Disminuir cantidad"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-bold text-base select-none">{item.quantity}</span>
                      <button
                        className="w-8 h-8 rounded-full bg-primary text-white font-bold text-lg flex items-center justify-center shadow hover:bg-primary/90 transition"
                        onClick={() => updateQuantity(item.name, item.quantity + 1)}
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                      <span className="text-sm text-muted-foreground ml-2 min-w-[70px] text-right font-semibold">
                        ${ (item.price * item.quantity).toFixed(2) }
                      </span>
                    </div>
                  </div>
                  <button
                    className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center shadow hover:bg-red-600 transition ml-2"
                    onClick={() => removeFromCart(item.name)}
                    aria-label="Quitar del carrito"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </li>
              ))}
            </ul>
            <div className="mb-4 flex justify-between items-center font-bold text-lg">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex gap-2">
              <button className="w-1/2 py-3 rounded-xl border-2 border-primary text-primary font-bold bg-white shadow hover:bg-primary/10 transition" onClick={clearCart}>Vaciar</button>
              <button className="w-1/2 py-3 rounded-xl bg-primary text-white font-bold shadow hover:bg-primary/90 transition" onClick={handleCheckout}>Finalizar compra</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
