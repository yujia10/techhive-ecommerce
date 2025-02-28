import { Link } from "react-router-dom";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="h-[30rem] flex flex-col justify-between items-start">
      <div className="mt-4 ml-1">
        {isLoading ? null : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Slider
            {...settings}
            className="w-full max-w-[50rem]"
          >
            {products.map(
              ({
                image,
                _id,
                name,
              }) => (
                <div key={_id}>
                  <img
                    src={image}
                    alt={name}
                    className="w-full rounded-lg object-cover h-[25rem]"
                  />
                </div>
              )
            )}
          </Slider>
        )}
      </div>
      <div className="flex">
        <Link
        to="/shop"
        className="bg-pink-600 font-bold rounded-lg py-3 px-10"
        >
          Shop Now
        </Link>
      </div>

    </div>
  );
};

export default ProductCarousel;
