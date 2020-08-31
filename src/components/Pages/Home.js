import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Product } from './Product';
import { startListProducts } from '../../actions/products';

export const Home = () => {
	const dispatch = useDispatch()
	
	const { products } = useSelector((state) => state.products);
	const { loading } = useSelector((state) => state.ui);

	useEffect(() => {
		dispatch(startListProducts())
		// eslint-disable-next-line
	}, [])

	if(loading) {
		return <h1>Waiting...</h1>
	}

	if (products.length === 0 ) {return <h1 className="text-center">No hay productos</h1>}
	
	return (
		<div className="container">
			<div className="row">
				<div className="col-12">
					<h1 className="text-center">Tus productos</h1>
				</div>
			</div>

			{products.map((product) => (
				<Product key={product.id} product={product} />
			))}
		</div>
	);
};
