import 'leaflet/dist/leaflet.css'
import { useMemo, useRef, useState } from 'react';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression, Icon, Marker as M } from 'leaflet';

const coordiates: LatLngExpression = [13.4785974, -88.2102891];

const customIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149060.png',
  iconSize: [38, 38]
})

export default function LeafletMap(){
  const [position, setPosition] = useState<LatLngExpression>(coordiates);
  const marketRef = useRef<M>(null);

  const eventHandlers = useMemo(() => ({
    dragend() {
      setPosition(marketRef.current?.getLatLng() ?? coordiates)
      console.log(position)
    }
  }), [position])

  return (
    <MapContainer className='h-96' center={coordiates} zoom={12}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
       />
      <Marker ref={marketRef} eventHandlers={eventHandlers} position={position} icon={customIcon} draggable autoPan>
        <Popup>
          Hello
        </Popup>
      </Marker>
    </MapContainer>
  )
};