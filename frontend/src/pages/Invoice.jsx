import { useState, useEffect } from 'react'
import '../styles/HeaderStyle.scss'
import { getInvoice } from '../services/Api'
import { useAuth } from '../contexts/AuthContext'
import InvoicesList from '../components/InvoicesList'
import InvoicesListFalse from '../components/InvoicesListFalse'

function Invoice () {
  const [invoices, setInvoices] = useState()
  const { state: { user } } = useAuth()

  useEffect(() => {
    const getData = async () => {
      const result = await getInvoice(user._id)
      setInvoices(result)
    }
    getData()
  }, [])

  if (!invoices) {
    return (
      <>
        <div className='header'>
          <h1>Facture</h1>
          <InvoicesListFalse />
        </div>
      </>
    )
  }
  return (
    <>
      <div className='header'>
        <h1>Facture</h1>
        <InvoicesList invoices={invoices} />
      </div>

    </>
  )
}

export default Invoice
