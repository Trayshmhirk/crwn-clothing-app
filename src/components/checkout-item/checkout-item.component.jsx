import './checkout-item.style.scss';
import {  useDispatch } from 'react-redux';
import { clearItemFromCart } from '../../redux/cart/cartSlice';
import { addCartItem, removeCartItem } from '../../redux/cart/cartSlice';


const CheckoutItem = ({cartItem}) => {
   //
   const dispatch = useDispatch();
   //
   const clearCartItem = () => {
      dispatch(clearItemFromCart(cartItem))
   }

   const addItem = () => {
      dispatch(addCartItem(cartItem))
   }

   const removeItem = () => {
      dispatch(removeCartItem(cartItem))
   }

   const {name, imageUrl, price, quantity} = cartItem;

   return (
      <div className='checkout-item'>
         <div className='image-container'> 
            <img src={imageUrl} alt='item'/>
         </div>
         <span className='name'>{name}</span>
         <span className='quantity'>
            <div className='arrow' onClick={removeItem}>&#10094;</div>
            <span className='value'>{quantity}</span>
            <div className='arrow' onClick={addItem}>&#10095;</div>
         </span>
         <span className='price'>${price}</span>
         <div className='remove-button' onClick={clearCartItem}>&#10005;</div>
      </div>
   )
}

export default CheckoutItem