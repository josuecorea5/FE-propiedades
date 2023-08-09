import { Map, Marker, Overlay } from 'pigeon-maps';
import { useState } from 'react';

export const PigeonMap = () => {
  const [width, setWidth] = useState([13.4785139, -88.2102891]);
  const [center, setCenter] = useState([13.4785139, -88.2102891]);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  
  return (
    <Map 
      height={400} 
      defaultCenter={[13.4785139, -88.2102891]} 
      defaultZoom={11}
      center={[center[0], center[1]]}
      onClick={( { latLng }) => {
        setWidth([latLng[0], latLng[1]]);
        setCenter([latLng[0], latLng[1]]);
        fetch(`https://us1.locationiq.com/v1/reverse?key=${process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY}&lat=${latLng[0]}&lon=${latLng[1]}&format=json`)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setShowMessage(true);
            setMessage(data.display_name);
          })
      }}
    >
      <Marker 
        width={50} 
        anchor={[width[0], width[1]]} 
      />

      {showMessage && (
        <Overlay anchor={[width[0], width[1]]}>
          <div className="bg-white rounded-lg shadow-xl p-4 max-w-sm w-full mx-auto">
            {message}
          </div>
        </Overlay>
      )}
    </Map>
  )
}