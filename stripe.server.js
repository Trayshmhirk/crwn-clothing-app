import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config()

const express = require('express');
const cors = require('cors');

const app = express();

// Your Stripe secret key
const stripe = require('stripe')(process.env.VITE_SECRET_STRIPE_API_KEY);
app.use(express.static('public'));
app.use(express.json());
app.use(cors());


app.post('/create-payment-intent', async (req, res) => {
   console.log("Received request:", req.body); // log the incoming request

   const { cartTotal } = req.body; //

   const totalInCents = cartTotal * 100;

   console.log(totalInCents);

   // Create a paymentIntent with the order amount and currency
   try {
      const paymentIntent = await stripe.paymentIntents.create({
         amount: totalInCents,
         currency: 'usd',
      });

      console.log('Created payment intent:', paymentIntent);
   
      // res.json({sessionId: session.id})
      res.send({
         clientSecret: paymentIntent.client_secret
      })
   } catch (error) {
      console.error('Error creating payment intent:', error); // log any errors
      res.status(500).send({error: 'Failed to create paymeny intent'})

   }
})

app.get('/payment-success', (req, res) => {
   // Redirect to the payment success page
   res.redirect('https://crwn-clothng-app.netlify.app/payment-success');
});

app.listen(3001, () => {
   console.log('Server is running on port 3001');
});
