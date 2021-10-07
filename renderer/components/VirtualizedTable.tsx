import clsx from 'clsx'
import { Theme, Typography } from '@material-ui/core'
import { withStyles, WithStyles } from '@material-ui/styles'
import TableCell, { TableCellProps as MaterialTableCellProps } from '@material-ui/core/TableCell'
import { AutoSizer, Column, Table, TableCellProps, TableHeaderProps } from 'react-virtualized'
import { PureComponent, ReactNode, useState } from 'react'
import ConditionalTooltip from './ConditionalTooltip'

export interface ColumnData {
  dataKey: string
  label: string
  align?: MaterialTableCellProps['align']
  alignHeader?: MaterialTableCellProps['align']
  width?: number
  cellRender?: (cellData: any, columnData: ColumnData) => ReactNode
}

export interface Row {
  index: number
}

export interface MuiVirtualizedTableProps extends WithStyles<typeof styles> {
  columns: readonly ColumnData[]
  headerHeight?: number
  onRowClick?: () => void
  rowCount: number
  rowGetter: (row: Row) => any
  rowHeight?: number
}

export function CellRenderer({
  cellData,
  columnIndex,
  columnData,
  tableProps,
}: TableCellProps & { tableProps: MuiVirtualizedTableProps }) {
  const { columns, classes, rowHeight, onRowClick } = tableProps
  const { cellRender } = columnData as ColumnData
  const [ellipsis, setEllipsis] = useState(false)

  return (
    <TableCell
      component="div"
      className={ clsx(classes.tableCell, classes.flexContainer, {
        [classes.noClick]: onRowClick == null,
      }) }
      variant="body"
      style={ { height: rowHeight } }
      align={ columnIndex != null ? columns[columnIndex].align : undefined }
      sx={ { width: 1 } }
    >
      { cellRender ? cellRender(cellData, columnData) : (
        <ConditionalTooltip show={ ellipsis } title={ cellData } placement="top">
          <Typography
            ref={ (ref) => ref?.offsetWidth! < ref?.scrollWidth! && setEllipsis(true) }
            variant="body2"
            sx={ { width: 1, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' } }
          >
            { cellData }
          </Typography>
        </ConditionalTooltip>
      ) }
    </TableCell>
  )
}

const styles = (theme: Theme) => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
} as const)

class MuiVirtualizedTable extends PureComponent<MuiVirtualizedTableProps> {
  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  }

  getRowClassName = ({ index }: Row) => {
    const { classes, onRowClick } = this.props

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    })
  }

  headerRenderer = ({ label, columnIndex }: TableHeaderProps & { columnIndex: number }) => {
    const { headerHeight, columns, classes } = this.props

    return (
      <TableCell
        component="div"
        className={ clsx(classes.tableCell, classes.flexContainer, classes.noClick) }
        variant="head"
        style={ { height: headerHeight } }
        align={ columnIndex != null ? columns[columnIndex].alignHeader ?? columns[columnIndex].align : undefined }
        sx={ { width: 1 } }
      >
        <Typography width={ 1 }>{ label }</Typography>
      </TableCell>
    )
  }

  render() {
    const { classes, columns, rowHeight, headerHeight, ...tableProps } = this.props
    const autoWidthColumnsCount = columns.length - columns.filter((column) => column.width).length
    const totalColumnsWidth = columns
      .map((column) => column.width ?? 0)
      .reduce((previous, current) => previous + current, 0)

    return (
      <AutoSizer>
        { ({ height, width }) => (
          <Table
            height={ height }
            width={ width }
            rowHeight={ rowHeight! }
            gridStyle={ {
              direction: 'inherit',
            } }
            headerHeight={ headerHeight! }
            { ...tableProps }
            rowClassName={ this.getRowClassName }
          >
            { columns.map(({ dataKey, ...other }, index) => (
              <Column
                key={ dataKey }
                headerRenderer={ (headerProps) => this.headerRenderer({
                  ...headerProps,
                  columnIndex: index,
                }) }
                className={ classes.flexContainer }
                cellRenderer={ (props) => <CellRenderer { ...props } columnData={ other } tableProps={ this.props }/> }
                dataKey={ dataKey }
                { ...other }
                width={ other.width ?? (width - totalColumnsWidth) / autoWidthColumnsCount }
              />
            )) }
          </Table>
        ) }
      </AutoSizer>
    )
  }
}

export const InternalVirtualizedTable = withStyles(styles)(MuiVirtualizedTable)

export interface Props {
  columns: MuiVirtualizedTableProps['columns']
  data: Array<any>
}

export default function VirtualizedTable({ columns, data }: Props) {
  return (
    <InternalVirtualizedTable
      columns={ columns }
      rowCount={ data.length }
      rowGetter={ (row) => data[row.index] }
    />
  )
}
