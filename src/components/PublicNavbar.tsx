import Link from "next/link"

export const PublicNavbar = () => {
  return (
    <>
      <header className="bg-indigo-600 px-4 py-1">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl text-white font-extrabold text-center">
            Bienes
            <span className="font-normal">Raices</span>
          </h1>
          <nav className="my-5 text-sm md:flex md:items-center md:gap-3 font-bold text-white hidden">
            <Link href='/auth/register'>Crear cuenta</Link>
            <Link href='/auth/login'>Login</Link>
          </nav>
        </div>
      </header>
      <div className="bg-indigo-700  px-4 py-4 items-center hidden lg:block">
        <div className="container mx-auto flex justify-between">
          <Link className="text-sm font-bold uppercase text-white" href='/categorias/1'>Casas</Link>
          <Link className="text-sm font-bold uppercase text-white" href='/categorias/2'>Departamentos</Link>
          <Link className="text-sm font-bold uppercase text-white" href='/categorias/3'>Bodegas</Link>
          <Link className="text-sm font-bold uppercase text-white" href='/categorias/4'>Terrenos</Link>
          <Link className="text-sm font-bold uppercase text-white" href='/categorias/5'>Cabañas</Link>
        </div>
      </div>
    </>
  )
}