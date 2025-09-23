"use client";
import Sidebar from "../components/Sidebar";

export default function DashboardPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 ml-20 md:ml-56 transition-all">
        <h1 className="text-2xl font-bold mb-6">Bienvenido, Admin 👋</h1>

        {/* Cards resumen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 bg-green-100 rounded-lg shadow">
            <h2 className="font-bold">Asistencias</h2>
            <p className="text-xl text-gray-700">Aún no hay datos</p>
          </div>
          <div className="p-4 bg-yellow-100 rounded-lg shadow">
            <h2 className="font-bold">Tardanzas</h2>
            <p className="text-xl text-gray-700">Aún no hay datos</p>
          </div>
          <div className="p-4 bg-red-100 rounded-lg shadow">
            <h2 className="font-bold">Faltas</h2>
            <p className="text-xl text-gray-700">Aún no hay datos</p>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-lg shadow text-center">
            <h2 className="font-semibold">Asistencias de la semana</h2>
            <p className="text-gray-500">Aún no hay datos</p>
          </div>
          <div className="p-6 border rounded-lg shadow text-center">
            <h2 className="font-semibold">Productividad</h2>
            <p className="text-gray-500">Aún no hay datos</p>
          </div>
        </div>
      </div>
    </div>
  );
}
