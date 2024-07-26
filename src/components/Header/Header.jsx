import { AppBar, Box, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import './Header.css'
import SearchBar from '../SearchBar'
import { useEffect, useState } from 'react'

const Header = () => {
	const [term, setTerm] = useState('');
	const [drawerOpen, setDrawerOpen] = useState(false);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const [store, setStore] = useState({});

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
				<Typography variant="h6" component="div" className="brand">
					Apphub Question 3
				</Typography>
				{!isMobile && (
					<Box className="links">
						<a href="#" className="link">Home</a>
						<a href="#" className="link">Tops</a>
						<a href="#" className="link">Shoes</a>
					</Box>
				)}
				<SearchBar text={term} setText={setTerm} store={store} />
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