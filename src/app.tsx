import { Component, PropsWithChildren, Children, cloneElement } from 'react'
import './app.less'
import store from './store/index'
import { Provider } from 'react-redux'

import * as apis from '@/config/apis/index'
import commonLess from '@assets/less/common.module.less'

class App extends Component<PropsWithChildren> {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  render () {
    // this.props.children 是将要会渲染的页面
    return (
      <Provider store={store}>
        {Children.map(this.props.children, (childrenNode) => {
          let childrenProps: {[propsName: string]: any} = {
            $apis: apis,
            $commonLess: commonLess
          }
          return cloneElement((childrenNode as any), childrenProps)
        })}
      </Provider>
    )
  }
}

Component.prototype.$apis = apis
Component.prototype.$commonLess = commonLess

export default App
