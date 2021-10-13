import Chat from '@d4data/archive-lib/dist/src/types/schemas/Chat';
import ChatMessage from '@d4data/archive-lib/dist/src/types/schemas/ChatMessage';
import { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn';
import {
  Avatar,
  ChatContainer,
  MessageList,
  ConversationHeader,
  EllipsisButton,
  Message,
  // @ts-ignore
} from '@chatscope/chat-ui-kit-react';
import { AccountCircle, SupervisedUserCircle } from '@mui/icons-material';

import { makeStyles } from '@mui/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent, DialogTitle, Select, Theme, MenuItem, FormControl, InputLabel, SelectChangeEvent,
} from '@mui/material'
import { useCallback, useMemo, useState } from 'react';
import Searchbar from './Searchbar';

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
  dialogTitle: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  formControl: {
    minWidth: '25%',
  },
  dialogContent: {
  },
}))

export default function Conversation({ chat, data: { data: messageList } }: Props) {
  const classes = useStyles();
  const [dialogOpen, setDoalogOpen] = useState<boolean>(false);
  const reverseList = useMemo(() => [...messageList].reverse(), [messageList])
  const [filtered, setFiltered] = useState(reverseList);

  const [me, setMe] = useState<string>();

  const handleOpenDialog = useCallback(() => {
    setDoalogOpen((prev) => !prev);
  }, [dialogOpen])

  const handleChangeMe = useCallback((event: SelectChangeEvent<string>) => {
    setMe(event.target.value);
  }, [])

  const handleSearch = useCallback((data) => {
    setFiltered(data);
  }, [])

  return (
    <ChatContainer userName={ me } className={ classes.container }>
      <ConversationHeader className={ classes.header }>
        <Avatar status="available">
          { chat.participants.length > 2
            ? <SupervisedUserCircle fontSize="large" color="primary"/>
            : <AccountCircle fontSize="large" color="primary"/>}
        </Avatar>
        <ConversationHeader.Content userName={ chat.title } className={ classes.header } />
        <ConversationHeader.Actions className={ classes.headerActions }>
          <Searchbar
            keys={ ['text'] }
            placeholder="Search for a message..."
            onSearch={ handleSearch }
            data={ reverseList }
          />
          <EllipsisButton orientation="vertical" className={ classes.moreButton } onClick={ handleOpenDialog }>
            <Dialog
              fullWidth
              open={ dialogOpen }
              maxWidth="sm"
            >
              <DialogTitle title="Chat Settings" className={ classes.dialogTitle }>Chat Settings</DialogTitle>
              <DialogContent className={ classes.dialogContent }>
                <FormControl className={ classes.formControl }>
                  <InputLabel >Who Are You ?</InputLabel>
                  <Select
                    value={ me }
                    onChange={ handleChangeMe }
                  >
                    {chat.participants.map((participant) => (
                      <MenuItem key={ participant } value={ participant }>{participant}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button color="primary">Done</Button>
              </DialogActions>
            </Dialog>
          </EllipsisButton>
        </ConversationHeader.Actions>
      </ConversationHeader>
      <MessageList userName={ me } className={ classes.messageArea }>
        {filtered.map((message) => (
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
        ))}
      </MessageList>
    </ChatContainer>
  )
}
