import { Link } from "react-router-dom";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {

  return (
    <header className="flex items-center px-10 bg-gray-900 text-white">
      <ProductCarousel />
      <div className="flex flex-col justify-center items-start max-w-lg ml-14">
        <h1 className="text-[3rem] font-bold">Welcome to TechHive</h1>
        <p className="text-[1.5rem] mt-4 text-[#B0B0B0]">Smart Tech, Smarter Living.</p>
        <Link to='/shop' className = "bg-pink-600 font-bold rounded-lg  hover:bg-pink-800 focus:ring-4 py-2 px-10 mt-[4rem] text-[1.2rem]">
        Shop Now
        </Link>
      </div>
    </header>
  );
}

export default Header
