import { Link,useParams } from "react-router";
import { useGetNewProductsQuery } from "../redux/api/productApiSlice";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Message from "../components/Message";

const Home = () => {
  const {keyword} = useParams();
  const {data, isLoading, isError} = useGetNewProductsQuery({keyword});

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (<Loader />) : isError ? (<Message variant = 'danger'>
        {isError?.data.message || isError.error}
        </Message>) : (
          <>
            <div className="flex justify-between items-center">
              <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">
                Special Products
              </h1>

              <Link to='/shop' className = "bg-pink-600 font-bold rounded-full py-2 px-10 mr=[18rem] mt-[10rem]">
              Shop
              </Link>
            </div>
          </>
        )}
    </>
 )
}

export default Home
