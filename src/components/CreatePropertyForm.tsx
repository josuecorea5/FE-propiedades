import { useEffect, useState } from "react";
import { PigeonMap } from "./PigeonMap";
import endPoints from "../services/index";
import categoriesService from "../services/categories";
import pricesService from "../services/prices";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { DragAndDropImage } from "./DragAndDropImage";

const numberOfOptions = Array.from(Array(5).keys())

type Category = {
  id: number;
  name: string;
}

type InfoCoordinates = {
  lat: number | string;
  lng: number | string;
  street: string;
}

type Prices = Category;

export type InputsProperty = {
  title: string;
  description: string;
  categoryId: string;
  priceId: string;
  bedrooms: string;
  garages: string;
  bathrooms: string;
  street: string;
  lat: number | string;
  lng: number | string;
  image: File
}

const propertySchema = z.object({
  title: z.string().nonempty({ message: 'Debes ingresar un título' }),
  description: z.string().min(20).nonempty({ message: 'Descripción debe tener al menos 20 caracteres' }),
  categoryId: z.string().nonempty({ message: 'Debes seleccionar una categoría' }),
  priceId: z.string().nonempty({ message: 'Debes seleccionar un precio' }),
  bedrooms: z.string().nonempty({ message: 'Debes ingresar el número de habitaciones' }),
  garages: z.string().nonempty({ message: 'Debes ingresar el número de garajes' }),
  bathrooms: z.string().nonempty({ message: 'Debes ingresar el número de baños' })
});

type Props = {
  onSubmit: (data: InputsProperty) => void
}

export const CreatePropertyForm = ( { onSubmit }: Props) => {

  const [categories, setCategories] = useState<Category[]>([]);
  const [prices, setPrices] = useState<Prices[]>([]);
  const [infoCoordinates, setInfoCoordinates] = useState<InfoCoordinates>({} as InfoCoordinates);
  const [image, setImage] = useState<File | string>();
  const [errorCoordinates, setErrorCoordinates] = useState(false);
  const [errorImage, setErrorImage] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<InputsProperty>({ resolver: zodResolver(propertySchema), mode: 'onBlur'})

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

  }, [infoCoordinates]);

  const submitPropertyForm: SubmitHandler<InputsProperty> = (data) => {
    if(!infoCoordinates.lat || !infoCoordinates.lng || !infoCoordinates.street) {
      setErrorCoordinates(true);
      setErrorImage(true);
      return;
    }
    if(!image) {
      setErrorImage(true);
      return;
    }
    setErrorCoordinates(false);
    setErrorImage(false);
    data.street = infoCoordinates.street;
    data.lat = infoCoordinates.lat;
    data.lng = infoCoordinates.lng;
    data.image = image as File;
    onSubmit(data);
  }

  return (
    <div className="bg-white shadow py-8 px-4 rounded mx-auto max-w-4xl my-10 md:px-10">
      <form className="space-y-5" onSubmit={handleSubmit(submitPropertyForm)}>
        <div className="space-y-5">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Información general de la propiedad
          </h3>
        </div>
        <div>
          <label htmlFor="title" className="block text-sm uppercase text-gray-500 mb-2 font-bold">Título de Anuncio</label>
          <input 
            {...register('title')}
            type="text" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400" 
            id="title" name="title" 
            placeholder="Ejemplo: Casa de campo" />
          <span className='text-red-700 text-xs font-medium'>{errors?.title?.message}</span>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm uppercase text-gray-500 mb-2 font-bold">Descripción</label>
          <textarea 
            {...register('description')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400" 
            id="description" name="description" 
            placeholder="Descripción de la propiedad"></textarea>
          <span className='text-red-700 text-xs font-medium'>{errors?.description?.message}</span>
        </div>

        <div className="md:flex md:gap-4 space-y-5 md:space-y-0">
          <div className="md:w-1/2">
            <label htmlFor="categoryId" className="block text-sm uppercase text-gray-500 mb-2 font-bold">Categoría</label>
            <select 
              {...register('categoryId')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400" 
              id="categoryId" name="categoryId" 
            >
              <option value="">-- Seleccionar --</option>
              {
                categories.map((category) => (
                  <option value={category.id} key={category.id}>{category.name}</option>
                ))
              }
            </select>
            <span className='text-red-700 text-xs font-medium'>{errors?.categoryId?.message}</span>
          </div>

          <div className="md:w-1/2">
            <label htmlFor="priceId" className="block text-sm uppercase text-gray-500 mb-2 font-bold">Precio</label>
            <select 
              {...register('priceId')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400" 
              id="priceId" name="priceId" 
            >
              <option value="">-- Seleccionar --</option>
              {
                prices.map((price) => (
                  <option value={price.id} key={price.id}>{price.name}</option>
                ))
              }
            </select>
            <span className='text-red-700 text-xs font-medium'>{errors?.priceId?.message}</span>
          </div>
        </div>

        <div className="md:flex md:gap-4 space-y-5 md:space-y-0">
          <div className="md:w-1/2">
            <label htmlFor="bedrooms" className="block text-sm uppercase text-gray-500 mb-2 font-bold">Habitaciones</label>
            <select 
              {...register('bedrooms')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400" 
              id="bedrooms" name="bedrooms" 
            >
              <option value="">-- Seleccionar --</option>
              {
                numberOfOptions.map((number, index) => (
                  <option value={number + 1} key={index}>{number + 1}</option>
                ))
              }
            </select>
            <span className='text-red-700 text-xs font-medium'>{errors?.bedrooms?.message}</span>
          </div>

          <div className="md:w-1/2">
            <label htmlFor="garages" className="block text-sm uppercase text-gray-500 mb-2 font-bold">Estacionamiento</label>
            <select 
              {...register('garages')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400" 
              id="garages" name="garages" 
            >
              <option value="">-- Seleccionar --</option>
              {
                numberOfOptions.map((number, index) => (
                  <option value={number + 1} key={index}>{number + 1}</option>
                ))
              }
            </select>
            <span className='text-red-700 text-xs font-medium'>{errors?.garages?.message}</span>
          </div>

          <div className="md:w-1/2">
            <label htmlFor="bathrooms" className="block text-sm uppercase text-gray-500 mb-2 font-bold">Baños</label>
            <select 
              {...register('bathrooms')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400" 
              id="bathrooms" name="bathrooms" 
            >
              <option value="">-- Seleccionar --</option>
              {
                numberOfOptions.map((number, index) => (
                  <option value={number + 1} key={index}>{number + 1}</option>
                ))
              }
            </select>
            <span className='text-red-700 text-xs font-medium'>{errors?.bathrooms?.message}</span>
          </div>
        </div>
        <div className="border-gray-200 border-t py-5 space-y-5">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Información general de la propiedad
          </h3>
          <p>Imagen de la propiedad</p>
          {
            errorImage && (<span className='text-red-700 text-xs font-medium'>
              Debes seleccionar una imagen para la propiedad
            </span>)
          }
          <DragAndDropImage setImage={setImage} />
          <p className="text-gray-600">
            Ubica la propiedad en el mapa
          </p>
        </div>
        {
          errorCoordinates && (<span className='text-red-700 text-xs font-medium'>
            Debes seleccionar la ubicación de la propiedad
          </span>)
        }
        <div>
          <PigeonMap setInfoCoordinates={setInfoCoordinates} infoCoordinates={infoCoordinates} />
        </div>
        <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded text-white font-bold cursor-pointer">Crear propiedad</button>
      </form>
    </div>
  )
};
