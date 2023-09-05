import Link from "next/link"

export const PublicNavbar = () => {
  return (
    <>
      <header className="bg-indigo-600 px-4 py-1">
        <div className="container mx-auto flex justify-between items-center">
          <Link href='/'>
            <h1 className="text-2xl text-white font-extrabold text-center">
              Bienes
              <span className="font-normal">Raices</span>
            </h1>
          </Link>
          <nav className="my-5 text-sm md:flex md:items-center md:gap-3 font-bold text-white hidden">
            <Link href='/auth/register'>Crear cuenta</Link>
            <Link href='/auth/login'>Login</Link>
          </nav>
        </div>
      </header>
      <div className="bg-indigo-700  px-4 py-4 items-center hidden lg:block">
        <div className="container mx-auto flex justify-between">
         <nav className="flex gap-4 items-center">
          <Link className="text-sm font-bold uppercase text-white" href='/categorias/1'>Casas</Link>
            <Link className="text-sm font-bold uppercase text-white" href='/categorias/2'>Departamentos</Link>
            <Link className="text-sm font-bold uppercase text-white" href='/categorias/3'>Bodegas</Link>
            <Link className="text-sm font-bold uppercase text-white" href='/categorias/4'>Terrenos</Link>
            <Link className="text-sm font-bold uppercase text-white" href='/categorias/5'>Cabañas</Link>
         </nav>
         <div className="flex gap-3 items-center">
          <input name="search" type="text" className="p-2 rounded-lg shadow text-sm" placeholder="Buscar propiedad" />
          <button className="bg-indigo-800 hover:bg-indigo-500 rounded-lg text-white font-bold p-2 cursor-pointer text-sm">
            Buscar
          </button>
         </div>
        </div>
      </div>
    </>
  )
}