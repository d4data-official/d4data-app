import React, { useState } from 'react';
import dynamic from 'next/dynamic'
import type { Whereabout } from '@d4data/archive-lib/dist/src/types/schemas';
import 'leaflet/dist/leaflet.css'

const MapContainer = dynamic<any>(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic<any>(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic<any>(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic<any>(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false })

export default function WhereaboutsMap({ whereabouts }: { whereabouts: Array<Whereabout> }) {
  const [content, setContent] = useState('');

  return (
    <div>
      <MapContainer center={ [51.505, -0.09] } zoom={ 13 } scrollWheelZoom={ false }>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={ [51.505, -0.09] }>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
