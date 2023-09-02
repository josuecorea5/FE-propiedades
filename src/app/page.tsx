'use client'
import { useState, useEffect } from "react"
import endPoints from "@/services"
import propertiesService from "@/services/properties"
import { MainPigeonMap } from "@/components/MainPigeonMap"

export default function Home() {
  const [properties, setProperties] = useState([])
  useEffect(() => {
    async function getProperties() {
      const res = await propertiesService.getPropertiesNews(endPoints.properties.getPropertiesNews);
      setProperties(res)
    }
    getProperties()
  }, [])
  return (
    <div className="py-5">
      <h1 className="text-center text-4xl font-extrabold">
        Ubicación en el mapa
      </h1>
        <MainPigeonMap properties={properties} />
    </div>
  )
}
