import { Link } from "react-router-dom";

export default function DashboardView() {
  return (
    <>
    <div className="p-4">
      <h1 className="text-5xl font-black mb-4">Mis Proyectos</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">Maneja y Administra tus proyectos</p>
      
      <nav className="mt-10 flex justify-between items-center">
        <Link to="/projects/create" className="bg-purple-400 hover:bg-purple-600 text-white font-bold py-3 px-10 text-xl cursor-pointer transition-colors duration-300">Nuevo Proyecto</Link>
      </nav>
    </div>
    </>
  )
}
