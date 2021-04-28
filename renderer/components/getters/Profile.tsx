import type { GetterData } from 'd4data-archive-lib/dist/src/types/standardizer/GetterReturn'
import type { Profile as ProfileType } from 'd4data-archive-lib/dist/src/types/schemas'

export interface Props {
  data: NonNullable<GetterData<Array<ProfileType>>>
}

export default function Profile({ data }: Props) {
  return (
    <div>
      <div>Profile</div>
      <div>{ JSON.stringify(data) }</div>
    </div>
  )
}
