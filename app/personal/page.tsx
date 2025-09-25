"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "../components/Sidebar";
import { FaEye, FaPlus } from "react-icons/fa";

// Datos simulados
const empleados = [
  {
    id: 1,
    foto: "/avatars/sophia.jpg",
    nombre: "Sophia",
    apellidos: "Clark",
    cargo: "Project Manager",
    area: "Engineering",
    dni: "12345678",
    telefono: "987654321"
  },
  {
    id: 2,
    foto: "/avatars/ethan.jpg",
    nombre: "Ethan",
    apellidos: "Walker",
    cargo: "Software Engineer",
    area: "Engineering",
    dni: "23456789",
    telefono: "876543210"
  },
  {
    id: 3,
    foto: "/avatars/olivia.jpg",
    nombre: "Olivia",
    apellidos: "Reed",
    cargo: "UX Designer",
    area: "Design",
    dni: "34567890",
    telefono: "765432109"
  },
  {
    id: 4,
    foto: "/avatars/liam.jpg",
    nombre: "Liam",
    apellidos: "Hayes",
    cargo: "QA Engineer",
    area: "Engineering",
    dni: "45678901",
    telefono: "654321098"
  },
  {
    id: 5,
    foto: "/avatars/ava.jpg",
    nombre: "Ava",
    apellidos: "Bennett",
    cargo: "Product Manager",
    area: "Product",
    dni: "56789012",
    telefono: "543210987"
  },
  {
    id: 6,
    foto: "/avatars/noah.jpg",
    nombre: "Noah",
    apellidos: "Carter",
    cargo: "Data Analyst",
    area: "Analytics",
    dni: "67890123",
    telefono: "432109876"
  }
];

