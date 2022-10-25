import { Component, ReactNode } from 'react'
import type { PageProps } from './interface'
import less from './index.module.less'
import { Input } from '@tarojs/components'

class UsUpload extends Component<any> {

  constructor(props: any) {
    super(props)
    console.log(this)
  }

  static defaultProps = {
    name: 'dasdas',
    value: 'dasdas'
  }

  render (): ReactNode {
    return (
      <Input placeholder='请输入...' />
    )
  }

}

export default UsUpload;
