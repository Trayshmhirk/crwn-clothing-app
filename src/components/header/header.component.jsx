import './header.style.scss'
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import MobileMenu from '../mobile-menu/mobile-menu.component';

import Logo from '../../assets/crown.svg';
import hamburger from '../../assets/icon-hamburger.svg'

import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { auth } from '../../firebase/firebase.utils';
import { signOut } from 'firebase/auth';

import { useSelector, useDispatch } from 'react-redux';
import { selectHidden } from '../../redux/cart/cart.selector';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { menuToggle } from '../../redux/toggle-menu/toggleMenuSlice';
import { selectMobileMenuToggle } from '../../redux/toggle-menu/toggle-menu.selector';
import { createStructuredSelector } from 'reselect';



const Header = () => {
   // 
   const structuredSelector = createStructuredSelector({
      hidden: selectHidden,
      currentUser: selectCurrentUser,
      mobileMenuOpen: selectMobileMenuToggle
   })
   const {hidden, currentUser, mobileMenuOpen} = useSelector(structuredSelector);

   //
   const dispatch = useDispatch();

   const handleMobileMenuOpen = () => {
      dispatch(menuToggle());
   }

   // 
   const useWindowWidth = () => {
      const [windowWidth, setWindowWidth] = useState(window.innerWidth);

      //
      useEffect(() => {
         const handleResize = () => {
            setWindowWidth(window.innerWidth);
         }

         window.onresize = handleResize;
         
         return () => {
            window.onresize = null;
         }
      }, [])
      
      return windowWidth;
   }
   const windowWidth = useWindowWidth();

   

   return (
      <div className='header'>
         <Link to={'/'} className='logo-container'>
            <img className='logo' src={Logo} alt='logo'/>
         </Link>

         {
            windowWidth <= 600 ? (
               <div>
                  <div className='options'>
                     <div className='hamburger-bttn' onClick={handleMobileMenuOpen}>
                        <img className='hamburger-img' src={hamburger} alt='hamburger-icon'/>
                     </div>
                  </div>

                  {
                     mobileMenuOpen && (
                        <MobileMenu />
                     )
                  }

               </div>
            ) : (
               <div>
                  <div className='options'>
                     <Link to={'shop'} className='option'>SHOP</Link>
                     <Link to={'shop'} className='option'>CONTACT</Link>
                     {
                        currentUser ? 
                        <div 
                           className='option'
                           onClick={() => {
                              signOut(auth)
                           }}
                        >
                           SIGN OUT
                        </div>
                        
                        : <Link className='option' to={'sign-up'}>SIGN IN</Link>
                     }
                     <CartIcon/>
                  </div>
                  {
                     hidden ? null : <CartDropdown />
                  }
               </div>
            )
         }
      </div>
   )
}

export default Header