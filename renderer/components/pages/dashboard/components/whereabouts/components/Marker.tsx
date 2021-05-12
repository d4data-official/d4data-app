import React, { useEffect, useState } from 'react';
import type { Whereabout } from '@d4data/archive-lib/dist/src/types/schemas';

async function imports2({ whereabouts }: { whereabouts: Array<Whereabout> }) {
  const {
    Marker, Popup,
  } = await import('react-leaflet')

  return (
    <>
      {whereabouts?.filter((location: any) => location.location.absolutePosition).map((location: any, i: Number) => {
        const position = location.location.absolutePosition
        return (
          <Marker key={ i.toString() } position={ [position.latitude, position.longitude] }>
            <Popup>
              <b>{location?.location?.relativePosition?.raw ?? ''}</b>
              <br/>
              {location.recordDate.toString()}
              {' '}
              <br/>
              {position.latitude}
              ,
              {position.longitude}
              {' '}
              <br/>
            </Popup>
          </Marker>
        )
      })}
    </>
  )
}

export default function Markers({ whereabouts }: { whereabouts: Array<Whereabout> }) {
  const [MapComp, setMapComp] = useState(<>Loading...</>)
  useEffect(() => {
    imports2({ whereabouts }).then((html) => setMapComp(html))
  }, [whereabouts])
  return MapComp
}
