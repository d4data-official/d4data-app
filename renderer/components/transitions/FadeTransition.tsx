import { Fade, FadeProps } from '@mui/material'
import { forwardRef, ReactElement, Ref } from 'react'

export interface Props extends FadeProps {
  children: ReactElement<any, any>;

}

const FadeTransition = forwardRef((props: Props, ref: Ref<unknown>) => <Fade ref={ ref } { ...props } />)

export default FadeTransition
