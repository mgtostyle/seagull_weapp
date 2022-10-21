import React, { Component } from 'react'
import type { PropsWithChildren, ReactNode } from 'react'
import type { PageProps, PageState } from './interface'
import './index.less'
import { View } from '@tarojs/components'
import { UsContainer } from '@components/usComp'

class VerifyLogin extends Component<PropsWithChildren<PageProps>, PageState> {

  constructor (props) {
    super (props)
    console.log(props)
  }

  public render (): ReactNode {
    return (
      <UsContainer title="首页"></UsContainer>
    )
  }

}

export default VerifyLogin
