import React from 'react'
import type { PropsWithChildren } from 'react'
import { Button } from '@tarojs/components'

const UsButton: React.FC<PropsWithChildren> = (props) => {

  return (
    <Button>{props.children}</Button>
  )

}

export default UsButton;