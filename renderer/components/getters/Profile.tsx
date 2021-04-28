import type { GetterData } from 'd4data-archive-lib/dist/src/types/standardizer/GetterReturn'
import type { Profile as ProfileType } from 'd4data-archive-lib/dist/src/types/schemas'

export default function Profile({ data }: { data: GetterData<Array<ProfileType>> }) {
  return (
    <div>
      <div>Profile</div>
      <div>{ JSON.stringify(data) }</div>
    </div>
  )
}
