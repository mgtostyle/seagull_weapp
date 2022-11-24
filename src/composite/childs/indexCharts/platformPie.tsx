import { Component, PropsWithChildren } from "react"
import type { PlatformPieProps, StatisticsItem } from './interface'
import less from './index.module.less'
import { View } from "@tarojs/components"
import { EChart } from "echarts-taro3-react"

class PlatformPie extends Component<PropsWithChildren<PlatformPieProps>> {

  static defaultProps: PlatformPieProps = {
    statistics: []
  }

  componentDidMount() {
    const defautOption = {
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '66%',
          center: ['50%', '50%'],
          data: this.props.statistics.map((item: StatisticsItem) => {
            return {
              value: Number(item.user_count),
              name: `${item.title}（ 拥有 ${item.user_count} 员 ）`
            }
          }),
          roseType: 'radius',
          label: {
            fontSize: 12,
            color: this.$commonLess.usLabelColor
          },
          labelLine: {
            lineStyle: {
              color: this.$commonLess.usSplitColor
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          },
          itemStyle: {
            color: this.$commonLess.usTextColor,
            shadowBlur: 200,
            shadowColor: '#ffffff'
          },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: () => Math.random() * 200
        }
      ]
    };
    this.barChart.refresh(defautOption);
  }

  barChart: any;

  refBarChart = (node) => this.barChart = node;

  render() {
    return (
      <View className={less.platform_pie_container}>
        <EChart ref={this.refBarChart} canvasId='bar-canvas' />
      </View>
    );
  }
}

export default PlatformPie;