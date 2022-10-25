import React, { Component, PropsWithChildren, ReactNode } from 'react'
import type { PageProps, PageState } from './interface'
import './index.less'
import { UsContainer, UsForm, UsInput } from '@components/usComp'

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
            <UsForm.Item.Group>
              <UsForm.Item label="测试" direction="horizontal">
                <UsInput placeholderClass="placeholderClass" placeholder="请输入..." />
              </UsForm.Item>
              <UsForm.Item label="测试" direction="horizontal">
                <UsInput placeholderClass="placeholderClass" placeholder="请输入..." />
              </UsForm.Item>
            </UsForm.Item.Group>
          </UsForm>
        </UsContainer>
      </React.Fragment>
    )
  }

}

export default VerifyLogin
