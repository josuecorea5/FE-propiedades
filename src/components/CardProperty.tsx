import { Property } from "@/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  property: Property;
}

export const CardProperty = ( { property }: Props) => {
  return (
    <div  className="bg-white shadow rounded-lg flex flex-col">
      <Image width={500} height={500} className="object-cover h-72 w-full" src={property?.image} alt={property?.title} />
      <div className="p-5 space-y-3 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold flex-grow">{property?.title}</h3>
        <p className="text-sm text-gray-600">
          Habitaciones: <span className="text-gray-800 font-bold">{property?.bedrooms}</span>
        </p>
        <p className="text-sm text-gray-600">
          Baños: <span className="text-gray-800 font-bold">{property?.bathrooms}</span>
        </p>
        <p className="text-sm text-gray-600">
          Precio: <span className="text-gray-800 font-bold">{property?.price?.name}</span>
        </p>
        <Link className="bg-indigo-600 w-full text-center block font-bold text-white p-2 uppercase rounded hover:bg-indigo-700" href={`/propiedades/${property?.id}`}>
          Ver propiedad
        </Link>
      </div>
    </div>
  )
}
