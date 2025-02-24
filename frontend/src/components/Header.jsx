import { Link } from "react-router-dom";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {

  return (
    <header className="flex items-center px-10 bg-gray-900 text-white">
      <ProductCarousel />
      <div className="flex flex-col justify-center items-start max-w-lg ml-14">
        <h1 className="text-4xl font-bold">Welcome to TechHive</h1>
        <p className="text-lg mt-4 text-[#B0B0B0]">Smart Tech, Smarter Living.</p>
        <Link to='/shop' className = "bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[4rem]">
        Shop Now
        </Link>
      </div>
    </header>
  );
}

export default Header
