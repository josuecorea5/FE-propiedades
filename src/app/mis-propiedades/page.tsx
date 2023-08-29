'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import endPoints from "@/services";
import propertyService from '@/services/properties';
import { useRouter } from "next/navigation";

export default function MyPropertiesPage() {
  const router = useRouter();
  const [areProperties, setAreProperties] = useState(false);
  const [properties, setProperties] = useState([]);

  useEffect(() => {

    async function getProperties() {
      try {
        const res = await propertyService.getProperties(endPoints.properties.getAll)
      if(res.status === 500) {
        router.push('/auth/login')
      }else {
        const data = await res.json()
        if(!data.length) {
          setAreProperties(false)
        }else {
          console.log(data)
          setAreProperties(true)
          setProperties(data)
        }
      }
      } catch (error) {
        console.log(error)
      }
    }

    getProperties()
  }, [router])

  const deleteProperty = async(id: string) => {
    Swal.fire({
      title: 'Estas seguro de eliminar la propiedad?',
      text: "No podras revertir esta accion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        propertyService.deleteProperty(endPoints.properties.delete(id))
          .then(res => {
            if(res?.status === 204) {
              setProperties(properties.filter((property: any) => property.id !== id))
              Swal.fire(
                'Eliminado!',
                'La propiedad ha sido eliminada.',
                'success'
              )
            }
          })
          .catch(err => {
            console.log(err)
            Swal.fire(
              'Error!',
              'La propiedad no ha sido eliminada.',
              'error'
            )
          })
      }
    })
  }

  return (
    <div className="py-8">
      <h1 className="text-4xl my-2 font-extrabold text-center">
        Bienes
        <span className="font-normal">Raices</span>
      </h1>
      <h2 className="text-center text-2xl font-extrabold">
        Mis propiedades
      </h2>
      <Link className="rounded py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-sm font-bold text-center text-white inline-block my-5 w-full md:w-auto" href='/mis-propiedades/create'>
        Publicar propiedad
      </Link>
      {
        !areProperties && <p className="text-center">No tienes propiedades publicadas</p>
      }

      {
        areProperties && (
          <div className="bg-white shadow rounded-lg">
            <ul className="divide-y divide-gray-200">
              {
                properties.map((property: any) => (
                  <li key={property.id}>
                    <div className="p-6 w-full flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-8 gap-4">
                      <div className="sm:w-1/4 md:w-1/6">
                        <img className="w-full block" src={property.image} alt={`Imagen de ${property.title}`} />
                      </div>
                      <div className="sm:w-2/4 md:w-3/6 lg:w-4/6 space-y-2">
                        <a className="block text-2xl font-extrabold text-indigo-600 truncate" href="#">{property.title}</a>
                        <p className="text-sm text-black font-bold">{property.category.name}</p>
                        <p className="text-gray-500 font-bold flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z" clipRule="evenodd" />
                          </svg>
                          ${property.price.name}
                        </p>
                      </div>
                      <div className="sm:w-1/4 md:w-2/6 lg:flex-1 flex flex-col lg:flex-row gap-2">
                        <button className={`px-2 py-2 md:py-1 text-xs leading-5 font-semibold rounded ${property.published ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {property.published ? 'Publicado' : 'No publicado'}
                        </button>
                        <Link href={`mis-propiedades/edit/${property.id}`} className='px-2 py-2 md:py-1 text-xs leading-5 font-semibold rounded bg-indigo-100 text-indigo-800'>
                          Editar
                        </Link>
                        <button onClick={() => deleteProperty(property.id)} className='px-2 py-2 md:py-1 text-xs leading-5 font-semibold rounded bg-red-100 text-red-800'>
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
        )
      }

    </div>
  )
}
