import { Grow, GrowProps } from '@mui/material'
import { forwardRef, ReactElement, Ref } from 'react'

export interface Props extends GrowProps {
  children: ReactElement<any, any>;

}

const GrowTransition = forwardRef((props: Props, ref: Ref<unknown>) => <Grow ref={ ref } { ...props } />)

export default GrowTransition
