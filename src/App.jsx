import './App.css';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';


import HomePage  from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-sign-up-page/sign-in-sign-up-page.component';
import CheckoutPage from './pages/checkout/checkout.component'; 
import CollectionPage from './pages/collection/collection.component';
import PayWithStripePage from './pages/payment-form/payment-form.component';
import PaymentSuccessPage from './pages/payment-success/payment-success.component';

import Header from './components/header/header.component';

import { onAuthStateChanged } from 'firebase/auth';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { useEffect } from 'react';
import { onSnapshot } from 'firebase/firestore';

import { useDispatch, useSelector } from 'react-redux';
import { setUser, removeUser } from './redux/user/userSlice';
import { selectCurrentUser } from './redux/user/user.selector';
import { createStructuredSelector } from 'reselect';



function App() {
   const dispatch = useDispatch();
   const location = useLocation();

   // 
   const structuredSelector = createStructuredSelector({
      currentUser: selectCurrentUser
   })
   const {currentUser} = useSelector(structuredSelector);
   
   // Conditionally render the Header based on the route pathname
   const shouldRenderHeader = !['/pay-with-stripe', '/payment-success'].includes(location.pathname);

   
   useEffect(() => {
      const unsubscribeFromAuth = onAuthStateChanged(auth, async (userAuth) => {
         if (userAuth) {
            const userRef = await createUserProfileDocument(userAuth);

            onSnapshot(userRef, (doc) => {
               const data = doc.data();
               if (data && data.createdAt) {
                  data.createdAt = data.createdAt.toDate().toString();
               }

               dispatch(setUser({
                  currentUser: {
                     id: doc.id,
                     ...data,
                  }
               }))
            })
         } else {
            dispatch(removeUser());
         }
      });

      // return a cleanup function similar to componentWillUnmount()
      return unsubscribeFromAuth;
   }, [dispatch])


   return (
      <div>
         {shouldRenderHeader && <Header />} {/* Render Header if shouldRenderHeader is true */}
         <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='shop/*' element={<ShopPage/>}>
               <Route path=':category' element={<CollectionPage/>} />
            </Route>
            <Route 
               path='sign-up'
               element={
                  currentUser ?
                  <Navigate to={'/'} replace/> :
                  <SignInAndSignUpPage/>
               }
            />
            <Route path='checkout' element={<CheckoutPage/>} />
            <Route path='pay-with-stripe' element={<PayWithStripePage/>} />
            <Route path='payment-success' element={<PaymentSuccessPage/>} />
         </Routes>
      </div>
   )
}

export default App
