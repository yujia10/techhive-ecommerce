import { createSlice, createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../../../Utils/cart';

const initailState = localStorage.getItem('cart')
	? JSON.parse(localStorage.getItem('cart'))
	: {
			cartItems: [],
			shippingAddress: {},
			paymentMethod: 'PayPal',
	  };
const createSlice = createSlice({
	name: 'cart',
	initailState,
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
	},
});
