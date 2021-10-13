import { Reaction } from '@d4data/archive-lib/dist/src/types/schemas'
import ThumbUp from '@mui/icons-material/ThumbUp'
import ThumbDown from '@mui/icons-material/ThumbDown'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Mood from '@mui/icons-material/Mood'
import MoodBad from '@mui/icons-material/MoodBad'
import SentimentSatisfied from '@mui/icons-material/SentimentSatisfied'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  reactionBox: {
    width: '24px',
    height: '24px',
  },
  reactionIcon: {
    margin: 5,
  },
})

function generateIconFromReaction(reaction: NonNullable<Reaction>) {
  const classes = useStyles()
  const reactionList = ['LIKE', 'LOVE', 'HAHA', 'WOW', 'SORRY', 'UP', 'DOWN']

  return (
    <div className={ classes.reactionBox }>
      { reaction.name.toUpperCase() === 'UP' && <ThumbUp/> }
      { reaction.name.toUpperCase() === 'DOWN' && <ThumbDown/> }
      { reaction.name.toUpperCase() === 'LIKE' && <ThumbUp/> }
      { reaction.name.toUpperCase() === 'LOVE' && <FavoriteIcon/> }
      { reaction.name.toUpperCase() === 'HAHA' && <SentimentSatisfied/> }
      { reaction.name.toUpperCase() === 'WOW' && <Mood/> }
      { reaction.name.toUpperCase() === 'SORRY' && <MoodBad/> }
      { !reactionList.includes(reaction.name.toUpperCase()) && reaction.name.toUpperCase() }
    </div>

  )
}

export default function GenericReactionComponent({ reaction }: { reaction: NonNullable<Reaction> }) {
  return generateIconFromReaction(reaction)
}
