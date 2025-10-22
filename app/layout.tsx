import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "../app/components/ThemeContext"; 

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: "Sistema CEIPRO",
  description: "Gestión de asistencia",
};

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="es">
      <body className={`${inter.variable} antialiased`} style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
        <ThemeProvider> {/* Envuelve toda la app */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
