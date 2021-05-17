import MUIDataTable from 'mui-datatables';
import React from 'react';
import type { Whereabout } from '@d4data/archive-lib/dist/src/types/schemas';

export default function Table({ whereabouts }: { whereabouts: Array<Whereabout> }) {
  const data = whereabouts.map((location: any) => [
    location?.recordDate?.toString() ?? '', location?.location?.relativePosition?.raw ?? '',
    location?.location?.absolutePosition?.latitude ?? '', location?.location?.absolutePosition?.longitude ?? ''])
  return (
    <>
      <MUIDataTable
        title="Whereabouts"
        data={ data }
        columns={ ['date', 'address', 'latitude', 'longitude'] }
        options={ {
          selectableRowsHeader: false,
          selectableRowsOnClick: false,
          selectableRowsHideCheckboxes: true,
        } }
      />
    </>
  )
}
