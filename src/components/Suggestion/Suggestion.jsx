import { useEffect, useState } from 'react'
import './Suggestion.css'

const Suggestion = ({ suggestions, limit, property, searchterm }) => {
	const [limited, setLimited] = useState([]);
	const [show, setShow] = useState(true);

	const toggleShow = () => {
		setShow(!show);
	}

	const style = {
		display: show ? 'inherit' : 'none'
	}

	useEffect(() => {
		if (suggestions && suggestions.length > limit) {
			setLimited(suggestions.slice(0, limit));
		} else {
			setLimited(suggestions || []);
		}
	}, [suggestions, limit]);

	const highlightMatch = (text, term) => {
		if (!term) return text;
		const regex = new RegExp(`(${term})`, 'gi');
		return text.replace(regex, '<strong>$1</strong>');
	}

	return (
		<div>
			<h3 className='result-category-header' onClick={toggleShow}>Suggestion</h3>
			<ul style={style}>
				{limited.map((suggestion, index) => (
					<li
						className='suggestion'
						key={suggestion.obj.id}
						dangerouslySetInnerHTML={{
							__html: highlightMatch(suggestion.obj[property], searchterm)
						}}
					/>
				))}
			</ul>
		</div>
	)
}

export default Suggestion