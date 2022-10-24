import React, { Component, PropsWithChildren, ReactNode } from 'react'
import type { PageProps, PageState } from './interface'
import './index.less'
import { UsContainer, UsForm, UsFormField } from '@components/usComp'

class VerifyLogin extends Component<PropsWithChildren<PageProps>, PageState> {

  constructor (props) {
    super (props)
    console.log(props)
  }

  public render (): ReactNode {
    return (
      <React.Fragment>
        <UsContainer title="首页">
          <UsForm>
            <UsFormField.Item></UsFormField.Item>
            <UsFormField.Item></UsFormField.Item>
          </UsForm>
        </UsContainer>
      </React.Fragment>
    )
  }

}

export default VerifyLogin
