import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();

  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) {
    return <Loader />;
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber)
  }

  return (
    <div className="flex flex-col md:flex-row">
      <section className="mr-[5rem]">
      <div
        className={`flex-1 p-4 cursor-pointer text-lg ${
          activeTab === 1 ? "font-bold" : ""
        }`}
        onClick={() => handleTabClick(1)}
        >
        Write Your Review
      </div>

      <div
        className={`flex-1 p-4 cursor-pointer text-lg ${
          activeTab === 2 ? "font-bold" : ""
        }`}
        onClick={() => handleTabClick(2)}
        >
        All Reviews
      </div>

      <div
        className={`flex-1 p-4 cursor-pointer text-lg ${
          activeTab === 3 ? "font-bold" : ""
        }`}
        onClick={() => handleTabClick(3)}
        >
        Related Products
      </div>

      </section>
    </div>
  )
}

export default ProductTabs
