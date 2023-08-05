import { Navbar } from "@/components/Navbar"
import React from "react"

type Props = {
  children: React.ReactNode
}

const layout = ({ children }: Props ) => {
  return (
    <>
      <title>Bienes Raices | Mis propiedades</title>
      {children} 
    </>
  )
}

export default layout