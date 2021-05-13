import React, { useEffect, useState } from 'react';
import type { Whereabout } from '@d4data/archive-lib/dist/src/types/schemas';

async function imports2({ whereabouts }: { whereabouts: Array<Whereabout> }) {
  const {
    Marker, Popup,
  } = await import('react-leaflet')
  return (
    <>
      {whereabouts?.filter((location: Whereabout) => location.location?.absolutePosition !== undefined)
        .map((location: Whereabout, i: Number) => {
          const position = location.location.absolutePosition
          return (
            <Marker key={ i.toString() } position={ [position.latitude, position.longitude] }>
              <Popup>
                <b>{location?.location?.relativePosition?.raw ?? ''}</b>
                <br/>
                {location.recordDate?.toLocaleString() ?? 'No date provided'}
                {' '}
                <br/>
                {position.latitude }
                ,
                {position.longitude }
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
