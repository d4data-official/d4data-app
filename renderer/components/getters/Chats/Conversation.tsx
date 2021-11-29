import Chat from '@d4data/archive-lib/dist/src/types/schemas/Chat'
import ChatMessage from '@d4data/archive-lib/dist/src/types/schemas/ChatMessage'
import { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
// @ts-ignore
// eslint-disable-next-line max-len
import { Avatar, ChatContainer, ConversationHeader, EllipsisButton, Message, MessageList } from '@chatscope/chat-ui-kit-react'
import { AccountCircle, SupervisedUserCircle } from '@mui/icons-material'

import { makeStyles } from '@mui/styles'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Theme,
} from '@mui/material'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Searchbar from './Searchbar'

export interface Props {
  chat: Chat,
  data: NonNullable<GetterData<Array<ChatMessage>>>
}

const useStyles = makeStyles((theme: Theme) => ({
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
  header: {
    '& div': {
      backgroundColor: `${ theme.palette.background.paper } !important`,
      color: `${ theme.palette.text.primary } !important`,
    },
    backgroundColor: theme.palette.background.paper,
  },
  messageArea: {
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    backgroundColor: theme.palette.background.paper,
  },
  message: {
    color: theme.palette.text.primary,
    '& div': {
      '& div': {
        backgroundColor: `${ theme.palette.primary.main } !important`,
        '& div': {
          color: theme.palette.primary.contrastText,
        },
      },
    },
  },
  moreButton: {
    color: theme.palette.primary.main,
  },
  headerActions: {
    gap: '10px',
  },
}))

export default function Conversation({ chat, data: { data: messageList } }: Props) {
  const { t } = useTranslation(['common', 'pages'])

  const classes = useStyles()
  const [dialogOpen, setDoalogOpen] = useState<boolean>(false)
  const reverseList = useMemo(() => [...messageList].reverse(), [messageList])
  const [filtered, setFiltered] = useState(reverseList)

  const [me, setMe] = useState<string>()

  const handleOpenDialog = useCallback(() => {
    setDoalogOpen((prev) => !prev)
  }, [dialogOpen])

  const handleChangeMe = useCallback((event: SelectChangeEvent<string>) => {
    setMe(event.target.value)
  }, [])

  const handleSearch = useCallback((data) => {
    setFiltered(data)
  }, [])

  return (
    <ChatContainer userName={ me } className={ classes.container }>
      <ConversationHeader className={ classes.header }>
        <Avatar status="available">
          { chat.participants.length > 2
            ? <SupervisedUserCircle fontSize="large" color="primary"/>
            : <AccountCircle fontSize="large" color="primary"/> }
        </Avatar>

        <ConversationHeader.Content userName={ chat.title } className={ classes.header }/>

        <ConversationHeader.Actions className={ classes.headerActions }>
          <Searchbar
            keys={ ['text'] }
            placeholder={ t('pages:chats.conversation.searchbar.placeholder') }
            onSearch={ handleSearch }
            data={ reverseList }
          />
          <EllipsisButton orientation="vertical" className={ classes.moreButton } onClick={ handleOpenDialog }>
            <Dialog
              fullWidth
              open={ dialogOpen }
              maxWidth="sm"
            >
              <DialogTitle sx={ { backgroundColor: 'primary.main', color: 'white' } }>
                { t('pages:chats.conversation.settings.title') }
              </DialogTitle>

              <DialogContent>
                <FormControl fullWidth sx={ { mt: 3 } }>
                  <InputLabel>{ t('pages:chats.conversation.settings.whoAreYou') }</InputLabel>
                  <Select
                    value={ me }
                    onChange={ handleChangeMe }
                    label={ t('pages:chats.conversation.settings.whoAreYou') }
                  >
                    { chat.participants.map((participant) => (
                      <MenuItem key={ participant } value={ participant }>{ participant }</MenuItem>
                    )) }
                  </Select>
                </FormControl>
              </DialogContent>

              <DialogActions>
                <Button color="primary">{ t('common:close') }</Button>
              </DialogActions>
            </Dialog>
          </EllipsisButton>
        </ConversationHeader.Actions>
      </ConversationHeader>

      <MessageList userName={ me } className={ classes.messageArea }>
        { filtered.map((message) => (
          <Message
            key={ JSON.stringify(message) }
            className={ classes.message }
            model={ {
              message: message.text,
              sentTime: message.sendAt,
              sender: message.sender,
              direction: message.sender === me ? 'outgoing' : 'incoming',
            } }
          />
        )) }
      </MessageList>
    </ChatContainer>
  )
}
