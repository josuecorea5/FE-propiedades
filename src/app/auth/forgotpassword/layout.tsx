import React from "react"

type Props = {
  children: React.ReactNode
}

const layout = ({ children }: Props ) => {
  return (
    <>
      <title>Bienes Raices | Reestablecer contraseña</title>
      {children} 
    </>
  )
}

export default layout