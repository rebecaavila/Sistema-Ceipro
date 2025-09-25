"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaUsers,
  FaQrcode,
  FaCamera,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const links = [
    { name: "Inicio", href: "/dashboard", icon: <FaHome /> },
    { name: "Personal", href: "/personal", icon: <FaUsers /> },
    { name: "Generar QR", href: "/generar-qr", icon: <FaQrcode /> },
    { name: "Escanear", href: "/escanear-qr", icon: <FaCamera /> },
  ];

  const handleLogout = () => {
    console.log("Cerrando sesión...");
  };

  return (
    <aside
      style={{
        height: "100vh",
        width: collapsed ? "80px" : "280px",
        backgroundColor: "#ffffff",
        boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s ease",
        position: "relative",
        borderRight: "1px solid #e5e7eb"
      }}
    >
      {/* Header con logo y botón X */}
      <div
        style={{
          padding: "24px 20px",
          borderBottom: "1px solid #f3f4f6",
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          position: "relative"
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1 }}>
          <img 
            src="/log.webp" 
            alt="CEIPRO" 
            style={{ 
              height: collapsed ? "32px" : "40px", 
              width: "auto",
              transition: "height 0.3s ease"
            }} 
          />
        </div>

        {/* Botón X para colapsar */}
        {!collapsed && (
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
              border: "1px solid #e5e7eb",
              borderRadius: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              color: "#6b7280",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f3f4f6";
              e.currentTarget.style.color = "#374151";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#6b7280";
            }}
          >
            <FaTimes />
          </button>
        )}

        {/* Botón para expandir cuando está colapsado */}
        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            style={{
              position: "absolute",
              top: "24px",
              right: "-12px",
              width: "24px",
              height: "24px",
              backgroundColor: "#1d4ed8",
              border: "2px solid #ffffff",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              color: "#ffffff",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              transition: "all 0.2s ease",
              zIndex: 10
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1e40af";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#1d4ed8";
            }}
          >
            →
          </button>
        )}
      </div>

      {/* Navegación */}
      <nav style={{ 
        flex: 1, 
        padding: "16px 12px",
        display: "flex",
        flexDirection: "column",
        gap: "8px"
      }}>
        {links.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href === "/personal" && pathname.startsWith("/personal"));
          
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
                color: isActive ? "#ffffff" : "#6b7280",
                fontWeight: isActive ? "600" : "500",
                fontSize: "14px",
                position: "relative"
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "#f3f4f6";
                  e.currentTarget.style.color = "#1f2937";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#6b7280";
                }
              }}
            >
              <span style={{ 
                fontSize: "18px",
                marginRight: collapsed ? "0" : "12px",
                display: "flex",
                alignItems: "center"
              }}>
                {link.icon}
              </span>
              {!collapsed && <span>{link.name}</span>}

              {/* Tooltip para modo colapsado */}
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
                    opacity: "0",
                    visibility: "hidden",
                    transition: "all 0.2s ease",
                    pointerEvents: "none",
                    zIndex: "1000",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                  }}
                  className="tooltip"
                >
                  {link.name}
                  <div style={{
                    position: "absolute",
                    left: "-4px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#1f2937",
                    rotate: "45deg"
                  }}></div>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Perfil y logout */}
      <div style={{ 
        borderTop: "1px solid #f3f4f6", 
        padding: "16px"
      }}>
        {!collapsed ? (
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between",
            backgroundColor: "#f9fafb",
            borderRadius: "8px",
            padding: "12px"
          }}>
            <div style={{ 
              display: "flex", 
              alignItems: "center",
              gap: "12px"
            }}>
              <img
                src="/RONALDO.png"
                alt="Perfil"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "2px solid #e5e7eb",
                  objectFit: "cover"
                }}
              />
              <div>
                <p style={{ 
                  fontSize: "14px", 
                  fontWeight: "600", 
                  color: "#1f2937",
                  margin: 0,
                  lineHeight: "1.2"
                }}>
                  Ronaldo Rojas
                </p>
                <p style={{ 
                  fontSize: "12px", 
                  color: "#6b7280",
                  margin: 0,
                  lineHeight: "1.2"
                }}>
                  Administrador
                </p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              style={{
                padding: "8px",
                backgroundColor: "transparent",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                color: "#ef4444",
                fontSize: "16px",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#fee2e2";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <FaSignOutAlt />
            </button>
          </div>
        ) : (
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center",
            gap: "12px"
          }}>
            <img
              src="/RONALDO.png"
              alt="Perfil"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "2px solid #e5e7eb",
                objectFit: "cover"
              }}
            />
            
            <button
              onClick={handleLogout}
              style={{
                padding: "8px",
                backgroundColor: "transparent",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                color: "#ef4444",
                fontSize: "16px",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#fee2e2";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <FaSignOutAlt />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}