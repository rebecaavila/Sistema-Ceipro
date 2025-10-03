"use client";

import { useState, useEffect } from "react";
import SidebarEmpleado from "../components/Sidebar-personal";
import { FaPlus, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useTheme } from "../components/ThemeContext";

const actividadesData = {
  hoy: [
    { id: 1, titulo: "Reunión con el equipo de marketing", completada: false },
    { id: 2, titulo: "Preparar informe de ventas", completada: false },
    { id: 3, titulo: "Seguimiento de clientes potenciales", completada: false }
  ],
  completadas: [
    { id: 4, titulo: "Enviar propuesta a cliente", completada: true },
    { id: 5, titulo: "Revisar campaña publicitaria", completada: true }
  ]
};

const tareasPorFecha: { [key: string]: Array<{ id: number; titulo: string; completada: boolean }> } = {
  "2025-9-29": [
    { id: 1, titulo: "Reunión con el equipo de marketing", completada: true },
    { id: 2, titulo: "Preparar informe de ventas", completada: false }
  ],
  "2025-9-30": [
    { id: 3, titulo: "Seguimiento de clientes potenciales", completada: true }
  ],
  "2025-10-1": [
    { id: 4, titulo: "Enviar propuesta a cliente", completada: true },
    { id: 5, titulo: "Revisar campaña publicitaria", completada: true }
  ]
};

const meses = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const diasSemana = ["D", "L", "M", "M", "J", "V", "S"];

