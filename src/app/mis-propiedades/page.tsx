import Link from "next/link";

export default function MyPropertiesPage() {
  return (
    <div className="py-8">
      <h1 className="text-4xl my-2 font-extrabold text-center">
        Bienes
        <span className="font-normal">Raices</span>
      </h1>
      <h2 className="text-center text-2xl font-extrabold">
        Mis propiedades
      </h2>
      <Link className="rounded py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-sm font-bold text-center text-white inline-block my-5 w-full md:w-auto" href='/mis-propiedades/create'>
        Publicar propiedad
      </Link>
    </div>
  )
}