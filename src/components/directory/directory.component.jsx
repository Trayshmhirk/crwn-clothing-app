import './directory.style.scss'
import MenuItem from '../../components/menu-item/menu-item.component';

import { useSelector } from 'react-redux';
import { selectDirectoryItems } from '../../redux/directory/directory.selector';
import { createStructuredSelector } from 'reselect';



const Directory = () => {
   const structuredSelector = createStructuredSelector({
      section: selectDirectoryItems
   })
   const {section} = useSelector(structuredSelector); 
   
   return (
      <div className="directory-menu">
         {
            section.map(({id, ...otherSectionProps}) => (
               <MenuItem key={id} {...otherSectionProps}/>
            ))
         }
      </div>
   )
}


export default Directory