import React from 'react';
import { Pane, Radio } from 'evergreen-ui';


const PaymentMethod = _ => { 

  const setMethod = (id) => {
    return id;
  }


  return (
    <div className="payment-method">
      
      <h1 className="title is-4">Choose Your Payment Method</h1>
      <Pane 
        onChange={(e) => setMethod(e.target.value)} 
        aria-label="payment method" 
        role="group">
        
        <Radio size={16} name="payment" value="pay_now"  label="Pay Now" />
        <Radio size={16} name="payment" value="book_now" label="Book Now (Pay Later)" />
      </Pane>


    </div>
  )
}

export default PaymentMethod;