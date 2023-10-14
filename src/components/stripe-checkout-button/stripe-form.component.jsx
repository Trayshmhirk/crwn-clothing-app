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
   
      stripe.retrievePaymentIntent(clientSecret).then(handlePaymentIntent);

   }, [stripe])

   // handle the payment intent and redirect to payment success page
   const handlePaymentIntent = ({paymentIntent}) => {
      if (paymentIntent.status === 'succeeded') {
         redirectToPaymentSuccessPage();
      }
   }

   const redirectToPaymentSuccessPage = () => {
      // Redirect to the payment success page
      window.location.href = 'https://crwn-clothng-app.netlify.app/payment-success';
   }

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!stripe || !elements) {
         // disable form form submitting until stripe.js has loaded
         return;
      }

      // when stripe.js is loading, set isLoading to be true
      setIsLoading(true);

      const {error, paymentIntent} = await stripe.confirmPayment({
         elements,
         confirmParams: {
            return_url: `${window.location.origin}/payment-success`
         }
      })

      if (error) {
         handlePaymentError(error);
      } else if (paymentIntent.status === 'succeeded') {
         redirectToPaymentSuccessPage()
      }

      setIsLoading(false);
   };

   const handlePaymentError = (error) => {
      // manage errors
      if (error.type === 'card_error' || error.type === 'validation_error') {
         setMessage(error.message)
      } else {
         setMessage('An unexpected error occurred')
      }
   }

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

