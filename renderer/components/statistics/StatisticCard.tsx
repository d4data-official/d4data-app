import Statistic, { RankingStatisticValue, StatisticType } from '@d4data/archive-lib/dist/src/types/schemas/Statistic'
import { Box, capitalize, Grid, Stack, Typography, useTheme } from '@material-ui/core'
import TimelineIcon from '@material-ui/icons/Timeline'
import ShowChartIcon from '@material-ui/icons/ShowChart'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import moment from 'moment'
import numeral from 'numeral'
import SharableContent from '../SharableContent'

export interface Props {
  statistic: Statistic
  variant?: 'contained' | 'outlined'
}

const SIZE_UNIT = 175

export default function StatisticCard({ statistic, variant = 'contained' }: Props) {
  const theme = useTheme()

  const size = statistic.type === StatisticType.RANKING ? 2 : 1
  const color = variant === 'outlined' ? theme.palette.primary.main : 'white'

  const getHumanReadableNumber = (value: number) => numeral(value).format(value > 1000 ? '0.0a' : '0a')

  const getFormattedStatValue = (statistic: Statistic) => {
    switch (statistic.type) {
      case StatisticType.NUMBER:
        return getHumanReadableNumber(statistic.value as number)
      case StatisticType.PERCENTAGE:
        return `${ statistic.value as number }%`
      case StatisticType.BOOLEAN:
        return (statistic.value as boolean) ? 'Yes' : 'No'
      case StatisticType.DURATION:
        return capitalize(moment.duration(statistic.value as string).humanize(false, { s: 0, m: 0 }))
      case StatisticType.RANKING: {
        const rankingStat = statistic.value as RankingStatisticValue

        return (
          <Stack spacing={ 1 }>
            { rankingStat.map((website) => (
              <Stack direction="row" alignItems="center" key={ website.label }>
                <Typography
                  px={ 1 }
                  mr={ 1 }
                  variant="h6"
                  color="primary"
                  sx={ { background: 'white' } }
                >{ website.value }
                </Typography>
                <Typography variant="h6" fontWeight={ 100 }>{ website.label }</Typography>
              </Stack>
            )) }
          </Stack>
        )
      }
      default:
        return statistic.value.toString()
    }
  }

  const getStatIcon = (statistic: Statistic) => {
    const iconFontSize = 100 * size

    switch (statistic.type) {
      case StatisticType.DURATION:
        return <TimelineIcon fontSize="large" sx={ { fontSize: iconFontSize } }/>
      case StatisticType.RANKING:
        return <FormatListNumberedIcon fontSize="large" sx={ { fontSize: iconFontSize } }/>
      default:
        return <ShowChartIcon fontSize="large" sx={ { fontSize: iconFontSize } }/>
    }
  }

  return (
    <SharableContent menuIconColor={ color }>
      <Box
        height={ SIZE_UNIT * size }
        width={ SIZE_UNIT * size * 2 }
        p={ 4 }
        sx={ {
          color: variant === 'outlined' ? theme.palette.primary.main : 'white',
          borderRadius: 1,
          background: (theme) => (variant === 'contained'
            ? `linear-gradient(90deg, ${ theme.palette.primary.light } 0%, ${ theme.palette.primary.main } 100%);`
            : 'white'),
          border: variant === 'outlined' ? `3px solid ${ theme.palette.primary.main }` : undefined,
        } }
      >
        <Grid container alignItems="center" justifyContent="space-between" wrap="nowrap" style={ { height: '100%' } }>
          <Grid item>
            <Typography variant="h3">
              { getFormattedStatValue(statistic) }
            </Typography>
            <Typography
              mt={ size }
              variant="h6"
              fontSize={ 20 * Math.max(size * 0.75, 1) }
            >{ statistic.name }
            </Typography>
          </Grid>
          <Grid item container alignItems="center" justifyContent="flex-end" style={ { flexBasis: 0 } }>
            { getStatIcon(statistic) }
          </Grid>
        </Grid>
      </Box>
    </SharableContent>
  )
}
