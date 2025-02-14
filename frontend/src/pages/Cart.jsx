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
					<div>
						Your cart is empty <Link to="/shop">Go To Shop</Link>
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
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default Cart;
