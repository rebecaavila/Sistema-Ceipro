"use client";

import { useState } from "react";
import SidebarEmpleado from "../components/Sidebar-personal";
import { FaCheckCircle, FaClock, FaCalendarAlt, FaChartLine } from "react-icons/fa";

// Datos simulados
const empleadoData = {
  nombre: "Laura",
  asistenciasDelMes: 18,
  tardanzas: 2,
  horasSemanales: 38.5,
  diasRestantes: 12
};

const asistenciasSemanal = [
  { dia: "Lunes", estado: "Puntual", entrada: "09:00", salida: "18:00" },
  { dia: "Martes", estado: "Puntual", entrada: "08:55", salida: "18:05" },
  { dia: "Miércoles", estado: "Tardanza", entrada: "09:15", salida: "18:00" },
  { dia: "Jueves", estado: "Puntual", entrada: "09:00", salida: "18:10" },
  { dia: "Viernes", estado: "Puntual", entrada: "08:58", salida: "17:55" }
];

const actividadesRecientes = [
  { id: 1, titulo: "Reunión de equipo semanal", completada: true },
  { id: 2, titulo: "Revisión de código del módulo de usuarios", completada: true },
  { id: 3, titulo: "Documentación de API REST", completada: false },
  { id: 4, titulo: "Capacitación en nuevas herramientas", completada: false }
];

const proximosEventos = [
  { fecha: "2024-08-15", titulo: "Revisión trimestral", tipo: "reunion" },
  { fecha: "2024-08-20", titulo: "Día del empleado", tipo: "festivo" },
  { fecha: "2024-08-25", titulo: "Capacitación grupal", tipo: "capacitacion" }
];

