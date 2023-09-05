import Link from "next/link"
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from "next/navigation"

export const Navbar = () => {
  const router = useRouter()
  const { logout } = useAuth()

  const onLogOut = () => {
    logout()
    router.push('/auth/login')
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
        <nav className="my-5 text-sm md:flex md:items-center md:gap-3 font-bold text-white">
          <Link href='/mis-propiedades'>Mis Propiedades</Link>
          <Link href='#'>Mi Perfil</Link>
          <button onClick={onLogOut} className="bg-indigo-800 py-2 px-6 rounded-lg hover:bg-indigo-950">Cerrar sesión</button>
        </nav>
      </div>
    </header>
  )
}