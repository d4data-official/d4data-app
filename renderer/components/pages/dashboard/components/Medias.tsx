import React from 'react'
import { GridList, GridListTile, GridListTileBar, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    borderColor: 'red',
  },
  title: {
    color: 'white',
  },
  titleBar: {
    background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function Medias({ data }: { data: any }) {
  const classes = useStyles();
  return (
    <div>
      <h3>
        {`${ data.data.length } medias`}
      </h3>
      <div className={ classes.root }>
        <GridList cols={ 6 } className={ classes.gridList }>
          {data.data.map((tile: any) => (
            <GridListTile key={ tile.url } cols={ 1 }>
              <img src={ tile.url } alt={ tile.fileName }/>
              <GridListTileBar
                title={ tile.fileName.split('.')[0] }
                classes={ {
                  root: classes.titleBar,
                  title: classes.title,
                } }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  )
}
