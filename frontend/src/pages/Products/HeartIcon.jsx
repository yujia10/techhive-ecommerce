import { useEffect } from "react";
import { FaHeart, FaRegHeart, FaVaadin } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavourites,
  removeFromFavourites,
  setFavourites,
} from "../../redux/features/favourites/favouriteSlice";
import {
  addFavouriteToLocalStorage,
  getFavouritesFromLocalStorage,
  removeFavouriteFromLocalStorage,
} from "../../Utils/localStorage";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  // Get favourite items from the Redux store (ensure state.favourites exists)
  const favourites = useSelector((state) => state.favourites) || [];
  console.log(product);
  console.log(favourites);
  // Check if the current product is already in the favourites list
  const isFavourite = favourites.some((p)=> p._id === product._id);

  // Load favourite items from localStorage
  useEffect(()=>{
    const favouritesFromLocalStorage = getFavouritesFromLocalStorage();
    dispatch(setFavourites(favouritesFromLocalStorage));
  }, []);

  // Toggle functionality for adding/removing a product from favourites
  const toggleFavourites = ()=>{
    if (isFavourite) {
      dispatch(removeFromFavourites(product));
      removeFavouriteFromLocalStorage(product._id);
    } else {
      dispatch(addToFavourites(product));
      addFavouriteToLocalStorage(product);
    }
  }

  return (
    <div
      className="absolute top-2 right-5 cursor-pointer"
      onClick={toggleFavourites}
    >
      {isFavourite ? (
        <FaHeart className="text-pink-500" />
      ) : (
        <FaRegHeart className="text-white" />
      )}
    </div>
  );
}

export default HeartIcon
