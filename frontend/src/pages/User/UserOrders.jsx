import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom';
import { useGetMyOrdersQuery } from '../../redux/api/orderApiSlice';
import { FaTable } from 'react-icons/fa';

const UserOrders = () => {
	const { data: orders, isLoading, error } = useGetMyOrdersQuery();
	return (
		<div className="container mx-auto">
			<h2 className="text-2xl font-semibold mt-4 mb-4">My Orders</h2>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error?.data?.error || error.error}</Message>
			) : (
				<table className="w-full">
					<thead>
						<tr>
							<th className="py-2 text-center">IMAGE</th>
							<th className="py-2 text-center">ID</th>
							<th className="py-2 text-center">DATE</th>
							<th className="py-2 text-center">TOTAL</th>
							<th className="py-2 text-center">PAID</th>
							<th className="py-2 text-center">DELIVERED</th>
							<th className="py-2 text-center"></th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order._id}>
								<td className="py-2">
									<div className="flex justify-center items-center">
										<img
											src={order.orderItems[0].image}
											alt={order.user}
											className="w-16 h-16 object-cover"
										/>
									</div>
								</td>
								<td className="py-2 text-center">{order._id}</td>
								<td className="py-2 text-center">
									{order.createdAt.substring(0, 10)}
								</td>
								<td className="py-2 text-center">$ {order.totalPrice}</td>

								{/* Payment status indicator */}
								<td className="py-2 text-center">
									<div className="flex justify-center">
										{order.isPaid ? (
											<p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
												Completed
											</p>
										) : (
											<p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
												Pending
											</p>
										)}
									</div>
								</td>

								{/* Delivery status indicator */}
								<td className="py-2 text-center">
									<div className="flex justify-center">
										{order.isDelivered ? (
											<p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
												Completed
											</p>
										) : (
											<p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
												Pending
											</p>
										)}
									</div>
								</td>

								{/* Order details link */}
								<td className="py-2 text-center">
									<Link to={`/order/${order._id}`}>
										<button className="bg-pink-400 text-black py-2 px-3 rounded">
											View Details
										</button>
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default UserOrders;
