import { apiSlice } from './apiSlice';
import { ORDERS_URL, PAYPAL_URL } from '../constants';

export const orderApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createOrder: builder.mutation({
			query: (order) => ({
				url: ORDERS_URL,
				method: 'POST',
				body: order,
			}),
		}),

		getOrderDetails: builder.query({
			query: (id) => ({
				url: `${ORDERS_URL}/${id}`,
			}),
		}),

		payOrder: builder.mutation({
			query: ({ orderId, details }) => ({
				url: `${ORDERS_URL}/${orderId}/pay`,
				method: 'PUT',
				body: details,
			}),
		}),

		getPaypalClientId: builder.query({
			query: () => ({ url: PAYPAL_URL }),
		}),

		getOrders: builder.query({
			query: () => ({
				url: ORDERS_URL,
			}),
		}),

		getMyOrders: builder.query({
			query: () => ({
				url: `${ORDERS_URL}/mine`,
			}),
			keepUnusedDataFor: 5,
		}),

		deliverOrder: builder.mutation({
			query: (orderId) => ({
				url: `${ORDERS_URL}/${orderId}/deliver`,
				method: 'PUT',
			}),
		}),

		getTotalOrders: builder.query({
			query: () => ({ url: `${ORDERS_URL}/total-orders` }),
		}),

		getTotalSales: builder.query({
			query: () => ({
				url: `${ORDERS_URL}/total-sales`,
			}),
		}),

		getTotalSalesByDate: builder.query({
			query: () => ({
				url: `${ORDERS_URL}/total-sales-by-date`,
			}),
		}),
	}),
});

export const {
	useGetTotalOrdersQuery,
	useGetTotalSalesByDateQuery,
	useGetTotalSalesQuery,
	// -------------------------
	useCreateOrderMutation,
	useDeliverOrderMutation,
	useGetOrderDetailsQuery,
	usePayOrderMutation,
	useGetOrdersQuery,
	useGetMyOrdersQuery,
	useGetPaypalClientIdQuery,
} = orderApiSlice;
