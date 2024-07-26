import React, { useEffect, useState } from 'react'

const Results = ({ searchTerm, store }) => {
	const [results, setResults] = useState({});
	return (
		<div className='results'>{searchTerm}</div>
	)
}

export default Results