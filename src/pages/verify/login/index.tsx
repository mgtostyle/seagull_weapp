import React, { Component } from 'react'
import type { PropsWithChildren, ReactNode } from 'react'
import type { PageProps, PageState } from './interface'
import './index.less'
import { View } from '@tarojs/components'
import { UsButton } from '@components/usComp'

class VerifyLogin extends Component<PropsWithChildren<PageProps>, PageState> {

  constructor (props) {
    super (props)
    console.log(props)
  }

  public render (): ReactNode {
    return (
      <React.Fragment>
        <View
          className="iconfont"
          style={{
            display: 'block',
            marginTop: 100
          }}
        >&#xe723;</View>
        <UsButton>测试</UsButton>
      </React.Fragment>
    )
  }

}

export default VerifyLogin
