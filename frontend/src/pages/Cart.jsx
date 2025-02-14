import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import {
	updateCartItemQty,
	removeFromCart,
} from '../redux/features/cart/cartSlice';

const Cart = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	// Handler to update the item quantity in cart
	const updateQtyHandler = (id, qty) => {
		dispatch(updateCartItemQty({ id, qty }));
	};

	// Handler to remove items from cart
	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};

	// Handler to checkout - redirects to login if needed
	const checkoutHandler = () => {
		navigate('login?redirect=/shipping');
	};

	return (
		<>
			<div className="container flex justify-around items-start wrap mx-auto mt-8">
				{/* Empty Cart State */}
				{cartItems.length === 0 ? (
					<div className="text-2xl font-bold">
						Your cart is empty -{' '}
						<Link to="/shop" className="underline">
							Go To Shop
						</Link>
					</div>
				) : (
					<>
						{/* Cart Content Container */}
						<div className="flex flex-col w-[80%]">
							<h1 className="h1 text-2xl font-semibold mb-4">Shopping Cart</h1>

							{/* Cart Items List */}
							{cartItems.map((item) => (
								<div
									key={item._id}
									className="flex items-center mb-[1rem] pb-2"
								>
									{/* Product Image */}
									<div className="w-[5rem] h-[5rem]">
										<img
											src={item.image}
											alt={item.name}
											className="w-full h-full object-cover
								rounded"
										/>
									</div>

									{/* Product Details */}
									<div className="flex-1 ml-4">
										{/* Name link to product */}
										<Link
											to={`/product/${item._id}`}
											className="text-pink-500 font-semibold"
										>
											{item.name}
										</Link>

										<div className="mt-2 text-white">{item.brand}</div>
										<div className="mt-2 text-white font-bold">
											$ {item.price}
										</div>
									</div>

									{/* Quantity Selector and Delete Button */}
									<div className="w-32 flex items-center">
										<select
											className="w-full p-1 border rounded bg-black text-white"
											value={item.qty}
											onChange={(e) =>
												updateQtyHandler(item._id, Number(e.target.value))
											}
										>
											{[...Array(item.countInStock).keys()].map((x) => (
												<option
													key={x + 1}
													value={x + 1}
													className="bg-white text-black"
												>
													{x + 1}
												</option>
											))}
										</select>
										<div>
											<button
												className=" text-red-500 ml-4"
												onClick={() => removeFromCartHandler(item._id)}
											>
												<FaTrash className="ml-[1rem] mt-[.5rem]" />
											</button>
										</div>
									</div>
								</div>
							))}

							{/* Order Summary and Checkout Section */}
							<div className="mt-8 w-[40rem]">
								<div className="p-4 rounded-lg bg-[#1A1A1A]">
									<h2 className="text-xl font-semibold mb-4">Order Summary</h2>
									{/* Items total quantity and price */}
									<div className="flex justify-between mb-3">
										<span>
											Items (
											{cartItems.reduce((acc, item) => acc + item.qty, 0)}):
										</span>
										<span>$ {cart.itemsPrice}</span>
									</div>
									{/* Shipping Estimate */}
									<div className="flex justify-between mb-3">
										<span>Estimated Shipping:</span>
										<span>
											{Number(cart.itemsPrice) > 100
												? 'FREE'
												: `$${cart.shippingPrice}`}
										</span>
									</div>
									{/* Divider Line */}
									<div className="border-t border-gray-600 my-4"></div>
									{/* Total Price (include shipping fee) */}
									<div className="flex justify-between mb-4">
										<span className="text-lg font-semibold">Order Total:</span>
										<span className="text-lg font-bold text-pink-500">
											$ {cart.totalPrice}
										</span>
									</div>
									{/* Checkout Button */}
									<button
										className="bg-pink-500 py-2 px-4 rounded-full text-lg w-full hover:bg-pink-600 transition-colors"
										disabled={cartItems.length === 0}
										onClick={checkoutHandler}
									>
										CONTINUE TO CHECKOUT
									</button>
									{/* Free Shipping Notice (display if total items price less than 100) */}
									<div className="text-sm text-gray-400 mt-3 text-center">
										{cartItems.reduce(
											(acc, item) => acc + item.price * item.qty,
											0
										) < 100 &&
											`Add $ ${(
												100 -
												cartItems.reduce(
													(acc, item) => acc + item.price * item.qty,
													0
												)
											).toFixed(2)} more for free shipping`}
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default Cart;
