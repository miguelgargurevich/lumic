"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ShoppingCart, User, MapPin, CreditCard, Mail } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("¡Compra realizada con éxito!", { description: `Gracias por tu compra, ${form.name}` });
      router.replace("/");
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-white flex items-center justify-center py-8 px-2 sm:px-6">
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-8">
        <div className="bg-white/95 border border-primary/10 rounded-3xl shadow-2xl p-0 overflow-hidden">
          {/* Header */}
          <div className="bg-primary/90 px-8 py-6 flex flex-col sm:flex-row items-center gap-3 sm:gap-6 justify-between mb-6 md:mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-3 drop-shadow-lg bg-transparent pl-2">
              <ShoppingCart className="w-9 h-9 text-white" /> <span className="bg-transparent">Finalizar compra</span>
            </h1>
            <span className="text-lg font-bold text-white bg-primary/60 rounded-xl px-4 py-2 shadow mr-2">Total: ${total.toFixed(2)}</span>
          </div>
          <div className="flex flex-col md:flex-row gap-8 p-8">
            {/* Resumen de artículos */}
            <div className="md:w-2/5 w-full mb-8 md:mb-0">
              <h2 className="text-lg font-bold mb-3 flex items-center gap-2 text-primary"><ShoppingCart className="w-5 h-5" /> Resumen</h2>
              <div className="bg-primary/5 rounded-2xl p-4 shadow-inner border border-primary/10">
                {cart.length === 0 ? (
                  <div className="text-muted-foreground text-center py-4">No hay artículos en el carrito.</div>
                ) : (
                  <ul className="divide-y mb-2">
                    {cart.map((item, i) => (
                      <li key={i} className="py-2 flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-contain border border-primary/20 bg-white" />
                        <div className="flex-1">
                          <div className="font-semibold text-base line-clamp-1">{item.name}</div>
                          <div className="text-xs text-muted-foreground">Cantidad: {item.quantity}</div>
                        </div>
                        <div className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</div>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex justify-between items-center font-bold text-base border-t pt-2 mt-2 px-4 pb-1">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            {/* Formulario de datos */}
            <form className="md:w-3/5 w-full flex flex-col gap-5" onSubmit={handleSubmit}>
              <h2 className="text-lg font-bold mb-2 flex items-center gap-2 text-primary"><User className="w-5 h-5" /> Tus datos</h2>
              <div>
                <label className="block text-sm font-semibold mb-1 flex items-center gap-1"><User className="w-4 h-4" /> Nombre completo</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                  placeholder="Tu nombre y apellido"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 flex items-center gap-1"><Mail className="w-4 h-4" /> Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                  placeholder="correo@ejemplo.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 flex items-center gap-1"><User className="w-4 h-4" /> Teléfono</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                  placeholder="Ej: 11 2345 6789"
                  pattern="[0-9\s\-()+]{8,}"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 flex items-center gap-1"><MapPin className="w-4 h-4" /> Dirección de entrega</label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                  placeholder="Calle, número, ciudad, provincia"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 flex items-center gap-1"><CreditCard className="w-4 h-4" /> Forma de pago</label>
                <select
                  name="payment"
                  value={form.payment}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="">Selecciona una opción</option>
                  <option value="tarjeta">Tarjeta de crédito/débito</option>
                  <option value="transferencia">Transferencia bancaria</option>
                  <option value="efectivo">Efectivo al recibir</option>
                </select>
              </div>
              <button
                type="submit"
                className="mt-4 w-full py-3 rounded-xl bg-primary text-white font-bold shadow hover:bg-primary/90 transition flex items-center justify-center gap-2 text-lg"
                disabled={loading}
              >
                {loading ? (
                  <svg className="animate-spin w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                ) : (
                  <ShoppingCart className="w-6 h-6" />
                )}
                Confirmar compra
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
