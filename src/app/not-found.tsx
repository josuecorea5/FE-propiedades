import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center text-gray-700 text-2xl grid py-12">
      <p>Lo sentimos, recurso no encontrado.</p>
      <Link className="text-indigo-600 hover:underline" href="/"> Volver al inicio</Link>
    </div>
  )
}