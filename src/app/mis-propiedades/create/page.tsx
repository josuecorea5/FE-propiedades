'use client'

import { CreatePropertyForm, InputsProperty } from "@/components/CreatePropertyForm";

type Property = InputsProperty & {
  street: string;
  lat: number;
  lng: number;
}

export default function CreatePropertyPage() {

  const onSubmit = (data: InputsProperty) => {
    console.log(data);
  }

  return (
    <div className="py-8">
      <h1 className="text-4xl my-2 font-extrabold text-center">
        Bienes
        <span className="font-normal">Raices</span>
      </h1>
      <h2 className="text-center text-2xl font-extrabold">
        Crear propiedad
      </h2>
      <CreatePropertyForm onSubmit={onSubmit} />
    </div>
  )
}