type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <main className="mx-auto container mt-10 px-2">
      {children}
    </main>
  )
}