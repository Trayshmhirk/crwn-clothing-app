import './stripe-form.style.scss'

import { useEffect, useState } from "react";

import {
   PaymentElement,
   LinkAuthenticationElement,
   useStripe,
   useElements
} from "@stripe/react-stripe-js";

import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { selectCartTotal } from '../../redux/cart/cart.selector';


export default function CheckoutForm() {
   const stripe = useStripe();
   const elements = useElements();

   const [, setEmail] = useState('');
   const [message, setMessage] = useState(null);
   const [isLoading, setIsLoading] = useState(false);

   const structuredSelector = createStructuredSelector({
      cartTotal: selectCartTotal
   })
   const { cartTotal} = useSelector(structuredSelector);


   useEffect (() => {
      if (!stripe) {
         return;
      }
   
      const clientSecret = new URLSearchParams(window.location.search).get(
         "payment_intent_client_secret"
      );
   
      if (!clientSecret) {
         return;
      }
   
      stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent}) => {
         switch (paymentIntent.status) {
            case 'succeeded':
               setMessage('Payment Succeeded!');
               break;
            case 'processing':
               setMessage('Your payment is processing.')
               break;
            case 'requires_payment_method':
               setMessage('Your payment was not successful, please try again.');
               break;         
            default:
               setMessage('Something went wrong.')
               break;
         }
      })

   }, [stripe])

   // 
   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!stripe || !elements) {
         // disable form form submitting until stripe.js has loaded
         return;
      }

      // when stripe.js is loading, set isLoading to be true
      setIsLoading(true);

      //
      const {error} = await stripe.confirmPayment({
         elements,
         confirmParams: {
            return_url: `${window.location.origin}/payment-success`
         }
      })

      // manage errors
      if (error.type === 'card_error' || error.type === 'validation_error') {
         setMessage(error.message)
      } else {
         setMessage('An unexpected error occurred')
      }

      setIsLoading(false);
   };

   const PaymentElementOptions = {
      layout: 'tabs',
   }

   return (
      <form id="payment-form" onSubmit={handleSubmit}>
         <LinkAuthenticationElement 
            id="link-authentication-element"
            onChange={e => setEmail(e.target.value)}
         />
         <PaymentElement id="payment-element" options={PaymentElementOptions} />
         <button disabled={isLoading || !stripe || !elements} id="submit">
            <span id="button-text">
               {isLoading ? <div className="spinner" id="spinner"></div> : `PAY $${cartTotal}`}
            </span>
         </button>
         {message && <div id="payment-message">{message}</div>}
      </form>
   )
}
