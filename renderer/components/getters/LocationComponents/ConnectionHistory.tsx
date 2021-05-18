import MUIDataTable from 'mui-datatables';
import React from 'react';
import type { Whereabout } from '@d4data/archive-lib/dist/src/types/schemas';

export default function ConnectionHistory({ whereabouts }: { whereabouts: Array<Whereabout> }) {
  const data = whereabouts.map((location: any) => [
    location?.timestamp?.toString() ?? '',
    location?.ipAddress ?? '',
    location?.browser ?? '',
    location?.location?.absolutePosition?.latitude ?? '',
    location?.location?.absolutePosition?.longitude ?? ''])
  return (
    <div>
      <MUIDataTable
        title={ `Connections (${ data.length })` }
        data={ data }
        columns={ ['date', 'ipAddress', 'browser', 'latitude', 'longitude'] }
        options={ {
          selectableRowsHeader: false,
          selectableRowsOnClick: false,
          selectableRowsHideCheckboxes: true,
        } }
      />
    </div>
  )
}
