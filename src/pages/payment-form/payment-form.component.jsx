import './payment-form.style.scss'
import CheckoutForm from '../../components/stripe-checkout-button/stripe-form.component';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { selectCartTotal } from '../../redux/cart/cart.selector';



const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_STRIPE_API_KEY)



const PayWithStripePage = () => {

   const structuredSelector = createStructuredSelector({
      cartTotal: selectCartTotal
   })
   const { cartTotal} = useSelector(structuredSelector);

   const [clientSecret, setClientSecret] = useState('');


   useEffect(() => {
      // create paymentIntent as soon as page loads
      fetch(`http://localhost:3001/create-payment-intent?payment_intent_client_secret=${clientSecret}`, {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({cartTotal: cartTotal})
      })
      .then((res) => {
         return res.json()
      })
      .then((data) => setClientSecret(data.clientSecret))
      .catch(error => console.error('Error fetching payment intent:', error))
   },[cartTotal])

   const appearance = {
      theme: 'stripe',
   }

   const options = {
      clientSecret,
      appearance,
   }


   return (
      <div className='payment-form'>
         {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
               <CheckoutForm clientSecret={clientSecret}/>
            </Elements>
         )}
      </div>
   )
}

export default PayWithStripePage;