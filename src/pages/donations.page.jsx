import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

// Import hooks
import { useFetch } from '../hooks/useAxios'

// Import components
import Loader from '../components/loader.component'
import Particle from '../components/particle.component'

const useStyles = makeStyles({
  table: {
    width: 800,
    backgroundColor: '#1A1C2D',
  },
  tableCell: {
    color: '#888ea8'
  },
  amount: {
    color: '#e0e6ed'
  }
})

const DonationsPage = () => {
  const classes = useStyles()
  const { id } = useParams()
  const [{ data, isFetching, error }] = useFetch({ method: 'GET', url: `/user/profits/getsenddata/${id}` })

  if (error) return null
  if (isFetching) return <Loader />
  return (
    <div className='l-profit'>
      <div>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell} align="center">ID</TableCell>
              <TableCell className={classes.tableCell} align="center">Hash</TableCell>
              <TableCell className={classes.tableCell} align="right">Amount</TableCell>
              <TableCell className={classes.tableCell} align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.getProfits.length !== 0 ? data?.getProfits.map(profit => (
              <TableRow key={profit.id}>
                <TableCell className={classes.tableCell}>{profit.sender}</TableCell>
                <TableCell align='center' className={classes.tableCell}>
                  <a className='wallet_link' target="_blank" href={`https://etherscan.io/address/${profit.hash}`}>{profit.hash}</a>
                </TableCell>
                <TableCell align='right' className={classes.tableCell}>+{profit.amount}</TableCell>
                <TableCell align='right' className={classes.tableCell}>{profit.date}</TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={4} className={classes.tableCell} align='center'>No hay data que mostrar</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
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

export default DonationsPage
