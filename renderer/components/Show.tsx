import React from 'react'

export interface ShowProps {
  condition: any
  children: JSX.Element | JSX.Element[]
}

export default function Show({ condition, children }: ShowProps) {
  return condition ? <>{children}</> : <></>
}
