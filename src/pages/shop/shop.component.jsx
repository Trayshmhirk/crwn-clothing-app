import CollectionOverviewContainer from "../../components/collecions-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collection.container";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCollections } from "../../redux/shop/shopSlice";

import { Route, Routes } from "react-router-dom";


const ShopPage = () =>  {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchCollections())
   }, [dispatch])
   

   return (
      <div className="shop-page">
         <Routes>
            <Route path="/" element={<CollectionOverviewContainer />} />
            <Route path=":category" element={<CollectionPageContainer />} />
         </Routes>
      </div>
   )
}

export default ShopPage