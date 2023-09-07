'use client'
import Link from "next/link"
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from "next/navigation"
import { useState } from "react"

export const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)
  const router = useRouter()
  const { logout } = useAuth()

  const onLogOut = () => {
    logout()
    router.push('/auth/login')
  }

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <header className="bg-indigo-600 px-4 py-1">
      <div className="container mx-auto flex justify-between items-center">
        <Link href='/'>
          <h1 className="text-2xl text-white font-extrabold text-center">
            Bienes
            <span className="font-normal">Raices</span>
          </h1>
        </Link>
        <nav className="sm:hidden my-5 text-sm flex items-center justify-between md:flex md:items-center md:gap-3 font-bold text-white">
          <Link href='/mis-propiedades'>Mis Propiedades</Link>
          <button onClick={onLogOut} className="bg-indigo-800 py-2 px-6 rounded-lg hover:bg-indigo-950">Cerrar sesión</button>
        </nav>
        <div className="md:hidden p-5">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="1.5" 
            stroke="currentColor" 
            className="w-8 h-8 cursor-pointer z-30 text-white relative"
            onClick={toggleMenu}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          {
            showMenu && (
            <div className="absolute grid place-content-center z-20 top-0 right-0 w-screen h-screen bg-indigo-600 ease-linear">
              <nav className="my-5 text-sm font-bold flex flex-col gap-4 items-center text-white">
                <Link onClick={toggleMenu} href='/mis-propiedades'>Mis Propiedades</Link>
                <button onClick={onLogOut} className="bg-indigo-800 py-2 px-6 rounded-lg hover:bg-indigo-950">Cerrar sesión</button>
              </nav>
            </div>
            )
          }
        </div>
      </div>
    </header>
  )
}