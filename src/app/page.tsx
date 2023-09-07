"use client";
import { useState, useEffect, ChangeEvent } from "react";
import endPoints from "@/services";
import propertiesService from "@/services/properties";
import categoriesService from "@/services/categories";
import pricesService from "@/services/prices";
import { MainPigeonMap } from "@/components/MainPigeonMap";
import { CardProperty } from "@/components/CardProperty";
import { Category, Price, Property } from '@/types'

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [prices, setPrices] = useState<Price[]>([]);
  const [originalProperties, setOriginalProperties] = useState<Property[]>([]);
  const [filterTypes, setFilterTypes] = useState<Record<string, any>>({
    category: "",
    price: "",
  });

  const [newPropertiesByDate, setNewPropertiesByDate] = useState<Property[]>([]);

  useEffect(() => {
    async function getProperties() {
      const res = await propertiesService.getPropertiesNews(
        endPoints.properties.getPropertiesNews
      );
      setProperties(res);
      setOriginalProperties(res);
    }
    getProperties();
  }, []);

  useEffect(() => {
    async function getPropertiesAndPrices() {
      const [categories, prices, newProperties] = await Promise.all([
        categoriesService.getCategories(endPoints.categories.getAll),
        pricesService.getPrices(endPoints.prices.getAll),
        propertiesService.getThreeLatestProperties(
          endPoints.properties.getTopThreePropertiesByCategory
        ),
      ]);
      setCategories(categories);
      setNewPropertiesByDate(newProperties);
      setPrices(prices);
    }
    getPropertiesAndPrices();
  }, []);

  useEffect(() => {
    const filteredProperties = originalProperties
      .filter((property: any) =>
        filterTypes.category
          ? property.category.name === filterTypes.category
          : property
      )
      .filter((property: any) =>
        filterTypes.price ? property.price.name === filterTypes.price : property
      );
    setProperties(filteredProperties);
  }, [filterTypes, originalProperties]);

  return (
    <div className="py-5 space-y-2">
      <h1 className="text-center text-4xl font-extrabold">
        Ubicación en el mapa
      </h1>
      <div className="flex flex-col md:flex-row items-center py-10 px-12 gap-4">
        <h2 className="text-sm text-gray-600 font-bold">Filtrar propiedades</h2>
        <div className="w-full md:w-auto flex items-center gap-2">
          <label
            htmlFor="categories"
            className="text-sm w-24 uppercase text-gray-500 font-bold"
          >
            Categorias
          </label>
          <select
            id="categories"
            className="bg-white w-full px-3 py-2 border border-gray-300 rounded-md shad flex-1"
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setFilterTypes({ ...filterTypes, category: e.target.value })
            }
          >
            <option value="">Seleccionar</option>
            {categories.map((category: Category) => (
              <option key={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="w-full md:w-auto flex items-center gap-2">
          <label
            htmlFor="prices"
            className="text-sm w-24 uppercase text-gray-500 font-bold"
          >
            Precios
          </label>
          <select
            id="prices"
            className="bg-white w-full px-3 py-2 border border-gray-300 rounded-md shad flex-1"
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setFilterTypes({ ...filterTypes, price: e.target.value })
            }
          >
            <option value="">Seleccionar</option>
            {prices.map((price: Price) => (
              <option key={price.id}>{price.name}</option>
            ))}
          </select>
        </div>
      </div>
      <MainPigeonMap properties={properties} />
      <section>
        <h2 className="text-center text-4xl font-extrabold pt-10">
          Propiedades recientes
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-14">
          {newPropertiesByDate.map((property: Property) => (
            <CardProperty key={property?.id} property={property} />
          ))}
        </div>
      </section>
    </div>
  );
}
