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
      visible: false,
      initialValues: props.request ? props.request : props.initialValues,
      shouldComponentUpdate: true
    }
  }

  async componentDidMount () {
    if (typeof this.props.request === 'function') {
      this.props.request().then(values => {
        this.setState({
          visible: true,
          initialValues: values
        }, () => this.props.formRef && this.props.formRef(this))
      })
    } else {
      this.setState({
        visible: true
      }, () => this.props.formRef && this.props.formRef(this))
    }
  }

  getFieldValue (name) {
    return this.state?.initialValues?.[name]
  }

  setFieldValue (params: FieldValue, update?: boolean) {
    console.log(update)
    this.setState((state: PageState) => {
      state.initialValues = Object.assign(state.initialValues, {
        [params.name]: params.value
      })
      state.shouldComponentUpdate = Boolean(update)
      return state;
    }, () => this.props.formRef && this.props.formRef(this))
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
    const params = JSON.parse(JSON.stringify({
      ...e.detail.value,
      ...this.state.initialValues
    }))
    Taro.showModal({
      title: '提示',
      content: `再次确认信息是否填写完整，并${buttonConfig?.submitText || '提交'}`,
      confirmText: buttonConfig?.submitText || '提交',
      success: res => res.confirm && typeof onSubmit === 'function' && onSubmit(params)
    })
  }

  render (): ReactNode {
    const { onReset, buttonConfig, ...params }: PageProps = this.props
    const { resetText, submitText, resetButtonProps, submitButtonProps } = (buttonConfig as ButtonConfig)
    const { safeAreaHeight } = this.props.global
    const { visible, initialValues, shouldComponentUpdate }: PageState = this.state
    return visible && (
      <Form
        className={less.block_form_container}
        {...params}
        onSubmit={(e) => this.onSubmit(e)}
      >
        {React.Children.map(this.props.children, (childrenNode: any) => {
          if (Boolean(childrenNode)) {
            let childrenProps: any = {
              initialValues,
              shouldComponentUpdate,
              setFieldValue: this.setFieldValue.bind(this)
            }
            // if (Array.isArray(childrenNode.props.children)) {
            //   childrenProps.children = childrenNode.props.children.map(item => {
            //     return React.cloneElement(item, {
            //       initialValue: initialValues?.[item.props.name] || ''
            //     })
            //   })
            // } else {
            //   childrenProps.initialValue = initialValues?.[childrenNode.props.name] || ''
            // }
            return React.cloneElement(childrenNode, childrenProps)
          } else {
            return false
          }
        })}
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
