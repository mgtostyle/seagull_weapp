import { Component, ReactNode, PropsWithChildren } from 'react'
import type { PageProps } from './interface'
import less from './index.module.less'
import { View, Form } from '@tarojs/components'
import { connect } from 'react-redux'

import { UsButton } from '../usComp'

export class UsForm extends Component<PropsWithChildren<PageProps> & ReturnType<typeof mapStateToProps>> {

  render (): ReactNode {
    const { ...params }: PageProps = this.props
    const { safeAreaHeight } = this.props.global
    return (
      <Form
        className={less.block_form_container}
        {...params}
      >
        {this.props.children}
        <View
          className={less.inline_button_box}
          style={{
            paddingBottom: `${safeAreaHeight}rpx`
          }}
        >
          <UsButton.Group>
            <UsButton
              ghost
              formType="reset"
            >重置</UsButton>
            <UsButton
              formType="submit"
            >提交</UsButton>
          </UsButton.Group>
        </View>
      </Form>
    )
  }

}

const mapStateToProps = (state) => ({
  global: state.global
})

export default connect(mapStateToProps)(UsForm);