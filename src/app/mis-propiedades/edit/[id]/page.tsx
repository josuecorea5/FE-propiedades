'use client'

import { useEffect, useState } from 'react'
import { EditPropertyForm, InputsPropertyEdit } from '@/components/EditPropertyForm'
import categoriesService from "@/services/categories";
import pricesService from "@/services/prices";
import endPoints from '@/services'
import propertyService from '@/services/properties'
import { useRouter } from 'next/navigation'
import { Property } from '@/types';


export default function Page({ params }: { params: { id: string }}) {

  type Category = {
    id: number;
    name: string;
  }

  type Prices = Category;

  const [property, setProperty] = useState<Property>({} as Property)
  const [categories, setCategories] = useState<Category[]>([]);
  const [prices, setPrices] = useState<Prices[]>([]);

  const router = useRouter()

  useEffect(() => {
    async function getProperty() {
      const res = await propertyService.getProperty(endPoints.properties.getOne(params.id))
      if(res.status === 200) {
        const property = await res.json()
        setProperty(property)
      }else {
        router.push('/mis-propiedades')
      }
    }
    getProperty()
  }, [params.id, router])

  useEffect(() => {
    async function getCategoriesAndPrices() {
      const [categoriesData, pricesData]: [Category[], Prices[]] = await Promise.all([
        categoriesService.getCategories(endPoints.categories.getAll),
        pricesService.getPrices(endPoints.prices.getAll)
      ])
      setCategories(categoriesData);
      setPrices(pricesData);
    }

    getCategoriesAndPrices();
  }, []);

  const onSubmit = async (data: InputsPropertyEdit) => {
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
    
    const response = await propertyService.updateProperty(endPoints.properties.update(params.id), formData)
    if(response?.status === 200) {
      router.push('/mis-propiedades')
    }
  }

  return (
    <div className='p-8'>
      <h2 className="text-center text-2xl font-bold">
        Editar propiedad
      </h2>
      <EditPropertyForm onSubmit={onSubmit} property={property} categories={categories} prices={prices} />
    </div>
  )
}
