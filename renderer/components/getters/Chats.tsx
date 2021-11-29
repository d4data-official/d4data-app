import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
// @ts-ignore
// eslint-disable-next-line max-len
import { Avatar, Conversation as ConversationPreview, ConversationList, MainContainer, Sidebar } from '@chatscope/chat-ui-kit-react'
import { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import Chat from '@d4data/archive-lib/dist/src/types/schemas/Chat'
import { makeStyles } from '@mui/styles'
import { AccountCircle, SupervisedUserCircle } from '@mui/icons-material'
import { useCallback, useEffect, useState } from 'react'
import ArchiveManager from '@modules/ArchiveManager'
import { useTranslation } from 'react-i18next'
import { Typography } from '@mui/material'
import Conversation from './Chats/Conversation'
import Searchbar from './Chats/Searchbar'
import Loading from '../pages/dashboard/components/Loading'
import Center from '../Center'

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    borderColor: theme.palette.divider,
  },
  sidebar: {
    backgroundColor: theme.palette.background.paper,
    width: '25%',
  },
  conversationPreview: {
    '& div': {
      color: theme.palette.text.primary,
    },
  },
  searchBar: {
    '& input': {
      '&::placeholder': {
        color: `${ theme.palette.text.primary } !important`,
      },
      backgroundColor: `${ theme.palette.background.paper } !important`,
      color: `${ theme.palette.text.primary } !important`,
    },
    '& svg': {
      color: `${ theme.palette.primary.main } !important`,
    },
    border: '1px solid',
    borderColor: theme.palette.divider,
    backgroundColor: `${ theme.palette.background.paper } !important`,
    color: theme.palette.text.primary,
  },
}))

export interface Props {
  data: NonNullable<GetterData<Array<Chat>>>
}

export default function Chats({ data: { data: chatList } }: Props) {
  const { t } = useTranslation('pages')

  const classes = useStyles()
  const [data, setData] = useState<any>()
  const [currentChat, setCurrentChat] = useState<Chat>()
  const [filtered, setFiltered] = useState(chatList)

  const handleChangeCurrentChat = useCallback((chat: Chat) => () => {
    setCurrentChat(chat)
  }, [])

  const handleSearch = useCallback((newData) => {
    setFiltered(newData)
  }, [])

  useEffect(() => {
    setData(null)
    if (currentChat) {
      const standardizer = ArchiveManager.currentStandardizer
      if (!standardizer) {
        console.info('No standardizer found in Archive Manager')
        return
      }

      console.info('Retrieving data of ChatMessages getter')

      // @ts-ignore
      standardizer.getChatMessages(currentChat._id)
        .then((getterData: GetterData<any>) => {
          console.info('ChatMessages getter data retrieved')
          setData(getterData)
        })
    }
  }, [currentChat])

  return (
    <MainContainer className={ classes.container }>
      <Sidebar position="left" className={ classes.sidebar }>
        <Searchbar
          keys={ ['title'] }
          placeholder={ t('chats.searchbar.placeholder') }
          onSearch={ handleSearch }
          data={ chatList }
        />

        <ConversationList>
          { filtered.map((chat) => (
            <ConversationPreview
              onClick={ handleChangeCurrentChat(chat) }
              key={ chat._id }
              className={ classes.conversationPreview }
            >
              <Avatar name={ chat.title } status="available">
                { chat.participants.length > 2
                  ? <SupervisedUserCircle fontSize="large" color="primary"/>
                  : <AccountCircle fontSize="large" color="primary"/> }
              </Avatar>

              <ConversationPreview.Content name={ chat.title } className={ classes.conversationPreview }/>
            </ConversationPreview>
          )) }
        </ConversationList>
      </Sidebar>

      { !currentChat && (
        <Center>
          <Typography color="grey.400">{ t('chats.selectConversation') }</Typography>
        </Center>
      ) }

      { currentChat && !data && <Loading/> }

      { data && <Conversation chat={ currentChat! } data={ data }/> }
    </MainContainer>
  )
}
