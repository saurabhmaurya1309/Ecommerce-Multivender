import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../../State/Store'
import { paymentSuccess } from '../../../State/customer/orderSlice'
const PaymentSucess = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const location=useLocation();
  const {orderId} = useParams();
  const Queryparma =()=>{
    const query = new URLSearchParams(location.search);
    return query.get("orderId");

  }

  useEffect(()=>{
   // dispatch(paymentSuccess({jwt: localStorage.getItem('jwt'),paymentId,paymentLinkId}))
    
  },[dispatch])

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"80vh"}}>
        <h1 style={{color:"green"}}>Payment Successfull</h1>
        <div style={{marginLeft:"20px"}}>
        <p>Your order has been placed successfully.</p>
        <p>Thank you for shopping with us!</p>
        </div>
        <div>
            <Button variant='contained' color='primary' onClick={()=>navigate('/')}>Continue Shopping</Button>
        </div>

      
    </div>
  )
}

export default PaymentSucess
