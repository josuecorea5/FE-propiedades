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
  
  return (
    <div>
      <Map 
        height={550}
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
                  onMouseOver={() => {
                    setMessage(property?.title);
                    setWidth([Number(property?.lat), Number(property?.lng)]);
                    setShowMessage(true);
                  }}
                  onMouseOut={() => {
                    setShowMessage(false);
                  }}
                />
            )
          }
          )
        }

        {showMessage && (
          <Overlay anchor={[width[0], width[1]]}>
            <div className="bg-white rounded-lg shadow-xl p-4 max-w-sm w-full mx-auto">
              {message}
            </div>
          </Overlay>
        )}
      </Map>
      <p>{message}</p>
    </div>
  )
}