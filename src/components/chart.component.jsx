import React, { useEffect, useRef } from 'react'
import OrgChart from '@balkangraph/orgchart.js'

const Chart = (props) => {
  const _chart = useRef(null)
  useEffect(() => {
    if (_chart.current !== null) {
      new OrgChart(
        _chart.current,
        {
          // template: 'olivia',
          template: 'polina',
          enableSearch: false,
          // nodeMouseClick: OrgChart.action.none,
          nodes: props.nodes,
          nodeBinding: {
            field_0:  "userId",
            field_1: "wallet",
          },
          tags: {
            "subLevels0": {
              subLevels: 0
            },
            "subLevels1": {
              subLevels: 1
            },
            "subLevels2": {
              subLevels: 2
            },
            "subLevels3": {
              subLevels: 3
            },
          },
        })
    }
  }, [props.nodes])

  return (
    <div id='tree' ref={_chart} />
  )
}

export default Chart
