"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "../../components/Sidebar";
import { FaEdit, FaSearch, FaFilter, FaCheck, FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Tipos de TypeScript
interface DiasSemana {
  nombre: string;
  numero: string;
  fecha: string;
  activo: boolean;
  isToday: boolean;
  dateObj: Date;
}

interface Asistencia {
  fecha: string;
  ingreso: string;
  salida: string;
  estado: string;
  horasTrabajadas: number;
}

interface AsistenciaSemanal {
  fecha: string;
  dia: string;
  ingreso: string;
  salida: string;
  estado: string;
  horasTrabajadas: number;
}

interface CalendarDay {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
}

// Datos simulados del empleado
const empleadoData = {
  id: 1,
  nombre: "Sofia Rodriguez",
  dni: "123456789",
  cargo: "Gerente de Proyecto",
  foto: "/avatars/sofia.jpg"
};

// Datos simulados de asistencias
const asistenciasData: Asistencia[] = [
  {
    fecha: "2024-07-26",
    ingreso: "09:00",
    salida: "18:00",
    estado: "Puntual",
    horasTrabajadas: 8
  },
  {
    fecha: "2024-07-25",
    ingreso: "09:15",
    salida: "18:00",
    estado: "Tardanza",
    horasTrabajadas: 7.75
  },
  {
    fecha: "2024-07-24",
    ingreso: "--:--",
    salida: "--:--",
    estado: "Falta",
    horasTrabajadas: 0
  },
  {
    fecha: "2024-07-23",
    ingreso: "09:05",
    salida: "18:00",
    estado: "Puntual",
    horasTrabajadas: 7.92
  },
  {
    fecha: "2024-07-22",
    ingreso: "09:00",
    salida: "17:30",
    estado: "Incompleto",
    horasTrabajadas: 7.5
  }
];

// Base de actividades simuladas por fecha
const actividadesDataBase: { [key: string]: string[] } = {
  "2025-09-22": [
    "Reunión de planificación semanal del proyecto.",
    "Revisión y aprobación de diseños UX/UI.",
    "Capacitación de nuevo personal del área.",
    "Elaboración de informe de avance para la gerencia."
  ],
  "2025-09-23": [
    "Revisión de código del equipo de desarrollo.",
    "Reunión con cliente para definir requerimientos.",
    "Actualización de documentación del proyecto."
  ],
  "2025-09-24": [
    "Análisis de métricas de rendimiento del equipo.",
    "Preparación de presentación para stakeholders.",
    "Sesión de feedback con el equipo."
  ],
  "2025-09-25": [
    "Reunión de seguimiento de sprint.",
    "Revisión de presupuesto del proyecto.",
    "Entrevistas para nueva contratación.",
    "Planificación de recursos para próximo mes."
  ],
  "2025-09-26": [
    "Demo del producto con el cliente.",
    "Retrospectiva del sprint.",
    "Revisión de casos de prueba."
  ],
  "2025-09-27": [
    "Mantenimiento de sistemas.",
    "Revisión de documentación técnica."
  ]
};

export default function EmpleadoPerfil() {
  const [activeTab, setActiveTab] = useState<'asistencias' | 'actividades'>('asistencias');
  const [searchTerm, setSearchTerm] = useState("");
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAsistenciasCalendar, setShowAsistenciasCalendar] = useState(false);
  const [selectedAsistenciasDate, setSelectedAsistenciasDate] = useState(new Date());

  // Función para obtener el inicio de la semana (lunes)
  const getWeekStart = (date: Date): Date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  // Función para generar los días de la semana
  const generateWeekDays = (startDate: Date): DiasSemana[] => {
    const days: DiasSemana[] = [];
    const today = new Date();
    const weekStart = new Date(startDate);
    
    for (let i = 0; i < 6; i++) {
      const currentDay = new Date(weekStart);
      currentDay.setDate(weekStart.getDate() + i);
      
      const dayNames = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      const isToday = currentDay.toDateString() === today.toDateString();
      const isSelected = currentDay.toDateString() === selectedDate.toDateString();
      
      days.push({
        nombre: dayNames[i],
        numero: currentDay.getDate().toString(),
        fecha: currentDay.toISOString().split('T')[0],
        activo: isSelected,
        isToday: isToday,
        dateObj: new Date(currentDay)
      });
    }
    return days;
  };

  // Función para formatear la fecha para mostrar
  const formatWeekRange = (startDate: Date): string => {
    const start = new Date(startDate);
    const end = new Date(startDate);
    end.setDate(start.getDate() + 5);
    
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    
    if (start.getMonth() === end.getMonth()) {
      return `${start.getDate()} - ${end.getDate()} de ${months[start.getMonth()]} ${start.getFullYear()}`;
    } else {
      return `${start.getDate()} de ${months[start.getMonth()]} - ${end.getDate()} de ${months[end.getMonth()]} ${start.getFullYear()}`;
    }
  };

  // Función para navegar semanas
  const navigateWeek = (direction: number): void => {
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(currentWeekStart.getDate() + (direction * 7));
    setCurrentWeekStart(newWeekStart);
    
    const newSelectedDate = new Date(newWeekStart);
    setSelectedDate(newSelectedDate);
  };

  // Función para seleccionar un día (actividades)
  const selectDay = (day: DiasSemana): void => {
    setSelectedDate(day.dateObj);
  };

  // Función para seleccionar fecha del calendario
  const selectCalendarDate = (date: Date): void => {
    const weekStart = getWeekStart(date);
    setCurrentWeekStart(weekStart);
    setSelectedDate(date);
    setShowCalendar(false);
  };

  // Función para seleccionar fecha en asistencias
  const selectAsistenciasDate = (date: Date): void => {
    setSelectedAsistenciasDate(date);
    setShowAsistenciasCalendar(false);
  };

  // Función para generar calendario mensual
  const generateCalendarDays = (referenceDate: Date): CalendarDay[] => {
    const year = referenceDate.getFullYear();
    const month = referenceDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startCalendar = new Date(firstDay);
    const dayOfWeek = firstDay.getDay();
    startCalendar.setDate(firstDay.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    
    const days: CalendarDay[] = [];
    const today = new Date();
    
    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startCalendar);
      currentDate.setDate(startCalendar.getDate() + i);
      
      const isCurrentMonth = currentDate.getMonth() === month;
      const isToday = currentDate.toDateString() === today.toDateString();
      const isSelected = currentDate.toDateString() === referenceDate.toDateString();
      
      days.push({
        date: new Date(currentDate),
        day: currentDate.getDate(),
        isCurrentMonth,
        isToday,
        isSelected
      });
    }
    
    return days;
  };

  // Función para obtener asistencias de la semana
  const getWeekAttendance = (selectedDate: Date): AsistenciaSemanal[] => {
    const weekStart = getWeekStart(selectedDate);
    const weekData: AsistenciaSemanal[] = [];
    
    for (let i = 0; i < 6; i++) {
      const currentDay = new Date(weekStart);
      currentDay.setDate(weekStart.getDate() + i);
      const dayNames = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      
      const randomHours = Math.random() > 0.1 ? 
        parseFloat((7 + Math.random() * 2).toFixed(2)) : 0;
      
      // Simulamos datos de asistencia para la semana
      const mockData: AsistenciaSemanal = {
        fecha: currentDay.toISOString().split('T')[0],
        dia: dayNames[i],
        ingreso: i < 5 ? (Math.random() > 0.1 ? `0${8 + Math.floor(Math.random() * 2)}:${Math.floor(Math.random() * 6)}0` : "--:--") : "--:--",
        salida: i < 5 ? (Math.random() > 0.1 ? "18:00" : "--:--") : "--:--",
        estado: i < 5 ? (Math.random() > 0.8 ? "Falta" : Math.random() > 0.7 ? "Tardanza" : Math.random() > 0.1 ? "Puntual" : "Incompleto") : "Descanso",
        horasTrabajadas: i < 5 ? randomHours : 0
      };
      
      weekData.push(mockData);
    }
    
    return weekData;
  };

  // Función para obtener actividades del día seleccionado
  const getActivitiesForDate = (date: Date): string[] => {
    const dateKey = date.toISOString().split('T')[0];
    return actividadesDataBase[dateKey] || [];
  };

  // Función para formatear el nombre del día seleccionado
  const getSelectedDayName = (): string => {
    const days = generateWeekDays(currentWeekStart);
    const selectedDay = days.find((day: DiasSemana) => day.fecha === selectedDate.toISOString().split('T')[0]);
    if (selectedDay) {
      return `${selectedDay.nombre} ${selectedDay.numero}`;
    }
    return '';
  };

  // Inicializar con la semana actual al cargar el componente
  useEffect(() => {
    const today = new Date();
    const weekStart = getWeekStart(today);
    setCurrentWeekStart(weekStart);
    setSelectedDate(today);
  }, []);

  const getEstadoStyle = (estado: string) => {
    switch (estado) {
      case "Puntual":
        return { backgroundColor: "#dcfce7", color: "#166534", padding: "4px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: "500" };
      case "Tardanza":
        return { backgroundColor: "#fef3c7", color: "#92400e", padding: "4px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: "500" };
      case "Falta":
        return { backgroundColor: "#fee2e2", color: "#991b1b", padding: "4px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: "500" };
      case "Incompleto":
        return { backgroundColor: "#fef3c7", color: "#92400e", padding: "4px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: "500" };
      case "Descanso":
        return { backgroundColor: "#f3f4f6", color: "#374151", padding: "4px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: "500" };
      default:
        return { backgroundColor: "#f3f4f6", color: "#374151", padding: "4px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: "500" };
    }
  };

  const diasSemana = generateWeekDays(currentWeekStart);
  const activitiesForSelectedDate = getActivitiesForDate(selectedDate);
  const weekAttendanceData = getWeekAttendance(selectedAsistenciasDate);
  const calendarDays = generateCalendarDays(showCalendar ? selectedDate : selectedAsistenciasDate);
  
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#f8fafc" }}>
      <Sidebar />
      <main style={{ flex: 1, overflow: "auto" }}>
        <div style={{ padding: "32px" }}>
          {/* Breadcrumb */}
          <nav style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
              <Link href="/personal" style={{ color: "#3b82f6", textDecoration: "none" }}>
                Personal
              </Link>
              <span style={{ color: "#9ca3af" }}>/</span>
              <span style={{ color: "#6b7280" }}>Perfil de empleado</span>
            </div>
          </nav>

          {/* Header del perfil */}
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "32px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            marginBottom: "24px"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <div style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  backgroundColor: "#f59e0b",
                  backgroundImage: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden"
                }}>
                  <div style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    backgroundColor: "#fbbf24",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "32px",
                    color: "#ffffff"
                  }}>
                    👤
                  </div>
                </div>
                <div>
                  <h1 style={{ 
                    fontSize: "28px", 
                    fontWeight: "700", 
                    color: "#1f2937",
                    margin: "0 0 4px 0"
                  }}>
                    {empleadoData.nombre}
                  </h1>
                  <p style={{ 
                    fontSize: "14px", 
                    color: "#6b7280",
                    margin: "0 0 2px 0"
                  }}>
                    DNI: {empleadoData.dni}
                  </p>
                  <p style={{ 
                    fontSize: "14px", 
                    color: "#6b7280",
                    margin: 0
                  }}>
                    Cargo: {empleadoData.cargo}
                  </p>
                </div>
              </div>
              
              <button style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#1d4ed8",
                color: "#ffffff",
                padding: "10px 16px",
                borderRadius: "8px",
                border: "none",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}>
                <FaEdit />
                Editar
              </button>
            </div>
          </div>

          {/* Pestañas */}
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}>
            {/* Header de pestañas */}
            <div style={{
              borderBottom: "1px solid #e5e7eb",
              padding: "0 32px"
            }}>
              <div style={{ display: "flex" }}>
                <button
                  onClick={() => setActiveTab('asistencias')}
                  style={{
                    padding: "16px 0",
                    marginRight: "32px",
                    backgroundColor: "transparent",
                    border: "none",
                    fontSize: "16px",
                    fontWeight: "500",
                    color: activeTab === 'asistencias' ? "#1d4ed8" : "#6b7280",
                    cursor: "pointer",
                    borderBottom: activeTab === 'asistencias' ? "2px solid #1d4ed8" : "2px solid transparent",
                    transition: "all 0.2s ease"
                  }}
                >
                  Asistencias
                </button>
                <button
                  onClick={() => setActiveTab('actividades')}
                  style={{
                    padding: "16px 0",
                    backgroundColor: "transparent",
                    border: "none",
                    fontSize: "16px",
                    fontWeight: "500",
                    color: activeTab === 'actividades' ? "#1d4ed8" : "#6b7280",
                    cursor: "pointer",
                    borderBottom: activeTab === 'actividades' ? "2px solid #1d4ed8" : "2px solid transparent",
                    transition: "all 0.2s ease"
                  }}
                >
                  Actividades
                </button>
              </div>
            </div>

            {/* Contenido de las pestañas */}
            <div style={{ padding: "32px" }}>
              {activeTab === 'asistencias' && (
                <div>
                  {/* Header de asistencias */}
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    marginBottom: "24px"
                  }}>
                    <h2 style={{ 
                      fontSize: "20px", 
                      fontWeight: "600", 
                      color: "#1f2937",
                      margin: 0
                    }}>
                      Asistencias
                    </h2>
                    <div style={{ display: "flex", gap: "12px" }}>
                      <div style={{ position: "relative" }}>
                        <input
                          type="text"
                          placeholder="Buscar..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          style={{
                            padding: "8px 12px 8px 36px",
                            border: "1px solid #d1d5db",
                            borderRadius: "6px",
                            fontSize: "14px",
                            outline: "none",
                            width: "200px"
                          }}
                        />
                        <FaSearch style={{
                          position: "absolute",
                          left: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#9ca3af",
                          fontSize: "12px"
                        }} />
                      </div>
                      <div style={{ position: "relative" }}>
                        <button 
                          onClick={() => setShowAsistenciasCalendar(!showAsistenciasCalendar)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "8px 12px",
                            border: "1px solid #d1d5db",
                            borderRadius: "6px",
                            backgroundColor: "#ffffff",
                            fontSize: "14px",
                            color: "#6b7280",
                            cursor: "pointer"
                          }}
                        >
                          <FaFilter />
                          {selectedAsistenciasDate.getDate()} de {months[selectedAsistenciasDate.getMonth()]} {selectedAsistenciasDate.getFullYear()}
                        </button>
                        
                        {showAsistenciasCalendar && (
                          <div style={{
                            position: "absolute",
                            top: "100%",
                            right: "0",
                            marginTop: "8px",
                            backgroundColor: "#ffffff",
                            border: "1px solid #e5e7eb",
                            borderRadius: "12px",
                            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                            padding: "16px",
                            zIndex: 1000,
                            minWidth: "280px"
                          }}>
                            <div style={{ 
                              textAlign: "center", 
                              marginBottom: "12px",
                              fontSize: "16px",
                              fontWeight: "600",
                              color: "#1f2937"
                            }}>
                              {months[selectedAsistenciasDate.getMonth()]} {selectedAsistenciasDate.getFullYear()}
                            </div>
                            
                            <div style={{
                              display: "grid",
                              gridTemplateColumns: "repeat(7, 1fr)",
                              gap: "4px",
                              marginBottom: "8px"
                            }}>
                              {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(day => (
                                <div key={day} style={{
                                  textAlign: "center",
                                  fontSize: "12px",
                                  fontWeight: "500",
                                  color: "#6b7280",
                                  padding: "4px"
                                }}>
                                  {day}
                                </div>
                              ))}
                            </div>
                            
                            <div style={{
                              display: "grid",
                              gridTemplateColumns: "repeat(7, 1fr)",
                              gap: "2px"
                            }}>
                              {calendarDays.map((day, index) => (
                                <button
                                  key={index}
                                  onClick={() => selectAsistenciasDate(day.date)}
                                  style={{
                                    padding: "8px 4px",
                                    border: "none",
                                    borderRadius: "6px",
                                    backgroundColor: day.isSelected ? "#1d4ed8" : day.isToday ? "#eff6ff" : "transparent",
                                    color: day.isSelected ? "#ffffff" : day.isToday ? "#1d4ed8" : day.isCurrentMonth ? "#374151" : "#d1d5db",
                                    fontSize: "14px",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease"
                                  }}
                                >
                                  {day.day}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Tabla de asistencias */}
                  <div style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    overflow: "hidden"
                  }}>
                    {/* Header de tabla */}
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
                      padding: "16px 20px",
                      backgroundColor: "#f9fafb",
                      borderBottom: "1px solid #e5e7eb",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#6b7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em"
                    }}>
                      <div>Día</div>
                      <div>Fecha</div>
                      <div>Ingreso</div>
                      <div>Salida</div>
                      <div>Estado</div>
                      <div>Horas Trabajadas</div>
                    </div>

                    {/* Filas de asistencias */}
                    {weekAttendanceData.map((asistencia, index) => (
                      <div
                        key={index}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
                          padding: "16px 20px",
                          borderBottom: index < weekAttendanceData.length - 1 ? "1px solid #f3f4f6" : "none",
                          alignItems: "center"
                        }}
                      >
                        <div style={{ fontSize: "14px", color: "#1f2937", fontWeight: "500" }}>
                          {asistencia.dia}
                        </div>
                        <div style={{ fontSize: "14px", color: "#6b7280" }}>
                          {asistencia.fecha}
                        </div>
                        <div style={{ fontSize: "14px", color: "#6b7280" }}>
                          {asistencia.ingreso}
                        </div>
                        <div style={{ fontSize: "14px", color: "#6b7280" }}>
                          {asistencia.salida}
                        </div>
                        <div>
                          <span style={getEstadoStyle(asistencia.estado)}>
                            {asistencia.estado}
                          </span>
                        </div>
                        <div style={{ fontSize: "14px", color: "#1f2937", fontWeight: "500" }}>
                          {asistencia.horasTrabajadas}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'actividades' && (
                <div>
                  {/* Header con navegación de semanas */}
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    marginBottom: "24px"
                  }}>
                    <div>
                      <h2 style={{ 
                        fontSize: "20px", 
                        fontWeight: "600", 
                        color: "#1f2937",
                        margin: "0 0 4px 0"
                      }}>
                        Actividades Semanales
                      </h2>
                      <p style={{ 
                        fontSize: "14px", 
                        color: "#6b7280",
                        margin: 0
                      }}>
                        {formatWeekRange(currentWeekStart)}
                      </p>
                    </div>
                    
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <button 
                        onClick={() => navigateWeek(-1)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "36px",
                          height: "36px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          backgroundColor: "#ffffff",
                          cursor: "pointer",
                          transition: "all 0.2s ease"
                        }}
                      >
                        <FaChevronLeft style={{ fontSize: "12px", color: "#6b7280" }} />
                      </button>
                      
                      <div style={{ position: "relative" }}>
                        <button 
                          onClick={() => setShowCalendar(!showCalendar)}
                          style={{
                            padding: "6px 12px",
                            border: "1px solid #d1d5db",
                            borderRadius: "6px",
                            backgroundColor: "#ffffff",
                            fontSize: "12px",
                            color: "#6b7280",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            minWidth: "120px"
                          }}
                        >
                          📅 {selectedDate.getDate()} de {months[selectedDate.getMonth()]}
                        </button>
                        
                        {showCalendar && (
                          <div style={{
                            position: "absolute",
                            top: "100%",
                            right: "0",
                            marginTop: "8px",
                            backgroundColor: "#ffffff",
                            border: "1px solid #e5e7eb",
                            borderRadius: "12px",
                            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                            padding: "16px",
                            zIndex: 1000,
                            minWidth: "280px"
                          }}>
                            <div style={{ 
                              textAlign: "center", 
                              marginBottom: "12px",
                              fontSize: "16px",
                              fontWeight: "600",
                              color: "#1f2937"
                            }}>
                              {months[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                            </div>
                            
                            <div style={{
                              display: "grid",
                              gridTemplateColumns: "repeat(7, 1fr)",
                              gap: "4px",
                              marginBottom: "8px"
                            }}>
                              {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(day => (
                                <div key={day} style={{
                                  textAlign: "center",
                                  fontSize: "12px",
                                  fontWeight: "500",
                                  color: "#6b7280",
                                  padding: "4px"
                                }}>
                                  {day}
                                </div>
                              ))}
                            </div>
                            
                            <div style={{
                              display: "grid",
                              gridTemplateColumns: "repeat(7, 1fr)",
                              gap: "2px"
                            }}>
                              {calendarDays.map((day, index) => (
                                <button
                                  key={index}
                                  onClick={() => selectCalendarDate(day.date)}
                                  style={{
                                    padding: "8px 4px",
                                    border: "none",
                                    borderRadius: "6px",
                                    backgroundColor: day.isSelected ? "#1d4ed8" : day.isToday ? "#eff6ff" : "transparent",
                                    color: day.isSelected ? "#ffffff" : day.isToday ? "#1d4ed8" : day.isCurrentMonth ? "#374151" : "#d1d5db",
                                    fontSize: "14px",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease"
                                  }}
                                >
                                  {day.day}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <button 
                        onClick={() => {
                          const today = new Date();
                          const weekStart = getWeekStart(today);
                          setCurrentWeekStart(weekStart);
                          setSelectedDate(today);
                        }}
                        style={{
                          padding: "6px 12px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          backgroundColor: "#ffffff",
                          fontSize: "12px",
                          color: "#6b7280",
                          cursor: "pointer",
                          transition: "all 0.2s ease"
                        }}
                      >
                        Hoy
                      </button>
                      
                      <button 
                        onClick={() => navigateWeek(1)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "36px",
                          height: "36px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          backgroundColor: "#ffffff",
                          cursor: "pointer",
                          transition: "all 0.2s ease"
                        }}
                      >
                        <FaChevronRight style={{ fontSize: "12px", color: "#6b7280" }} />
                      </button>
                    </div>
                  </div>

                  {/* Calendario semanal */}
                  <div style={{ marginBottom: "32px" }}>
                    <div style={{ 
                      display: "grid", 
                      gridTemplateColumns: "repeat(6, 1fr)", 
                      gap: "12px"
                    }}>
                      {diasSemana.map((dia, index) => (
                        <div
                          key={index}
                          onClick={() => selectDay(dia)}
                          style={{
                            textAlign: "center",
                            padding: "16px 12px",
                            borderRadius: "8px",
                            backgroundColor: dia.activo ? "#1d4ed8" : (dia.isToday ? "#eff6ff" : "#ffffff"),
                            border: dia.isToday && !dia.activo ? "2px solid #3b82f6" : "1px solid #e5e7eb",
                            color: dia.activo ? "#ffffff" : (dia.isToday ? "#1d4ed8" : "#6b7280"),
                            fontSize: "14px",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            position: "relative"
                          }}
                        >
                          <div style={{ fontWeight: "500" }}>{dia.nombre}</div>
                          <div style={{ 
                            fontSize: "20px", 
                            fontWeight: "700", 
                            marginTop: "4px" 
                          }}>
                            {dia.numero}
                          </div>
                          {dia.isToday && !dia.activo && (
                            <div style={{
                              position: "absolute",
                              top: "4px",
                              right: "4px",
                              width: "6px",
                              height: "6px",
                              backgroundColor: "#3b82f6",
                              borderRadius: "50%"
                            }} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Lista de actividades */}
                  <div>
                    <h3 style={{ 
                      fontSize: "18px", 
                      fontWeight: "600", 
                      color: "#1f2937",
                      margin: "0 0 20px 0"
                    }}>
                      Actividades del {getSelectedDayName()}
                    </h3>
                    
                    {activitiesForSelectedDate.length > 0 ? (
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {activitiesForSelectedDate.map((actividad, index) => (
                          <div
                            key={index}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "12px",
                              padding: "16px 0",
                              borderBottom: index < activitiesForSelectedDate.length - 1 ? "1px solid #f3f4f6" : "none"
                            }}
                          >
                            <div style={{
                              width: "24px",
                              height: "24px",
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
                            <p style={{ 
                              fontSize: "14px", 
                              color: "#374151",
                              margin: 0,
                              lineHeight: "1.5"
                            }}>
                              {actividad}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{
                        textAlign: "center",
                        padding: "40px 20px",
                        color: "#9ca3af",
                        backgroundColor: "#f9fafb",
                        borderRadius: "8px",
                        border: "1px dashed #d1d5db"
                      }}>
                        <div style={{ fontSize: "48px", marginBottom: "16px" }}>📅</div>
                        <p style={{ fontSize: "16px", margin: "0 0 8px 0" }}>No hay actividades programadas</p>
                        <p style={{ fontSize: "14px", margin: 0 }}>para este día</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}