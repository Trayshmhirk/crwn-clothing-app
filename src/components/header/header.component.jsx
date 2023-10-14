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
   // enhancing the selection of states from the redux store
   const structuredSelector = createStructuredSelector({
      hidden: selectHidden,
      currentUser: selectCurrentUser,
      mobileMenuOpen: selectMobileMenuToggle
   })
   const {hidden, currentUser, mobileMenuOpen} = useSelector(structuredSelector);


   const dispatch = useDispatch();
   // toggle the mobile menu open or close
   const handleMobileMenuOpen = () => {
      dispatch(menuToggle());
   }

   // function to listen for a rezise on the width of the window, to set the windowWidth state as the window width chages in realtime
   // this is to make sure the hamburger menu is rendered at a max-wdith screen of 600px
   const useWindowWidth = () => {
      const [windowWidth, setWindowWidth] = useState(window.innerWidth);

      // handles the realtime change in the screen width and sets the state to the width
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
                     hidden && ( <CartDropdown />)
                  }
               </div>
            )
         }
      </div>
   )
}

export default Header