import { TextField, InputAdornment, IconButton, Grow, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react'
import './SearchBar.css'

const SearchBar = ({ text, setText }) => {
	const [isOpen, setIsOpen] = useState(false);

	const onChange = (e) => {
		setText(e.target.value);
	}

	const openSearchBar = () => {
		setIsOpen(true);
	}

	const closeSearchBar = () => {
		setText('');
		setIsOpen(false);
	}

	return (
		<div style={{ position: 'relative' }}>
			{isOpen ? (
				<>
					<Grow in={isOpen}>
						<TextField
							variant="outlined"
							size="small"
							placeholder="Search..."
							sx={{
								backgroundColor: 'white',
								borderRadius: 1,
								transition: 'width 0.3s, box-shadow 0.3s',
								width: isOpen ? '20em' : '0px',
								boxShadow: isOpen ? '0px 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
								'& .MuiOutlinedInput-notchedOutline': {
									border: 'none',
								},
							}}
							onChange={onChange}
							value={text}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<IconButton onClick={openSearchBar}>
											<SearchIcon className='search-icon' />
										</IconButton>
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="end">
										<IconButton onClick={closeSearchBar}>
											<CancelIcon className='cancel-icon' />
										</IconButton>
									</InputAdornment>
								)
							}}
						/>
					</Grow>

				</>
			) : (
				<IconButton onClick={openSearchBar}>
					<SearchIcon className='search-icon' />
				</IconButton>
			)}
		</div>
	)
}

export default SearchBar