import { Component, PropsWithChildren, ReactNode } from 'react'
import type { PageProps, PageState } from './interface'
import less from './index.module.less'
import { createCanvasContext } from '@tarojs/taro'
import { View, Canvas } from '@tarojs/components'
import { connect } from 'react-redux'

class UsArcProgressBar extends Component<PropsWithChildren<PageProps & ReturnType<typeof mapStateToProps>>, PageState> {

  static defaultProps: PageProps = {
    textValue: '',
    textColor: less.usTextColor,
    textSize: 28,
    boxSize: 200,
    percent: 50,
    lineWidth: 5,
    lineColor: '',
    lineBack: less.usBackGColor
  }

  constructor (props) {
    super (props)
    this.state = {
      percent: props.percent,
      lineColor: props.lineColor || props.global.theme
    }
  }

  componentDidMount () {
    this.setArcProgressBack()
  }

  static getDerivedStateFromProps(props, state) {
    if (props.percent !== state.percent) {
      console.log(props,state)
      const { percent, size, lineWidth } = props
      const query = createCanvasContext('arc_progress_bar')
      query.clearRect(0, 0, size, size)
      query.setLineWidth(lineWidth)
      query.setStrokeStyle('#999999')
      query.setLineCap('round')
      query.beginPath()
      query.arc(size / 2, size / 2, (size - lineWidth) / 2, 1.5 * Math.PI, percent / 100 * 2 * Math.PI + 1.5 * Math.PI, false)
      query.stroke()
      query.draw()
    }
    return null
  }

  private setArcProgressBack () {
    const { boxSize, lineWidth, lineBack } = this.props
    const query = createCanvasContext('arc_progress_back')
    query.setLineWidth(lineWidth)
    query.setStrokeStyle(lineBack)
    query.setLineCap('round')
    query.beginPath()
    query.arc(boxSize / 2, boxSize / 2, (boxSize - lineWidth) / 2, 1.5 * Math.PI,  3.5 * Math.PI, false)
    query.stroke()
    query.draw()
  }

  render (): ReactNode {
    const { textValue, textColor, textSize, boxSize }: PageProps = this.props
    return (
      <View className={less.block_index_container}>
        <View
          className={less.inline_text}
          style={{
            color: textColor,
            fontSize: `${textSize}rpx`
          }}
        >{textValue}</View>
        <Canvas
          className={less.inline_canvas}
          style={{
            width: boxSize,
            height: boxSize
          }}
          canvasId="arc_progress_bar"
        />
        <Canvas
          className={less.inline_canvas_back}
          style={{
            width: boxSize,
            height: boxSize
          }}
          canvasId="arc_progress_back"
        />
      </View>
    )
  }

}

const mapStateToProps = (state) => ({
  global: state.global
})

export default connect(mapStateToProps)(UsArcProgressBar);
