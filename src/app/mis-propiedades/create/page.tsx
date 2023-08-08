'use client'

import { CreatePropertyForm } from "@/components/CreatePropertyForm";

export default function CreatePropertyPage() {
  return (
    <div className="py-8">
      <h1 className="text-4xl my-2 font-extrabold text-center">
        Bienes
        <span className="font-normal">Raices</span>
      </h1>
      <h2 className="text-center text-2xl font-extrabold">
        Crear propiedad
      </h2>
      <CreatePropertyForm />
    </div>
  )
}