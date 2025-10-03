"use client";

import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { FaSearch, FaDownload, FaQrcode } from "react-icons/fa";
import { useTheme } from "../components/ThemeContext";

const empleadosData = [
  { id: 1, nombre: "Sofia Rodriguez", dni: "78901234", cargo: "Gerente de Ventas" },
  { id: 2, nombre: "Carlos Pérez", dni: "87654321", cargo: "Analista de Marketing" },
  { id: 3, nombre: "Ana García", dni: "12345678", cargo: "Coordinadora de RRHH" },
  { id: 4, nombre: "Luis Martínez", dni: "23456789", cargo: "Contador Senior" },
  { id: 5, nombre: "Elena Sánchez", dni: "34567890", cargo: "Desarrolladora de Software" }
];

export default function GenerarQR() {
  const { isDarkMode } = useTheme();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generationComplete, setGenerationComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    alert("¡Códigos QR descargados exitosamente!");
  };

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: isDarkMode ? "#111827" : "#f8fafc" }}>
      <Sidebar />
      <main style={{ flex: 1, overflow: "auto" }}>
        <div style={{ padding: isMobile ? "16px" : "32px" }}>
          <div style={{ marginBottom: "32px", marginTop: isMobile ? "56px" : "32px" }}>
            <h1 style={{
              fontSize: "28px",
              fontWeight: "700",
              color: isDarkMode ? "#f9fafb" : "#1f2937",
              margin: "0 0 8px 0"
            }}>
              Generar Código QR
            </h1>
            <p style={{
              color: isDarkMode ? "#cbd5e1" : "#6b7280",
              margin: 0,
              fontSize: "16px"
            }}>
              Selecciona uno o varios empleados para generar un código QR individual o masivo.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "32px"
          }}>
            {/* Tabla de empleados */}
            <div style={{
              backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
              borderRadius: "12px",
              border: isDarkMode ? "1px solid #334155" : "1px solid #e5e7eb",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
              <div style={{ padding: "24px 24px 0 24px" }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px"
                }}>
                  <h2 style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: isDarkMode ? "#f9fafb" : "#1f2937",
                    margin: 0
                  }}>
                    Empleados
                  </h2>
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      placeholder="Buscar empleados..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{
                        width: isMobile ? "140px" : "180px",
                        padding: "8px 12px 8px 32px",
                        border: isDarkMode ? "1px solid #475569" : "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "14px",
                        outline: "none",
                        backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
                        color: isDarkMode ? "#f9fafb" : "#111827"
                      }}
                    />
                    <FaSearch style={{
                      position: "absolute",
                      left: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: isDarkMode ? "#94a3b8" : "#9ca3af",
                      fontSize: "14px"
                    }} />
                  </div>
                </div>
              </div>
              <div style={{
                maxHeight: "300px",
                overflowY: "auto",
                padding: "0 24px 24px 24px"
              }}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "40px 1fr 120px 1fr",
                  padding: "12px 0",
                  borderBottom: isDarkMode ? "1px solid #475569" : "1px solid #f3f4f6",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: isDarkMode ? "#cbd5e1" : "#6b7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "8px"
                }}>
                  <div>
                    <input
                      type="checkbox"
                      checked={selectedEmployees.length === filteredEmployees.length && filteredEmployees.length > 0}
                      onChange={handleSelectAll}
                      style={{
                        width: "16px",
                        height: "16px",
                        accentColor: "#1d4ed8",
                        cursor: "pointer"
                      }}
                    />
                  </div>
                  <div>Nombre</div>
                  <div>DNI</div>
                  <div>Cargo</div>
                </div>
                {filteredEmployees.map((empleado) => (
                  <div
                    key={empleado.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "40px 1fr 120px 1fr",
                      padding: "12px 0",
                      borderBottom: isDarkMode ? "1px solid #475569" : "1px solid #f9fafb",
                      alignItems: "center",
                      cursor: "pointer",
                      transition: "background-color 0.2s ease",
                      backgroundColor: "transparent",
                      color: isDarkMode ? "#f9fafb" : undefined,
                    }}
                    onClick={() => handleEmployeeSelect(empleado.id)}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = isDarkMode ? "#334155" : "#f9fafb"}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                  >
                    <div style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      backgroundColor: isDarkMode ? "#1f2937" : "#e5e7eb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px"
                    }}>
                      <input
                        type="checkbox"
                        checked={selectedEmployees.includes(empleado.id)}
                        onChange={e => {
                          e.stopPropagation();
                          handleEmployeeSelect(empleado.id);
                        }}
                        style={{
                          width: "16px",
                          height: "16px",
                          accentColor: "#1d4ed8",
                          cursor: "pointer"
                        }}
                      />
                    </div>
                    <div style={{ fontSize: "14px", fontWeight: "500", color: isDarkMode ? "#f9fafb" : "#1f2937" }}>{empleado.nombre}</div>
                    <div style={{ fontSize: "14px", color: isDarkMode ? "#cbd5e1" : "#6b7280", fontFamily: "monospace" }}>{empleado.dni}</div>
                    <div style={{ fontSize: "13px", color: isDarkMode ? "#cbd5e1" : "#6b7280" }}>{empleado.cargo}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{
              backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
              borderRadius: "12px",
              border: isDarkMode ? "1px solid #334155" : "1px solid #e5e7eb",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "350px"
            }}>
              <div style={{
                width: "100%",
                marginBottom: "20px",
                marginTop: "-70px"
              }}>
                <h2 style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: isDarkMode ? "#f9fafb" : "#1f2937",
                  margin: "0 0 8px 0"
                }}>
                  Selección de empleados
                </h2>
                <button
                  onClick={handleSelectAll}
                  style={{
                    fontSize: "12px",
                    color: "#1d4ed8",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textDecoration: "underline",
                    marginBottom: "16px"
                  }}
                >
                  {selectedEmployees.length === filteredEmployees.length ? "Deseleccionar todo" : "Seleccionar todo"}
                </button>
              </div>
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
              <div style={{ width: "100%", marginTop: "24px" }}>
                {!isGenerating && !generationComplete && (
                  <div style={{ textAlign: "center" }}>
                    <div style={{
                      width: "60px",
                      height: "60px",
                      backgroundColor: isDarkMode ? "#334155" : "#f3f4f6",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                      margin: "0 auto 12px"
                    }}>📋</div>
                    <p style={{
                      fontSize: "14px",
                      color: isDarkMode ? "#94a3b8" : "#6b7280",
                      margin: 0
                    }}>
                      Elige empleados para generar sus códigos QR
                    </p>
                  </div>
                )}
                {isGenerating && (
                  <div style={{ textAlign: "center", width: "100%" }}>
                    <div style={{
                      width: "60px",
                      height: "60px",
                      backgroundColor: "#dbeafe",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                      margin: "0 auto 12px"
                    }}>⚡</div>
                    <p style={{
                      fontSize: "14px",
                      color: "#1d4ed8",
                      margin: "0 0 8px 0"
                    }}>Generando código QR...</p>
                    <div style={{
                      width: "100%",
                      height: "8px",
                      backgroundColor: "#e5e7eb",
                      borderRadius: "4px",
                      margin: "12px 0",
                      overflow: "hidden"
                    }}>
                      <div style={{
                        width: `${progress}%`,
                        height: "100%",
                        backgroundColor: "#1d4ed8",
                        transition: "width 0.3s ease",
                        borderRadius: "4px"
                      }} />
                    </div>
                    <p style={{
                      fontSize: "14px",
                      color: isDarkMode ? "#94a3b8" : "#6b7280",
                      margin: 0
                    }}>{progress}%</p>
                  </div>
                )}
                {generationComplete && (
                  <div style={{ textAlign: "center", width: "100%" }}>
                    <div style={{
                      width: "60px",
                      height: "60px",
                      backgroundColor: "#dcfce7",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                      margin: "0 auto 12px"
                    }}>✅</div>
                    <p style={{
                      fontSize: "14px",
                      color: "#166534",
                      margin: "0 0 8px 0"
                    }}>¡QR generados!</p>
                    <button
                      onClick={handleDownload}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                        backgroundColor: "#1d4ed8",
                        color: "#fff",
                        padding: "12px 16px",
                        borderRadius: "8px",
                        border: "none",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        width: "100%",
                        marginTop: "12px"
                      }}>
                      <FaDownload />
                      Descargar Código QR (PDF)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </main>
    </div>
  );
}
