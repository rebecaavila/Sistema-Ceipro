"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { FaSearch, FaDownload, FaQrcode } from "react-icons/fa";

// Datos simulados de empleados
const empleadosData = [
  {
    id: 1,
    nombre: "Sofia Rodriguez",
    dni: "78901234",
    cargo: "Gerente de Ventas"
  },
  {
    id: 2,
    nombre: "Carlos Pérez",
    dni: "87654321",
    cargo: "Analista de Marketing"
  },
  {
    id: 3,
    nombre: "Ana García",
    dni: "12345678",
    cargo: "Coordinadora de RRHH"
  },
  {
    id: 4,
    nombre: "Luis Martínez",
    dni: "23456789",
    cargo: "Contador Senior"
  },
  {
    id: 5,
    nombre: "Elena Sánchez",
    dni: "34567890",
    cargo: "Desarrolladora de Software"
  }
];

export default function GenerarQR() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generationComplete, setGenerationComplete] = useState(false);

  // Filtrar empleados por término de búsqueda
  const filteredEmployees = empleadosData.filter(empleado =>
    empleado.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    empleado.dni.includes(searchTerm) ||
    empleado.cargo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEmployeeSelect = (employeeId: number) => {
    setSelectedEmployees(prev => 
      prev.includes(employeeId) 
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleSelectAll = () => {
    if (selectedEmployees.length === filteredEmployees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(filteredEmployees.map(emp => emp.id));
    }
  };

  const handleGenerateQR = () => {
    if (selectedEmployees.length === 0) {
      alert("Por favor selecciona al menos un empleado");
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setGenerationComplete(false);

    // Simular progreso de generación
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setGenerationComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDownload = () => {
    // Simular descarga
    console.log("Descargando códigos QR...");
    alert("¡Códigos QR descargados exitosamente!");
  };

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#f8fafc" }}>
      <Sidebar />
      <main style={{ flex: 1, overflow: "auto" }}>
        <div style={{ padding: "32px" }}>
          {/* Header */}
          <div style={{ marginBottom: "32px" }}>
            <h1 style={{ 
              fontSize: "28px", 
              fontWeight: "700", 
              color: "#1f2937",
              margin: "0 0 8px 0"
            }}>
              Generar Código QR
            </h1>
            <p style={{ 
              color: "#6b7280", 
              margin: 0,
              fontSize: "16px"
            }}>
              Selecciona uno o varios empleados para generar un código QR individual o masivo.
            </p>
          </div>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr 1fr",
            gap: "32px"
          }}>
            {/* Panel izquierdo - Selección de empleados */}
            <div style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
              {/* Header del panel */}
              <div style={{
                padding: "24px 24px 0 24px"
              }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px"
                }}>
                  <h2 style={{ 
                    fontSize: "18px", 
                    fontWeight: "600", 
                    color: "#1f2937",
                    margin: 0
                  }}>
                    Seleccionar Empleados
                  </h2>
                  <button
                    onClick={handleSelectAll}
                    style={{
                      fontSize: "12px",
                      color: "#1d4ed8",
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      textDecoration: "underline"
                    }}
                  >
                    {selectedEmployees.length === filteredEmployees.length ? "Deseleccionar todo" : "Seleccionar todo"}
                  </button>
                </div>

                {/* Buscador */}
                <div style={{ position: "relative", marginBottom: "20px" }}>
                  <input
                    type="text"
                    placeholder="Buscar empleados..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 12px 10px 40px",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      fontSize: "14px",
                      outline: "none"
                    }}
                  />
                  <FaSearch style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#9ca3af",
                    fontSize: "14px"
                  }} />
                </div>
              </div>

              {/* Lista de empleados */}
              <div style={{ 
                maxHeight: "400px", 
                overflowY: "auto",
                padding: "0 24px 24px 24px"
              }}>
                {/* Header de tabla */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "40px 1fr 120px 1fr",
                  padding: "12px 0",
                  borderBottom: "1px solid #f3f4f6",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#6b7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "8px"
                }}>
                  <div></div>
                  <div>Nombre</div>
                  <div>DNI</div>
                  <div>Cargo</div>
                </div>

                {/* Filas de empleados */}
                {filteredEmployees.map((empleado) => (
                  <div
                    key={empleado.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "40px 1fr 120px 1fr",
                      padding: "12px 0",
                      borderBottom: "1px solid #f9fafb",
                      alignItems: "center",
                      cursor: "pointer",
                      transition: "background-color 0.2s ease"
                    }}
                    onClick={() => handleEmployeeSelect(empleado.id)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f9fafb";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <div>
                      <input
                        type="checkbox"
                        checked={selectedEmployees.includes(empleado.id)}
                        onChange={() => handleEmployeeSelect(empleado.id)}
                        style={{
                          width: "16px",
                          height: "16px",
                          accentColor: "#1d4ed8",
                          cursor: "pointer"
                        }}
                      />
                    </div>
                    <div style={{ 
                      fontSize: "14px", 
                      fontWeight: "500", 
                      color: "#1f2937" 
                    }}>
                      {empleado.nombre}
                    </div>
                    <div style={{ 
                      fontSize: "14px", 
                      color: "#6b7280",
                      fontFamily: "monospace"
                    }}>
                      {empleado.dni}
                    </div>
                    <div style={{ 
                      fontSize: "13px", 
                      color: "#6b7280" 
                    }}>
                      {empleado.cargo}
                    </div>
                  </div>
                ))}
              </div>

              {/* Botón de generar */}
              <div style={{
                padding: "20px 24px",
                borderTop: "1px solid #f3f4f6",
                backgroundColor: "#f9fafb"
              }}>
                <button
                  onClick={handleGenerateQR}
                  disabled={selectedEmployees.length === 0 || isGenerating}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    backgroundColor: selectedEmployees.length === 0 || isGenerating ? "#9ca3af" : "#1d4ed8",
                    color: "#ffffff",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "none",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: selectedEmployees.length === 0 || isGenerating ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  <FaQrcode />
                  {isGenerating 
                    ? `Generando QR... (${selectedEmployees.length} empleado${selectedEmployees.length > 1 ? 's' : ''})`
                    : `Generar QR (${selectedEmployees.length} seleccionado${selectedEmployees.length !== 1 ? 's' : ''})`
                  }
                </button>
              </div>
            </div>

            {/* Panel derecho - Estado y descarga */}
            <div style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "500px"
            }}>
              {!isGenerating && !generationComplete && (
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "#f3f4f6",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "32px",
                    margin: "0 auto 20px"
                  }}>
                    📋
                  </div>
                  <h3 style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#374151",
                    margin: "0 0 8px 0"
                  }}>
                    Selecciona empleados
                  </h3>
                  <p style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    margin: 0
                  }}>
                    Elige uno o varios empleados de la lista para generar sus códigos QR
                  </p>
                </div>
              )}

              {isGenerating && (
                <div style={{ textAlign: "center", width: "100%" }}>
                  <div style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "#dbeafe",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "32px",
                    margin: "0 auto 20px",
                    animation: "pulse 2s infinite"
                  }}>
                    ⚡
                  </div>
                  <h3 style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#1d4ed8",
                    margin: "0 0 8px 0"
                  }}>
                    Generando código QR...
                  </h3>
                  <p style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    margin: "0 0 20px 0"
                  }}>
                    {progress}%
                  </p>
                  
                  {/* Barra de progreso */}
                  <div style={{
                    width: "100%",
                    height: "8px",
                    backgroundColor: "#e5e7eb",
                    borderRadius: "4px",
                    overflow: "hidden"
                  }}>
                    <div style={{
                      width: `${progress}%`,
                      height: "100%",
                      backgroundColor: "#1d4ed8",
                      transition: "width 0.3s ease",
                      borderRadius: "4px"
                    }}></div>
                  </div>
                </div>
              )}

              {generationComplete && (
                <div style={{ textAlign: "center", width: "100%" }}>
                  <div style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "#dcfce7",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "32px",
                    margin: "0 auto 20px"
                  }}>
                    ✅
                  </div>
                  <h3 style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#166534",
                    margin: "0 0 8px 0"
                  }}>
                    ¡Códigos QR generados!
                  </h3>
                  <p style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    margin: "0 0 24px 0"
                  }}>
                    Se han generado {selectedEmployees.length} código{selectedEmployees.length > 1 ? 's' : ''} QR exitosamente
                  </p>
                  
                  <button
                    onClick={handleDownload}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      backgroundColor: "#1d4ed8",
                      color: "#ffffff",
                      padding: "12px 24px",
                      borderRadius: "8px",
                      border: "none",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      width: "100%"
                    }}
                  >
                    <FaDownload />
                    Descargar Código QR (PDF)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}