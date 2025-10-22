"use client";

import { useState, useEffect } from "react";
import SidebarEmpleado from "../components/Sidebar-personal";
import { FaCheckCircle, FaClock, FaTimesCircle, FaChevronLeft, FaChevronRight, FaCalendarAlt } from "react-icons/fa";
import { useTheme } from "../components/ThemeContext";

// Datos simulados de asistencias por fecha
const asistenciasData: Record<string, Array<{ ingreso: string; salida: string; estado: string; horas: number }>> = {
  "2024-10-01": [
    { ingreso: "08:00 AM", salida: "05:00 PM", estado: "Puntual", horas: 9 }
  ],
  "2024-10-02": [
    { ingreso: "07:58 AM", salida: "01:00 PM", estado: "Puntual", horas: 5 },
    { ingreso: "02:45 PM", salida: "08:30 PM", estado: "Puntual", horas: 6 }
  ],
  "2024-10-03": [
    { ingreso: "08:00 AM", salida: "05:00 PM", estado: "Puntual", horas: 9 }
  ],
  "2024-10-04": [
    { ingreso: "08:15 AM", salida: "05:00 PM", estado: "Tardanza", horas: 9 }
  ],
  "2024-10-05": [
    { ingreso: "08:00 AM", salida: "05:00 PM", estado: "Puntual", horas: 9 }
  ],
  "2024-10-06": [
    { ingreso: "-", salida: "-", estado: "Falta", horas: 0 }
  ],
  "2024-10-07": [
    { ingreso: "08:00 AM", salida: "05:00 PM", estado: "Puntual", horas: 9 }
  ],
  "2024-09-22": [
    { ingreso: "08:05 AM", salida: "05:15 PM", estado: "Puntual", horas: 9 }
  ]
};

