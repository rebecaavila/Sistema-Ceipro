"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Sidebar from "../../components/Sidebar";
import { FaEdit, FaCheck, FaChevronLeft, FaChevronRight, FaCalendarAlt } from "react-icons/fa";
import { useTheme } from "../../components/ThemeContext";

interface EmpleadoData {
  id: number;
  nombre: string;
  apellidos: string;
  dni: string;
  cargo: string;
  area: string;
  horario: string;
  telefono: string;
  foto: File | null;
}

const actividadesDataBase: { [key: string]: { texto: string; tipo: string }[] } = {
  "2025-10-02": [
    { texto: "Reunión de planificación semanal del proyecto.", tipo: "reunion" },
    { texto: "Revisión y aprobación de diseños UX/UI.", tipo: "revision" },
    { texto: "Capacitación de nuevo personal del área.", tipo: "capacitacion" },
    { texto: "Elaboración de informe de avance para la gerencia.", tipo: "documento" }
  ],
  "2025-10-03": [
    { texto: "Revisión de código del equipo de desarrollo.", tipo: "revision" },
    { texto: "Reunión con cliente para definir requerimientos.", tipo: "reunion" },
    { texto: "Actualización de documentación del proyecto.", tipo: "documento" }
  ],
  "2025-10-06": [
    { texto: "Sprint planning meeting.", tipo: "reunion" },
    { texto: "Code review session.", tipo: "revision" }
  ]
};

