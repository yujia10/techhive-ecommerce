export const addDecimals = (num) => {
	return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
	// Calculate the items price
	state.itemsPrice = addDecimals(
		state.cartItems.reduce((acc, item) => {
			acc + item.price * item.quantity, 0;
		})
	);

	// Calculate the GST amount(1/11 of item's price)
	state.taxPrice = addDecimals(state.itemsPrice / 11); // GST included in price

	// Calculate the shipping price(free shipping over $100)
	state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

	// Calculate the total price (GST included)
	state.totalPrice = (
		Number(state.itemsPrice) + Number(state.shippingPrice)
	).toFixed(2);

	// Save the cart to localStorage
	localStorage.setItem('cart', JSON.stringify(state));

	return state;
};
