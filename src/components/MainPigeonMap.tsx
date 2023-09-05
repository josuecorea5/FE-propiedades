import Link from 'next/link';
import { Map, Marker, Overlay } from 'pigeon-maps';
import { useState, useEffect } from 'react';

type Props = {
  properties: any[]
}

export const MainPigeonMap = ({  properties }: Props) => {
  const [width, setWidth] = useState([13.4785139, -88.2102891]);
  const [center, setCenter] = useState([13.4785139, -88.2102891]);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [infoProperty, setInfoProperty] = useState({} as any);
  
  return (
    <div className='lg:px-12 lg:py-6 px-3 py-2'>
      <Map 
        height={500}
        defaultCenter={[width[0], width[1]]} 
        defaultZoom={11}
        center={[center[0], center[1]]}
        onClick={( { latLng }) => {
          setWidth([latLng[0], latLng[1]]);
          setCenter([latLng[0], latLng[1]]);
        }}
      >
        {
          properties.map((property: any) => {
            return (
                <Marker
                  key={property?.id}
                  width={50} 
                  anchor={[Number(property?.lat), Number(property?.lng)]} 
                  onClick={() => {
                    setMessage(property?.title);
                    setWidth([Number(property?.lat), Number(property?.lng)]);
                    setShowMessage(!showMessage);
                    setInfoProperty(property);
                  }}
                />
            )
          }
          )
        }

        {showMessage && (
          <Overlay anchor={[width[0], width[1]]}>
            <div className="bg-white rounded-lg space-y-2 shadow-xl p-4 w-full mx-auto max-w-xs flex flex-col flex-1">
              <Link className='text-xl hover:text-indigo-600 hover:underline' href={`/propiedades/${infoProperty?.id}`}>{infoProperty?.title}</Link>
              <img src={infoProperty?.image} alt={infoProperty?.title} />
              <p className='text-gray-600 font-bold'>{infoProperty?.price?.name}</p>
            </div>
          </Overlay>
        )}
      </Map>
    </div>
  )
}