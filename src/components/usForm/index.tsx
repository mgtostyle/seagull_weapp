import React, { Component, ReactNode, PropsWithChildren } from 'react'
import type { PageProps } from './interface'
import indexCss from './index.module.less'
import { Form, Checkbox, CheckboxGroup, Editor, Radio, RadioGroup, Switch, Slider, Picker, PickerView, KeyboardAccessory, Label, Input, Textarea, Button } from '@tarojs/components'
import { UsButton } from '../usComp'

class UsForm extends Component<PropsWithChildren<PageProps>> {

  render (): ReactNode {
    return (
      <Form
        onReset={() => console.log('重置成功')}
        onSubmit={(values) => console.log(values)}
      >
        {this.props.children}
        <UsButton
          field={{
            formType: "reset"
          }}
        >重置</UsButton>
        <UsButton
          field={{
            formType: "submit"
          }}
        >提交</UsButton>
      </Form>
    )
  }

}

export default UsForm;