export default function DashboardPersonal() {
  const [vistaAsistencia, setVistaAsistencia] = useState<'semanal' | 'mensual'>('semanal');

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#f8fafc" }}>
      <SidebarEmpleado />
      <main style={{ flex: 1, overflow: "auto" }}>
        <div style={{ padding: "32px" }}>
          {/* Header */}
          <div style={{ marginBottom: "32px" }}>
            <h1 style={{ 
              fontSize: "32px", 
              fontWeight: "700", 
              color: "#1f2937",
              margin: "0 0 8px 0"
            }}>
              Bienvenida, {empleadoData.nombre}
            </h1>
            <p style={{ 
              color: "#6b7280", 
              margin: 0,
              fontSize: "16px"
            }}>
              ¡Qué bueno verte de nuevo! Tu energía impulsa nuestro éxito.
            </p>
          </div>

          {/* Cards de métricas */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginBottom: "32px"
          }}>
            <div style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              padding: "20px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#dcfce7",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <FaCheckCircle style={{ color: "#16a34a", fontSize: "20px" }} />
                </div>
                <div>
                  <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>Asistencias del Mes</p>
                  <p style={{ fontSize: "24px", fontWeight: "700", color: "#1f2937", margin: 0 }}>
                    {empleadoData.asistenciasDelMes}
                  </p>
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              padding: "20px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#fef3c7",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <FaClock style={{ color: "#f59e0b", fontSize: "20px" }} />
                </div>
                <div>
                  <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>Tardanzas</p>
                  <p style={{ fontSize: "24px", fontWeight: "700", color: "#1f2937", margin: 0 }}>
                    {empleadoData.tardanzas}
                  </p>
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              padding: "20px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#dbeafe",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <FaChartLine style={{ color: "#3b82f6", fontSize: "20px" }} />
                </div>
                <div>
                  <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>Horas esta Semana</p>
                  <p style={{ fontSize: "24px", fontWeight: "700", color: "#1f2937", margin: 0 }}>
                    {empleadoData.horasSemanales}h
                  </p>
                </div>
              </div>
            </div>

            <div style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              padding: "20px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#f3e8ff",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <FaCalendarAlt style={{ color: "#9333ea", fontSize: "20px" }} />
                </div>
                <div>
                  <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>Días Restantes</p>
                  <p style={{ fontSize: "24px", fontWeight: "700", color: "#1f2937", margin: 0 }}>
                    {empleadoData.diasRestantes}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Grid principal */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "2fr 1fr",
            gap: "24px",
            marginBottom: "24px"
          }}>
            {/* Asistencia Semanal */}
            <div style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
              <div style={{ padding: "24px", borderBottom: "1px solid #f3f4f6" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h2 style={{ 
                    fontSize: "18px", 
                    fontWeight: "600", 
                    color: "#1f2937",
                    margin: 0
                  }}>
                    Asistencia Semanal
                  </h2>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => setVistaAsistencia('semanal')}
                      style={{
                        padding: "6px 16px",
                        backgroundColor: vistaAsistencia === 'semanal' ? "#1e293b" : "#ffffff",
                        color: vistaAsistencia === 'semanal' ? "#ffffff" : "#64748b",
                        border: "1px solid #e2e8f0",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: "500",
                        cursor: "pointer"
                      }}
                    >
                      Semanal
                    </button>
                    <button
                      onClick={() => setVistaAsistencia('mensual')}
                      style={{
                        padding: "6px 16px",
                        backgroundColor: vistaAsistencia === 'mensual' ? "#1e293b" : "#ffffff",
                        color: vistaAsistencia === 'mensual' ? "#ffffff" : "#64748b",
                        border: "1px solid #e2e8f0",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: "500",
                        cursor: "pointer"
                      }}
                    >
                      Mensual
                    </button>
                  </div>
                </div>
              </div>

              <div style={{ padding: "24px" }}>
                {/* Mini gráfico de barras */}
                <div style={{ 
                  display: "flex", 
                  alignItems: "end", 
                  justifyContent: "space-between",
                  height: "150px",
                  gap: "12px",
                  marginBottom: "20px"
                }}>
                  {asistenciasSemanal.map((dia, index) => (
                    <div key={index} style={{ 
                      display: "flex", 
                      flexDirection: "column", 
                      alignItems: "center",
                      flex: 1
                    }}>
                      <div style={{
                        width: "100%",
                        height: `${dia.estado === "Falta" ? 0 : 100 + Math.random() * 30}px`,
                        backgroundColor: dia.estado === "Puntual" ? "#22c55e" : dia.estado === "Tardanza" ? "#f59e0b" : "#ef4444",
                        borderRadius: "4px 4px 0 0",
                        transition: "height 0.3s ease"
                      }}></div>
                      <span style={{ 
                        fontSize: "11px", 
                        color: "#6b7280",
                        marginTop: "8px",
                        fontWeight: "500"
                      }}>
                        {dia.dia.substring(0, 3)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Leyenda */}
                <div style={{ display: "flex", gap: "16px", fontSize: "12px", justifyContent: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div style={{ 
                      width: "12px", 
                      height: "12px", 
                      backgroundColor: "#22c55e",
                      borderRadius: "3px" 
                    }}></div>
                    <span style={{ color: "#6b7280" }}>Puntual</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div style={{ 
                      width: "12px", 
                      height: "12px", 
                      backgroundColor: "#f59e0b",
                      borderRadius: "3px" 
                    }}></div>
                    <span style={{ color: "#6b7280" }}>Tardanza</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div style={{ 
                      width: "12px", 
                      height: "12px", 
                      backgroundColor: "#ef4444",
                      borderRadius: "3px" 
                    }}></div>
                    <span style={{ color: "#6b7280" }}>Falta</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progreso de Actividades */}
            <div style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              padding: "24px"
            }}>
              <h2 style={{ 
                fontSize: "18px", 
                fontWeight: "600", 
                color: "#1f2937",
                margin: "0 0 20px 0"
              }}>
                Progreso de Actividades
              </h2>
              
              <div style={{ 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center",
                gap: "16px"
              }}>
                <div style={{
                  width: "140px",
                  height: "140px",
                  borderRadius: "50%",
                  background: `conic-gradient(#1e3a8a 0deg ${80 * 3.6}deg, #e5e7eb ${80 * 3.6}deg 360deg)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <div style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: "#ffffff",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column"
                  }}>
                    <span style={{ 
                      fontSize: "32px", 
                      fontWeight: "700", 
                      color: "#1f2937"
                    }}>
                      80%
                    </span>
                    <span style={{ 
                      fontSize: "11px", 
                      color: "#6b7280"
                    }}>
                      Completado
                    </span>
                  </div>
                </div>

                <div style={{ width: "100%", fontSize: "13px", color: "#6b7280", textAlign: "center" }}>
                  <p style={{ margin: 0 }}>Has completado <strong style={{ color: "#1f2937" }}>8 de 10</strong> actividades esta semana</p>
                </div>
              </div>
            </div>
          </div>

          {/* Grid inferior */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr 1fr",
            gap: "24px"
          }}>
            {/* Actividades Recientes */}
            <div style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              padding: "24px"
            }}>
              <h2 style={{ 
                fontSize: "18px", 
                fontWeight: "600", 
                color: "#1f2937",
                margin: "0 0 20px 0"
              }}>
                Actividades Recientes
              </h2>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {actividadesRecientes.map((actividad) => (
                  <div
                    key={actividad.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px",
                      borderRadius: "8px",
                      backgroundColor: "#f9fafb",
                      border: "1px solid #f3f4f6"
                    }}
                  >
                    <div style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: actividad.completada ? "#dcfce7" : "#fef3c7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}>
                      {actividad.completada ? (
                        <span style={{ color: "#16a34a", fontSize: "10px" }}>✓</span>
                      ) : (
                        <span style={{ color: "#f59e0b", fontSize: "10px" }}>○</span>
                      )}
                    </div>
                    <p style={{ 
                      fontSize: "14px", 
                      color: "#374151",
                      margin: 0,
                      textDecoration: actividad.completada ? "line-through" : "none",
                      opacity: actividad.completada ? 0.6 : 1
                    }}>
                      {actividad.titulo}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Próximos Eventos */}
            <div style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              padding: "24px"
            }}>
              <h2 style={{ 
                fontSize: "18px", 
                fontWeight: "600", 
                color: "#1f2937",
                margin: "0 0 20px 0"
              }}>
                Próximos Eventos
              </h2>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {proximosEventos.map((evento, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      gap: "12px",
                      padding: "12px",
                      borderRadius: "8px",
                      backgroundColor: "#f9fafb",
                      border: "1px solid #f3f4f6"
                    }}
                  >
                    <div style={{
                      minWidth: "48px",
                      height: "48px",
                      backgroundColor: evento.tipo === 'festivo' ? "#fef3c7" : "#dbeafe",
                      borderRadius: "8px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <span style={{ fontSize: "10px", color: "#6b7280", fontWeight: "500" }}>
                        {new Date(evento.fecha).toLocaleDateString('es', { month: 'short' }).toUpperCase()}
                      </span>
                      <span style={{ fontSize: "18px", color: "#1f2937", fontWeight: "700" }}>
                        {new Date(evento.fecha).getDate()}
                      </span>
                    </div>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: "500", color: "#1f2937", margin: "0 0 4px 0" }}>
                        {evento.titulo}
                      </p>
                      <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>
                        {evento.tipo === 'reunion' ? '📅 Reunión' : evento.tipo === 'festivo' ? '🎉 Día festivo' : '📚 Capacitación'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mensaje motivacional */}
          <div style={{
            marginTop: "24px",
            background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
            borderRadius: "12px",
            padding: "24px",
            color: "#ffffff",
            fontStyle: "italic",
            fontSize: "16px",
            textAlign: "center",
            boxShadow: "0 4px 6px rgba(30, 58, 138, 0.2)"
          }}>
            {"Sigue adelante, Laura. Tu dedicación es la chispa que enciende nuestro éxito. ¡Excelente trabajo!" }
          </div>
        </div>
      </main>
    </div>
  );
}