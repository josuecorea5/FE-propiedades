type Props = {
  children: React.ReactNode
}

const layout = ({ children }: Props) => {
  return (
    <>
      <title>Bienes Raices | Propiedades</title>
      { children }
    </>
  )
}

export default layout