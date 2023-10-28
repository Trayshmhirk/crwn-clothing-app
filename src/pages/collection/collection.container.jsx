import WithSpinner from "../../components/with-spinner/with-spinner.component";
import CollectionPage from "./collection.component";

import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsCollectionsLoaded } from "../../redux/shop/shop.selector";

const CollectionsPageWithSpinner = WithSpinner(CollectionPage);


const CollectionPageContainer = () => {
   const structuredSelector = createStructuredSelector({
      isCollectionLoaded: selectIsCollectionsLoaded
   });
   const { isCollectionLoaded } = useSelector(structuredSelector);

   return (
      <CollectionsPageWithSpinner isLoading={!isCollectionLoaded} />
   )
}


export default CollectionPageContainer;
