import React, { useEffect, useState } from 'react';
import type { Whereabout } from '@d4data/archive-lib/dist/src/types/schemas';
import Markers from './Marker';

async function imports({ whereabouts }: { whereabouts: Array<Whereabout> }) {
  const {
    TileLayer, MapContainer,
  } = await import('react-leaflet')
  return (
    <div style={ { display: 'flex', height: '100%' } }>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossOrigin=""
      />

      <div style={ { display: 'flex', flexGrow: 1 } }>
        <MapContainer
          center={ [51.505, -0.09] }
          zoom={ 3 }
          scrollWheelZoom
          style={ { height: '100%', width: '100%' } }
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Markers whereabouts={ whereabouts ?? [] }/>
        </MapContainer>
      </div>
    </div>
  )
}

export default function Map({ whereabouts }: { whereabouts: Array<Whereabout> }) {
  const [MapComp, setMapComp] = useState(<>Loading...</>)
  useEffect(() => {
    imports({ whereabouts }).then((html) => setMapComp(html))
  }, [])
  return MapComp
}
