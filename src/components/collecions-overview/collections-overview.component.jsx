import './collections-overview.style.scss';

import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionsForPreview } from '../../redux/shop/shop.selector';

import CollectionPreview from '../collection-preview/collection-preview.component';


const CollectionsOverview = () => {
   const structuredSelector = createStructuredSelector({
      collections: selectCollectionsForPreview
   })
   const {collections} = useSelector(structuredSelector);


   return (
      <div className='collections-overview'>
         {
            collections.map(({id, ...otherCollectionProps}) => (
               <CollectionPreview key={id} {...otherCollectionProps} />
            ))
         }
      </div>
   )
}

export default CollectionsOverview;