import './sign-in-sign-up-page.style.scss'
import SignIn from '../../components/sign-in/sign-in.component'
import SignUp from '../../components/sign-up/sign-up.component'
import { useState } from 'react';

const SignInAndSignUpPage = () => {
   // toggle between sign in and sign up form
   const [showSignUp, setShowSignUp] = useState(true);
   const toggleForm = () => {
      setShowSignUp(!showSignUp);
   }

   return (
      <div className='sign-in-and-sign-up'>
      {
         showSignUp? <SignUp toggle={toggleForm}/> :<SignIn toggle={toggleForm}/>
      }
      </div>
   )
}

export default SignInAndSignUpPage