const meses = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];
const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export default function AsistenciasPersonal() {
  const { isDarkMode } = useTheme();

  const [mesActual, setMesActual] = useState(new Date().getMonth());
  const [anoActual, setAnoActual] = useState(new Date().getFullYear());
  const [rangoInicio, setRangoInicio] = useState<number | null>(null);
  const [rangoFin, setRangoFin] = useState<number | null>(null);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [diaSeleccionado, setDiaSeleccionado] = useState<Date>(new Date());

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const obtenerSemanaActual = () => {
    const hoy = new Date();
    const diaSemana = hoy.getDay();
    const diasHastaDomingo = diaSemana === 0 ? 0 : diaSemana;
    const domingoSemana = new Date(hoy);
    domingoSemana.setDate(hoy.getDate() - diasHastaDomingo);
    const semana = [];
    for (let i = 0; i < 7; i++) {
      const dia = new Date(domingoSemana);
      dia.setDate(domingoSemana.getDate() + i);
      semana.push(dia);
    }
    return semana;
  };

  const semanaActual = obtenerSemanaActual();
  const primerDia = semanaActual[0];
  const ultimoDia = semanaActual[6];

  const formatoRango = primerDia.getMonth() === ultimoDia.getMonth()
    ? `${primerDia.getDate()} - ${ultimoDia.getDate()} de ${meses[primerDia.getMonth()]}, ${primerDia.getFullYear()}`
    : `${primerDia.getDate()} ${meses[primerDia.getMonth()]} - ${ultimoDia.getDate()} ${meses[ultimoDia.getMonth()]}, ${primerDia.getFullYear()}`;

  const getDiasDelMes = (mes: number, ano: number) => {
    const primerDiaSemana = new Date(ano, mes, 1).getDay();
    const ultimoDiaMes = new Date(ano, mes + 1, 0).getDate();
    const dias = [];
    for (let i = 0; i < primerDiaSemana; i++) dias.push(null);
    for (let i = 1; i <= ultimoDiaMes; i++) dias.push(i);
    return dias;
  };

  const cambiarMes = (direccion: number) => {
    let nuevoMes = mesActual + direccion;
    let nuevoAno = anoActual;
    if (nuevoMes > 11) {
      nuevoMes = 0; nuevoAno++;
    } else if (nuevoMes < 0) {
      nuevoMes = 11; nuevoAno--;
    }
    
    // Actualizar el día seleccionado al nuevo mes manteniendo el mismo día
    const diaActual = diaSeleccionado.getDate();
    const ultimoDiaDelNuevoMes = new Date(nuevoAno, nuevoMes + 1, 0).getDate();
    const diaValido = Math.min(diaActual, ultimoDiaDelNuevoMes);
    
    setMesActual(nuevoMes);
    setAnoActual(nuevoAno);
    setDiaSeleccionado(new Date(nuevoAno, nuevoMes, diaValido));
  };

  const seleccionarDia = (dia: number) => {
    // Actualizar el día seleccionado para mostrar en el resumen
    const fechaSeleccionada = new Date(anoActual, mesActual, dia);
    setDiaSeleccionado(fechaSeleccionada);

    if (!rangoInicio || (rangoInicio && rangoFin)) {
      setRangoInicio(dia);
      setRangoFin(null);
    } else {
      if (dia < rangoInicio) {
        setRangoFin(rangoInicio);
        setRangoInicio(dia);
      } else {
        setRangoFin(dia);
      }
    }
  };

  const esDiaEnRango = (dia: number | null) => {
    if (!dia || !rangoInicio) return false;
    if (!rangoFin) return dia === rangoInicio;
    return dia >= rangoInicio && dia <= rangoFin;
  };

  const dias = getDiasDelMes(mesActual, anoActual);
  const hoy = new Date();
  const esHoy = (dia: number | null) =>
    dia === hoy.getDate() && mesActual === hoy.getMonth() && anoActual === hoy.getFullYear();

  const cardBgs = isDarkMode ? ["#1e3a8a", "#854d0e", "#991b1b"] : ["#dbeafe", "#fef3c7", "#fee2e2"];
  const cardIconColors = isDarkMode ? ["#93c5fd", "#fbbf24", "#fca5a5"] : ["#1e40af", "#b45309", "#b91c1c"];
  const headerText = isDarkMode ? "#f9fafb" : "#1e293b";
  const subText = isDarkMode ? "#cbd5e1" : "#64748b";

  const getEstadoStyle = (estado: string) => {
    const bgColor = isDarkMode ? "rgba(255 255 255 / 0.1)" : "#f3f4f6";
    let color = isDarkMode ? "#a1b8df" : "#374151";
    switch (estado) {
      case "Puntual": color = isDarkMode ? "#86efac" : "#166534"; break;
      case "Tardanza": color = isDarkMode ? "#fbbf24" : "#92400e"; break;
      case "Falta": color = isDarkMode ? "#fca5a5" : "#991b1b"; break;
    }
    return { backgroundColor: bgColor, color };
  };

  const formatearFecha = (fecha: Date) => {
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    return `${dia} de ${mes}`;
  };

  const obtenerAsistenciasDelDia = (fecha: Date) => {
    const fechaStr = fecha.toISOString().split('T')[0];
    return asistenciasData[fechaStr] || [];
  };

  const seleccionarDiaSemana = (fecha: Date) => {
    setDiaSeleccionado(fecha);
  };

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: isDarkMode ? "#111827" : "#f8fafc" }}>
      <SidebarEmpleado />
      <main style={{ flex: 1, overflow: "auto" }}>
        <div style={{ padding: isMobile ? "16px" : "32px" }}>
          {!isMobile && (
            <div style={{ marginBottom: "32px" }}>
              <h1 style={{ fontSize: "28px", fontWeight: "700", color: headerText, margin: 0 }}>Asistencias</h1>
            </div>
          )}

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: isMobile ? "12px" : "24px",
            marginBottom: isMobile ? "16px" : "32px",
            marginTop: isMobile ? "60px" : "0"
          }}>
            {[0, 1, 2].map((idx) => {
              const labels = ["Asistencias", "Tardanzas", "Faltas"];
              const values = ["120", "15", "5"];
              return (
                <div key={idx} style={{
                  backgroundColor: cardBgs[idx],
                  borderRadius: "12px",
                  padding: "20px",
                  cursor: "default",
                  boxShadow: isDarkMode ? "0 4px 20px rgb(0 0 0 / 0.3)" : "0 1px 3px rgb(0 0 0 / 0.1)",
                  display: "flex",
                  alignItems: "center",
                  gap: "18px",
                  transition: "background-color 0.3s ease"
                }}>
                  <div style={{
                    backgroundColor: isDarkMode ? "rgba(255 255 255 / 0.15)" : "#eff6ff",
                    borderRadius: "10px",
                    minWidth: "48px",
                    minHeight: "48px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: cardIconColors[idx],
                    fontSize: isMobile ? "20px" : "28px"
                  }}>
                    {idx === 0 ? <FaCheckCircle /> : idx === 1 ? <FaClock /> : <FaTimesCircle />}
                  </div>
                  <div>
                    <p style={{
                      color: isDarkMode ? "rgba(255 255 255 / 0.7)" : "#374151",
                      margin: "0 0 6px 0",
                      fontWeight: 500,
                      fontSize: isMobile ? "12px" : "14px",
                      opacity: 0.85,
                      textTransform: "capitalize",
                      letterSpacing: 0.4
                    }}>{labels[idx]}</p>
                    <p style={{
                      fontSize: isMobile ? "22px" : "32px",
                      fontWeight: "700",
                      color: isDarkMode ? "#f9fafb" : "#111827",
                      margin: 0,
                      letterSpacing: "-1.5px"
                    }}>{values[idx]}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{
            backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
            borderRadius: "12px",
            border: isDarkMode ? "1px solid #334155" : "1px solid #e5e7eb",
            boxShadow: isDarkMode ? "0 3px 16px rgba(0, 0, 0, 0.22)" : "0 1px 3px rgba(0,0,0,0.1)"
          }}>
            <div style={{
              padding: isMobile ? "16px" : "24px",
              borderBottom: isDarkMode ? "1px solid #2f4059" : "1px solid #f3f4f6",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "center",
              gap: isMobile ? "12px" : "0"
            }}>
              <h2 style={{
                fontSize: isMobile ? "16px" : "18px",
                fontWeight: "600",
                color: headerText,
                margin: 0
              }}>
                {mostrarCalendario ? "Seleccionar Rango" : "Semana Actual"}
              </h2>
              <div style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
                flexWrap: isMobile ? "wrap" : "nowrap",
                width: isMobile ? "100%" : "auto"
              }}>
                <button
                  onClick={() => setMostrarCalendario(!mostrarCalendario)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "8px 16px",
                    border: isDarkMode ? "1px solid #475569" : "1px solid #e5e7eb",
                    borderRadius: "6px",
                    backgroundColor: isDarkMode ? "#232a3a" : "#ffffff",
                    cursor: "pointer",
                    fontSize: isMobile ? "13px" : "14px",
                    color: subText,
                    fontWeight: "500",
                    width: isMobile ? "100%" : "auto"
                  }}
                >
                  <FaCalendarAlt />
                  {isMobile ? "Rango" : "Seleccionar Rango"}
                </button>
              </div>
            </div>

            {!mostrarCalendario ? (
              <div style={{ padding: isMobile ? "16px" : "24px" }}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  gap: isMobile ? "6px" : "12px",
                  marginBottom: isMobile ? "16px" : "24px"
                }}>
                  {semanaActual.map((fecha, index) => {
                    const esHoyReal = fecha.toDateString() === new Date().toDateString();
                    const esDiaSeleccionado = fecha.toDateString() === diaSeleccionado.toDateString();
                    const diaNombre = diasSemana[fecha.getDay()];
                    return (
                      <div 
                        key={index} 
                        onClick={() => seleccionarDiaSemana(fecha)}
                        style={{
                        textAlign: "center",
                        padding: isMobile ? "10px 6px" : "16px 12px",
                        borderRadius: "8px",
                        backgroundColor: esDiaSeleccionado ? "#2563eb" : (isDarkMode ? "rgba(3,19,54,0.22)" : "#f9fafb"),
                        border: esHoyReal ? "1.7px solid #3b82f6" : (isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #e5e7eb"),
                        color: esDiaSeleccionado ? "#fff" : subText,
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                      }}
                      onMouseEnter={(e) => {
                        if (!esDiaSeleccionado) {
                          e.currentTarget.style.backgroundColor = isDarkMode ? "rgba(37, 99, 235, 0.2)" : "#e0f2fe";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!esDiaSeleccionado) {
                          e.currentTarget.style.backgroundColor = isDarkMode ? "rgba(3,19,54,0.22)" : "#f9fafb";
                        }
                      }}
                      >
                        <div style={{ fontSize: isMobile ? "10px" : "12px", fontWeight: "500", marginBottom: "4px" }}>
                          {isMobile ? diaNombre.substring(0, 1) : diaNombre}
                        </div>
                        <div style={{ fontSize: isMobile ? "16px" : "20px", fontWeight: "700" }}>
                          {fecha.getDate()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div style={{ padding: isMobile ? "16px" : "20px", maxWidth: "420px", margin: "0 auto" }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px"
                }}>
                  <button
                    style={{
                      padding: "4px 8px",
                      border: isDarkMode ? "1px solid #475569" : "1px solid #e5e7eb",
                      borderRadius: "4px",
                      backgroundColor: isDarkMode ? "#232a3a" : "#ffffff",
                      cursor: "pointer",
                      color: subText,
                      fontSize: "12px"
                    }}
                    onClick={() => cambiarMes(-1)}
                  >
                    <FaChevronLeft />
                  </button>
                  <h3 style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: headerText,
                    margin: 0
                  }}>
                    {meses[mesActual]} {anoActual}
                  </h3>
                  <button
                    style={{
                      padding: "4px 8px",
                      border: isDarkMode ? "1px solid #475569" : "1px solid #e5e7eb",
                      borderRadius: "4px",
                      backgroundColor: isDarkMode ? "#232a3a" : "#ffffff",
                      cursor: "pointer",
                      color: subText,
                      fontSize: "12px"
                    }}
                    onClick={() => cambiarMes(1)}
                  >
                    <FaChevronRight />
                  </button>
                </div>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  gap: "4px",
                  marginBottom: "4px"
                }}>
                  {diasSemana.map((dia, index) => (
                    <div key={index} style={{
                      textAlign: "center",
                      fontSize: "10px",
                      fontWeight: "600",
                      color: subText,
                      padding: "4px 0"
                    }}>
                      {isMobile ? dia.substring(0, 1) : dia}
                    </div>
                  ))}
                </div>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  gap: "3px"
                }}>
                  {dias.map((dia, index) => (
                    <button
                      key={index}
                      onClick={() => dia && seleccionarDia(dia)}
                      disabled={!dia}
                      style={{
                        height: "32px",
                        border: "none",
                        borderRadius: "4px",
                        backgroundColor: dia && esDiaEnRango(dia)
                          ? "#2563eb"
                          : dia && esHoy(dia)
                            ? "#3b82f680"
                            : "transparent",
                        color: dia && esDiaEnRango(dia)
                          ? "#ffffff"
                          : dia && esHoy(dia)
                            ? "#2563eb"
                            : dia
                              ? headerText
                              : subText,
                        fontSize: "12px",
                        fontWeight: dia && (esDiaEnRango(dia) || esHoy(dia)) ? "600" : "400",
                        cursor: dia ? "pointer" : "default",
                        transition: "all 0.15s ease"
                      }}
                      onMouseEnter={(e) => {
                        if (dia && !esDiaEnRango(dia)) {
                          e.currentTarget.style.backgroundColor = isDarkMode ? "#232a3a" : "#f1f5f9";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (dia && !esDiaEnRango(dia) && !esHoy(dia)) {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }
                      }}
                    >
                      {dia || ""}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div style={{ padding: isMobile ? "16px" : "24px", borderTop: isDarkMode ? "1px solid #2f4059" : "1px solid #f3f4f6" }}>
              <h3 style={{
                fontSize: isMobile ? "14px" : "16px",
                fontWeight: "600",
                color: headerText,
                margin: "0 0 16px 0"
              }}>
                Resumen: {formatearFecha(diaSeleccionado)}
              </h3>
              {obtenerAsistenciasDelDia(diaSeleccionado).length === 0 ? (
                <div style={{
                  padding: "32px",
                  textAlign: "center",
                  color: subText,
                  fontSize: "14px"
                }}>
                  No hay registros de asistencia para este día
                </div>
              ) : !isMobile ? (
                <div style={{
                  border: isDarkMode ? "1px solid #334155" : "1px solid #e5e7eb",
                  borderRadius: "8px",
                  overflow: "hidden"
                }}>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr",
                    padding: "16px 20px",
                    backgroundColor: isDarkMode ? "#232a3a" : "#f9fafb",
                    borderBottom: isDarkMode ? "1px solid #334155" : "1px solid #e5e7eb",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: subText,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em"
                  }}>
                    <div>Ingreso</div>
                    <div>Salida</div>
                    <div>Estado</div>
                    <div>Horas</div>
                  </div>
                  {obtenerAsistenciasDelDia(diaSeleccionado).map((asistencia, index) => (
                    <div
                      key={index}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr 1fr",
                        padding: "16px 20px",
                        borderBottom: index < obtenerAsistenciasDelDia(diaSeleccionado).length - 1 ? (isDarkMode ? "1px solid #232a3a" : "1px solid #f3f4f6") : "none",
                        alignItems: "center",
                        color: headerText
                      }}
                    >
                      <div style={{ fontSize: "14px", fontWeight: "500" }}>
                        {asistencia.ingreso}
                      </div>
                      <div style={{ fontSize: "14px", color: subText }}>
                        {asistencia.salida}
                      </div>
                      <div>
                        <span style={{
                          ...getEstadoStyle(asistencia.estado),
                          padding: "4px 12px",
                          borderRadius: "12px",
                          fontSize: "12px",
                          fontWeight: "500"
                        }}>
                          {asistencia.estado}
                        </span>
                      </div>
                      <div style={{ fontSize: "14px", fontWeight: "500" }}>
                        {asistencia.horas} hrs
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {obtenerAsistenciasDelDia(diaSeleccionado).map((asistencia, index) => (
                    <div
                      key={index}
                      style={{
                        border: isDarkMode ? "1px solid #334155" : "1px solid #e5e7eb",
                        borderRadius: "8px",
                        padding: "16px",
                        backgroundColor: isDarkMode ? "#232a3a" : "#ffffff"
                      }}
                    >
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "12px"
                      }}>
                        <span style={{
                          ...getEstadoStyle(asistencia.estado),
                          padding: "4px 12px",
                          borderRadius: "12px",
                          fontSize: "12px",
                          fontWeight: "500"
                        }}>
                          {asistencia.estado}
                        </span>
                        <span style={{
                          fontSize: "14px",
                          color: headerText,
                          fontWeight: "600"
                        }}>
                          {asistencia.horas} hrs
                        </span>
                      </div>

                      <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "8px"
                      }}>
                        <div>
                          <div style={{
                            fontSize: "11px",
                            color: subText,
                            marginBottom: "4px",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em"
                          }}>
                            Ingreso
                          </div>
                          <div style={{
                            fontSize: "14px",
                            color: headerText,
                            fontWeight: "500"
                          }}>
                            {asistencia.ingreso}
                          </div>
                        </div>
                        <div>
                          <div style={{
                            fontSize: "11px",
                            color: subText,
                            marginBottom: "4px",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em"
                          }}>
                            Salida
                          </div>
                          <div style={{
                            fontSize: "14px",
                            color: subText
                          }}>
                            {asistencia.salida}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}