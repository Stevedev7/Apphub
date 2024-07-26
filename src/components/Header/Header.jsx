import { AppBar, Box, Toolbar, IconButton, Drawer, List, ListItem, useMediaQuery, useTheme, Paper } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import './Header.css'
import SearchBar from '../SearchBar'
import { useEffect, useState } from 'react'
import Suggestion from '../Suggestion'
import Collection from '../Collection'
import Results from '../Results'

const Header = () => {
	const [term, setTerm] = useState('');
	const [drawerOpen, setDrawerOpen] = useState(false);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const [store, setStore] = useState({});
	const [results, setResults] = useState({});

	const matchProperties = {
		suggestions: "term",
		collections: "title",
		products: "title"
	}

	const toggleDrawer = (open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		setDrawerOpen(open);
	};

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
						store={store}
						matchProperties={matchProperties}
						results={results}
						setResults={setResults}
					/>
					{term !== "" && (
						<Paper
							elevation={3}
							className="search-results-paper"
						>
							<Results
								store={store}
								searchTerm={term}
								matchProperties={matchProperties}
								results={results}
								setResults={setResults}
							>
								<div>
									<Suggestion
										searchterm={term}
										limit={4}
										property="term"
										suggestions={results.suggestions}
									/>
									<Collection
										searchterm={term}
										limit={4}
										property={"title"}
										collections={results.collections}
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