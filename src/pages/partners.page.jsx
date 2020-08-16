import React, { useEffect, useRef } from 'react'
import OrgChart from '@balkangraph/orgchart.js'

// Import hooks
import { useFetch } from '../hooks/useAxios'

const Chart = (props) => {
  const _chart = useRef(null)
  useEffect(() => {
    if (_chart.current !== null) {
      new OrgChart(
        _chart.current,
        {
          template: 'olivia',
          nodes: props.nodes,
          nodeBinding: {
            field_0: 'name',
            field_1: 'title'
          }
        })
    }
  }, [props.nodes])

  return (
    <div id='tree' ref={_chart} />
  )
}

const PartnersPage = () => {
  const [{ isFetching, data, error }] = useFetch({ method: 'GET', url: `/matrix/tree/${1}` })
  useEffect(() => {
    console.log(isFetching, data, error)
  }, [isFetching, data, error])

  return (
    <div>
      <Chart
        nodes={[{id: 1, name: "Name1" , title: "Tytle1" },
          {id: 2, pid: 1, name: "Name2" , title: "Tytle2" },
          {id: 3, pid: 1, name: "Name3" , title: "Tytle3" }]}
      />
    </div>
  )
}

export default PartnersPage
