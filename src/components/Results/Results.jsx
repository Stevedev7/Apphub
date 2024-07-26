import { useEffect } from 'react';

// Results component: A reusable component for searching and filtering data
// 
// Props:
// - searchTerm: The current search query
// - store: An object containing arrays of items to search through
// - matchProperties: An object specifying which properties to match in each store item
// - setResults: Function to update the search results
// - children: Components to display the results
// This component performs a search operation whenever the searchTerm changes.
// It filters items in the store based on the searchTerm and matchProperties,
// then updates the results using the setResults function.

const Results = ({ searchTerm, store, matchProperties, setResults, children }) => {

	useEffect(() => {
		// Create a new object to store the filtered results
		const newResults = {};

		// Iterate through each key in matchProperties (ex: suggestions, products, collections)
		Object.keys(matchProperties).forEach(key => {
			// Filter and map items in the store that match the search term
			const matchedItems = store[key].reduce((acc, obj, index) => {
				const match = new RegExp(searchTerm, 'i').exec(obj[matchProperties[key]]);
				if (match) {
					acc.push({ obj, matchIndex: match.index });
				}
				return acc;
			}, []);
			newResults[key] = matchedItems;
		});

		// Update the results with the new filtered data
		setResults(newResults);
	}, [searchTerm]);

	return (
		<div className='results'>
			{children}
		</div>
	)
}

export default Results