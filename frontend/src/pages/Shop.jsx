import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetFilteredProductsQuery } from '../redux/api/productApiSlice';
import { useFetchCategoriesQuery } from '../redux/api/categoryApiSlice';
import {
	setCategories,
	setProducts,
	setChecked,
} from '../redux/features/shop/shopSlice';
import Loader from '../components/Loader';

const Shop = () => {
	const dispatch = useDispatch();
	const { categories, productes, checked, radio } = useSelector(
		(state) => state.shop
	);
	const categoriesQuery = useFetchCategoriesQuery();
	const [priceFilter, setPriceFilter] = useState('');

	const filteredProductsQuery = useGetFilteredProductsQuery({ checked, radio });

	// Effect to update categories in Redux store once data is loaded
	useEffect(() => {
		if (!categoriesQuery.isLoading) {
			dispatch(setCategories(categoriesQuery.data));
		}
	}, [categoriesQuery.data, dispatch]);

	// Effect to filter products based on categories, radio filters, and price
	useEffect(() => {
		if (!checked.length || !radio.length) {
			if (!filteredProductsQuery.isLoading) {
				// Filter products based on both checked categories and price filter
				const filteredProducts = filteredProductsQuery.data.filter(
					(product) => {
						// Check if the product price includes the entered price filter value
						return (
							product.price.toString().includes(priceFilter) ||
							product.price === parseInt(priceFilter, 10)
						);
					}
				);

				dispatch(setProducts(filteredProducts));
			}
		}
	}, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

	// Handler for filtering products by brand
	const handleBrandClick = (brand) => {
		const productsByBrand = filteredProductsQuery.data?.filter(
			(product) => product.brand === brand
		);
		dispatch(setProducts(productsByBrand));
	};

	// Handler for updating checked categories
	const handleCheck = (value, id) => {
		const updatedChecked = value
			? [...checked, id]
			: checked.filter((c) => c !== id);
		dispatch(setChecked(updatedChecked));
	};

	// Add "All Brands" to uniqueBrands
	const uniqueBrands = [
		...Array.from(
			new Set(
				filteredProductsQuery.data
					?.map((product) => product.brand)
					.filter((brand) => brand !== undefined)
			)
		),
	];

	// Handler for updating price filter state
	const handlePriceChange = (e) => {
		// Update the price filter state when the user types in the input filed
		setPriceFilter(e.target.value);
	};

	return (
		<>
			<div className="container mx-auto">
				<div className="flex md:flex-row">
					<div className="bg-[151515] p-3 mt-2 mb-2">
						<h2 className="h4 tetx-center py-2 bg-black rounded-full mb-2">
							Filter by Categories
						</h2>

						{/* Categories Checkbox List */}
						<div className="p-5 w-[15rem]">
							{categories?.map((c) => (
								<div key={c._id} className="mb-2">
									<div className="flex  items-center mr-4">
										<input
											type="checkbox"
											id="red-checkbox"
											onChange={(e) => handleCheck(e.target.checked, c._id)}
											className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 rounded
											 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
										/>
										<label
											htmlFor="pink-checkbox"
											className="ml-2 font-medium text-white dark:text-gray-300"
										>
											{c.name}
										</label>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Shop;
