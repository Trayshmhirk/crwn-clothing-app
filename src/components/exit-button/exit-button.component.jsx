import './exit-button.style.scss';


const CustomExitButton = ({toggleMobileMenu, HandleCartToggle}) => {
   return(
      <button 
         className="exit-button" 
         onClick={
            toggleMobileMenu ? toggleMobileMenu : null || 
            HandleCartToggle ? HandleCartToggle : null
         }
      >
         ✕
      </button>
   )
}

export default CustomExitButton;