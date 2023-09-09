'use client'

import { CardProperty } from "@/components/CardProperty";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import endPoints from "@/services";
import propertyService from "@/services/properties";
import { Property } from "@/types";

export default function Page() {
  const searchParams = useSearchParams()
  const [properties, setProperties] = useState<Property[]>([])

  useEffect(() => {
    async function loadProperties() {
      const response = await propertyService.searchProperties(endPoints.properties.searchProperties(searchParams.get('title') as string));
      const data = await response.json();
      setProperties(data);
    }
    loadProperties();
  }, [searchParams])

  return (
    <section>
      {properties.length === 0 ? (
        <div className="text-center text-gray-700 text-2xl grid py-12">
          <p>No se encontraron resultados</p>
        </div>
      ):
       (
        <>
          <h2 className="text-center text-4xl font-extrabold pt-10">
            Resultados con {`"${searchParams.get('title')}"`}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-14">
            {
              properties.map((property: Property) => (
                <CardProperty key={property?.id} property={property} />
              ))
            }
          </div>
        </>
       )
      }
  </section>
  )
}