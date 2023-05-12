import * as React from 'react'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import '../styles/CustomerListItem.scss'
import moment from 'moment'
import 'moment/locale/fr'
import CustomerFormDelete from './CustomerFormDelete'

function createData (firstName, lastName, phone, email, customerType, address, createdAt, updatedAt, id) {
  return {
    firstName,
    lastName,
    phone,
    email,
    customerType,
    address,
    createdAt,
    updatedAt,
    id
  }
}

function Row (props) {
  const { row } = props
  const [open, setOpen] = React.useState(false)

  console.log(row)
  console.log('TEEEEEEEEEEEEEEEEEEEEEEE')
  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row' align='left'>
          {row.firstName + ' ' + row.lastName}
        </TableCell>
        <TableCell align='center'>{row.phone}</TableCell>
        <TableCell align='center'>{row.email}</TableCell>
        <TableCell align='center'>{row.customerType}</TableCell>
        {/* Composant pour supprimer le client */}
        <CustomerFormDelete customer={row} />
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Adresse
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>COORDONEES</TableCell>
                    <TableCell>CODE POSTAL</TableCell>
                    <TableCell>VILLE</TableCell>
                    <TableCell>PAYS</TableCell>
                    <TableCell align='right'>Créer le </TableCell>
                    <TableCell align='right'>Mise à jour le </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className='bg'>
                  <TableRow key={row.address.street}>
                    <TableCell component='th' scope='row'>
                      {row.address.street.toLowerCase()}
                    </TableCell>
                    <TableCell>{row.address.postalCode}</TableCell>
                    <TableCell>{row.address.city.charAt(0).toUpperCase() + row.address.city.slice(1).toLowerCase()}</TableCell>
                    <TableCell>{row.address.country.charAt(0).toUpperCase() + row.address.country.slice(1).toLowerCase()}</TableCell>
                    <TableCell align='right'>{moment(row.createdAt).locale('fr').format('DD/MM/YYYY HH:mm:ss')}</TableCell>
                    <TableCell align='right'>{moment(row.updatedAt).locale('fr').format('DD/MM/YYYY HH:mm:ss')}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

function CustomerListItem ({ customers }) {
  console.log(customers)
  const rows = customers.map((customer) => {
    const customerTypeString = customer.customerType === 0 ? 'Particulier' : 'Professionnel'
    return createData(
      customer.firstName,
      customer.lastName,
      customer.phone,
      customer.email,
      customerTypeString,
      customer.address,
      customer.createdAt,
      customer.updatedAt,
      customer._id)
  })

  return (
    <TableBody>
      {rows.map((row) => (
        <Row key={row.name} row={row} />
      ))}
    </TableBody>
  )
}

export default CustomerListItem
