import { makeStyles } from '@material-ui/styles'
import { MUIDataTableColumn, MUIDataTableColumnOptions } from 'mui-datatables'
import clsx from 'clsx'

const useStyles = makeStyles({
  leftAlignedHeader: {
    '& span': {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
  },
  centeredHeader: {
    '& span': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  rightAlignedHeader: {
    '& span': {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
  },
})

type SetCellHeaderProps = MUIDataTableColumnOptions['setCellHeaderProps']

export interface TableColumn extends MUIDataTableColumn {
  alignHeader?: 'left' | 'center' | 'right'
}

export default function createTableColumns(columns: Array<TableColumn>): Array<MUIDataTableColumn> {
  const classes = useStyles()

  const setCellHeaderProps = (column: TableColumn): SetCellHeaderProps => (columnMeta) => {
    const defaultFuncResult: any = column.options?.setCellHeaderProps?.(columnMeta)

    return ({
      ...defaultFuncResult,
      className: clsx(
        defaultFuncResult?.className,
        {
          [classes.centeredHeader]: column.alignHeader === 'center',
          [classes.rightAlignedHeader]: column.alignHeader === 'right',
        },
      ),
    })
  }

  return columns.map((column) => ({
    ...column,
    options: {
      ...column.options,
      setCellHeaderProps: setCellHeaderProps(column),
    },
  }))
}
