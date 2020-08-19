import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// Import components
import Chart from '../components/chart.component'

// Import hooks
import { useFetch } from '../hooks/useAxios'

const PartnersPage = () => {
  const { id } = useParams()
  const [{ isFetching, data, error }] = useFetch({ method: 'GET', url: `/matrix/tree/${id}` })
  if (isFetching) return <div>Fetching...</div>
  if (error) return null

  const loadNodes = () => {
    let counter = 1
    if (data?.status === 400) return []
    const nodes = [{ id: counter }]

    data.treeView.level1.map(level => {
      ++counter
      nodes.push({ id: counter, pid: 1, wallet: level.sponsors.referers.referer.wallet })
    })

    data.treeView.level2.slice(0,2).map((level, index) => {
      ++counter
      nodes.push({ id: counter, pid: 2, wallet: level.sponsors.referers.referer.wallet })
    })
    data.treeView.level2.slice(2,4).map((level, index) => {
      ++counter
      nodes.push({ id: counter, pid: 3, wallet: level.sponsors.referers.referer.wallet })
    })

    data.treeView.level3.slice(0,2).map((level, index) => {
      ++counter
      nodes.push({ id: counter, pid: 4, wallet: level.sponsors.referers.referer.wallet })
    })
    data.treeView.level3.slice(2,4).map((level, index) => {
      ++counter
      nodes.push({ id: counter, pid: 5, wallet: level.sponsors.referers.referer.wallet })
    })
    data.treeView.level3.slice(4,6).map((level, index) => {
      ++counter
      nodes.push({ id: counter, pid: 6, wallet: level.sponsors.referers.referer.wallet })
    })
    data.treeView.level3.slice(6,8).map((level, index) => {
      ++counter
      nodes.push({ id: counter, pid: 7, wallet: level.sponsors.referers.referer.wallet })
    })
    return nodes
  }

  return (
    <Chart
      nodes={loadNodes()}
    />
  )
}

export default PartnersPage
