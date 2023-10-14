import './payment-success.style.scss';
import paymentIcon from '../../assets/paid_4272841.png'
import CustomButton from '../../components/custom-button/custom-button.component';

import { createStructuredSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartTotal } from '../../redux/cart/cart.selector';
import { menuToggle } from '../../redux/toggle-menu/toggleMenuSlice';

import { useNavigate } from 'react-router-dom';


const PaymentSuccessPage = () => {
   const structuredSelector = createStructuredSelector({
      cartTotal: selectCartTotal
   })
   const { cartTotal } = useSelector(structuredSelector);

   // navigate to home page and toggle the mobile menu to false
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const handleSubmit = () => {
      if (!menuToggle) {
         dispatch(menuToggle());
      }
      navigate('/');
   }

   return (
      <div className="payment-success">
         <div className='payment-card'>
            <div className='flex'>
               <img
                  className='payment-img'
                  src={paymentIcon} 
                  alt="payment successful"  
               />
               <h1 className='title'>Payment Successful!</h1>
               <p>Thank you for your order.</p>
               <p>Your payment of <b>${cartTotal}</b> has been successfully received!</p>
               <p>If you have any questions or need further assistance, please {"don't"} hesitate to <a href="/contact">CONTACT US</a>.</p>
            </div>
            <CustomButton onClick={handleSubmit}>Continue Shopping!</CustomButton>
         </div>
      </div>
   );
};
 
export default PaymentSuccessPage;