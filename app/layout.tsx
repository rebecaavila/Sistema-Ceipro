import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    <html lang="es" className={inter.className}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}