import './mobile-menu.style.scss';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import CartIcon from '../cart-icon/cart-icon.component';
import CustomExitButton from '../exit-button/exit-button.component';


import { Link } from 'react-router-dom';

import { auth } from '../../firebase/firebase.utils';
import { signOut } from 'firebase/auth';

import { useSelector, useDispatch } from 'react-redux';
import { selectHidden } from '../../redux/cart/cart.selector';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { menuToggle } from '../../redux/toggle-menu/toggleMenuSlice';
import { createStructuredSelector } from 'reselect';



const MobileMenu = () => {
   const structuredSelector = createStructuredSelector({
      hidden: selectHidden,
      currentUser: selectCurrentUser,

   })
   const {hidden, currentUser} = useSelector(structuredSelector);

   const dispatch = useDispatch();
   // toggle the mobile menu
   const handleMobileMenuOpen = () => {
      dispatch(menuToggle());
   }

   
   return(
      <div className="mobile-menu">
         <CustomExitButton toggleMobileMenu={handleMobileMenuOpen} />
         <div className='nav-menu'>
            <Link to={'shop'} onClick={handleMobileMenuOpen}>SHOP</Link>
            <Link to={'shop'} onClick={handleMobileMenuOpen}>CONTACT</Link>
            {
               currentUser ?
               <div 
                  // className='option'
                  onClick={() => {
                     signOut(auth);
                     handleMobileMenuOpen();
                  }}
               >
                  SIGN OUT
               </div>
               
               : <Link to={'sign-up'} onClick={handleMobileMenuOpen}>SIGN IN</Link>
            }
            <CartIcon/>
         </div>
         {
            hidden ? null : <CartDropdown />
         }
      </div>
   )
}

export default MobileMenu;