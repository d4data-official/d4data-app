import React from 'react'

export default function DefaultDisplay({ data }: { data: any }) {
  return (
    <div>{JSON.stringify(data)}</div>
  )
}
