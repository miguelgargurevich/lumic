import Link from "next/link";
import { FaInstagram, FaFacebook, FaWhatsapp, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-primary to-black text-primary-foreground pt-12 pb-8 mt-0">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-6">
        <div className="flex gap-6 text-xl md:text-2xl mb-1">
          <Link href="https://instagram.com" target="_blank" aria-label="Instagram" className="hover:text-[#E1306C] transition">
            <FaInstagram className="text-white drop-shadow-lg" />
          </Link>
          <Link href="https://facebook.com" target="_blank" aria-label="Facebook" className="hover:text-[#1877F3] transition">
            <FaFacebook className="text-white drop-shadow-lg" />
          </Link>
          <Link href="https://wa.me/1234567890" target="_blank" aria-label="WhatsApp" className="hover:text-[#25D366] transition">
            <FaWhatsapp className="text-white drop-shadow-lg" />
          </Link>
          <Link href="https://tiktok.com" target="_blank" aria-label="TikTok" className="hover:text-[#000000] transition">
            <FaTiktok className="text-white drop-shadow-lg" />
          </Link>
        </div>
        <div className="text-sm md:text-base text-center text-white/80 max-w-2xl mb-1">
          Síguenos en redes sociales y mantente al día con las novedades, ofertas y tips de iluminación.
        </div>
        <div className="text-xs md:text-sm text-white/60 text-center">
          © {new Date().getFullYear()} Lumic. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
