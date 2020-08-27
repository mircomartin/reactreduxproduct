import React from 'react';
import { useSelector } from 'react-redux';

import { Product } from './Product';

export const Home = () => {
	const { products } = useSelector((state) => state.products);
	const { loading } = useSelector((state) => state.ui);

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
				<Product key={product.id} {...product} />
			))}
		</div>
	);
};
