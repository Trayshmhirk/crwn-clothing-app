import './collection.style.scss'
import CollectionItem from '../../components/collection-item/collection-item.component';

import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollection } from '../../redux/shop/shop.selector';

import { useParams } from 'react-router-dom';


const CollectionPage = () => {
   // getting the url parameter for the page to render the collections specific for the url parameter
   const {category} = useParams();

   const structuredSelector = createStructuredSelector({
      collections: selectCollection(category),
      
   });
   const { collections } = useSelector(structuredSelector);

   // deconstruct the props needed from the collections
   const { items, title } = collections;

   return(
      <div className='collection-page'>
         <h1 className='title'>{title}</h1>

         <div className='items'>
            {
               items.map((item) => (
                  <CollectionItem key={item.id} item={item} />
               ))
            }
         </div>
      </div>
   )
}

export default CollectionPage;