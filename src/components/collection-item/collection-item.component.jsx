import './collection-item.style.scss'
import CustomButton from '../custom-button/custom-button.component';
import { useDispatch } from 'react-redux';
import { addCartItem } from '../../redux/cart/cartSlice';

const CollectionItem = ({ item }) => {

   const dispatch = useDispatch();
   
   const handleClick = () => {
      dispatch(addCartItem(item));
   }

   const {name, price, imageUrl} = item;

   return (
      <div className='collection-item'>
         <div 
            className='image'
            style={{
               backgroundImage: `url(${imageUrl})`
            }}
         />
         <div className='collection-footer'>
            <span className='name'>{name}</span>
            <span className='price'>${price}</span>
         </div>
         <CustomButton onClick={handleClick} inverted>ADD TO CART</CustomButton>
      </div>
   )
}

export default CollectionItem