'use client'
import { useState, useEffect } from "react"
import endPoints from "@/services";
import categoryService from "@/services/categories";
import { CardProperty } from "@/components/CardProperty";
import { Property } from "@/types";

export default function Page({ params }: { params: { id: string}}) {
  const [properties, setProperties] = useState<Property[]>([]);
  useEffect(() => {
    async function loadProperties() {
      const property = await categoryService.getPropertiesByCategory(endPoints.categories.getPropertiesByCategory(params.id));
      setProperties(property);
    }
    loadProperties();
  }, [params.id]);
  return (
    <section>
      {properties.length === 0 && (
        <div className="text-center text-gray-700 text-2xl grid py-12">
          <p>No hay propiedades en esta categoría.</p>
        </div>
      )}

      <h2 className="text-center text-4xl font-extrabold pt-10">
        {properties[0]?.category?.name}s
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-14">
        {
          properties.map((property: Property) => (
            <CardProperty key={property?.id} property={property} />
          ))
        }
      </div>
    </section>
  )
}
