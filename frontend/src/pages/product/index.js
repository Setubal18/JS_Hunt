import React, { Component } from 'react';
import url from '../../services/api'
import axios from 'axios'
import './styles.css'
class index extends Component {
	state = {
		product: {},
	}

	async componentDidMount() {
		const { id } = this.props.match.params
		const response = await axios.get(`${url}/products/${id}`)

		this.setState({ product: response.data })
	}
	render() {
		const { product } = this.state
		return (
			<div className="product-info">
				<h1>{product.name}</h1>
				<p>{product.description}</p>
				<p>
					URL: <a href={product.url}>{product.url}</a>
				</p>
			</div>
		);
	}
}

export default index;
