import './cart-dropdown.style.scss';
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';

import CustomExitButton from '../exit-button/exit-button.component';

import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selector';
import { cartToggle } from '../../redux/cart/cartSlice';
import { menuToggle } from '../../redux/toggle-menu/toggleMenuSlice';
import { createStructuredSelector } from 'reselect';

import { useNavigate } from 'react-router-dom';


const CartDropdown = () => {
   //
   const structuredSelector = createStructuredSelector({
      cartItems: selectCartItems,
   })
   const {cartItems} = useSelector(structuredSelector);

   //
   const navigate = useNavigate();
   const dispatch = useDispatch();

   //
   const handleCheckout = () => {
      dispatch(cartToggle());
      dispatch(menuToggle());
      navigate('checkout');
   }

   // 
   const handleExitCart = () => {
      dispatch(cartToggle());
   }

   
   return (
      <div className='cart-dropdown'>
      <CustomExitButton HandleCartToggle={handleExitCart} />

         <div className='cart-items'>
            {
               cartItems.length 
               ? (
                  cartItems.map(cartItem => (
                     <CartItem key={cartItem.id} item={cartItem}/>
                  ))
               ) : (
               <span className='empty-message'>Your cart is empty</span>
            )}
         </div>
         <CustomButton onClick={handleCheckout} >GO TO CHECKOUT</CustomButton>
      </div>
   )
}


export default CartDropdown;