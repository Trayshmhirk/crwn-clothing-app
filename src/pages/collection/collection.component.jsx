import './collection.style.scss'
import CollectionItem from '../../components/collection-item/collection-item.component';

import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useParams } from 'react-router-dom';

import { selectCollection } from '../../redux/shop/shop.selector';


const CollectionPage = () => {

   const {category} = useParams();

   // 
   const structuredSelector = createStructuredSelector({
      collections: selectCollection(category)
   });
   const { collections } = useSelector(structuredSelector);

   const { items, title } = collections

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