import WithSpinner from "../with-spinner/with-spinner.component"
import CollectionsOverview from "./collections-overview.component";

import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsCollectionFetching } from "../../redux/shop/shop.selector";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);


const CollectionOverviewContainer = () => {
   const structuredSelector = createStructuredSelector({
      isCollectionFetching: selectIsCollectionFetching
   });
   const { isCollectionFetching } = useSelector(structuredSelector);

   return (
      <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} />
   )
}


export default CollectionOverviewContainer
