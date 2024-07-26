import { useEffect, useState } from 'react'
import './Collection.css'
const Collection = ({ collections, limit, property }) => {
	const [limited, setLimited] = useState([]);

	const [show, setShow] = useState(true);

	const toggleShow = () => {
		setShow(!show);
	}
	const style = {
		display: show ? 'inherit' : 'none'
	}

	useEffect(() => {
		if (collections && collections.length > limit) {
			setLimited(collections.slice(0, limit));
		} else {
			setLimited(collections || []);
		}
	}, [collections, limit]);

	return (
		<div>
			<h3 className='result-category-header' onClick={toggleShow}>Collections</h3>
			<ul style={style}>
				{limited.map(collection => <li className='collection' key={collection.obj.id}>{collection.obj[property]}</li>)}
			</ul>
		</div>
	)
}

export default Collection