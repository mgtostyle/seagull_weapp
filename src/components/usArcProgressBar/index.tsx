import { Component, PropsWithChildren, ReactNode } from 'react'
import type { PageProps } from './interface'
import less from './index.module.less'
import { createCanvasContext } from '@tarojs/taro'
import { View, Canvas } from '@tarojs/components'

export default class UsArcProgressBar extends Component<PropsWithChildren<PageProps>> {

  static defaultProps: PageProps = {
    text: '',
    color: less.usThemeColor,
    size: 100,
    percent: 80,
    lineWidth: 5,
    lineColor: '#cccccc'
  }

  componentDidMount () {
    const { percent, lineWidth, lineColor } = this.props
    this.getCanvas(percent, lineWidth, lineColor)
  }

  private getCanvas (percent, width, color) {
    const { size } = this.props
    const query = createCanvasContext('arc_progress_bar')
    query.setFillStyle('#cdcdcd')
    query.clearRect(0, 0, size, size)
    query.draw()
    query.setLineWidth(width)
    query.setStrokeStyle(color)
    query.setLineCap('round')
    query.beginPath()
    query.arc(size / 2, size / 2, (size - width) / 2, 1.5 * Math.PI, percent / 100 * 2 * Math.PI + 1.5 * Math.PI, false)
    query.stroke()
    query.draw()
  }

  render (): ReactNode {
    const { text, color, size }: PageProps = this.props
    return (
      <View className={less.block_index_container}>
        <View
          className={less.inline_text}
          style={{
            color
          }}
        >{text}</View>
        <Canvas
          className={less.inline_canvas}
          style={{
            width: size,
            height: size
          }}
          canvasId="arc_progress_bar"
        />
      </View>
    )
  }

}