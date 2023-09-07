import React from "react"

type Props = {
  children: React.ReactNode
}

const layout = ({ children }: Props ) => {
  return (
    <>
      <title>Bienes Raices | Confirmar cuenta</title>
      {children} 
    </>
  )
}

export default layout
