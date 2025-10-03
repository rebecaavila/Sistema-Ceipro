"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaClipboardList,
  FaCalendarCheck,
  FaSignOutAlt,
  FaTimes,
  FaBars,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import { useTheme } from "./ThemeContext";

export default function SidebarEmpleado() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { isDarkMode, toggleTheme } = useTheme();

  const empleadoLogueado = {
    nombre: "Sofia Rodriguez",
    cargo: "Gerente de Proyecto",
    foto: "/avatars/sofia.jpg",
  };

  const links = [
    { name: "Inicio", href: "/dashboard-personal", icon: <FaHome /> },
    { name: "Actividades", href: "/actividades", icon: <FaClipboardList /> },
    { name: "Asistencias", href: "/asistencias", icon: <FaCalendarCheck /> },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const handleLogout = () => {
    console.log("Cerrando sesión...");
  };

  if (isMobile && !mobileMenuOpen) {
    return (
      <button
        aria-label="Abrir menú"
        onClick={() => setMobileMenuOpen(true)}
        style={{
          position: "fixed",
          top: 18,
          left: 18,
          zIndex: 10000,
          backgroundColor: "#1d4ed8",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "12px",
          fontSize: "24px",
          cursor: "pointer",
        }}
      >
        <FaBars />
      </button>
    );
  }

  return (
    <>
      {isMobile && mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 9999,
          }}
        />
      )}
      <aside
        style={{
          height: "100vh",
          width: collapsed ? (isMobile ? 225 : 80) : (isMobile ? 225 : 280),
          backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
          color: isDarkMode ? "#f9fafb" : "#1e293b",
          boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.3s ease",
          position: isMobile ? "fixed" : "relative",
          zIndex: 10000,
          borderRight: isDarkMode ? "1px solid #334155" : "1px solid #e5e7eb",
          left: isMobile ? (mobileMenuOpen ? 0 : -280) : 0,
          top: 0,
          overflowY: "auto",
          paddingTop: 12,
        }}
      >
        {/* Header con logo y botón cerrar/colapsar */}
        <div
          style={{
            padding: "24px 20px",
            borderBottom: isDarkMode ? "1px solid #334155" : "1px solid #f3f4f6",
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "space-between",
            position: "relative",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1 }}>
            <img
              src="/log.webp"
              alt="CEIPRO"
              style={{
                height: collapsed ? 32 : 40,
                width: "auto",
                transition: "height 0.3s ease",
              }}
            />
          </div>

          {/* Botón cerrar menú móvil o colapsar escritorio */}
          {isMobile ? (
            <button
              aria-label="Cerrar menú"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                position: "absolute",
                top: "50%",
                right: 16,
                transform: "translateY(-50%)",
                width: 24,
                height: 24,
                backgroundColor: "transparent",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                color: isDarkMode ? "#cbd5e1" : "#6b7280",
                transition: "all 0.2s ease",
                zIndex: 10001,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f3f4f6";
                e.currentTarget.style.color = "#374151";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = isDarkMode ? "#cbd5e1" : "#6b7280";
              }}
            >
              <FaTimes />
            </button>
          ) : !collapsed ? (
            <button
              onClick={() => setCollapsed(true)}
              style={{
                position: "absolute",
                top: "50%",
                right: "16px",
                transform: "translateY(-50%)",
                width: "24px",
                height: "24px",
                backgroundColor: "transparent",
                border: isDarkMode ? "1px solid #334155" : "1px solid #e5e7eb",
                borderRadius: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                color: isDarkMode ? "#cbd5e1" : "#6b7280",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f3f4f6";
                e.currentTarget.style.color = "#374151";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = isDarkMode ? "#cbd5e1" : "#6b7280";
              }}
              title="Minimizar menú"
            >
              <FaTimes />
            </button>
          ) : (
            <button
              onClick={() => setCollapsed(false)}
              style={{
                position: "absolute",
                top: "50%",
                right: "-12px",
                width: "32px",
                height: "32px",
                backgroundColor: "#1d4ed8",
                border: "2px solid #ffffff",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                color: "#ffffff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                transition: "all 0.2s ease",
                zIndex: 10,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#2563eb";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#1d4ed8";
              }}
              title="Expandir menú"
            >
              ➤
            </button>
          )}
        </div>

        {/* Navegación */}
        <nav
          style={{
            flex: 1,
            padding: "16px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            color: isDarkMode ? "#f9fafb" : undefined,
          }}
        >
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href === "/actividades" && pathname.startsWith("/actividades")) ||
              (link.href === "/asistencias" && pathname.startsWith("/asistencias"));
            return (
              <Link
                key={link.name}
                href={link.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: collapsed ? "center" : "flex-start",
                  padding: collapsed ? "12px" : "12px 16px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  backgroundColor: isActive ? "#1d4ed8" : "transparent",
                  color: isActive ? "#fff" : isDarkMode ? "#cbd5e1" : "#6b7280",
                  fontWeight: isActive ? "600" : "500",
                  fontSize: "14px",
                  position: "relative",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = isDarkMode ? "#374151" : "#f3f4f6";
                    e.currentTarget.style.color = isDarkMode ? "#f9fafb" : "#1f2937";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = isDarkMode ? "#cbd5e1" : "#6b7280";
                  }
                }}
              >
                <span
                  style={{
                    fontSize: "18px",
                    marginRight: collapsed ? 0 : "12px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {link.icon}
                </span>
                {!collapsed && <span>{link.name}</span>}

                {/* Tooltip si está colapsado */}
                {collapsed && (
                  <div
                    style={{
                      position: "absolute",
                      left: "70px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      backgroundColor: "#1f2937",
                      color: "#ffffff",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      whiteSpace: "nowrap",
                      opacity: 0,
                      visibility: "hidden",
                      transition: "all 0.2s ease",
                      pointerEvents: "none",
                      zIndex: 1000,
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    }}
                    className="tooltip"
                  >
                    {link.name}
                    <div
                      style={{
                        position: "absolute",
                        left: "-4px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "8px",
                        height: "8px",
                        backgroundColor: "#1f2937",
                        rotate: "45deg",
                      }}
                    />
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Botón modo oscuro / claro */}
        <div style={{
          padding: "0 20px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: collapsed ? "center" : "stretch"
        }}>
          <button
            onClick={toggleTheme}
            style={{
              width: collapsed ? "48px" : "100%",
              padding: collapsed ? "10px 0" : "10px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: isDarkMode ? "#374151" : "#e5e7eb",
              color: isDarkMode ? "#f9fafb" : "#1e293b",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              fontSize: "16px",
              transition: "background-color 0.3s ease",
            }}
            title={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
            {!collapsed && (isDarkMode ? "Modo Claro" : "Modo Oscuro")}
          </button>
        </div>

        {/* Perfil y logout */}
        <div
          style={{
            borderTop: isDarkMode ? "1px solid #334155" : "1px solid #f3f4f6",
            padding: 16,
            color: isDarkMode ? "#f9fafb" : undefined,
          }}
        >
          {!collapsed ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: isDarkMode ? "#111827" : "#f9fafb",
                borderRadius: "8px",
                padding: "12px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <img
                  src={empleadoLogueado.foto}
                  alt="Perfil"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "2px solid #e5e7eb",
                    objectFit: "cover",
                  }}
                />
                <div>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      margin: 0,
                      lineHeight: "1.2",
                    }}
                  >
                    {empleadoLogueado.nombre}
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      color: isDarkMode ? "#cbd5e1" : "#6b7280",
                      margin: 0,
                      lineHeight: "1.2",
                    }}
                  >
                    {empleadoLogueado.cargo}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  padding: 8,
                  backgroundColor: "transparent",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  color: "#ef4444",
                  fontSize: 16,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#fee2e2";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                aria-label="Cerrar sesión"
              >
                <FaSignOutAlt />
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              <img
                src={empleadoLogueado.foto}
                alt="Perfil"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  border: "2px solid #e5e7eb",
                  objectFit: "cover",
                }}
              />

              <button
                onClick={handleLogout}
                style={{
                  padding: 8,
                  backgroundColor: "transparent",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  color: "#ef4444",
                  fontSize: 16,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#fee2e2";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
                aria-label="Cerrar sesión"
              >
                <FaSignOutAlt />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
