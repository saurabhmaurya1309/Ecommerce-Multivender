import { Button, Card, Divider } from '@mui/material'
import React from 'react'
import TransactionTable from './TransactionTable'
const Payment = () => {
  return (
    <div className='space-y-5'>
      <Card className='rounded-md space-y-4'>
        <h1 className='text-gray-600 font-medium'>Total Earning</h1>
        <h1 className='font-bold text-xl pb-1'>15000</h1>
        <Divider/>
        <p className='text-gray-600 font-medium pt-1'>Last Payment : <strong>₹0</strong></p>
      </Card>
      <div className='pt-10 space-y-3'>
        <Button variant='contained'>Transaction</Button>
        <TransactionTable/>
      </div>
      
    </div>
  )
}

export default Payment
