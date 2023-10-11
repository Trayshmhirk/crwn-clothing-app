import './cart-icon.style.scss';
import cartImg from '../../assets/122 shopping-bag.svg';
import { useDispatch, useSelector } from 'react-redux';
import { cartToggle } from '../../redux/cart/cartSlice';
import { totalQuantity } from '../../redux/cart/cart.selector';
import { createStructuredSelector } from 'reselect';



const CartIcon = () => {
   const dispatch = useDispatch();

   const structuredSelector = createStructuredSelector({
      itemCount: totalQuantity
   })
   const { itemCount} = useSelector(structuredSelector);

   const handleClick = () => {
      dispatch(cartToggle())
   }

   return (
      <div className='cart-icon' onClick={handleClick} >
         <img src={cartImg} className='shopping-icon' alt='cart-icon'/>
         <span className='item-count'>{itemCount}</span>
      </div>
   )
}

export default CartIcon;