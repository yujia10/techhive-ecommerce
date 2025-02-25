import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	useGetFilteredProductsQuery,
	useGetProductsQuery,
} from '../redux/api/productApiSlice';
import { useFetchCategoriesQuery } from '../redux/api/categoryApiSlice';
import {
	setCategories,
	setProducts,
	setChecked,
} from '../redux/features/shop/shopSlice';
import Loader from '../components/Loader';
import ProductCard from './Products/ProductCard';

const Shop = () => {
	const dispatch = useDispatch();
	const { categories, products, checked, radio } = useSelector(
		(state) => state.shop
	);
	const categoriesQuery = useFetchCategoriesQuery();
	const [selectedPriceRange, setSelectedPriceRange] = useState('');

	const [searchInput, setSearchInput] = useState('');
	const [searchKeyword, setSearchKeyword] = useState('');
	const [isSearchMode, setIsSearchMode] = useState(false);

	const filteredProductsQuery = useGetFilteredProductsQuery({ checked, radio });
	const { data: searchResults, isLoading: isSearching } = useGetProductsQuery(
		{
			keyword: searchKeyword,
		},
		{
			skip: !searchKeyword,
		}
	);

	// Define price ranges
	const priceRanges = [
		{ id: '0-200', label: '$0 - $200', min: 0, max: 200 },
		{ id: '200-400', label: '$200 - $400', min: 200, max: 400 },
		{ id: '400-600', label: '$400 - $600', min: 400, max: 600 },
		{ id: '600-800', label: '$600 - $800', min: 600, max: 800 },
		{ id: '800-above', label: '$800 & Above', min: 800, max: Infinity },
	];

	// Effect to update categories in Redux store once data is loaded
	useEffect(() => {
		if (!categoriesQuery.isLoading) {
			dispatch(setCategories(categoriesQuery.data));
		}
	}, [categoriesQuery.data, dispatch]);

	// Effect for search/filter logic,
	// user can choose to search via either mode, the other mode will be disabled
	useEffect(() => {
		// Search mode
		if (searchKeyword && searchResults) {
			setIsSearchMode(true);
			dispatch(setProducts(searchResults.products || []));
		}
		// Filter mode
		else if (!filteredProductsQuery.isLoading && filteredProductsQuery.data) {
			setIsSearchMode(false);
			let filteredProducts = [...filteredProductsQuery.data];

			// Apply category filter
			if (checked.length > 0) {
				filteredProducts = filteredProducts.filter((product) =>
					checked.includes(product.category)
				);
			}

			// Apply brand filter
			if (radio.length > 0) {
				filteredProducts = filteredProducts.filter(
					(product) => product.brand === radio[0]
				);
			}

			// Apply price range filter
			if (selectedPriceRange) {
				const range = priceRanges.find(
					(range) => range.id === selectedPriceRange
				);
				if (range) {
					filteredProducts = filteredProducts.filter(
						(product) =>
							product.price >= range.min &&
							(range.max === Infinity
								? product.price >= range.min
								: product.price <= range.max)
					);
				}
			}

			dispatch(setProducts(filteredProducts));
		}
	}, [
		searchKeyword,
		searchResults,
		checked,
		radio,
		filteredProductsQuery.data,
		dispatch,
		selectedPriceRange,
	]);

	const handleSearch = () => {
		setSearchKeyword(searchInput.trim());
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};

	// Handler for filtering products by brand
	const handleBrandClick = (brand) => {
		dispatch(setRadio([brand]));
	};

	// Handler for updating checked categories
	const handleCheck = (value, id) => {
		const updatedChecked = value
			? [...checked, id]
			: checked.filter((c) => c !== id);
		dispatch(setChecked(updatedChecked));
	};

	// Handler for price range selection
	const handlePriceRangeChange = (rangeId) => {
		setSelectedPriceRange(rangeId);
	};

	const handleClearSearch = () => {
		setSearchInput('');
		setSearchKeyword('');
		setIsSearchMode(false);
		if (filteredProductsQuery.data) {
			dispatch(setProducts(filteredProductsQuery.data));
		}
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

	return (
		<>
			<div className="container mx-auto">
				{/* Header with Search */}
				<div className="w-full max-w-6xl mx-auto my-6">
					<div className="flex items-center justify-between gap-6">
						{/* Page Title */}
						<h1 className="text-2xl font-bold text-white flex-shrink-0">
							Shop Products
						</h1>

						{/* Search Bar */}
						<div className="flex-1 max-w-2xl flex gap-2">
							<div className="relative flex-1">
								<input
									type="text"
									placeholder="Search products..."
									value={searchInput}
									onChange={(e) => setSearchInput(e.target.value)}
									onKeyPress={handleKeyPress}
									className="w-full px-4 py-3 
                  bg-white/10 
                  text-white  
                  placeholder-gray-400  
                  border border-white/20  
                  rounded-lg  
                  focus:outline-none  
                  focus:ring-2  
                  focus:ring-pink-500  
                  focus:border-transparent"
								/>
								{searchInput && (
									<button
										onClick={handleClearSearch}
										className="absolute right-3 top-1/2 transform -translate-y-1/2
                    text-gray-400 hover:text-white text-xl font-medium"
									>
										×
									</button>
								)}
							</div>
							<button
								onClick={handleSearch}
								className="px-6 py-3 bg-pink-600 text-white rounded-lg
                hover:bg-pink-700 transition-colors flex-shrink-0"
							>
								Search
							</button>
						</div>
					</div>
					{isSearchMode && (
						<p className="text-gray-400 mt-2 text-sm text-right max-w-2xl ml-auto">
							Search mode active. Filters are disabled.
						</p>
					)}
				</div>
				<div className="flex md:flex-row">
					{/* Filtering Sidebar - disable when in search mode */}
					<div
						className={`bg-[151515] p-3 mt-2 mb-2 ${
							isSearchMode ? 'opacity-50 pointer-events-none' : ''
						}`}
					>
						{/* Categories Filter Section */}
						<h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
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

						{/* Brands Filter Section */}
						<h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
							Filter by Brands
						</h2>

						{/* Brands Radio Button List */}
						<div className="p-5">
							{uniqueBrands.map((brand) => (
								<div className="flex items-center mr-4 mb-5">
									<input
										type="radio"
										id={brand}
										name="brand"
										onChange={() => handleBrandClick(brand)}
										className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300
											 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 
											 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
									/>
									<label
										htmlFor="pink-radio"
										className="ml-2 text-sm font-medium text-white dark:text-gray-300"
									>
										{brand}
									</label>
								</div>
							))}
						</div>

						{/* Price Filter Section */}
						<h2 className="h4 text-center py-2 bg-black rounded-full mb-2">
							Filter by Price
						</h2>

						{/* Price Range Selection */}
						<div className="p-5">
							{priceRanges.map((range) => (
								<div key={range.id} className="flex items-center mr-4 mb-5">
									<input
										type="radio"
										id={range.id}
										name="priceRange"
										onChange={() => handlePriceRangeChange(range.id)}
										className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300
                    focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 
                    focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
									/>
									<label
										htmlFor={range.id}
										className="ml-2 text-sm font-medium text-white dark:text-gray-300"
									>
										{range.label}
									</label>
								</div>
							))}
						</div>

						{/* Reset Button */}
						<div className=" text-center py-2mb-2">
							<button
								className="w-full border rounded border-white/20 bg-white/10 text-white hover:bg-white/20 my-4"
								// Reload the page to reset all filters
								onClick={() => window.location.reload()}
							>
								Reset
							</button>
						</div>
					</div>

					{/* Products Display Section */}
					<div className="p-3 flex-1">
						<h2 className="h4 text-center mb-2 text-gray-300">
							{products?.length} Products
						</h2>

						{isSearching ? (
							<Loader />
						) : products?.length === 0 ? (
							<div className="flex items-center justify-center h-[300px] w-full">
								<p className="text-gray-400 text-lg">No products found</p>
							</div>
						) : (
							<div className="flex flex-wrap">
								{products?.map((p) => (
									<div className="p-3" key={p._id}>
										<ProductCard p={p} />
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Shop;
