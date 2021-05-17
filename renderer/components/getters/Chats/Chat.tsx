import { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import ChatMessage from '@d4data/archive-lib/dist/src/types/schemas/ChatMessage'
import Chat from '@d4data/archive-lib/dist/src/types/schemas/Chat'
import { useCallback, useEffect, useState } from 'react'
// @ts-ignore
import { MessageList } from 'react-chat-elements'
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  makeStyles,
} from '@material-ui/core'
import Searchbar from 'components/Searchbar'

const useStyles = makeStyles(() => ({
  container: {
    display: 'grid',
    gridTemplateRows: 'max-content auto',
    height: '100%',
  },
  searchBar: {
    maxHeight: '50px',
    marginBottom: '10px',
    width: '100%',
  },
  chat: {
    paddingBottom: '15px',
    overflowY: 'scroll',
  },
}))

export interface Props {
  data: NonNullable<GetterData<Array<ChatMessage>>>
  chat: Chat
  userNames: Array<string>
  onAddUserName: Function
}

export default function ChatComponent({ data: { data: messagesList }, chat, userNames, onAddUserName }: Props) {
  const classes = useStyles()
  const [filteredMessages, setMessages] = useState(messagesList)
  const [userName, setUserName] = useState<string>()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedParticipant, setSelectedParticipant] = useState<string>()

  useEffect(() => {
    const uname = chat.participants.find((participant: string) => userNames.includes(participant))
    if (!uname) {
      setDialogOpen(true)
    } else {
      setUserName(userNames.find((each) => chat.participants.includes(each)) ?? '')
    }
  }, [chat, userNames])

  const handleSearch = useCallback((searchedData) => {
    setMessages(searchedData)
  }, [])

  const handleSubmit = useCallback(() => {
    onAddUserName(selectedParticipant)
    setDialogOpen(false)
  }, [selectedParticipant])

  const handleParticipantSelection = useCallback((e: any) => {
    setSelectedParticipant((prev) => ((prev === e.target.name) ? undefined : e.target.name))
  }, [])

  return (
    <div className={ classes.container }>
      <Dialog open={ dialogOpen }>
        <DialogTitle>Who are you ?</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            { [...chat.participants, 'None'].map((participant) => (
              <FormControlLabel
                key={ participant }
                control={ (
                  <Checkbox
                    checked={ selectedParticipant === participant }
                    onClick={ handleParticipantSelection }
                    name={ participant }
                  />
                ) }
                label={ participant }
              />
            )) }
            <Button disabled={ selectedParticipant === undefined } type="submit" onClick={ handleSubmit }>
              Select
            </Button>
          </FormControl>
        </DialogContent>
      </Dialog>
      <Searchbar
        className={ classes.searchBar }
        data={ messagesList }
        keys={ ['text', 'sender'] }
        onSearch={ handleSearch }
      />
      <MessageList
        lockable
        className={ classes.chat }
        dataSource={ filteredMessages.map((message) => ({
          position: message.sender === userName ? 'right' : 'left',
          type: 'text',
          text: message.text,
          title: message.sender,
          date: message.sendAt,
        })) }
      />
    </div>
  )
}
