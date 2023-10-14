import './sign-in.style.scss'
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { useState } from 'react'

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { Link } from 'react-router-dom';


const SignIn = ({toggle}) => {
   const [signInData, setSignInData] = useState({
      email: '',
      password: '',
   })

   // handle the email and password, passing the input email and password to firebase
   const handleSubmit = async (e) => {
      e.preventDefault();
      const {email, password} = signInData;

      try {
         await signInWithEmailAndPassword(auth, email, password);
         setSignInData({
            email: '',
            password: '',
         })

      } catch (error) {
         console.log(error.message);
      }
   }

   const handleEmailChange = (e) => {
      const {value} = e.target;
      setSignInData({...signInData, email: value})
   }
   const handlePasswordChange = (e) => {
      const {value} = e.target;

      setSignInData({...signInData, password: value})
   }


   const {email, password} = signInData;

   return (
      <div className='sign-in'>
         <h2>I already have an account</h2>
         <span>Sign in with your email and password</span>
         <span>
            {`Don't have an account?`} 
            <Link className='signup-link' to={'#'} onClick={toggle}>Sign up</Link>
         </span>
         <form onSubmit={handleSubmit}>
            <FormInput 
               type='email' 
               value={email}
               onChange={handleEmailChange}
               label='Email'
               required 
            />
            <FormInput 
               type='password' 
               value={password}
               onChange={handlePasswordChange}
               label='Password'
               required 
            />

            <div className='buttons'>
               <CustomButton type='submit'>Sign in</CustomButton>
               <CustomButton onClick={signInWithGoogle} isGoogleSignIn >
                  <img width="35" height="35" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo"/>
                  <span>Sign in with Google</span>
               </CustomButton>
            </div>
         </form>
      </div>
   )
}

export default SignIn