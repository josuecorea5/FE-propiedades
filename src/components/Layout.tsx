import { Navbar } from "./Navbar"
import { useAuth } from '../hooks/useAuth'
import { PublicNavbar } from "./PublicNavbar"

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const { token } = useAuth()
  return (
    <>
      {
        token ? <Navbar /> : <PublicNavbar />
      }
      <main className="mx-auto container px-2">
        {children}
      </main>
    </>
  )
}