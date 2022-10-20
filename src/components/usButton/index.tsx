import React, { useState } from 'react'
import type { PropsWithChildren } from 'react'
import type { PageProps } from './interface'
import { Button } from '@tarojs/components'

const UsButton: React.FC<PropsWithChildren<PageProps>> = (props) => {

  const [style, setStyle] = useState<{[propsName: string]: any}>({
    display: 'block'
  })

  return (
    <Button
      style={style}
    >{props.children}</Button>
  )

}

export default UsButton;
