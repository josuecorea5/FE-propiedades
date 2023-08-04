import React from "react"

type Props = {
  children: React.ReactNode
}

const layout = ({ children }: Props ) => {
  return (
    <>
      <title>Bienes Raices | Login</title>
      {children} 
    </>
  )
}

export default layout