import { TextField, InputAdornment, IconButton, Grow, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react'
import './SearchBar.css'
import Results from './Results'

const SearchBar = ({ text, setText, store }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [showResults, setShowResults] = useState(false)

	const onChange = (e) => {
		setText(e.target.value);
		setShowResults(e.target.value.length > 0);
	}

	const openSearchBar = () => {
		setIsOpen(true);
	}

	const closeSearchBar = () => {
		setText('');
		setIsOpen(false);
		setShowResults(false);
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
					{showResults && (
						<Paper
							elevation={3}
							sx={{
								position: 'absolute',
								top: '100%',
								left: '-12em',
								zIndex: 1,
								marginTop: '4px',
								width: 'calc(100% + 12em)'
							}}
						>
							<Results store={store} searchTerm={text} />
						</Paper>
					)}
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