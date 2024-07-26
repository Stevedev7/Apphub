import { AppBar, Box, Toolbar, IconButton, Drawer, List, ListItem, useMediaQuery, useTheme, Paper } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import './Header.css'
import SearchBar from '../SearchBar'
import { useEffect, useState } from 'react'
import Suggestion from '../Suggestion'
import Collection from '../Collection'
import Results from '../Results'
import Product from '../Product'

const Header = () => {
	const [term, setTerm] = useState(''); // State to store search term

	// Related to responsive design
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const [drawerOpen, setDrawerOpen] = useState(false);


	const [store, setStore] = useState({}); // State to store all the required data
	const [results, setResults] = useState({}); // State to store the search results

	// Define which property to be searched
	const matchProperties = {
		suggestions: "term",
		collections: "title",
		products: "title"
	}

	// Function to toggle hamberger menu
	const toggleDrawer = (open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		setDrawerOpen(open);
	};

	// Fetch all the data and store it in the "store" state.
	useEffect(() => {
		const fetchData = async () => {
			try {
				const [suggestionsRes, collectionsRes, productsRes] = await Promise.all([
					fetch('http://localhost:4000/suggestions'),
					fetch('http://localhost:4000/collections'),
					fetch('http://localhost:4000/products')
				]);

				const suggestions = await suggestionsRes.json();
				const collections = await collectionsRes.json();
				const products = await productsRes.json();

				setStore({
					suggestions,
					collections,
					products
				});
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []);

	return (
		<AppBar position="static" sx={{ backgroundColor: '#fcfcfc', boxShadow: 'none' }}>
			<Toolbar className='nav-content'>
				{isMobile && (
					<IconButton
						edge="start"
						color="inherit"
						aria-label="menu"
						onClick={toggleDrawer(true)}
					>
						<MenuIcon className='menu-icon' />
					</IconButton>
				)}
				<h1 className="brand">
					Apphub Question 3
				</h1>
				{!isMobile && (
					<Box className="links">
						<a href="#" className="link">Home</a>
						<a href="#" className="link">Tops</a>
						<a href="#" className="link">Shoes</a>
					</Box>
				)}
				<div className="search-container">
					<SearchBar
						text={term}
						setText={setTerm}
					/>
					{term !== "" && (
						<Paper
							elevation={3}
							className="search-results-paper"
						>
							{/**
							 * Reusable component 
							 * "results" is an object which has search results for each category and and also index (obj, matchIndex) of the matched string.
							 * Example: [{
							 * 	"obj": {
							 * 		"id": "25",
							 * 		"title": "Red High-Waisted Skirt",
							 * 		"url": "/products/25",
							 * 		"brand": "Under Armour",
							 * 		"price": 80,
							 * 		"image": "/images/products/25.jpg"
							 *	},
							 * 	"matchIndex": 0
							 * }]
							 */}
							<Results
								store={store}
								searchTerm={term}
								matchProperties={matchProperties}
								setResults={setResults}
							>
								<div>
									{/* Component to display Suggestion terms */}
									<Suggestion
										searchterm={term}
										limit={4}
										property="term"
										suggestions={results.suggestions}
									/>
									{/* Component to display Collections */}
									<Collection
										limit={4}
										property={"title"}
										collections={results.collections}
									/>
									{/* Component to display Products terms */}
									<Product
										limit={3}
										property={"title"}
										products={results.products}
									/>
								</div>
							</Results>
						</Paper>
					)}
				</div>
				<Drawer className='drawer' anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
					<List>
						{['Home', 'Tops', 'Shoes'].map((text) => (
							<ListItem button key={text}>
								<a href="#" className="link">{text}</a>
							</ListItem>
						))}
					</List>
				</Drawer>
			</Toolbar>
		</AppBar>
	)
}

export default Header