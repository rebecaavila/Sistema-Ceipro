"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaUsers, FaQrcode, FaCamera, FaSignOutAlt } from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Inicio", href: "/dashboard", icon: <FaHome /> },
    { name: "Personal", href: "/personal", icon: <FaUsers /> },
    { name: "Generar QR", href: "/generar-qr", icon: <FaQrcode /> },
    { name: "Escanear QR", href: "/escanear-qr", icon: <FaCamera /> },
  ];

  return (
    <aside className="h-screen w-64 bg-white shadow-md flex flex-col justify-between">
      {/* Logo */}
      <div className="flex flex-col items-center mt-6">
        <img src="/log.webp" alt="CEIPRO" className="w-28 mb-10" />
      </div>

      {/* Navegación */}
      <nav className="flex-1 space-y-2 px-4">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition font-medium ${
              pathname === link.href
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="text-lg">{link.icon}</span>
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>

      {/* Perfil abajo */}
      <div className="bg-gray-50 border-t p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src="/perfil.png" // ⚡ Cambia por la ruta real de la foto
            alt="perfil"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-sm font-semibold">Alejandro</p>
            <p className="text-xs text-gray-500">Administrador</p>
          </div>
        </div>
        <button className="text-red-500 text-xl hover:text-red-700 transition">
          <FaSignOutAlt />
        </button>
      </div>
    </aside>
  );
}
