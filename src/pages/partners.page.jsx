import React from 'react'
import { useParams } from 'react-router-dom'

// Import components
import Chart from '../components/chart.component'
import Particle from '../components/particle.component'

// Import hooks
import { useFetch } from '../hooks/useAxios'
import { useAuth } from '../hooks/useAuth'

const PartnersPage = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const [{ isFetching, data, error }] = useFetch({ method: 'GET', url: `/matrix/tree/${id}` })
  if (isFetching) return <div>Fetching...</div>
  if (error) return null

  const loadNodes = () => {
    let counter = 1
    const nodes = [{ id: counter, wallet: user?.account, userId: id }]
    data.treeView.level1.map(level => {
      ++counter
      nodes.push({ id: counter, pid: 1, wallet: level.sponsors.referers.referer.wallet, userId: level.sponsors.referers.referer.id })
    })

    data.treeView.level2.slice(0,2).map((level) => {
      ++counter
      nodes.push({ id: counter, pid: 2, wallet: level.sponsors.referers.referer.wallet, userId: level.sponsors.referers.referer.id })
    })
    data.treeView.level2.slice(2,4).map((level) => {
      ++counter
      nodes.push({ id: counter, pid: 3, wallet: level.sponsors.referers.referer.wallet, userId: level.sponsors.referers.referer.id })
    })

    data.treeView.level3.slice(0,2).map((level) => {
      ++counter
      nodes.push({ id: counter, pid: 4, wallet: level.sponsors.referers.referer.wallet, userId: level.sponsors.referers.referer.id })
    })
    data.treeView.level3.slice(2,4).map((level) => {
      ++counter
      nodes.push({ id: counter, pid: 5, wallet: level.sponsors.referers.referer.wallet, userId: level.sponsors.referers.referer.id })
    })
    data.treeView.level3.slice(4,6).map((level) => {
      ++counter
      nodes.push({ id: counter, pid: 6, wallet: level.sponsors.referers.referer.wallet, userId: level.sponsors.referers.referer.id })
    })
    data.treeView.level3.slice(6,8).map((level) => {
      ++counter
      nodes.push({ id: counter, pid: 7, wallet: level.sponsors.referers.referer.wallet, userId: level.sponsors.referers.referer.id })
    })
    return nodes
  }

  return (
    <div>
      {data?.status === 400 || data?.treeView.level1.length === 0 ? (
        <p>No data partners</p>
      ) : (
        <Chart nodes={loadNodes()} />
      )}
      <Particle
        params={{
          "particles": {
            "number": {
              "value": 160,
              "density": {
                "enable": false
              }
            },
            "size": {
              "value": 3,
              "random": true,
              "anim": {
                "speed": 4,
                "size_min": 0.3
              }
            },
            "line_linked": {
              "enable": false
            },
            "move": {
              "random": true,
              "speed": 1,
              "direction": "top",
              "out_mode": "out"
            }
          },
          "interactivity": {
            "events": {
              "onhover": {
                "enable": true,
                "mode": "bubble"
              },
              "onclick": {
                "enable": true,
                "mode": "repulse"
              }
            },
            "modes": {
              "bubble": {
                "distance": 250,
                "duration": 2,
                "size": 0,
                "opacity": 0
              },
              "repulse": {
                "distance": 400,
                "duration": 4
              }
            }
          }
        }}
      />
    </div>
  )
}

export default PartnersPage
