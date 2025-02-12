import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../../../Utils/cartUtils';

const initialState = localStorage.getItem('cart')
	? JSON.parse(localStorage.getItem('cart'))
	: {
			cartItems: [],
			shippingAddress: {},
			paymentMethod: 'PayPal',
	  };
const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			// Destructure the payload
			const { user, rating, numReviews, ...item } = action.payload;

			// Check if the item already exists in the cart
			const existItem = state.cartItems.find((x) => x._id === item._id);
			// If the item already exists in the cart
			if (existItem) {
				// Map through the cartItems and update the existing item
				state.cartItems = state.cartItems.map((x) =>
					x._id === existItem._id ? item : x
				);
			} else {
				// If the item doesn't exist in the cart, add it to the cart
				state.cartItems = [...state.cartItems, item];
			}

			return updateCart(state, item);
		},

		removeFromCart: (state, action) => {
			state.cartItems = state.cartItems.filter((x) => x._id != action.payload);
			return updateCart(state);
		},

		saveShippingAddress: (state, action) => {
			state.shippingAddress = action.payload;
			localStorage.setItem('cart', JSON.stringify(state));
		},

		savePaymentMethod: (state, action) => {
			state.paymentMethod = action.payload;
			localStorage.setItem('cart', JSON.stringify(state));
		},

		clearCartItems: (state) => {
			state.cartItems = [];
			localStorage.setItem('cart', JSON.stringify(state));
		},

		resetCart: (state) => {
			state = initialState;
		},
	},
});

export const {
	addToCart,
	removeFromCart,
	savePaymentMethod,
	saveShippingAddress,
	clearCartItems,
	resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
