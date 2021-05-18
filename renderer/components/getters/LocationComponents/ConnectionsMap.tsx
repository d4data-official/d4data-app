import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker, ZoomableGroup,
} from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';
import type { Connection } from '@d4data/archive-lib/dist/src/types/schemas';

const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

export default function ConnectionsMap({ connections }: { connections: Array<Connection> }) {
  const [content, setContent] = useState('');

  return (
    <div>
      <ComposableMap
        data-tip=""
        projectionConfig={ {
          scale: 400,
        } }
      >
        <ZoomableGroup center={ [0, 20.0] }>
          <Geographies geography={ geoUrl }>
            {({ geographies }) => geographies
              .map((geo) => (
                <Geography
                  key={ geo.rsmKey }
                  geography={ geo }
                  fill="#EAEAEC"
                  stroke="#D6D6DA"
                />
              ))}
          </Geographies>
          {connections
            .filter((r) => r.location?.absolutePosition)
            .map((loc, idx) => (
              <Marker
                key={ idx.toString() }
                onMouseEnter={ () => {
                  setContent(`
                  [${ loc.ipAddress }] - ${ loc.timestamp.toLocaleString() } : 
                  ${ loc.location.absolutePosition.latitude }, 
                  ${ loc.location.absolutePosition.longitude }`);
                } }
                onMouseLeave={ () => {
                  setContent('');
                } }
                coordinates={
                  [loc.location.absolutePosition.longitude, loc.location.absolutePosition.latitude]
              }
              >
                <circle r={ 2 } fill="green"/>
              </Marker>
            ))}
        </ZoomableGroup>
      </ComposableMap>
      <ReactTooltip>{content}</ReactTooltip>
    </div>

  )
}
