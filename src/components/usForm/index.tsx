import React, { Component, ReactNode, PropsWithChildren } from 'react'
import type { PageProps, PageState, FieldValue } from './interface'
import less from './index.module.less'
import { View, Form } from '@tarojs/components'
import { connect } from 'react-redux'

import { UsButton } from '../usIndex'

export class UsForm extends Component<PropsWithChildren<PageProps & ReturnType<typeof mapStateToProps>>, PageState> {

  static defaultProps: PageProps = {
    initialValues: {}
  }

  constructor (props) {
    super (props)
    this.state = {
      initialValues: props.initialValues
    }
  }

  private setFieldValue (params: FieldValue) {
    console.log(params)
    this.setState((state: PageState) => {
      state.initialValues = {
        ...state.initialValues,
        [params.name]: params.value
      }
      return state;
    })
  }

  render (): ReactNode {
    const { onSubmit, ...params }: PageProps = this.props
    const { safeAreaHeight } = this.props.global
    const { initialValues }: PageState = this.state
    return (
      <Form
        className={less.block_form_container}
        {...params}
        onSubmit={(e) => typeof onSubmit === 'function' && onSubmit({
          ...e.detail.value,
          ...initialValues
        })}
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
              className={less.button}
              ghost
              formType="reset"
            >重置</UsButton>
            <UsButton
              className={less.button}
              formType="submit"
            >提交</UsButton>
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
