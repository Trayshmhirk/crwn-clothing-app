import CollectionsOverview from "../../components/collecions-overview/collections-overview.component";
import { Outlet } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

const ShopPage = () =>  {

   return (
      <div className="shop-page">
         <Routes>
            <Route path="/" element={<CollectionsOverview />} />
         </Routes>
         
         <Outlet/>
      </div>
   )
}

export default ShopPage