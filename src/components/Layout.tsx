import { Navbar } from "./Navbar"
import { useAuth } from '../hooks/useAuth'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const { token } = useAuth()
  return (
    <>
      {token && <Navbar />}
      <main className="mx-auto container px-2">
        {children}
      </main>
    </>
  )
}