import MUIDataTable from 'mui-datatables';
import React from 'react';
import type { Whereabout } from '@d4data/archive-lib/dist/src/types/schemas';

const E7 = 10000000

export default function LocationHistory({ whereabouts }: { whereabouts: Array<Whereabout> }) {
  const data = whereabouts.map((location: any) => [
    location?.recordDate?.toString() ?? '',
    location?.location?.relativePosition?.raw ?? '',
    location?.location?.absolutePosition?.latitude / E7 ?? '',
    location?.location?.absolutePosition?.longitude / E7 ?? ''])
  return (
    <div>
      <MUIDataTable
        title={ `Whereabouts (${ data.length })` }
        data={ data }
        columns={ ['date', 'address', 'latitude', 'longitude'] }
        options={ {
          selectableRowsHeader: false,
          selectableRowsOnClick: false,
          selectableRowsHideCheckboxes: true,
        } }
      />
    </div>
  )
}
