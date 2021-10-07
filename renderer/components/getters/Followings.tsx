import React from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import { Community, Following } from '@d4data/archive-lib/dist/src/types/schemas'
import { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import { List as ListIcon, Timeline } from '@material-ui/icons'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import { Contact } from '@d4data/archive-lib'
import NoDataAvailable from '../pages/dashboard/components/NoDataAvailable'
import AutoTabs from '../AutoTabs'
import AutoStatisticPage from '../statistics/AutoStatisticPage'
import ContactTable from './Contacts/ContactTable'
import CommunityTable from './Communities/CommunityTable'

function ShowCommunities({ data }: { data: NonNullable<GetterData<Array<Following>>> }) {
  const communities = data.data
    .filter((r) => r.type === 'community')
    .map((row) => row.entity) as Array<Community>

  if (communities.length === 0) {
    return (
      <Container maxWidth="lg">
        <Box my={ 18 }>
          <NoDataAvailable/>
        </Box>
      </Container>
    )
  }

  return (
    <CommunityTable communities={ communities }/>
  )
}

function ShowContacts({ data }: { data: NonNullable<GetterData<Array<Following>>> }) {
  const contacts = data.data
    .filter((r) => r.type === 'contact')
    .map((row) => row.entity) as Array<Contact>

  if (contacts.length === 0) {
    return (
      <Container maxWidth="lg">
        <Box my={ 18 }>
          <NoDataAvailable/>
        </Box>
      </Container>
    )
  }

  return (
    <ContactTable contacts={ contacts }/>
  )
}

export default function Followings({ data }: { data: NonNullable<GetterData<Array<Following>>> }) {
  return (
    <AutoTabs
      tabs={ [
        { label: 'Followings stat', icon: <Timeline/> },
        { label: 'Communities list', icon: <ListIcon/> },
        { label: 'Users list', icon: <ListIcon/> },
      ] }
      tabsContent={ [
        <AutoStatisticPage getter={ Getters.AUTHORIZED_DEVICES }/>,
        <ShowCommunities data={ data }/>,
        <ShowContacts data={ data }/>,
      ] }
    />
  )
}