export default function Actividades() {
  const { isDarkMode } = useTheme();

  const [showModal, setShowModal] = useState(false);
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [tareasHoy, setTareasHoy] = useState(actividadesData.hoy);
  const [tareasCompletadas, setTareasCompletadas] = useState(actividadesData.completadas);
  const [mesActual, setMesActual] = useState(new Date().getMonth());
  const [anoActual, setAnoActual] = useState(new Date().getFullYear());
  const [diaSeleccionado, setDiaSeleccionado] = useState(new Date().getDate());
  const [isMobile, setIsMobile] = useState(false);
  const [tareasDelDia, setTareasDelDia] = useState<Array<{ id: number; titulo: string; completada: boolean }>>(actividadesData.hoy);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getDiasDelMes = (mes: number, ano: number) => {
    const primerDia = new Date(ano, mes, 1).getDay();
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();
    const dias = [];

    for(let i=0; i<primerDia; i++) dias.push(null);
    for(let i=1; i<=ultimoDia; i++) dias.push(i);

    return dias;
  };

  const cambiarMes = (direccion: number) => {
    let nuevoMes = mesActual + direccion;
    let nuevoAno = anoActual;

    if (nuevoMes > 11) {
      nuevoMes = 0;
      nuevoAno++;
    }
    else if (nuevoMes < 0) {
      nuevoMes = 11;
      nuevoAno--;
    }

    setMesActual(nuevoMes);
    setAnoActual(nuevoAno);
  };

  const seleccionarDia = (dia: number) => {
    setDiaSeleccionado(dia);
    const fechaKey = `${anoActual}-${mesActual + 1}-${dia}`;
    const tareasDelDiaSeleccionado = tareasPorFecha[fechaKey] || [];
    setTareasDelDia(tareasDelDiaSeleccionado);
  };

  const agregarTarea = () => {
    if(nuevaTarea.trim() === "") return;
    
    const nuevaTareaObj = {
      id: Date.now(),
      titulo: nuevaTarea,
      completada: false
    };

    setTareasDelDia([...tareasDelDia, nuevaTareaObj]);
    
    const hoy = new Date();
    if(diaSeleccionado === hoy.getDate() && mesActual === hoy.getMonth() && anoActual === hoy.getFullYear()) {
      setTareasHoy([...tareasHoy, nuevaTareaObj]);
    }

    setNuevaTarea("");
    setShowModal(false);
  };

  const toggleTarea = (id: number, esCompletada: boolean) => {
    if (!esCompletada) {
      const tarea = tareasDelDia.find(t => t.id === id);
      if (tarea) {
        const tareaCompletada = { ...tarea, completada: true };
        setTareasDelDia(tareasDelDia.filter(t => t.id !== id));
        setTareasCompletadas([...tareasCompletadas, tareaCompletada]);

        const hoy = new Date();
        if (diaSeleccionado === hoy.getDate() && mesActual === hoy.getMonth() && anoActual === hoy.getFullYear()) {
          setTareasHoy(tareasHoy.filter(t => t.id !== id));
        }
      }
    }
  };

  const eliminarTarea = (id: number, esCompletada: boolean) => {
    if (esCompletada) {
      setTareasCompletadas(tareasCompletadas.filter(t => t.id !== id));
      setTareasDelDia(tareasDelDia.filter(t => t.id !== id));
    }
    else {
      setTareasDelDia(tareasDelDia.filter(t => t.id !== id));
      setTareasHoy(tareasHoy.filter(t => t.id !== id));
    }
  };

  const dias = getDiasDelMes(mesActual, anoActual);
  const hoy = new Date();
  const esHoy = (dia: number | null) =>
    dia === hoy.getDate() && mesActual === hoy.getMonth() && anoActual === hoy.getFullYear();

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: isDarkMode ? "#111827" : "#f8fafc" }}>
      <SidebarEmpleado />

      <main style={{ flex: 1, overflow: "auto" }}>
        <div style={{ padding: isMobile ? "20px" : "32px" }}>
          {!isMobile && (
            <div style={{ marginBottom: "32px" }}>
              <h1 style={{
                fontSize: "28px",
                fontWeight: "700",
                color: isDarkMode ? "#f9fafb" : "#1e293b",
                margin: 0
              }}>
                Actividades
              </h1>
            </div>
          )}

          <div style={{
            display: isMobile ? "flex" : "grid",
            flexDirection: isMobile ? "column" : undefined,
            gridTemplateColumns: isMobile ? undefined : "400px 1fr",
            gap: "20px"
          }}>
            <div style={{
              backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
              borderRadius: "12px",
              border: isDarkMode ? "1px solid #334155" : "1px solid #e5e7eb",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              padding: isMobile ? "16px" : "20px",
              marginTop: isMobile ? "40px" : "32px"
            }}>
              {/* Header del calendario */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px"
              }}>
                <button
                  onClick={() => cambiarMes(-1)}
                  style={{
                    width: "32px",
                    height: "32px",
                    border: isDarkMode ? "1px solid #475569" : "1px solid #e5e7eb",
                    borderRadius: "6px",
                    backgroundColor: isDarkMode ? "#334155" : "#ffffff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: isDarkMode ? "#cbd5e1" : "#64748b"
                  }}
                >
                  <FaChevronLeft />
                </button>

                <h2 style={{
                  fontSize: isMobile ? "14px" : "16px",
                  fontWeight: "600",
                  color: isDarkMode ? "#f9fafb" : "#1e293b",
                  margin: 0
                }}>
                  {meses[mesActual]} {anoActual}
                </h2>

                <button
                  onClick={() => cambiarMes(1)}
                  style={{
                    width: "32px",
                    height: "32px",
                    border: isDarkMode ? "1px solid #475569" : "1px solid #e5e7eb",
                    borderRadius: "6px",
                    backgroundColor: isDarkMode ? "#334155" : "#ffffff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: isDarkMode ? "#cbd5e1" : "#64748b"
                  }}
                >
                  <FaChevronRight />
                </button>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "4px",
                marginBottom: "8px"
              }}>
                {diasSemana.map((dia, index) => (
                  <div key={index} style={{
                    textAlign: "center",
                    fontSize: isMobile ? "11px" : "12px",
                    fontWeight: "600",
                    color: isDarkMode ? "#cbd5e1" : "#64748b",
                    padding: "8px 0"
                  }}>
                    {dia}
                  </div>
                ))}
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: isMobile ? "2px" : "4px"
              }}>
                {dias.map((dia, index) => (
                  <button
                    key={index}
                    onClick={() => dia && seleccionarDia(dia)}
                    disabled={!dia}
                    style={{
                      aspectRatio: "1",
                      border: "none",
                      borderRadius: "8px",
                      backgroundColor: dia && esHoy(dia) ? "#1e3a8a" : dia === diaSeleccionado ? "#dbeafe" : "transparent",
                      color: dia && esHoy(dia) ? "#ffffff" : isDarkMode ? "#f9fafb" : "#1e293b",
                      fontSize: isMobile ? "12px" : "14px",
                      fontWeight: dia && esHoy(dia) ? "600" : "400",
                      cursor: dia ? "pointer" : "default",
                      transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => {
                      if(dia && !esHoy(dia)) e.currentTarget.style.backgroundColor = isDarkMode ? "#334155" : "#f1f5f9";
                    }}
                    onMouseLeave={(e) => {
                      if(dia && !esHoy(dia) && dia !== diaSeleccionado) e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    {dia || ""}
                  </button>
                ))}
              </div>
            </div>

            <div style={{
              backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
              borderRadius: "12px",
              border: isDarkMode ? "1px solid #334155" : "1px solid #e5e7eb",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              padding: isMobile ? "16px" : "24px"
            }}>
              <div style={{ marginBottom: "24px" }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                  gap: "12px"
                }}>
                  <h3 style={{
                    fontSize: isMobile ? "16px" : "18px",
                    fontWeight: "600",
                    color: isDarkMode ? "#f9fafb" : "#1e293b",
                    margin: 0
                  }}>
                    Tareas del {diaSeleccionado} de {meses[mesActual]}
                  </h3>
                  <button
                    onClick={() => setShowModal(true)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      padding: isMobile ? "8px 12px" : "8px 16px",
                      backgroundColor: "#1d4ed8",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: isMobile ? "13px" : "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      minWidth: isMobile ? "auto" : undefined
                    }}
                  >
                    <FaPlus /> {isMobile ? "Agregar" : "Agregar tarea"}
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {tareasDelDia.length === 0 ? (
                    <p style={{
                      fontSize: "14px",
                      color: isDarkMode ? "#94a3b8" : "#94a3b8",
                      textAlign: "center",
                      padding: "20px 0"
                    }}>
                      No hay tareas para el {diaSeleccionado} de {meses[mesActual]}
                    </p>
                  ) : (
                    tareasDelDia.map((tarea) => (
                      <div key={tarea.id} style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: isMobile ? "10px 12px" : "12px 16px",
                        border: `1px solid ${isDarkMode ? "#475569" : "#e5e7eb"}`,
                        borderRadius: "8px",
                        backgroundColor: isDarkMode ? "#111827" : "#ffffff"
                      }}>
                        <input type="checkbox"
                          checked={tarea.completada}
                          onChange={() => !tarea.completada && toggleTarea(tarea.id, false)}
                          style={{
                            width: "18px",
                            height: "18px",
                            accentColor: "#1d4ed8",
                            cursor: tarea.completada ? "default" : "pointer",
                            flexShrink: 0
                          }} />
                        <span style={{
                          flex: 1,
                          fontSize: isMobile ? "13px" : "14px",
                          color: tarea.completada ? "#94a3b8" : isDarkMode ? "#f9fafb" : "#334155",
                          wordBreak: "break-word",
                          textDecoration: tarea.completada ? "line-through" : "none"
                        }}>
                          {tarea.titulo}
                        </span>
                        <button onClick={() => eliminarTarea(tarea.id, tarea.completada)} style={{
                          padding: "4px",
                          backgroundColor: "transparent",
                          border: "none",
                          color: isDarkMode ? "#94a3b8" : "#94a3b8",
                          cursor: "pointer",
                          fontSize: "14px",
                          flexShrink: 0
                        }}>
                          <FaTimes />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div>
                <h3 style={{
                  fontSize: isMobile ? "16px" : "18px",
                  fontWeight: "600",
                  color: isDarkMode ? "#f9fafb" : "#1e293b",
                  margin: "0 0 16px 0"
                }}>Tareas Completadas</h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {tareasCompletadas.length === 0 ? (
                    <p style={{ fontSize: "14px",
                               color: isDarkMode ? "#94a3b8" : "#94a3b8",
                               textAlign: "center",
                               padding: "20px 0"
                            }}>
                      Aún no has completado tareas
                    </p>) : (
                      tareasCompletadas.map((tarea) => (
                        <div key={tarea.id} style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          padding: isMobile ? "10px 12px" : "12px 16px",
                          border: `1px solid ${isDarkMode ? "#475569" : "#e5e7eb"}`,
                          borderRadius: "8px",
                          backgroundColor: isDarkMode ? "#111827" : "#f8fafc"
                        }}>
                          <input type="checkbox"
                            checked={true}
                            readOnly
                            style={{
                              width: "18px",
                              height: "18px",
                              accentColor: "#10b981",
                              cursor: "default",
                              flexShrink: 0
                            }}
                          />
                          <span style={{
                            flex: 1,
                            fontSize: isMobile ? "13px" : "14px",
                            color: isDarkMode ? "#94a3b8" : "#94a3b8",
                            textDecoration: "line-through",
                            wordBreak: "break-word"
                          }}>
                            {tarea.titulo}
                          </span>
                          <button onClick={() => eliminarTarea(tarea.id, true)} style={{
                            padding: "4px",
                            backgroundColor: "transparent",
                            border: "none",
                            color: isDarkMode ? "#cbd5e1" : "#cbd5e1",
                            cursor: "pointer",
                            fontSize: "14px",
                            flexShrink: 0
                          }}>
                            <FaTimes />
                          </button>
                        </div>
                      ))
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal para agregar tarea */}
      {showModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: isMobile ? "20px" : "0"
        }}>
          <div style={{
            backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
            borderRadius: "12px",
            padding: isMobile ? "20px" : "24px",
            width: isMobile ? "100%" : "min(400px, 90vw)",
            maxWidth: "400px",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)"
          }}>
            <h3 style={{
              fontSize: isMobile ? "16px" : "18px",
              fontWeight: "600",
              color: isDarkMode ? "#f9fafb" : "#1e293b",
              margin: "0 0 16px 0"
            }}>
              Agregar Nueva Tarea
            </h3>

            <input
              type="text"
              value={nuevaTarea}
              onChange={(e) => setNuevaTarea(e.target.value)}
              placeholder="Descripción de la tarea..."
              autoFocus
              style={{
                width: "100%",
                padding: "10px 12px",
                border: `1px solid ${isDarkMode ? "#475569" : "#d1d5db"}`,
                borderRadius: "6px",
                fontSize: "14px",
                outline: "none",
                marginBottom: "16px",
                boxSizing: "border-box",
                backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
                color: isDarkMode ? "#f9fafb" : "#111827"
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  agregarTarea();
                }
              }}
            />

            <div style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px"
            }}>
              <button
                onClick={() => {
                  setShowModal(false);
                  setNuevaTarea("");
                }}
                style={{
                  padding: "8px 16px",
                  backgroundColor: isDarkMode ? "#334155" : "#f3f4f6",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: isDarkMode ? "#cbd5e1" : "#6b7280",
                  cursor: "pointer"
                }}
              >
                Cancelar
              </button>
              <button
                onClick={agregarTarea}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#1d4ed8",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#ffffff",
                  cursor: "pointer"
                }}
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
