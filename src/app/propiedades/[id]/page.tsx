'use client'
import { useState, useEffect } from 'react';
import endPoints from '@/services';
import propertyService from '@/services/properties';
import { PigeonMap } from '@/components/PigeonMap';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function Page({ params }: { params: { id: string }}) {
  const [property, setProperty] = useState<any>({})
  const { isAuthenticated } = useAuth();
  const [showFormContact, setShowFormContact] = useState<boolean>(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  useEffect(() => {
    propertyService.getPropertyPublished(endPoints.properties.getOnePublished(params.id))
      .then(res => {
        console.log(res)
        setProperty(res)
      })
  }, [params.id])

  useEffect(() => {
    if(!isAuthenticated) {
      setShowFormContact(false);
    }else {
      propertyService.getProperty(endPoints.properties.getOne(params.id))
        .then(res => {
          if(res.status === 401) {
            setShowFormContact(true);
          }else {
            setIsOwner(true);
          }
        })
    }
  }, [isAuthenticated, params.id])


  return (
    <div className='py-5'>
      <h1 className='text-4xl my-10 font-extrabold text-center'>
        {property.title}
      </h1>
      <div>
        <a href="#" className='font-bold text-gray-600 text-sm'>
          Categoria: 
          <span className='font-normal'> {property?.category?.name}</span>
        </a>
      </div>
      <div className='mt-5 md:flex md:gap-4'>
        <div className='md:w-2/3 bg-white shadow rounded-lg'>
          <img src={property.image} alt={`Imagen de la propiedad ${property.title}`} />
          <div className='px-5 py-10 space-y-5'>
            <p>{property.description}</p>
            <h2 className='text-2xl leading-6 font-bold text-gray-900'>
              Información de la propiedad
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2'>
              <p className='text-gray-600 font-bold text-xs'>
                Baños
                <span className='text-gray-800 block text-lg'>
                  {property.bathrooms}
                </span>
              </p>
              <p className='text-gray-600 font-bold text-xs'>
                Habitaciones
                <span className='text-gray-800 block text-lg'>
                  {property.bedrooms}
                </span>
              </p>
              <p className='text-gray-600 font-bold text-xs'>
                Estacionamientos
                <span className='text-gray-800 block text-lg'>
                  {property.garages}
                </span>
              </p>
              <p className='text-gray-600 font-bold text-xs'>
                Precio
                <span className='text-gray-800 block text-lg'>
                  {property?.price?.name}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className='md:w-1/3 flex flex-col'>
          <h3 className='text-center py-10 leading-6 text-2xl font-bold text-gray-900'>Ubicación</h3>
          <div className='h-96'>
            <PigeonMap infoCoordinates={{lat: property.lat, lng: property.lng, street: property.street}} />
          </div>
           {
            (!showFormContact && !isOwner) && (
              <div className='mt-24 flex
              flex-col gap-4 items-center'>
                <p>Necesitas estar logueado para contactar con este vendedor</p>
                <Link className='bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700' href='/auth/login'>Login</Link>
              </div>
            )
           }
           {
            isOwner && (
              <div className='mt-24 text-center text-xl bg-indigo-600 text-white px-4 py-2'>
                <p>Este es tu anuncio</p>
              </div>
            )
           }
        </div>
      </div>
    </div>
  )
}
