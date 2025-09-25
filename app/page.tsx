"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    user: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular validación (aquí puedes agregar tu lógica real)
    setTimeout(() => {
      if (formData.user && formData.password) {
        router.push('/dashboard');
      } else {
        alert('Por favor completa todos los campos');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)",
        padding: "20px",
      }}
    >
      <section
        style={{
          width: "min(420px, 90%)",
          background: "#fff",
          borderRadius: "16px",
          padding: "40px 32px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          border: "1px solid #e5e7eb",
          textAlign: "center",
        }}
      >
        {/* Logo CEIPRO */}
        <div style={{ marginBottom: "32px" }}>
          <img
            src="/log.webp"
            alt="CEIPRO"
            style={{ 
              margin: "0 auto 16px", 
              height: "60px",
              width: "auto"
            }}
          />
          <h1 style={{
            fontSize: "28px",
            fontWeight: "700",
            color: "#1f2937",
            marginBottom: "8px",
            margin: 0
          }}>
            Bienvenido
          </h1>
          <p style={{
            fontSize: "14px",
            color: "#6b7280",
            margin: 0
          }}>
            Ingresa a tu cuenta para continuar
          </p>
        </div>

        {/* Formulario */}
        <form
          style={{ display: "grid", gap: "24px" }}
          onSubmit={handleSubmit}
        >
          <div style={{ textAlign: "left" }}>
            <label
              htmlFor="user"
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "8px",
                display: "block",
              }}
            >
              Usuario
            </label>
            <input
              id="user"
              name="user"
              type="text"
              value={formData.user}
              onChange={handleChange}
              required
              placeholder="Ingresa tu usuario"
              style={{
                width: "100%",
                height: "48px",
                borderRadius: "8px",
                border: "2px solid #e5e7eb",
                padding: "0 16px",
                fontSize: "16px",
                transition: "all 0.2s",
                backgroundColor: "#f9fafb",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#3b82f6";
                e.target.style.backgroundColor = "#fff";
                e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.backgroundColor = "#f9fafb";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div style={{ textAlign: "left" }}>
            <label
              htmlFor="password"
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "8px",
                display: "block",
              }}
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Ingresa tu contraseña"
              style={{
                width: "100%",
                height: "48px",
                borderRadius: "8px",
                border: "2px solid #e5e7eb",
                padding: "0 16px",
                fontSize: "16px",
                transition: "all 0.2s",
                backgroundColor: "#f9fafb",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#3b82f6";
                e.target.style.backgroundColor = "#fff";
                e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.backgroundColor = "#f9fafb";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              marginTop: "16px",
              height: "48px",
              border: "none",
              borderRadius: "8px",
              background: isLoading ? "#9ca3af" : "#1d4ed8",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "600",
              cursor: isLoading ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.background = "#1e40af";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(29, 78, 216, 0.4)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.background = "#1d4ed8";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }
            }}
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>

        {/* Footer */}
        <div style={{ marginTop: "32px", textAlign: "center" }}>
          <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>
            Sistema de Gestión de Asistencia
          </p>
          <p style={{ fontSize: "12px", color: "#d1d5db", marginTop: "4px", margin: 0 }}>
            CEIPRO © 2025
          </p>
        </div>
      </section>
    </main>
  );
}