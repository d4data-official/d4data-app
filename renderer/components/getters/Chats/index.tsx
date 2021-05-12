import { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn';
import Chat from '@d4data/archive-lib/dist/src/types/schemas/Chat';
import { Grid, Tab, Tabs, makeStyles } from '@material-ui/core';
import { useCallback, useState } from 'react';
import 'react-chat-elements/dist/main.css';

import WithDataFetch from 'components/pages/dashboard/tools/WithDataFetch';
import ChatComponent from './Chat';

const useStyles = makeStyles(({
  container: {
    height: '100%',
  },
  tabsContainer: {
    height: '100%',
  },
  tabs: {
    height: '100%',
    // height: `calc(100vh - ${ theme.mixins.toolbar.minHeight || 0 }px)`,
    borderRight: '1px solid gray',
  },
  chat: {
    height: '100%',
    // height: `calc(100vh - ${ theme.mixins.toolbar.minHeight || 0 }px)`,
  },
}));

export interface Props {
  data: NonNullable<GetterData<Array<Chat>>>
}

export default function Chats({ data: { data: chats } }: Props) {
  const classes = useStyles();
  const [currentChat, setCurrentChat] = useState<number>();
  const [userNames, setUserNames] = useState<Array<string>>([])
  console.log(chats)

  const handleCurrentTabChange = useCallback((_, selected) => {
    setCurrentChat(selected);
  }, [])

  const handleAddUserName = useCallback((userName) => {
    setUserNames((prev) => [...prev, userName]);
  }, [])

  return (
    <Grid container spacing={ 3 } className={ classes.container } >
      <Grid item xs={ 3 } className={ classes.tabsContainer } >
        <Tabs
          className={ classes.tabs }
          variant="scrollable"
          orientation="vertical"
          scrollButtons="off"
          value={ currentChat ?? false }
          onChange={ handleCurrentTabChange }
        >
          {chats.map((chat, index) => (
            <Tab
              id={ `vertical-tab-${ index }` }
              label={ chat.title }
              key={ chat._id }
            />
          ))}
        </Tabs>
      </Grid>
      { (currentChat !== undefined) && (
        <Grid item xs={ 9 } className={ classes.chat }>
          <WithDataFetch
            componentName="ChatMessages"
            component={ ChatComponent }
            componentProps={ {
              onAddUserName: handleAddUserName,
              chat: chats[currentChat!],
              userNames,
            } }
            standardizeArgs={ [chats[currentChat!]._id] }
          />
        </Grid>
      )}
    </Grid>
  )
}
