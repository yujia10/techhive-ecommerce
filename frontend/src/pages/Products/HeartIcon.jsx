import { useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import {
	addToFavourites,
	removeFromFavourites,
	setFavourites,
} from '../../redux/features/favourites/favouriteSlice';
import {
	addFavouriteToLocalStorage,
	getFavouritesFromLocalStorage,
	removeFavouriteFromLocalStorage,
} from '../../Utils/localStorage';

const HeartIcon = ({ product }) => {
	const dispatch = useDispatch();
	// Get favourite items from the Redux store (ensure state.favourites exists)
	const favourites = useSelector((state) => state.favourites) || [];
	console.log(product);
	console.log(favourites);
	// Check if the current product is already in the favourites list
	const isFavourite = favourites.some((p) => p._id === product._id);

	// Load favourite items from localStorage
	useEffect(() => {
		const favouritesFromLocalStorage = getFavouritesFromLocalStorage();
		dispatch(setFavourites(favouritesFromLocalStorage));
	}, []);

	// Toggle functionality for adding/removing a product from favourites
	const toggleFavourites = () => {
		if (isFavourite) {
			dispatch(removeFromFavourites(product));
			removeFavouriteFromLocalStorage(product._id);
		} else {
			dispatch(addToFavourites(product));
			addFavouriteToLocalStorage(product);
		}
	};

	return (
		<div
			className="absolute top-2 right-5 cursor-pointer"
			onClick={toggleFavourites}
		>
			<div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-md">
				{isFavourite ? (
					<FaHeart className="text-pink-500 text-lg" />
				) : (
					<FaRegHeart className="text-gray-800 text-lg hover:text-pink-400" />
				)}
			</div>
		</div>
	);
};

export default HeartIcon;
