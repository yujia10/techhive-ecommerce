import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom';
import { useGetOrdersQuery } from '../../redux/api/orderApiSlice';
import AdminMenu from './AdminMenu';
import { FaEye } from 'react-icons/fa';

const OrderList = () => {
	const { data: orders, isLoading, error } = useGetOrdersQuery();
	return (
		<>
			<div className="container mx-auto p-4">
				<h2 className="text-2xl font-semibold mb-4">Orders</h2>
				<AdminMenu />

				{isLoading ? (
					<Loader />
				) : error ? (
					<Message variant="danger">
						{error?.data?.message || error.error}
					</Message>
				) : (
					<table className="w-full border">
						<thead className="w-full border">
							<tr className=" mb-[5rem]">
								<th className="p-3 text-center">ITEMS</th>
								<th className="p-3 text-center">ID</th>
								<th className="p-3 text-center">USER</th>
								<th className="p-3 text-center">DATE</th>
								<th className="p-3 text-center">TOTAL</th>
								<th className="p-3 text-center">PAID</th>
								<th className="p-3 text-center">DELIVERED</th>
								<th className="p-3 text-center"></th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr
									key={order._id}
									className="border-t border-gray-200 hover:bg-black"
								>
									<td className="p-3">
										<div className="flex justify-center items-center">
											<img
												src={order.orderItems[0].image}
												alt={order._id}
												className="w-16 h-16 object-cover rounded"
											/>
										</div>
									</td>
									<td className="p-3 text-center text-sm font-medium">
										{order._id}
									</td>

									<td className="p-3 text-center">
										{order.user ? order.user.username : 'N/A'}
									</td>
									<td className="p-3 text-center">
										{order.createdAt ? order.createdAt.substring(0, 10) : 'N/A'}
									</td>
									<td className="p-3 text-center font-medium">
										$ {order.totalPrice}
									</td>

									<td className="p-3">
										<div className="flex justify-center">
											{order.isPaid ? (
												<p className="px-3 py-1 text-center bg-green-400 w-[6rem] rounded-full">
													Completed
												</p>
											) : (
												<p className="px-3 py-1 text-center bg-red-400 w-[6rem] rounded-full">
													Pending
												</p>
											)}
										</div>
									</td>
									<td className="p-3">
										<div className="flex justify-center">
											{order.isDelivered ? (
												<p className="px-3 py-1 text-center bg-green-400 w-[6rem] rounded-full">
													Completed
												</p>
											) : (
												<p className="px-3 py-1 text-center bg-red-400 w-[6rem] rounded-full">
													Pending
												</p>
											)}
										</div>
									</td>
									<td className="p-3 text-center">
										<Link to={`/order/${order._id}`}>
											<button className="bg-pink-500 hover:bg-pink-600 text-white py-1 px-4 rounded-md transition duration-200 flex items-center mx-auto">
												<FaEye className="mr-1" /> View
											</button>
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</>
	);
};

export default OrderList;
