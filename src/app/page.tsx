'use client'
import { useState, useEffect, ChangeEvent } from "react"
import endPoints from "@/services"
import propertiesService from "@/services/properties"
import categoriesService from "@/services/categories"
import pricesService from "@/services/prices"
import { MainPigeonMap } from "@/components/MainPigeonMap"

export default function Home() {
  const [properties, setProperties] = useState([])
  const [categories, setCategories] = useState([])
  const [prices, setPrices] = useState([])
  const [originalProperties, setOriginalProperties] = useState([])
  useEffect(() => {
    async function getProperties() {
      const res = await propertiesService.getPropertiesNews(endPoints.properties.getPropertiesNews);
      setProperties(res)
      setOriginalProperties(res)
    }
    getProperties()
  }, [])

  useEffect(() => {
    async function getPropertiesAndPrices() {
      const [categories, prices] = await Promise.all([
        categoriesService.getCategories(endPoints.categories.getAll),
        pricesService.getPrices(endPoints.prices.getAll)
      ])
      setCategories(categories)
      setPrices(prices)
    }
    getPropertiesAndPrices()
  }, [])

  const filterProperties = (filter: string) => {
    if(filter === '') return setProperties(originalProperties);
    const filteredProperties = originalProperties.filter((property:any) => property?.category?.name === filter)
    setProperties(filteredProperties)
  }

  return (
    <div className="py-5 space-y-2">
      <h1 className="text-center text-4xl font-extrabold">
        Ubicación en el mapa
      </h1>
      <div className="flex flex-col md:flex-row items-center py-10 gap-4">
        <h2 className="text-sm text-gray-600 font-bold">Filtrar propiedades</h2>
        <div className="w-full md:w-auto flex items-center gap-2">
          <label htmlFor="categories" className="text-sm w-24 uppercase text-gray-500 font-bold">Categorias</label>
          <select 
            id="categories" 
            className="bg-white w-full px-3 py-2 border border-gray-300 rounded-md shad flex-1"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => filterProperties(e.target.value)}
            >
            <option value="">Seleccionar</option>
            {
              categories.map((category:any) => (
                <option key={category.id}>
                  {category.name}
                </option>
              ))
            }
          </select>
        </div>
        <div className="w-full md:w-auto flex items-center gap-2">
          <label htmlFor="prices" className="text-sm w-24 uppercase text-gray-500 font-bold">Precios</label>
          <select id="prices" className="bg-white w-full px-3 py-2 border border-gray-300 rounded-md shad flex-1">
            <option value="">Seleccionar</option>
            {
              prices.map((price:any) => (
                <option key={price.id}>
                  {price.name}
                </option>
              ))
            }
          </select>
        </div>
      </div>
      <MainPigeonMap properties={properties} />
    </div>
  )
}
