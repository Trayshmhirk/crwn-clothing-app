import './checkout.style.scss';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import { useNavigate } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';
import { selectCartItems } from '../../redux/cart/cart.selector';
import { useSelector } from 'react-redux';
import { selectCartTotal } from '../../redux/cart/cart.selector';


const CheckoutPage = () => {
   // selecting the cart functions to be used from selector where they have been initialized
   const structuredSelector = createStructuredSelector({
      cartItems: selectCartItems,
      cartTotal: selectCartTotal
   })
   const {cartItems, cartTotal} = useSelector(structuredSelector);

   // navigate to the stripe payment form page
   const navigate = useNavigate();
   const handleCheckout = () => {
      navigate('/pay-with-stripe');
   }


   return (
      <div className='checkout-page'>
         <div className='checkout-header'>
            <div className='header-block'>
               <span>Product</span>
            </div>
            <div className='header-block'>
               <span>Description</span>
            </div>
            <div className='header-block'>
               <span>Quantity</span>
            </div>
            <div className='header-block'>
               <span>Price</span>
            </div>
            <div className='header-block'>
               <span>Remove</span>
            </div>
         </div>
         {
            cartItems.map(cartItem => (
               <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
            ))
         }

         <div className='total'>
            <span>TOTAL: ${cartTotal}</span>
            <CustomButton isStripeButton onClick={handleCheckout} >PAY WITH STRIPE</CustomButton>
         </div>

         <div className='test-warning'>
            <p>** Please use the following test credit card for payments **</p>
            <p>CARD: 4242 4242 4242 4242 - EXP: 01/24 - CVC: 123</p>
         </div>
      </div>
   )
}


export default CheckoutPage;