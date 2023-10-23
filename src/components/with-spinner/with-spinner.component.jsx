
import './with-spinner.style.scss';


const WithSpinner = WrappedComponent => { 
   const Spinner = ({isLoading, ...otherProps}) => {
      return isLoading ? (
         <div className='spinner-overlay'>
            <div className='spinner-container' />
         </div>
      ) : (
         <WrappedComponent {...otherProps} />
      )
   }

   return Spinner;
}


export default WithSpinner;