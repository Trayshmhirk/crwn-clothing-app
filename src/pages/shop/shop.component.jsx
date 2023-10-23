import CollectionsOverview from "../../components/collecions-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

import { convertCollectionsSnapshotToMap, firestore } from "../../firebase/firebase.utils";
import { collection, onSnapshot } from "firebase/firestore";

import { useEffect, useState } from "react";

import { Route, Routes } from "react-router-dom";

import { useDispatch } from "react-redux";
import { shopCollection } from "../../redux/shop/shopSlice";

// wrap the collections to be rendered with the spinner HOC, so that we can render the spinner while the data of the components are being fetched
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);


const ShopPage = () =>  {
   const [isLoading, setIsLoading] = useState(true)

   const dispatch = useDispatch();
   useEffect(() => {
      const collectionRef = collection(firestore, 'collections');

      setTimeout(() => {
         // retriving the shop data snapshot as an object
         onSnapshot(collectionRef, async (snapshot) => {
            const collectionFromFirestore = convertCollectionsSnapshotToMap(snapshot);
            dispatch(shopCollection(collectionFromFirestore));

            // set loading to false to render the shop items after the spinner has loaded
            setIsLoading(false)
         })
      }, 1000);
   

   }, [dispatch])
   

   return (
      <div className="shop-page">
         <Routes>
            <Route path="/" element={<CollectionsOverviewWithSpinner isLoading={isLoading} />} />
            <Route path=":category" element={<CollectionsPageWithSpinner isLoading={isLoading} />} />
         </Routes>
      </div>
   )
}

export default ShopPage