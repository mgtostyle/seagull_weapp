import { Component, PropsWithChildren } from 'react'
import './app.less'
import store from './store/index'
import { Provider } from 'react-redux'
import Request from './config/network/request'

new Request('/composite/terminal/verify/wxLogin').POST({}, 'String')

class App extends Component<PropsWithChildren> {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  render () {
    // this.props.children 是将要会渲染的页面
    return (
      <Provider store={store}>{this.props.children}</Provider>
    )
  }
}

export default App
