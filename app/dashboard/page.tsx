import Sidebar from "../components/Sidebar";

export default function Dashboard() {
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
              Bienvenido Ronaldo 👋
            </h1>
            <p style={{ 
              color: "#6b7280", 
              margin: 0,
              fontSize: "16px"
            }}>
              Gestiona tu equipo con eficiencia.
            </p>
          </div>
          
          {/* Cards de estadísticas */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "24px",
            marginBottom: "32px"
          }}>
            {/* Asistencias */}
            <div style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              padding: "24px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#dcfce7",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px"
                }}>
                  📋
                </div>
                <div>
                  <p style={{ 
                    fontSize: "14px", 
                    color: "#6b7280", 
                    margin: "0 0 4px 0",
                    fontWeight: "500"
                  }}>
                    Asistencias
                  </p>
                  <p style={{ 
                    fontSize: "32px", 
                    fontWeight: "700", 
                    color: "#1f2937",
                    margin: 0
                  }}>
                    120
                  </p>
                </div>
              </div>
            </div>

            {/* Tardanzas */}
            <div style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              padding: "24px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#fed7aa",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px"
                }}>
                  ⏰
                </div>
                <div>
                  <p style={{ 
                    fontSize: "14px", 
                    color: "#6b7280", 
                    margin: "0 0 4px 0",
                    fontWeight: "500"
                  }}>
                    Tardanzas
                  </p>
                  <p style={{ 
                    fontSize: "32px", 
                    fontWeight: "700", 
                    color: "#1f2937",
                    margin: 0
                  }}>
                    15
                  </p>
                </div>
              </div>
            </div>

            {/* Faltas */}
            <div style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              padding: "24px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#fecaca",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px"
                }}>
                  📅
                </div>
                <div>
                  <p style={{ 
                    fontSize: "14px", 
                    color: "#6b7280", 
                    margin: "0 0 4px 0",
                    fontWeight: "500"
                  }}>
                    Faltas
                  </p>
                  <p style={{ 
                    fontSize: "32px", 
                    fontWeight: "700", 
                    color: "#1f2937",
                    margin: 0
                  }}>
                    5
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sección principal con gráficos */}
          <div style={{ 
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "24px",
            marginBottom: "32px"
          }}>
            {/* Gráfico de asistencias de la semana */}
            <div style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              padding: "24px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
              <div style={{ marginBottom: "20px" }}>
                <h3 style={{ 
                  fontSize: "18px", 
                  fontWeight: "600", 
                  color: "#1f2937",
                  margin: "0 0 8px 0"
                }}>
                  Asistencias de la semana
                </h3>
                <div style={{ display: "flex", gap: "16px", fontSize: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <div style={{ 
                      width: "12px", 
                      height: "12px", 
                      backgroundColor: "#22c55e",
                      borderRadius: "50%" 
                    }}></div>
                    <span style={{ color: "#6b7280" }}>Puntual</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <div style={{ 
                      width: "12px", 
                      height: "12px", 
                      backgroundColor: "#f97316",
                      borderRadius: "50%" 
                    }}></div>
                    <span style={{ color: "#6b7280" }}>Tardanza</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <div style={{ 
                      width: "12px", 
                      height: "12px", 
                      backgroundColor: "#ef4444",
                      borderRadius: "50%" 
                    }}></div>
                    <span style={{ color: "#6b7280" }}>Falta</span>
                  </div>
                </div>
              </div>
              
              {/* Gráfico simulado */}
              <div style={{ 
                display: "flex", 
                alignItems: "end", 
                justifyContent: "space-between",
                height: "200px",
                gap: "8px"
              }}>
                {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day, index) => (
                  <div key={day} style={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center",
                    flex: 1
                  }}>
                    <div style={{ 
                      width: "100%", 
                      height: `${120 + Math.random() * 60}px`,
                      backgroundColor: "#22c55e",
                      borderRadius: "4px 4px 0 0",
                      position: "relative"
                    }}>
                      {/* Tardanzas */}
                      <div style={{
                        position: "absolute",
                        bottom: "0",
                        width: "100%",
                        height: `${10 + Math.random() * 20}px`,
                        backgroundColor: "#f97316"
                      }}></div>
                      {/* Faltas */}
                      <div style={{
                        position: "absolute",
                        bottom: "0",
                        width: "100%",
                        height: `${Math.random() * 10}px`,
                        backgroundColor: "#ef4444"
                      }}></div>
                    </div>
                    <span style={{ 
                      fontSize: "12px", 
                      color: "#6b7280",
                      marginTop: "8px"
                    }}>
                      {day}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Productividad */}
            <div style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              padding: "24px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
              <h3 style={{ 
                fontSize: "18px", 
                fontWeight: "600", 
                color: "#1f2937",
                margin: "0 0 20px 0"
              }}>
                Productividad de actividades
              </h3>
              
              {/* Círculo de progreso simulado */}
              <div style={{ 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center",
                gap: "16px"
              }}>
                <div style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  background: `conic-gradient(#22c55e 0deg ${85 * 3.6}deg, #f3f4f6 ${85 * 3.6}deg 360deg)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative"
                }}>
                  <div style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "#ffffff",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column"
                  }}>
                    <span style={{ 
                      fontSize: "24px", 
                      fontWeight: "700", 
                      color: "#1f2937"
                    }}>
                      85%
                    </span>
                    <span style={{ 
                      fontSize: "10px", 
                      color: "#6b7280"
                    }}>
                      Completado
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mensaje motivacional */}
          <div style={{
            backgroundColor: "#fffbeb",
            borderRadius: "12px",
            padding: "24px",
            border: "1px solid #fbbf24",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div>
              <h4 style={{ 
                fontSize: "16px", 
                fontWeight: "600", 
                color: "#92400e",
                margin: "0 0 8px 0"
              }}>
                Un mensaje de Bro CEIPRO
              </h4>
              <p style={{ 
                color: "#92400e", 
                margin: 0,
                fontSize: "14px"
              }}>
                ¡Sigue adelante! Tu dedicación y esfuerzo son la clave del éxito de nuestro equipo. ¡Vamos por más!
              </p>
            </div>
            <div style={{ fontSize: "48px" }}>
              💪
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}