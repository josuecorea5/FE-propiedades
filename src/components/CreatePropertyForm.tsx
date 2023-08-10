import { PigeonMap } from "./PigeonMap";

export const CreatePropertyForm = () => {
  return (
    <div className="bg-white shadow py-8 px-4 rounded mx-auto max-w-4xl my-10 md:px-10">
      <form className="space-y-5">
        <div className="space-y-5">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Información general de la propiedad
          </h3>
        </div>
        <div>
          <label htmlFor="title" className="block text-sm uppercase text-gray-500 mb-2 font-bold">Título de Anuncio</label>
          <input 
            type="text" 
            className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400" 
            id="title" name="title" 
            placeholder="Ejemplo: Casa de campo" />
          <span className='text-red-700 text-xs font-medium'>Errores</span>
        </div>

        <div className="md:flex md:gap-4 space-y-5 md:space-y-0">
          <div className="md:w-1/2">
            <label htmlFor="category" className="block text-sm uppercase text-gray-500 mb-2 font-bold">Categoría</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400" 
              id="category" name="category" 
            >
              <option value="">-- Seleccionar --</option>
            </select>
            <span className='text-red-700 text-xs font-medium'>Errores</span>
          </div>

          <div className="md:w-1/2">
            <label htmlFor="price" className="block text-sm uppercase text-gray-500 mb-2 font-bold">Precio</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400" 
              id="price" name="price" 
            >
              <option value="">-- Seleccionar --</option>
            </select>
            <span className='text-red-700 text-xs font-medium'>Errores</span>
          </div>
        </div>

        <div className="md:flex md:gap-4 space-y-5 md:space-y-0">
          <div className="md:w-1/2">
            <label htmlFor="bedrooms" className="block text-sm uppercase text-gray-500 mb-2 font-bold">Habitaciones</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400" 
              id="bedrooms" name="bedrooms" 
            >
              <option value="">-- Seleccionar --</option>
            </select>
            <span className='text-red-700 text-xs font-medium'>Errores</span>
          </div>

          <div className="md:w-1/2">
            <label htmlFor="garages" className="block text-sm uppercase text-gray-500 mb-2 font-bold">Estacionamiento</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400" 
              id="garages" name="garages" 
            >
              <option value="">-- Seleccionar --</option>
            </select>
            <span className='text-red-700 text-xs font-medium'>Errores</span>
          </div>

          <div className="md:w-1/2">
            <label htmlFor="bathrooms" className="block text-sm uppercase text-gray-500 mb-2 font-bold">Baños</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400" 
              id="bathrooms" name="bathrooms" 
            >
              <option value="">-- Seleccionar --</option>
            </select>
            <span className='text-red-700 text-xs font-medium'>Errores</span>
          </div>
        </div>
        <div className="border-gray-200 border-t py-5 space-y-5">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Información general de la propiedad
          </h3>
          <p className="text-gray-600">
            Ubica la propiedad en el mapa
          </p>
        </div>
        <div>
          <PigeonMap />
        </div>
      </form>
    </div>
  )
};
