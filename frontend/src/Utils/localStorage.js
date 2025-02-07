// Add a product to a localStorage
export const addFavouriteToLocalStorage = (product) => {
  const favourites = getFavouritesFromLocalStorage();
  if (!favourites.some((p) => p._id === product._id)) {
    favourites.push(product);
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }
};

// Remove  product from a localStorage
export const removeFavouriteFromLocalStorage = (productId) => {
  const favourites = getFavouritesFromLocalStorage();
  const updateFavourites = favourites.filter(
    (product) => product._id !== productId
  );

  localStorage.setItem("favourites", JSON.stringify(updateFavourites));
};

// Retrive favourites from a localStorage
export const getFavouritesFromLocalStorage = () => {
  const favouritesJSON = localStorage.getItem("favourites");
  // Filter out any null or undefined values. If there is no data in localStorage, return an empty array.
  return favouritesJSON ? JSON.parse(favouritesJSON).filter(Boolean) : [];
};