export default function EmpleadoPerfil() {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<'asistencias' | 'actividades'>('asistencias');
  const [isMobile, setIsMobile] = useState(false);
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showActividadesCalendar, setShowActividadesCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());
  const [actividadesCalendarMonth, setActividadesCalendarMonth] = useState(new Date().getMonth());
  const [actividadesCalendarYear, setActividadesCalendarYear] = useState(new Date().getFullYear());
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [empleado, setEmpleado] = useState<EmpleadoData>({
    id: 1,
    nombre: "Sofia",
    apellidos: "Rodriguez",
    dni: "123456789",
    cargo: "Project Manager",
    area: "Engineering",
    horario: "completo",
    telefono: "987654321",
    foto: null
  });
  const [formEdit, setFormEdit] = useState<EmpleadoData>(empleado);

  const theme = {
    bg: isDarkMode ? "#0f172a" : "#f8fafc",
    cardBg: isDarkMode ? "#1e293b" : "#ffffff",
    text: isDarkMode ? "#f1f5f9" : "#1f2937",
    textSecondary: isDarkMode ? "#94a3b8" : "#6b7280",
    border: isDarkMode ? "#334155" : "#e5e7eb",
    primary: "#1d4ed8",
    hover: isDarkMode ? "#334155" : "#f3f4f6"
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const today = new Date();
    const weekStart = getWeekStart(today);
    setCurrentWeekStart(weekStart);
    setSelectedDate(today);
  }, []);

  const getWeekStart = (date: Date): Date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  const generateWeekDays = (startDate: Date) => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 6; i++) {
      const currentDay = new Date(startDate);
      currentDay.setDate(startDate.getDate() + i);
      const dayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
      days.push({
        nombre: dayNames[i],
        numero: currentDay.getDate().toString(),
        fecha: currentDay.toISOString().split('T')[0],
        activo: currentDay.toDateString() === selectedDate.toDateString(),
        isToday: currentDay.toDateString() === today.toDateString(),
        dateObj: currentDay
      });
    }
    return days;
  };

  const navigateWeek = (direction: number) => {
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(currentWeekStart.getDate() + (direction * 7));
    setCurrentWeekStart(newWeekStart);
  };

  const goToToday = () => {
    const today = new Date();
    const weekStart = getWeekStart(today);
    setCurrentWeekStart(weekStart);
    setSelectedDate(today);
  };

  const selectDateFromCalendar = (day: number, isActividades: boolean = false) => {
    const month = isActividades ? actividadesCalendarMonth : calendarMonth;
    const year = isActividades ? actividadesCalendarYear : calendarYear;
    const selected = new Date(year, month, day);
    
    if (isActividades) {
      setSelectedDate(selected);
      const weekStart = getWeekStart(selected);
      setCurrentWeekStart(weekStart);
      setShowActividadesCalendar(false);
    } else {
      const weekStart = getWeekStart(selected);
      setCurrentWeekStart(weekStart);
      setSelectedDate(selected);
      setShowCalendar(false);
    }
  };

  const getDiasDelMes = (mes: number, ano: number) => {
    const primerDia = new Date(ano, mes, 1).getDay();
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();
    const dias = [];
    const ajustePrimerDia = primerDia === 0 ? 6 : primerDia - 1;

    for (let i = 0; i < ajustePrimerDia; i++) {
      dias.push(null);
    }

    for (let i = 1; i <= ultimoDia; i++) {
      dias.push(i);
    }

    return dias;
  };

  const cambiarMes = (direccion: number, isActividades: boolean = false) => {
    if (isActividades) {
      let nuevoMes = actividadesCalendarMonth + direccion;
      let nuevoAno = actividadesCalendarYear;

      if (nuevoMes > 11) {
        nuevoMes = 0;
        nuevoAno++;
      } else if (nuevoMes < 0) {
        nuevoMes = 11;
        nuevoAno--;
      }

      setActividadesCalendarMonth(nuevoMes);
      setActividadesCalendarYear(nuevoAno);
    } else {
      let nuevoMes = calendarMonth + direccion;
      let nuevoAno = calendarYear;

      if (nuevoMes > 11) {
        nuevoMes = 0;
        nuevoAno++;
      } else if (nuevoMes < 0) {
        nuevoMes = 11;
        nuevoAno--;
      }

      setCalendarMonth(nuevoMes);
      setCalendarYear(nuevoAno);
    }
  };

  const formatWeekRange = () => {
    const start = new Date(currentWeekStart);
    const end = new Date(currentWeekStart);
    end.setDate(start.getDate() + 5);
    
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    
    if (start.getMonth() === end.getMonth()) {
      return `${start.getDate()} - ${end.getDate()} ${meses[start.getMonth()]}`;
    } else {
      return `${start.getDate()} ${meses[start.getMonth()]} - ${end.getDate()} ${meses[end.getMonth()]}`;
    }
  };

  const handleEditClick = () => {
    setFormEdit({ ...empleado });
    setPhotoPreview(null);
    setShowEditModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormEdit(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona una imagen válida');
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) {
        alert('La imagen debe ser menor a 10MB');
        return;
      }

      setFormEdit(prev => ({ ...prev, foto: file }));

      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setFormEdit(prev => ({ ...prev, foto: null }));
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmpleado({ ...formEdit });
    setShowEditModal(false);
    setPhotoPreview(null);
  };

  const mockAsistencias = [
    { dia: "Lunes", fecha: "2024-09-30", ingreso: "09:00", salida: "18:00", estado: "Puntual", horas: 8 },
    { dia: "Martes", fecha: "2024-10-01", ingreso: "09:15", salida: "18:00", estado: "Tardanza", horas: 7.75 },
    { dia: "Miércoles", fecha: "2024-10-02", ingreso: "--:--", salida: "--:--", estado: "Falta", horas: 0 },
    { dia: "Jueves", fecha: "2024-10-03", ingreso: "09:00", salida: "18:00", estado: "Puntual", horas: 8 },
    { dia: "Viernes", fecha: "2024-10-04", ingreso: "09:00", salida: "17:30", estado: "Puntual", horas: 7.5 },
    { dia: "Sábado", fecha: "2024-10-05", ingreso: "--:--", salida: "--:--", estado: "Descanso", horas: 0 }
  ];

  const getEstadoStyle = (estado: string) => {
    const baseStyle = {
      padding: "6px 14px",
      borderRadius: "6px",
      fontSize: "13px",
      fontWeight: "600" as const,
      display: "inline-block"
    };

    const styles: { [key: string]: React.CSSProperties } = {
      "Puntual": { ...baseStyle, backgroundColor: isDarkMode ? "#166534" : "#dcfce7", color: isDarkMode ? "#dcfce7" : "#166534" },
      "Tardanza": { ...baseStyle, backgroundColor: isDarkMode ? "#92400e" : "#fef3c7", color: isDarkMode ? "#fef3c7" : "#92400e" },
      "Falta": { ...baseStyle, backgroundColor: isDarkMode ? "#991b1b" : "#fee2e2", color: isDarkMode ? "#fee2e2" : "#991b1b" },
      "Descanso": { ...baseStyle, backgroundColor: isDarkMode ? "#334155" : "#f3f4f6", color: isDarkMode ? "#94a3b8" : "#6b7280" }
    };
    
    return styles[estado] || baseStyle;
  };

  const diasSemana = generateWeekDays(currentWeekStart);
  const activitiesForSelectedDate = actividadesDataBase[selectedDate.toISOString().split('T')[0]] || [];
  
  const diasDelMes = getDiasDelMes(calendarMonth, calendarYear);
  const diasDelMesActividades = getDiasDelMes(actividadesCalendarMonth, actividadesCalendarYear);
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const diasSemanaCortos = ["L", "M", "M", "J", "V", "S", "D"];

  const CalendarComponent = ({ isActividades = false }) => {
    const month = isActividades ? actividadesCalendarMonth : calendarMonth;
    const year = isActividades ? actividadesCalendarYear : calendarYear;
    const dias = isActividades ? diasDelMesActividades : diasDelMes;

    return (
      <div style={{
        position: "absolute",
        top: "100%",
        right: 0,
        marginTop: "8px",
        backgroundColor: theme.cardBg,
        border: `1px solid ${theme.border}`,
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        padding: "16px",
        zIndex: 1000,
        minWidth: isMobile ? "280px" : "300px"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px"
        }}>
          <button
            onClick={() => cambiarMes(-1, isActividades)}
            style={{
              padding: "6px 10px",
              border: `1px solid ${theme.border}`,
              borderRadius: "4px",
              backgroundColor: theme.cardBg,
              cursor: "pointer",
              fontSize: "12px",
              color: theme.textSecondary
            }}
          >
            <FaChevronLeft />
          </button>
          
          <h3 style={{ fontSize: "14px", fontWeight: "600", color: theme.text, margin: 0 }}>
            {meses[month]} {year}
          </h3>

          <button
            onClick={() => cambiarMes(1, isActividades)}
            style={{
              padding: "6px 10px",
              border: `1px solid ${theme.border}`,
              borderRadius: "4px",
              backgroundColor: theme.cardBg,
              cursor: "pointer",
              fontSize: "12px",
              color: theme.textSecondary
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
          {diasSemanaCortos.map((dia, index) => (
            <div key={index} style={{
              textAlign: "center",
              fontSize: "10px",
              fontWeight: "600",
              color: theme.textSecondary,
              padding: "4px 0"
            }}>
              {dia}
            </div>
          ))}
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "2px"
        }}>
          {dias.map((dia, index) => (
            <button
              key={index}
              onClick={() => dia && selectDateFromCalendar(dia, isActividades)}
              disabled={!dia}
              style={{
                height: "32px",
                border: "none",
                borderRadius: "4px",
                backgroundColor: dia && selectedDate.getDate() === dia && selectedDate.getMonth() === month && selectedDate.getFullYear() === year
                  ? theme.primary
                  : "transparent",
                color: dia && selectedDate.getDate() === dia && selectedDate.getMonth() === month && selectedDate.getFullYear() === year
                  ? "#ffffff"
                  : dia ? theme.text : theme.textSecondary,
                fontSize: "12px",
                cursor: dia ? "pointer" : "default"
              }}
            >
              {dia || ""}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: theme.bg, flexDirection: isMobile ? "column" : "row" }}>
      <Sidebar />
      
      <main style={{ flex: 1, overflow: "auto" }}>
        <div style={{ padding: isMobile ? "16px" : "32px" }}>
          {!isMobile && (
            <nav style={{ marginBottom: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
                <Link href="/personal" style={{ color: "#3b82f6", textDecoration: "none" }}>Personal</Link>
                <span style={{ color: "#9ca3af" }}>/</span>
                <span style={{ color: "#6b7280" }}>Perfil de empleado</span>
              </div>
            </nav>
          )}

          <div style={{
            backgroundColor: theme.cardBg,
            borderRadius: "12px",
            padding: isMobile ? "20px" : "32px",
            border: `1px solid ${theme.border}`,
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            marginBottom: "24px"
          }}>
            <div style={{ 
              display: "flex", 
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "center" : "center", 
              justifyContent: "space-between",
              gap: isMobile ? "16px" : "20px"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "20px", flexDirection: isMobile ? "column" : "row", textAlign: isMobile ? "center" : "left" }}>
                <div style={{
                  width: isMobile ? "100px" : "80px",
                  height: isMobile ? "100px" : "80px",
                  borderRadius: "50%",
                  backgroundColor: "#f59e0b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: isMobile ? "40px" : "32px"
                }}>
                  👤
                </div>
                <div>
                  <h1 style={{ fontSize: isMobile ? "22px" : "28px", fontWeight: "700", color: theme.text, margin: "0 0 4px 0" }}>
                    {empleado.nombre} {empleado.apellidos}
                  </h1>
                  <p style={{ fontSize: "14px", color: theme.textSecondary, margin: "0 0 2px 0" }}>DNI: {empleado.dni}</p>
                  <p style={{ fontSize: "14px", color: theme.textSecondary, margin: 0 }}>Cargo: {empleado.cargo}</p>
                </div>
              </div>
              
              <button 
                onClick={handleEditClick}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  backgroundColor: theme.primary,
                  color: "#ffffff",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  width: isMobile ? "100%" : "auto"
                }}
              >
                <FaEdit /> Editar
              </button>
            </div>
          </div>

          <div style={{
            backgroundColor: theme.cardBg,
            borderRadius: "12px",
            border: `1px solid ${theme.border}`,
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}>
            <div style={{
              borderBottom: `1px solid ${theme.border}`,
              padding: isMobile ? "0 16px" : "0 32px",
              overflowX: "auto"
            }}>
              <div style={{ display: "flex", minWidth: "min-content" }}>
                <button
                  onClick={() => setActiveTab('asistencias')}
                  style={{
                    padding: isMobile ? "12px 16px" : "16px 0",
                    marginRight: isMobile ? "16px" : "32px",
                    backgroundColor: "transparent",
                    border: "none",
                    fontSize: isMobile ? "14px" : "16px",
                    fontWeight: "500",
                    color: activeTab === 'asistencias' ? theme.primary : theme.textSecondary,
                    cursor: "pointer",
                    borderBottom: activeTab === 'asistencias' ? `2px solid ${theme.primary}` : "2px solid transparent",
                    whiteSpace: "nowrap"
                  }}
                >
                  Asistencias
                </button>
                <button
                  onClick={() => setActiveTab('actividades')}
                  style={{
                    padding: isMobile ? "12px 16px" : "16px 0",
                    backgroundColor: "transparent",
                    border: "none",
                    fontSize: isMobile ? "14px" : "16px",
                    fontWeight: "500",
                    color: activeTab === 'actividades' ? theme.primary : theme.textSecondary,
                    cursor: "pointer",
                    borderBottom: activeTab === 'actividades' ? `2px solid ${theme.primary}` : "2px solid transparent",
                    whiteSpace: "nowrap"
                  }}
                >
                  Actividades
                </button>
              </div>
            </div>

            <div style={{ padding: isMobile ? "16px" : "32px" }}>
              {activeTab === 'asistencias' && (
                <div>
                  <div style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: "space-between",
                    alignItems: isMobile ? "stretch" : "center",
                    marginBottom: "24px",
                    gap: isMobile ? "12px" : "0"
                  }}>
                    <h2 style={{ fontSize: isMobile ? "16px" : "20px", fontWeight: "600", color: theme.text, margin: 0 }}>
                      {formatWeekRange()}
                    </h2>
                    
                    <div style={{ display: "flex", gap: "8px", alignItems: "center", justifyContent: isMobile ? "center" : "flex-end" }}>
                      <button
                        onClick={() => navigateWeek(-1)}
                        style={{
                          padding: "8px",
                          border: `1px solid ${theme.border}`,
                          borderRadius: "6px",
                          backgroundColor: theme.cardBg,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: theme.textSecondary
                        }}
                      >
                        <FaChevronLeft />
                      </button>
                      
                      <button
                        onClick={goToToday}
                        style={{
                          padding: "8px 12px",
                          border: `1px solid ${theme.border}`,
                          borderRadius: "6px",
                          backgroundColor: theme.cardBg,
                          cursor: "pointer",
                          fontSize: "13px",
                          color: theme.textSecondary,
                          whiteSpace: "nowrap"
                        }}
                      >
                        Hoy
                      </button>
                      
                      <button
                        onClick={() => navigateWeek(1)}
                        style={{
                          padding: "8px",
                          border: `1px solid ${theme.border}`,
                          borderRadius: "6px",
                          backgroundColor: theme.cardBg,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: theme.textSecondary
                        }}
                      >
                        <FaChevronRight />
                      </button>
                      
                      <div style={{ position: "relative" }}>
                        <button
                          onClick={() => setShowCalendar(!showCalendar)}
                          style={{
                            padding: "8px",
                            border: `1px solid ${theme.border}`,
                            borderRadius: "6px",
                            backgroundColor: theme.cardBg,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: theme.textSecondary
                          }}
                        >
                          <FaCalendarAlt />
                        </button>
                        
                        {showCalendar && <CalendarComponent isActividades={false} />}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {mockAsistencias.map((asistencia, index) => (
                      <div key={index} style={{
                        backgroundColor: isDarkMode ? "#0f172a" : "#f9fafb",
                        borderRadius: "10px",
                        padding: "20px",
                        border: `1px solid ${theme.border}`
                      }}>
                        <div style={{
                          display: "grid",
                          gridTemplateColumns: isMobile ? "1fr" : "200px 1fr auto",
                          gap: isMobile ? "16px" : "24px",
                          alignItems: "center"
                        }}>
                          <div>
                            <div style={{ 
                              fontSize: "16px", 
                              fontWeight: "600", 
                              color: theme.text,
                              marginBottom: "4px"
                            }}>
                              {asistencia.dia}
                            </div>
                            <div style={{ 
                              fontSize: "13px", 
                              color: theme.textSecondary 
                            }}>
                              {asistencia.fecha}
                            </div>
                          </div>

                          {!isMobile && (
                            <div style={{
                              display: "flex",
                              gap: "28px",
                              alignItems: "center"
                            }}>
                              <div>
                                <div style={{ 
                                  fontSize: "11px", 
                                  color: theme.textSecondary,
                                  marginBottom: "4px",
                                  textTransform: "uppercase",
                                  letterSpacing: "0.5px",
                                  fontWeight: "600"
                                }}>
                                  Ingreso
                                </div>
                                <div style={{ 
                                  fontSize: "15px", 
                                  color: theme.text,
                                  fontWeight: "600"
                                }}>
                                  {asistencia.ingreso}
                                </div>
                              </div>

                              <div>
                                <div style={{ 
                                  fontSize: "11px", 
                                  color: theme.textSecondary,
                                  marginBottom: "4px",
                                  textTransform: "uppercase",
                                  letterSpacing: "0.5px",
                                  fontWeight: "600"
                                }}>
                                  Salida
                                </div>
                                <div style={{ 
                                  fontSize: "15px", 
                                  color: theme.text,
                                  fontWeight: "600"
                                }}>
                                  {asistencia.salida}
                                </div>
                              </div>

                              <div>
                                <div style={{ 
                                  fontSize: "11px", 
                                  color: theme.textSecondary,
                                  marginBottom: "4px",
                                  textTransform: "uppercase",
                                  letterSpacing: "0.5px",
                                  fontWeight: "600"
                                }}>
                                  Horas
                                </div>
                                <div style={{ 
                                  fontSize: "15px", 
                                  color: theme.primary,
                                  fontWeight: "700"
                                }}>
                                  {asistencia.horas}h
                                </div>
                              </div>
                            </div>
                          )}

                          {isMobile && (
                            <div style={{
                              display: "grid",
                              gridTemplateColumns: "repeat(3, 1fr)",
                              gap: "12px"
                            }}>
                              <div style={{
                                backgroundColor: theme.cardBg,
                                padding: "10px",
                                borderRadius: "8px",
                                textAlign: "center"
                              }}>
                                <div style={{ 
                                  fontSize: "10px", 
                                  color: theme.textSecondary,
                                  marginBottom: "4px",
                                  textTransform: "uppercase",
                                  fontWeight: "600"
                                }}>
                                  Ingreso
                                </div>
                                <div style={{ 
                                  fontSize: "14px", 
                                  color: theme.text,
                                  fontWeight: "600"
                                }}>
                                  {asistencia.ingreso}
                                </div>
                              </div>

                              <div style={{
                                backgroundColor: theme.cardBg,
                                padding: "10px",
                                borderRadius: "8px",
                                textAlign: "center"
                              }}>
                                <div style={{ 
                                  fontSize: "10px", 
                                  color: theme.textSecondary,
                                  marginBottom: "4px",
                                  textTransform: "uppercase",
                                  fontWeight: "600"
                                }}>
                                  Salida
                                </div>
                                <div style={{ 
                                  fontSize: "14px", 
                                  color: theme.text,
                                  fontWeight: "600"
                                }}>
                                  {asistencia.salida}
                                </div>
                              </div>

                              <div style={{
                                backgroundColor: theme.cardBg,
                                padding: "10px",
                                borderRadius: "8px",
                                textAlign: "center"
                              }}>
                                <div style={{ 
                                  fontSize: "10px", 
                                  color: theme.textSecondary,
                                  marginBottom: "4px",
                                  textTransform: "uppercase",
                                  fontWeight: "600"
                                }}>
                                  Horas
                                </div>
                                <div style={{ 
                                  fontSize: "14px", 
                                  color: theme.primary,
                                  fontWeight: "700"
                                }}>
                                  {asistencia.horas}h
                                </div>
                              </div>
                            </div>
                          )}

                          <div style={{ display: "flex", justifyContent: isMobile ? "center" : "flex-end" }}>
                            <span style={getEstadoStyle(asistencia.estado)}>
                              {asistencia.estado}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'actividades' && (
                <div>
                  <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "stretch" : "center", marginBottom: "20px", gap: "12px" }}>
                    <h2 style={{ fontSize: isMobile ? "18px" : "20px", fontWeight: "600", color: theme.text, margin: 0 }}>
                      Semana Actual
                    </h2>
                    
                    <div style={{ position: "relative" }}>
                      <button
                        onClick={() => setShowActividadesCalendar(!showActividadesCalendar)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "8px 16px",
                          border: `1px solid ${theme.border}`,
                          borderRadius: "6px",
                          backgroundColor: theme.cardBg,
                          color: theme.text,
                          fontSize: "13px",
                          cursor: "pointer",
                          outline: "none"
                        }}
                      >
                        <FaCalendarAlt style={{ fontSize: "12px" }} />
                        Filtrar por fecha
                      </button>
                      
                      {showActividadesCalendar && <CalendarComponent isActividades={true} />}
                    </div>
                  </div>

                  <div style={{ marginBottom: "24px", overflowX: "auto" }}>
                    <div style={{ 
                      display: "grid", 
                      gridTemplateColumns: isMobile ? "repeat(3, 1fr)" : "repeat(6, 1fr)", 
                      gap: isMobile ? "8px" : "12px"
                    }}>
                      {diasSemana.map((dia, index) => (
                        <div
                          key={index}
                          onClick={() => setSelectedDate(dia.dateObj)}
                          style={{
                            textAlign: "center",
                            padding: isMobile ? "12px 8px" : "16px 12px",
                            borderRadius: "8px",
                            backgroundColor: dia.activo ? theme.primary : (dia.isToday ? (isDarkMode ? "#1e3a8a" : "#eff6ff") : theme.cardBg),
                            border: dia.isToday && !dia.activo ? `2px solid ${theme.primary}` : `1px solid ${theme.border}`,
                            color: dia.activo ? "#ffffff" : (dia.isToday ? theme.primary : theme.text),
                            fontSize: isMobile ? "12px" : "14px",
                            cursor: "pointer",
                            transition: "all 0.2s"
                          }}
                        >
                          <div style={{ fontWeight: "500" }}>{dia.nombre}</div>
                          <div style={{ fontSize: isMobile ? "18px" : "20px", fontWeight: "700", marginTop: "4px" }}>
                            {dia.numero}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ fontSize: isMobile ? "16px" : "18px", fontWeight: "600", color: theme.text, margin: "0 0 16px 0" }}>
                      Actividades del {selectedDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </h3>
                    
                    {activitiesForSelectedDate.length > 0 ? (
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {activitiesForSelectedDate.map((actividad, index) => (
                          <div key={index} style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "12px",
                            padding: "12px 0",
                            borderBottom: index < activitiesForSelectedDate.length - 1 ? `1px solid ${theme.border}` : "none"
                          }}>
                            <div style={{
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                              backgroundColor: "#dcfce7",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              marginTop: "2px"
                            }}>
                              <FaCheck style={{ fontSize: "10px", color: "#166534" }} />
                            </div>
                            <p style={{ fontSize: isMobile ? "13px" : "14px", color: theme.text, margin: 0, lineHeight: "1.5" }}>
                              {actividad.texto}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{
                        textAlign: "center",
                        padding: isMobile ? "32px 16px" : "40px 20px",
                        color: theme.textSecondary,
                        backgroundColor: isDarkMode ? "#0f172a" : "#f9fafb",
                        borderRadius: "8px",
                        border: `1px dashed ${theme.border}`
                      }}>
                        <div style={{ fontSize: isMobile ? "40px" : "48px", marginBottom: "12px" }}>📅</div>
                        <p style={{ fontSize: isMobile ? "14px" : "16px", margin: "0 0 4px 0" }}>No hay actividades programadas</p>
                        <p style={{ fontSize: isMobile ? "12px" : "14px", margin: 0 }}>para este día</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {showEditModal && (
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
          padding: isMobile ? "16px" : "0"
        }}>
          <div style={{
            backgroundColor: theme.cardBg,
            borderRadius: "12px",
            padding: isMobile ? "20px" : "32px",
            width: isMobile ? "100%" : "min(600px, 90vw)",
            maxHeight: "90vh",
            overflow: "auto",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
              <div style={{
                width: isMobile ? "60px" : "80px",
                height: isMobile ? "60px" : "80px",
                backgroundColor: theme.hover,
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isMobile ? "20px" : "24px",
                overflow: "hidden",
                position: "relative",
                flexShrink: 0
              }}>
                {photoPreview ? (
                  <>
                    <img src={photoPreview} alt="Vista previa" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <button
                      type="button"
                      onClick={removePhoto}
                      style={{
                        position: "absolute",
                        top: "4px",
                        right: "4px",
                        width: "20px",
                        height: "20px",
                        backgroundColor: "#ef4444",
                        border: "none",
                        borderRadius: "50%",
                        color: "#ffffff",
                        fontSize: "12px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      ×
                    </button>
                  </>
                ) : "👤"}
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: isMobile ? "18px" : "20px", fontWeight: "700", color: theme.text, margin: "0 0 8px 0" }}>
                  Editar Empleado
                </h2>
                <label htmlFor="photo-upload" style={{
                  backgroundColor: theme.hover,
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  color: theme.textSecondary,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px"
                }}>
                  📷 Cambiar Foto
                </label>
                <input ref={fileInputRef} id="photo-upload" type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: "none" }} />
                <p style={{ fontSize: "11px", color: theme.textSecondary, margin: "4px 0 0 0" }}>PNG, JPG hasta 10MB</p>
              </div>
            </div>

            <form onSubmit={handleSaveEdit}>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: theme.text, marginBottom: "6px" }}>Nombres</label>
                  <input type="text" name="nombre" value={formEdit.nombre} onChange={handleInputChange} placeholder="Ingrese nombres" required
                    style={{ width: "100%", padding: "10px 12px", border: `1px solid ${theme.border}`, borderRadius: "6px", fontSize: "14px", outline: "none", boxSizing: "border-box", backgroundColor: theme.cardBg, color: theme.text }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: theme.text, marginBottom: "6px" }}>Apellidos</label>
                  <input type="text" name="apellidos" value={formEdit.apellidos} onChange={handleInputChange} placeholder="Ingrese apellidos" required
                    style={{ width: "100%", padding: "10px 12px", border: `1px solid ${theme.border}`, borderRadius: "6px", fontSize: "14px", outline: "none", boxSizing: "border-box", backgroundColor: theme.cardBg, color: theme.text }} />
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: theme.text, marginBottom: "6px" }}>DNI</label>
                <input type="text" name="dni" value={formEdit.dni} onChange={handleInputChange} placeholder="Ingrese DNI" required
                  style={{ width: "100%", padding: "10px 12px", border: `1px solid ${theme.border}`, borderRadius: "6px", fontSize: "14px", outline: "none", boxSizing: "border-box", backgroundColor: theme.cardBg, color: theme.text }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: theme.text, marginBottom: "6px" }}>Área / Cargo</label>
                  <select name="area" value={formEdit.area} onChange={handleInputChange} required
                    style={{ width: "100%", padding: "10px 12px", border: `1px solid ${theme.border}`, borderRadius: "6px", fontSize: "14px", outline: "none", backgroundColor: theme.cardBg, boxSizing: "border-box", color: theme.text }}>
                    <option value="">Seleccione área/cargo</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Product">Product</option>
                    <option value="Analytics">Analytics</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: theme.text, marginBottom: "6px" }}>Horario</label>
                  <select name="horario" value={formEdit.horario} onChange={handleInputChange} required
                    style={{ width: "100%", padding: "10px 12px", border: `1px solid ${theme.border}`, borderRadius: "6px", fontSize: "14px", outline: "none", backgroundColor: theme.cardBg, boxSizing: "border-box", color: theme.text }}>
                    <option value="">Seleccione horario</option>
                    <option value="mañana">Mañana (8:00 - 16:00)</option>
                    <option value="tarde">Tarde (14:00 - 22:00)</option>
                    <option value="completo">Completo (9:00 - 18:00)</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "500", color: theme.text, marginBottom: "6px" }}>Teléfono</label>
                <input type="tel" name="telefono" value={formEdit.telefono} onChange={handleInputChange} placeholder="Ingrese número de teléfono" required
                  style={{ width: "100%", padding: "10px 12px", border: `1px solid ${theme.border}`, borderRadius: "6px", fontSize: "14px", outline: "none", boxSizing: "border-box", backgroundColor: theme.cardBg, color: theme.text }} />
              </div>

              <div style={{ display: "flex", flexDirection: isMobile ? "column-reverse" : "row", justifyContent: "flex-end", gap: "12px" }}>
                <button type="button" onClick={() => { setShowEditModal(false); setPhotoPreview(null); }}
                  style={{ padding: "10px 20px", backgroundColor: theme.hover, border: "none", borderRadius: "6px", fontSize: "14px", fontWeight: "500", color: theme.textSecondary, cursor: "pointer", width: isMobile ? "100%" : "auto" }}>
                  Cancelar
                </button>
                <button type="submit"
                  style={{ padding: "10px 20px", backgroundColor: theme.primary, border: "none", borderRadius: "6px", fontSize: "14px", fontWeight: "500", color: "#ffffff", cursor: "pointer", width: isMobile ? "100%" : "auto" }}>
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}