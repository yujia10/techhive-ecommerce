import { useSelector } from "react-redux";

const FavouritesCount = () => {
  const favourites =useSelector(state => state.favourites);
  const favouriteCount = favourites.length;

  return (
    <div className="absolute top-9">
      {favouriteCount > 0 && (
        <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
          {favouriteCount}
        </span>
      )}
    </div>
  );
}

export default FavouritesCount
