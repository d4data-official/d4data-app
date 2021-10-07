import React from 'react'
import { ImageList, ImageListItem, ImageListItemBar, Modal } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { GetterData } from '@d4data/archive-lib/dist/src/types/standardizer/GetterReturn'
import { Media } from '@d4data/archive-lib/dist/src/types/schemas'
import { List as ListIcon, Timeline } from '@material-ui/icons'
import Getters from '@d4data/archive-lib/dist/src/types/standardizer/Getters'
import AutoStatisticPage from '../statistics/AutoStatisticPage'
import AutoTabs from '../AutoTabs'

const useStyles = makeStyles(() => ({
  root: {
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  imageList: {
    borderColor: 'transparent',
  },
  title: {
    color: 'white',
  },
  modal: {
    outline: 'none',
  },
  modalImage: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  tile: {
    maxWidth: 200,
  },
}))

function Medias({ data }: { data: NonNullable<GetterData<Array<Media>>> }) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [image, setImage] = React.useState('')

  const handleOpen = (imagePath: string) => {
    setOpen(true)
    setImage(imagePath)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const Medias = (
    <div>
      <Modal
        className={ classes.modal }
        open={ open }
        onClose={ handleClose }
      >
        <div className={ classes.modalImage }>
          <img src={ image } alt=""/>
        </div>
      </Modal>
      <h3>
        { `${ data.data.slice(0, 194).length } medias` }
      </h3>
      <div className={ classes.root }>
        <ImageList cols={ 6 } className={ classes.imageList }>
          { data.data.map((tile: any) => (
            <ImageListItem
              className={ classes.tile }
              onClick={ () => handleOpen(tile.url) }
              key={ tile.url }
              cols={ 1 }
            >
              <img src={ tile.url } alt={ tile.fileName }/>
              <ImageListItemBar
                title={ tile.fileName.split('.')[0] }
                classes={ {
                  root: classes.titleBar,
                  title: classes.title,
                } }
              />
            </ImageListItem>
          )) }
        </ImageList>
      </div>
    </div>
  )

  return (
    <AutoTabs
      tabs={ [
        { label: 'Medias stat', icon: <Timeline/> },
        { label: 'Medias', icon: <ListIcon/> },
      ] }
      tabsContent={ [
        <AutoStatisticPage getter={ Getters.MEDIAS }/>,
        Medias,
      ] }
    />
  )
}

Medias.disableRawData = true

export default Medias
