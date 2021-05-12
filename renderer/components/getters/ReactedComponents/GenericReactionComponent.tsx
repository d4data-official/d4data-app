import { Reaction } from '@d4data/archive-lib/dist/src/types/schemas'
import ThumbUp from '@material-ui/icons/ThumbUp';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Mood from '@material-ui/icons/Mood';
import MoodBad from '@material-ui/icons/MoodBad';
import SentimentSatisfied from '@material-ui/icons/SentimentSatisfied';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  reactionBox: {
    width: '24px',
    height: '24px',
  },
  reactionIcon: {
    margin: 5,
  },
});

function generateIconFromReaction(reaction: NonNullable<Reaction>) {
  const classes = useStyles();
  const reactionList = ['LIKE', 'LOVE', 'HAHA', 'WOW', 'SORRY']

  return (
    <div className={ classes.reactionBox }>
      {reaction.name.toUpperCase() === 'LIKE' && <ThumbUp/>}
      {reaction.name.toUpperCase() === 'LOVE' && <FavoriteIcon/>}
      {reaction.name.toUpperCase() === 'HAHA' && <SentimentSatisfied/>}
      {reaction.name.toUpperCase() === 'WOW' && <Mood/>}
      {reaction.name.toUpperCase() === 'SORRY' && <MoodBad/>}
      { !reactionList.includes(reaction.name.toUpperCase()) && reaction.name.toUpperCase()}
    </div>

  )
}

export default function GenericReactionComponent({ reaction }: { reaction: NonNullable<Reaction> }) {
  return generateIconFromReaction(reaction)
}
