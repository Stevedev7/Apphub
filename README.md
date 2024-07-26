# Auto-suggestion Feature

This project implements an auto-suggestion feature using React.

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Run the development server:
   ```
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

To use the Results component for searching and filtering data:

1. Import Results component:
   ```jsx
   import Results from './components/Results';
   ```

2. Set up states for store and results:
   * store should contain all the data needs to be filtered.
   * results is initially empty, and will populate with search results.
   ```jsx
     const [store, setStore] = useState({});
     const [results, setResults] = useState({});
   ```

3. Define matchProperties object:
   * matchProperties contains the field to be searched in.
   ```jsx
   const matchProperties = {
     suggestions: "term",
     collections: "title",
     products: "title"
   };
   ```

4. Use the Results component in your JSX:
	```jsx
	<Results
		store={store}
		searchTerm={term}
		matchProperties={matchProperties}
		setResults={setResults}
	>
		{/* Child components to display results */}
	</Results>
	```
	
5. The Results component will automatically filter the store based on the searchTerm and update the results state.

6. Use the filtered results in child components to display the search results.

Refer the Header component for more information on implementation.
