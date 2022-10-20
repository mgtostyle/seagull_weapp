import React, { Component } from 'react'
import type { PropsWithChildren, ReactNode } from 'react'
import type { PageProps, PageState } from './interface'
import { UsButton } from '../../../components/usComp'

class VerifyLogin extends Component<PropsWithChildren<PageProps>, PageState> {

  constructor (props) {
    super (props)
    console.log(props)
  }

  public render (): ReactNode {
    return (
      <React.Fragment>
        <UsButton>测试</UsButton>
      </React.Fragment>
    )
  }

}

export default VerifyLogin
