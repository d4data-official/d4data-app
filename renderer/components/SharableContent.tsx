import React, { PropsWithChildren, useRef } from 'react'
import { Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core'
import ShareIcon from '@material-ui/icons/Share'
import ContentCopyIcon from '@material-ui/icons/ContentCopy'
import FileDownloadIcon from '@material-ui/icons/FileDownload'
import { bindMenu, bindTrigger } from 'material-ui-popup-state'
import { usePopupState } from 'material-ui-popup-state/hooks'
import html2canvas from 'html2canvas'
import { clipboard, nativeImage } from 'electron'
import { toast } from 'react-hot-toast'
import { saveAs } from 'file-saver'

export enum Position {
  TOP_LEFT = 'TOP_LEFT',
  TOP_RIGHT = 'TOP_RIGHT',
  BOTTOM_LEFT = 'BOTTOM_LEFT',
  BOTTOM_RIGHT = 'BOTTOM_RIGHT',
}

export interface Props {
  menuIconPosition?: Position
  menuIconMargin?: number
  menuIconColor?: string
  exportFileName?: string
}

const MENU_ITEM_EXPORT_TO_CLIPBOARD = 'Export to clipboard'
const MENU_ITEM_EXPORT_TO_FILE = 'Save as file (PNG)'
const SAVE_TO_CLIPBOARD_SUCCESS_NOTIF = 'Successfully saved to clipboard'

const getAbsPosition = (position: Position, padding: number) => {
  switch (position) {
    case Position.TOP_LEFT:
      return { top: padding, left: padding }
    case Position.TOP_RIGHT:
      return { top: padding, right: padding }
    case Position.BOTTOM_LEFT:
      return { bottom: padding, left: padding }
    case Position.BOTTOM_RIGHT:
      return { bottom: padding, right: padding }
    default:
      return {}
  }
}

export default function SharableContent({
  menuIconPosition = Position.TOP_RIGHT,
  menuIconMargin = 5,
  menuIconColor,
  exportFileName = 'd4data',
  children,
}: PropsWithChildren<Props>) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' })

  const handleExportToClipboard = (destination: 'clipboard' | 'file') => {
    popupState.close()

    html2canvas(wrapperRef.current!, {
      allowTaint: true,
      backgroundColor: null,
    })
      .then((canvas) => {
        if (destination === 'clipboard') {
          clipboard.writeImage(nativeImage.createFromDataURL(canvas.toDataURL('image/png', 1)))
          toast.success(SAVE_TO_CLIPBOARD_SUCCESS_NOTIF, { position: 'bottom-left' })
        } else if (destination === 'file') {
          canvas.toBlob((blob) => blob && saveAs(blob, exportFileName))
        }
      })
  }

  return (
    <Box component="div" sx={ { position: 'relative' } }>
      <Box position="absolute" { ...getAbsPosition(menuIconPosition, menuIconMargin) }>
        <IconButton
          { ...bindTrigger(popupState) }
          sx={ { color: menuIconColor } }
        >
          <ShareIcon/>
        </IconButton>
      </Box>

      <Menu { ...bindMenu(popupState) }>
        <MenuItem onClick={ () => handleExportToClipboard('clipboard') }>
          <ListItemIcon>
            <ContentCopyIcon fontSize="small"/>
          </ListItemIcon>
          <ListItemText>{ MENU_ITEM_EXPORT_TO_CLIPBOARD }</ListItemText>
        </MenuItem>

        <MenuItem onClick={ () => handleExportToClipboard('file') }>
          <ListItemIcon>
            <FileDownloadIcon fontSize="small"/>
          </ListItemIcon>
          <ListItemText>{ MENU_ITEM_EXPORT_TO_FILE }</ListItemText>
        </MenuItem>
      </Menu>

      <Box ref={ wrapperRef }>
        { children }
      </Box>
    </Box>
  )
}
