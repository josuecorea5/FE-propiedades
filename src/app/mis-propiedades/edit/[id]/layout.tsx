type Props = {
  children: React.ReactNode
}

const layout = ({ children }: Props ) => {
  return (
    <>
      <title>Bienes Raices | Editar Propiedad</title>
      {children}
    </>
  )
} 

export default layout;
