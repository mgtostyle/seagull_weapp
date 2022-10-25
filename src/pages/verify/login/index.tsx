import React, { Component, PropsWithChildren, ReactNode } from 'react'
import type { PageProps, PageState } from './interface'
import './index.less'
import { UsContainer, UsForm, UsInput, UsTextArea, UsRadio } from '@components/usComp'

class VerifyLogin extends Component<PropsWithChildren<PageProps>, PageState> {

  constructor (props) {
    super (props)
    console.log(props)
  }

  public render (): ReactNode {
    return (
      <React.Fragment>
        <UsContainer title="首页">
          <UsForm
            onSubmit={(values) => console.log(values.detail.value)}
          >
            <UsForm.Item label="输入框" name="input">
              <UsInput placeholder="请输入..." />
            </UsForm.Item>
            <UsForm.Item label="文本域" name="textarea">
              <UsTextArea placeholder="请输入..." />
            </UsForm.Item>
            <UsForm.Item label="单选框" name="radio">
              <UsRadio>1</UsRadio>
            </UsForm.Item>
          </UsForm>
        </UsContainer>
      </React.Fragment>
    )
  }

}

export default VerifyLogin
