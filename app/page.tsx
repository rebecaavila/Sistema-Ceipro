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

    // Simular validación 
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
        padding: "10px",
      }}
    >
      <section
        style={{
          width: "min(360px, 90%)",
          background: "#fff",
          borderRadius: "12px",
          padding: "24px 20px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
          border: "1px solid #e5e7eb",
          textAlign: "center",
        }}
      >
        {/* Logo CEIPRO */}
        <div style={{ marginBottom: "20px" }}>
          <img
            src="/log.webp"
            alt="CEIPRO"
            style={{
              margin: "0 auto 12px",
              height: "40px",
              width: "auto"
            }}
          />
          <h1 style={{
            fontSize: "22px",
            fontWeight: "700",
            color: "#1f2937",
            marginBottom: "6px",
            margin: 0
          }}>
            Bienvenido
          </h1>
          <p style={{
            fontSize: "12px",
            color: "#6b7280",
            margin: 0
          }}>
            Ingresa a tu cuenta para continuar
          </p>
        </div>

        {/* Formulario */}
        <form
          style={{ display: "grid", gap: "18px" }}
          onSubmit={handleSubmit}
        >
          <div style={{ textAlign: "left" }}>
            <label
              htmlFor="user"
              style={{
                fontSize: "12px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "6px",
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
                height: "40px",
                borderRadius: "6px",
                border: "2px solid #e5e7eb",
                padding: "0 12px",
                fontSize: "14px",
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
                fontSize: "12px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "6px",
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
                height: "40px",
                borderRadius: "6px",
                border: "2px solid #e5e7eb",
                padding: "0 12px",
                fontSize: "14px",
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
              marginTop: "12px",
              height: "40px",
              border: "none",
              borderRadius: "6px",
              background: isLoading ? "#9ca3af" : "#1d4ed8",
              color: "#fff",
              fontSize: "14px",
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
        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <p style={{ fontSize: "10px", color: "#9ca3af", margin: 0 }}>
            Sistema de Gestión de Asistencia
          </p>
          <p style={{ fontSize: "10px", color: "#d1d5db", marginTop: "4px", margin: 0 }}>
            CEIPRO © 2025
          </p>
        </div>
      </section>
    </main>
  );
}
