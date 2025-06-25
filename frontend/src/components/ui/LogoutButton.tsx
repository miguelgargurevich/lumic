"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("lumic_token");
    localStorage.removeItem("lumic_role");
    router.replace("/login");
  };
  return (
    <button className="btn btn-outline btn-danger" onClick={handleLogout}>
      Cerrar sesión
    </button>
  );
}
