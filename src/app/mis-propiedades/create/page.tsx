'use client'

import { CreatePropertyForm, InputsProperty } from "@/components/CreatePropertyForm";
import endPoints from "@/services";
import propertyService from '@/services/properties'
import { useRouter } from "next/navigation";

export default function CreatePropertyPage() {

  const router = useRouter();

  const onSubmit = (data: InputsProperty) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('categoryId', data.categoryId);
    formData.append('priceId', data.priceId);
    formData.append('bedrooms', data.bedrooms);
    formData.append('garages', data.garages);
    formData.append('bathrooms', data.bathrooms);
    formData.append('image', data.image);
    formData.append('lat', data.lat.toString());
    formData.append('lng', data.lng.toString());
    formData.append('street', data.street);

    propertyService.createProperty(endPoints.properties.create, formData)
      .then((response) => {
        router.push('/mis-propiedades')
      })
      .catch((error) => {
        console.log(error);
      });
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