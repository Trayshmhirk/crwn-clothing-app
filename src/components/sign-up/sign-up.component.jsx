import './sign-up.style.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
// import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import { Link } from 'react-router-dom';


const SignUp = ({toggle}) => {
   const [userData, setUserData] = useState({
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
   })

   const handleSubmit = async (e) => {
      e.preventDefault();

      const {displayName, email, password, confirmPassword} = userData;

      if (password !== confirmPassword) {
         alert("passwords don't match");
         return;
      }

      try {
         const {user} = await createUserWithEmailAndPassword(auth, email, password)

         await updateProfile(user, {displayName})

         await createUserProfileDocument(user, {displayName});
         setUserData({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
         })

      } catch (error) {
         console.log(error);
      }
   }

   const handleChangeDisplayName = (e) => {
      const {value} = e.target;
      setUserData({...userData, displayName: value})
   }
   const handleChangeEmail = (e) => {
      const {value} = e.target;
      setUserData({...userData, email: value})
   }
   const handleChangePassword = (e) => {
      const {value} = e.target;
      setUserData({...userData, password: value})
   }
   const handleChangeConfirmPassword = (e) => {
      const {value} = e.target;
      setUserData({...userData, confirmPassword: value})
   }


   const {displayName, email, password, confirmPassword} = userData;

   return(
      <div className='sign-up'>
         <h2>I do not have an account</h2>
         <span>Sign up with your email and password</span>
         <span>
            {`Already have an account?`}
            <Link className='signin-link' to={'#'} onClick={toggle} >Sign in</Link>
         </span>
         <form className='sign-up-form' onSubmit={handleSubmit}>
            <FormInput 
               type='text' 
               name='displayName'
               value={displayName}
               onChange={handleChangeDisplayName}
               label='Display Name'
               required 
            />
            <FormInput 
               type='email' 
               name='email'
               value={email}
               onChange={handleChangeEmail}
               label='Email'
               required 
            />
            <FormInput 
               type='password' 
               name='password'
               value={password}
               onChange={handleChangePassword}
               label='Password'
               required 
            />
            <FormInput 
               type='password' 
               name='confirmPassword'
               value={confirmPassword}
               onChange={handleChangeConfirmPassword}
               label='Confirm Password'
               required 
            />

            <CustomButton type='submit'>SIGN UP</CustomButton>
         </form>
      </div>
   )
}


export default SignUp