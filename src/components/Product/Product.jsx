import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './Product.css'
import dress from '../../assets/dress.jpg'

const Product = ({ products, limit, property }) => {
	const [limited, setLimited] = useState([]);
	const [show, setShow] = useState(true);

	const toggleShow = () => {
		setShow(!show);
	}

	const style = {
		display: show ? 'inherit' : 'none'
	}

	useEffect(() => {
		if (products && products.length > limit) {
			setLimited(products.slice(0, limit));
		} else {
			setLimited(products || []);
		}
	}, [products, limit]);

	return (
		<div>
			<h3 className='result-category-header' onClick={toggleShow}>Products</h3>
			<div style={style}>
				{limited.map(product => (
					<div className='product' key={product.obj.id}>
						<img className='product-img' src={dress} alt="Product" />
						<ul className="product-details">
							<li className='product-name'>{product.obj[property]}</li>
							<li className='product-brand'>{product.obj.brand}</li>
							<li className='product-price'>${product.obj.price}</li>
						</ul>
					</div>
				))}
				{products && products.length > limit && <div className='view-all'>View all {products ? products.length : 0} products</div>}
			</div>
		</div>
	)
}

Product.propTypes = {
	products: PropTypes.arrayOf(PropTypes.shape({
		obj: PropTypes.shape({
			id: PropTypes.string.isRequired,
			brand: PropTypes.string.isRequired,
			price: PropTypes.number.isRequired,
		}).isRequired,
	})),
	limit: PropTypes.number.isRequired,
	property: PropTypes.string.isRequired,
}

export default Product