"use client";

import React, { useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import { FaCamera, FaUpload, FaTimes, FaCheck, FaQrcode } from "react-icons/fa";

const QRScanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = async () => {
    try {
      setIsScanning(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setTimeout(() => {
        handleSuccessfulScan("EMP001-2025-09-26-08:30");
      }, 3000);
    } catch (error) {
      alert(
        "No se pudo acceder a la cámara. Verifica permisos o que el servidor use 0.0.0.0 y la app esté en HTTP/HTTPS permitidos."
      );
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  };

  const handleSuccessfulScan = (data: string) => {
    setScannedData(data);
    setShowNotification(true);
    stopCamera();
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setTimeout(() => {
        handleSuccessfulScan("EMP001-2025-09-26-08:30");
      }, 1000);
    }
  };

  // Estilo base para los botones centrales
  const buttonStyleBase = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    whiteSpace: "nowrap",
    padding: "16px",
    fontSize: "1rem",
    borderRadius: "8px",
    fontWeight: 600,
    cursor: "pointer",
    maxWidth: "220px",
    width: "100%",
    justifyContent: "center",
  } as const;

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#f8fafc" }}>
      <Sidebar />
      <main style={{ flex: 1, position: "relative" }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>
          {/* Marco del lector QR con esquinas */}
          <div style={{
            position: "relative",
            width: "220px",
            height: "220px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "40px", height: "40px", borderTop: "4px solid #2563eb", borderLeft: "4px solid #2563eb", borderRadius: "9px 0 0 0" }} />
            <div style={{ position: "absolute", top: 0, right: 0, width: "40px", height: "40px", borderTop: "4px solid #2563eb", borderRight: "4px solid #2563eb", borderRadius: "0 9px 0 0" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, width: "40px", height: "40px", borderBottom: "4px solid #2563eb", borderLeft: "4px solid #2563eb", borderRadius: "0 0 0 9px" }} />
            <div style={{ position: "absolute", bottom: 0, right: 0, width: "40px", height: "40px", borderBottom: "4px solid #2563eb", borderRight: "4px solid #2563eb", borderRadius: "0 0 9px 0" }} />

            {isScanning ? (
              <video
                ref={videoRef}
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }}
                playsInline
                muted
              />
            ) : (
              <FaQrcode size={64} color="#d1d5db" />
            )}
          </div>

          <p style={{
            fontSize: "18px",
            color: "#374151",
            fontWeight: 500,
            marginBottom: "24px",
            textAlign: "center",
            maxWidth: "340px"
          }}>
            Apunta el código QR dentro del recuadro para registrar asistencia
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "220px" }}>
            {!isScanning ? (
              <>
                <button
                  onClick={startCamera}
                  style={{
                    ...buttonStyleBase,
                    backgroundColor: "#2563eb",
                    color: "white",
                    border: "none"
                  }}
                >
                  <FaCamera />
                  Escanear ahora
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    ...buttonStyleBase,
                    backgroundColor: "transparent",
                    color: "#2563eb",
                    border: "2px solid #2563eb"
                  }}
                >
                  <FaUpload />
                  Subir imagen
                </button>
              </>
            ) : (
              <button
                onClick={stopCamera}
                style={{
                  ...buttonStyleBase,
                  backgroundColor: "#dc2626",
                  color: "white",
                  border: "none"
                }}
              >
                <FaTimes />
                Cancelar
              </button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />

        </div>

        {showNotification && (
          <>
            <div style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              borderRadius: "16px",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              padding: "30px",
              zIndex: 1002,
              maxWidth: "90%",
              width: "400px",
              textAlign: "center"
            }}>
              <div style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#dcfce7",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px auto"
              }}>
                <FaCheck style={{ fontSize: "24px", color: "#16a34a" }} />
              </div>
              <h3 style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "#1f2937",
                marginBottom: "10px"
              }}>
                ¡Asistencia Registrada!
              </h3>
              <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "15px" }}>
                Tu asistencia ha sido registrada exitosamente
              </p>
              <div style={{
                backgroundColor: "#f3f4f6",
                padding: "15px",
                borderRadius: "8px",
                fontSize: "14px",
                color: "#374151",
                fontFamily: "monospace"
              }}>
                {scannedData}
              </div>
              <div style={{ marginTop: "20px", fontSize: "12px", color: "#9ca3af" }}>
                26 de Septiembre, 2025 - 08:30 AM
              </div>
            </div>
            <div style={{
              position: "fixed",
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1001
            }} />
          </>
        )}
      </main>
    </div>
  );
};

export default QRScanner;
