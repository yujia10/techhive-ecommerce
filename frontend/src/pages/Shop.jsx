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
	const categoriesQuery = useFetchCategoriesQuer();
	const [priceFilter, setPriceFilter] = useSelector('');

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
	});

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

	return <div>SHOP</div>;
};

export default Shop;
