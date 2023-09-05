import Link from "next/link";

type Props = {
  id: string;
  image: string;
  title: string;
  bedrooms: string;
  bathrooms: string;
  price: {
    name: string
  }
}

export const CardProperty = ( { id,image, title, bedrooms, bathrooms, price }: Props) => {
  return (
    <div  className="bg-white shadow rounded-lg flex flex-col">
      <img className="object-cover h-72 w-full" src={image} alt={title} />
      <div className="p-5 space-y-3 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold flex-grow">{title}</h3>
        <p className="text-sm text-gray-600">
          Habitaciones: <span className="text-gray-800 font-bold">{bedrooms}</span>
        </p>
        <p className="text-sm text-gray-600">
          Baños: <span className="text-gray-800 font-bold">{bathrooms}</span>
        </p>
        <p className="text-sm text-gray-600">
          Precio: <span className="text-gray-800 font-bold">{price?.name}</span>
        </p>
        <Link className="bg-indigo-600 w-full text-center block font-bold text-white p-2 uppercase rounded hover:bg-indigo-700" href={`/propiedades/${id}`}>
          Ver propiedad
        </Link>
      </div>
    </div>
  )
}
