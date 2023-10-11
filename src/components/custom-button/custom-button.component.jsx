import './custom-button.style.scss'

const CustomButton = ({children, isGoogleSignIn, inverted, isStripeButton, ...buttonProps}) => {
   return(
      <button 
         className={`${inverted ? 'inverted' : ''} ${isGoogleSignIn ? 'google-sign-in' : ''} ${isStripeButton ? 'stripe-button' : ''} custom-button`} 
         {...buttonProps} 
      >
         {children}
      </button>
   )
}

export default CustomButton