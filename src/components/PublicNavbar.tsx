'use client'
import Link from "next/link"
import { SearchInput } from "./SearchInput"
import { useState } from "react"

export const PublicNavbar = () => {
  const [showMenu, setShowMenu] = useState(false)
  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }
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
        <div className="md:hidden p-4">
          <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="1.5" 
              stroke="currentColor" 
              className={`${showMenu ? 'fixed right-8' : 'relative'} w-8 h-8 cursor-pointer z-30 text-white`}
              onClick={toggleMenu}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          {
            showMenu && (
              <div className="fixed grid place-content-center z-20 top-0 right-0 w-screen h-screen bg-indigo-600 ease-linear overflow-hidden">
                <nav className="my-5 text-lg font-bold flex flex-col gap-4 items-center text-white">
                  <Link onClick={toggleMenu} href='/auth/register'>Crear cuenta</Link>
                  <Link onClick={toggleMenu} href='/auth/login'>Login</Link>
                </nav>
              </div>
            )
          }
        </div>
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
         <SearchInput />
        </div>
      </div>
    </>
  )
}