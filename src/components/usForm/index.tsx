import React, { Component, ReactNode, PropsWithChildren } from 'react'
import type { PageProps, PageState, FieldValue, ButtonConfig } from './interface'
import less from './index.module.less'
import Taro from '@tarojs/taro'
import { View, Form } from '@tarojs/components'
import { connect } from 'react-redux'

import { UsButton } from '../usIndex'

class UsForm extends Component<PropsWithChildren<PageProps & ReturnType<typeof mapStateToProps>>, PageState> {

  static defaultProps: PageProps = {
    initialValues: {},
    request: async () => ({})
  }

  constructor (props) {
    super (props)
    this.state = {
      initialValues: props.request ? props.request : props.initialValues
    }
  }

  componentDidMount () {
    this.props.formRef && this.props.formRef(this)
    typeof this.props.request === 'function' && this.props.request().then(values => {
      this.setState({
        initialValues: values
      })
    })
  }

  setFieldValue (params: FieldValue) {
    console.log(params)
    this.setState((state: PageState) => {
      state.initialValues[params.name] = params.value
      return state;
    })
  }

  resetFields (params?: {[propsName: string]: any}) {
    const { buttonConfig, initialValues }: PageProps = this.props
    Taro.showModal({
      title: '提示',
      content: '再次确认是否清空当前数据，请谨慎操作此项！！！',
      confirmColor: less.usDangerColor,
      confirmText: buttonConfig?.resetText || '重置',
      success: res => res.confirm && this.setState({
        initialValues: params ? Object.assign(initialValues, params) : {}
      }, () => console.log(this.state.initialValues))
    })
  }

  private onSubmit (e) {
    const { buttonConfig, onSubmit }: PageProps = this.props
    Taro.showModal({
      title: '提示',
      content: `再次确认信息是否填写完整，并${buttonConfig?.submitText || '提交'}`,
      confirmText: buttonConfig?.submitText || '提交',
      success: res => res.confirm && typeof onSubmit === 'function' && onSubmit({
        ...e.detail.value,
        ...this.state.initialValues
      })
    })
  }

  render (): ReactNode {
    const { onReset, buttonConfig, ...params }: PageProps = this.props
    const { resetText, submitText, resetButtonProps, submitButtonProps } = (buttonConfig as ButtonConfig)
    const { safeAreaHeight } = this.props.global
    const { initialValues }: PageState = this.state
    return (
      <Form
        className={less.block_form_container}
        {...params}
        onSubmit={(e) => this.onSubmit(e)}
      >
        {React.Children.map(this.props.children, (childrenNode: any) => React.cloneElement(childrenNode, {
          initialValue: initialValues?.[childrenNode.props.name] || '',
          setFieldValue: this.setFieldValue.bind(this)
        }))}
        <View className={less.inline_item_submit}>
          <View
            className={less.submit_box}
            style={{
              marginBottom: `${safeAreaHeight}rpx`
            }}
          >
            <UsButton
              {...resetButtonProps}
              className={less.button}
              ghost
              onClick={onReset}
            >{resetText || '重置'}</UsButton>
            <UsButton
              {...submitButtonProps}
              className={less.button}
              formType="submit"
            >{submitText || '提交'}</UsButton>
          </View>
        </View>
      </Form>
    )
  }

}

const mapStateToProps = (state) => ({
  global: state.global
})

export default connect(mapStateToProps)(UsForm);
