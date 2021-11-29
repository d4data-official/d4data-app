import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { Community, Following } from '@d4data/archive-lib/dist/src/types/schemas'
import { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import { List as ListIcon, Timeline } from '@mui/icons-material'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import { Contact } from '@d4data/archive-lib'
import { useTranslation } from 'react-i18next'
import NoData from '../pages/dashboard/components/NoData'
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
          <NoData/>
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
          <NoData/>
        </Box>
      </Container>
    )
  }

  return (
    <ContactTable contacts={ contacts }/>
  )
}

export default function Followings({ data }: { data: NonNullable<GetterData<Array<Following>>> }) {
  const { t } = useTranslation(['common', 'pages'])

  return (
    <AutoTabs
      tabs={ [
        { label: t('common:stat'), icon: <Timeline/> },
        { label: t('pages:followings.tabs.communityList'), icon: <ListIcon/> },
        { label: t('pages:followings.tabs.userList'), icon: <ListIcon/> },
      ] }
      tabsContent={ [
        <AutoStatisticPage getter={ Getters.AUTHORIZED_DEVICES }/>,
        <ShowCommunities data={ data }/>,
        <ShowContacts data={ data }/>,
      ] }
    />
  )
}