export default function Personal() {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    dni: "",
    area: "",
    horario: "",
    telefono: "",
    foto: null as File | null
  });

  const itemsPerPage = 6;
  const totalPages = Math.ceil(empleados.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEmpleados = empleados.slice(startIndex, startIndex + itemsPerPage);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona una imagen válida');
        return;
      }
      
      // Validar tamaño (10MB = 10 * 1024 * 1024 bytes)
      if (file.size > 10 * 1024 * 1024) {
        alert('La imagen debe ser menor a 10MB');
        return;
      }

      setFormData(prev => ({
        ...prev,
        foto: file
      }));

      // Crear vista previa
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setFormData(prev => ({
      ...prev,
      foto: null
    }));
    setPhotoPreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos del empleado:", formData);
    // Aquí enviarías los datos incluyendo la foto al servidor
    
    setShowModal(false);
    setFormData({
      nombres: "",
      apellidos: "",
      dni: "",
      area: "",
      horario: "",
      telefono: "",
      foto: null
    });
    setPhotoPreview(null);
  };

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#f8fafc" }}>
      <Sidebar />
      <main style={{ flex: 1, overflow: "auto" }}>
        <div style={{ padding: "32px" }}>
          {/* Header */}
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            marginBottom: "32px"
          }}>
            <div>
              <h1 style={{ 
                fontSize: "28px", 
                fontWeight: "700", 
                color: "#1f2937",
                margin: "0 0 8px 0"
              }}>
                Gestión de Personal
              </h1>
              <p style={{ 
                color: "#6b7280", 
                margin: 0,
                fontSize: "16px"
              }}>
                Veo y gestiona los datos de su personal.
              </p>
            </div>
            
            <button
              onClick={() => setShowModal(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#1d4ed8",
                color: "#ffffff",
                padding: "12px 20px",
                borderRadius: "8px",
                border: "none",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#1e40af";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#1d4ed8";
              }}
            >
              <FaPlus />
              Añadir Empleado
            </button>
          </div>

          {/* Tabla */}
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            overflow: "hidden"
          }}>
            {/* Header de tabla */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "80px 1fr 1fr 1fr 1fr 80px",
              padding: "20px 24px",
              backgroundColor: "#f9fafb",
              borderBottom: "1px solid #e5e7eb",
              fontSize: "12px",
              fontWeight: "600",
              color: "#6b7280",
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            }}>
              <div>Foto</div>
              <div>Nombre</div>
              <div>Apellidos</div>
              <div>Cargo</div>
              <div>Área</div>
              <div style={{ textAlign: "center" }}>Acción</div>
            </div>

            {/* Filas de empleados */}
            {currentEmpleados.map((empleado) => (
              <div
                key={empleado.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr 1fr 1fr 1fr 80px",
                  padding: "20px 24px",
                  borderBottom: "1px solid #f3f4f6",
                  alignItems: "center",
                  transition: "background-color 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f9fafb";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#e5e7eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px"
                }}>
                  👤
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
                  color: "#6b7280" 
                }}>
                  {empleado.apellidos}
                </div>
                <div style={{ 
                  fontSize: "14px", 
                  color: "#6b7280" 
                }}>
                  {empleado.cargo}
                </div>
                <div style={{ 
                  fontSize: "14px", 
                  color: "#6b7280" 
                }}>
                  {empleado.area}
                </div>
                <div style={{ textAlign: "center" }}>
                  <Link href={`/personal/${empleado.id}`}>
                    <button
                      style={{
                        padding: "8px",
                        backgroundColor: "transparent",
                        border: "1px solid #e5e7eb",
                        borderRadius: "6px",
                        cursor: "pointer",
                        color: "#1d4ed8",
                        fontSize: "14px",
                        transition: "all 0.2s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#eff6ff";
                        e.currentTarget.style.borderColor = "#1d4ed8";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.borderColor = "#e5e7eb";
                      }}
                    >
                      <FaEye />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Paginación */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "24px"
          }}>
            <p style={{
              fontSize: "14px",
              color: "#6b7280",
              margin: 0
            }}>
              Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, empleados.length)} de {empleados.length} resultados
            </p>
            
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                style={{
                  padding: "8px 12px",
                  backgroundColor: "transparent",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  color: currentPage === 1 ? "#9ca3af" : "#6b7280",
                  fontSize: "14px"
                }}
              >
                ←
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: currentPage === page ? "#1d4ed8" : "transparent",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    cursor: "pointer",
                    color: currentPage === page ? "#ffffff" : "#6b7280",
                    fontSize: "14px",
                    fontWeight: currentPage === page ? "600" : "400"
                  }}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                style={{
                  padding: "8px 12px",
                  backgroundColor: "transparent",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                  color: currentPage === totalPages ? "#9ca3af" : "#6b7280",
                  fontSize: "14px"
                }}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Modal para añadir empleado */}
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
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            padding: "32px",
            width: "min(600px, 90vw)",
            maxHeight: "90vh",
            overflow: "auto",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)"
          }}>
            {/* Header del modal con foto funcional */}
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "16px",
              marginBottom: "24px"
            }}>
              <div style={{
                width: "80px",
                height: "80px",
                backgroundColor: "#f3f4f6",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                overflow: "hidden",
                position: "relative"
              }}>
                {photoPreview ? (
                  <>
                    <img
                      src={photoPreview}
                      alt="Vista previa"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                    />
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
                ) : (
                  "👤"
                )}
              </div>
              <div>
                <label
                  htmlFor="photo-upload"
                  style={{
                    backgroundColor: "#e5e7eb",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    color: "#6b7280",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#d1d5db";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#e5e7eb";
                  }}
                >
                  📷 Subir Foto
                </label>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  style={{ display: "none" }}
                />
                <p style={{
                  fontSize: "12px",
                  color: "#9ca3af",
                  margin: "4px 0 0 0"
                }}>
                  PNG, JPG hasta 10MB
                </p>
                {formData.foto && (
                  <p style={{
                    fontSize: "11px",
                    color: "#059669",
                    margin: "2px 0 0 0",
                    fontWeight: "500"
                  }}>
                    ✓ {formData.foto.name}
                  </p>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "16px"
              }}>
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "6px"
                  }}>
                    Nombres
                  </label>
                  <input
                    type="text"
                    name="nombres"
                    value={formData.nombres}
                    onChange={handleInputChange}
                    placeholder="Ingrese nombres"
                    required
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "14px",
                      outline: "none"
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "6px"
                  }}>
                    Apellidos
                  </label>
                  <input
                    type="text"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleInputChange}
                    placeholder="Ingrese apellidos"
                    required
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "14px",
                      outline: "none"
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "6px"
                }}>
                  DNI
                </label>
                <input
                  type="text"
                  name="dni"
                  value={formData.dni}
                  onChange={handleInputChange}
                  placeholder="Ingrese DNI"
                  required
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "14px",
                    outline: "none"
                  }}
                />
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
                marginBottom: "16px"
              }}>
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "6px"
                  }}>
                    Área / Cargo
                  </label>
                  <select
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "14px",
                      outline: "none",
                      backgroundColor: "#ffffff"
                    }}
                  >
                    <option value="">Seleccione área/cargo</option>
                    <option value="engineering">Engineering</option>
                    <option value="design">Design</option>
                    <option value="product">Product</option>
                    <option value="analytics">Analytics</option>
                  </select>
                </div>
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "6px"
                  }}>
                    Horario
                  </label>
                  <select
                    name="horario"
                    value={formData.horario}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "14px",
                      outline: "none",
                      backgroundColor: "#ffffff"
                    }}
                  >
                    <option value="">Seleccione horario</option>
                    <option value="mañana">Mañana (8:00 - 16:00)</option>
                    <option value="tarde">Tarde (14:00 - 22:00)</option>
                    <option value="completo">Completo (9:00 - 18:00)</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "6px"
                }}>
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  placeholder="Ingrese número de teléfono"
                  required
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontSize: "14px",
                    outline: "none"
                  }}
                />
              </div>

              <div style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px"
              }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#f3f4f6",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#6b7280",
                    cursor: "pointer"
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#1d4ed8",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#ffffff",
                    cursor: "pointer"
                  }}
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}