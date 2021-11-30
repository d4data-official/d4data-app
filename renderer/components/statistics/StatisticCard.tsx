import type { RankingStatisticItemValue } from '@d4data/archive-lib/dist/src/types/schemas/Statistic'
import Statistic, { RankingStatisticValue, StatisticType } from '@d4data/archive-lib/dist/src/types/schemas/Statistic'
import { Box, capitalize, Grid, Stack, Typography, useTheme } from '@mui/material'
import TimelineIcon from '@mui/icons-material/Timeline'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import moment from 'moment'
import numeral from 'numeral'
import { useTranslation } from 'react-i18next'
import SharableContent from '../SharableContent'

export interface Props {
  statistic: Statistic
  variant?: 'contained' | 'outlined'
}

export const SIZE_UNIT = 175

export const BIG_CARD_TYPES: Array<StatisticType> = [StatisticType.RANKING]

export default function StatisticCard({ statistic, variant = 'contained' }: Props) {
  const { t } = useTranslation('common')
  const theme = useTheme()

  const size = BIG_CARD_TYPES.includes(statistic.type) ? 2 : 1
  const color = variant === 'outlined' ? theme.palette.primary.main : 'white'

  const getHumanReadableNumber = (value: number) => numeral(value).format(value > 1000 ? '0.0a' : '0.[00]')

  const getFormattedArrayValue = (value: RankingStatisticItemValue['value']) => {
    switch (typeof value) {
      case 'number':
        return getHumanReadableNumber(value)
      case 'boolean':
        return (value ? 'Yes' : 'No')
      default:
        return value
    }
  }

  const getFormattedStatValue = (statistic: Statistic) => {
    switch (statistic.type) {
      case StatisticType.NUMBER:
        return getHumanReadableNumber(statistic.value as number)
      case StatisticType.PERCENTAGE:
        return `${ Math.round(statistic.value as number) }%`
      case StatisticType.BOOLEAN:
        return (statistic.value as boolean) ? t('yes') : t('no')
      case StatisticType.DURATION:
        return capitalize(moment.duration(statistic.value as string).humanize(false, { s: 0, m: 0 }))
      case StatisticType.RANKING: {
        const rankingStat = statistic.value as RankingStatisticValue

        return (
          <Stack spacing={ 1 }>
            { rankingStat.slice(0, 5).map((item) => (
              <Stack direction="row" alignItems="center" key={ item.label }>
                <Typography
                  px={ 1 }
                  mr={ 1 }
                  variant="h6"
                  color="primary"
                  sx={ { background: 'white' } }
                >{ getFormattedArrayValue(item.value) }
                </Typography>
                <Typography variant="h6" fontWeight={ 100 }>{ item.label }</Typography>
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
            >{ capitalize(statistic.name) }
            </Typography>

          </Grid>

          <Grid item container alignItems="center" justifyContent="flex-end" style={ { flexBasis: 0 } }>
            { getStatIcon(statistic) }
          </Grid>
        </Grid>

        { statistic.description && (
          <Typography
            mt={ size }
            variant="caption"
            component="div"
            sx={ { mt: -1 } }
          >{ capitalize(statistic.description) }
          </Typography>
        ) }
      </Box>
    </SharableContent>
  )
}
