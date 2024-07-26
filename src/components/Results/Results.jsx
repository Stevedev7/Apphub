import React, { useEffect, useState } from 'react'

const Results = ({ searchTerm, store, matchProperties, results, setResults, children }) => {

	useEffect(() => {
		const newResults = {};

		Object.keys(matchProperties).forEach(key => {
			const matchedItems = store[key].reduce((acc, obj, index) => {
				const match = new RegExp(searchTerm, 'i').exec(obj[matchProperties[key]]);
				if (match) {
					acc.push({ obj, matchIndex: match.index });
				}
				return acc;
			}, []);
			newResults[key] = matchedItems;
		});
		setResults(newResults);
	}, [searchTerm]);
	return (
		<div className='results'>
			{children}
		</div>
	)
}

export default Results