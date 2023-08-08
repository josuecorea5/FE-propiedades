import React from "react"

type Props = {
  children: React.ReactNode
}

const layout = ({ children }: Props ) => {
  return (
    <>
      <title>Bienes Raices | Crear Propiedad</title>
      {children} 
    </>
  )
}

export default layout