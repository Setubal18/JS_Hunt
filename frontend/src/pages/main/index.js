import React, { Component } from 'react';
import url from '../../services/api'
import axios from 'axios'
import './styles.css'
import { Link } from 'react-router-dom'

class Main extends Component {
	state = {
		products: [],
		productInfo: {},
		page: 1
	}

	NextPage = () => {
		const { page, productInfo } = this.state
		if (page === productInfo.pages) {
			return
		}
		const pageNumber = page + 1
		this.loadProducts(pageNumber)
	}
	PrevPage = () => {
		const { page } = this.state
		if (page === 1) {
			return
		}
		const pageNumber = page - 1
		this.loadProducts(pageNumber)
	}

	componentDidMount() {
		this.loadProducts()
	}

	loadProducts = async (page = 1) => {
		const response = await axios.get(`${url}/products?page=${page}`)
		const { docs, ...productInfo } = response.data
		this.setState({ products: docs, productInfo: productInfo, page: page })
	}

	render() {
		const { products, page, productInfo } = this.state

		return (
			< div className="product-list" >
				{
					products.map(product => (
						<article key={product._id}>
							<strong>{product.name}</strong>
							<p>{product.description}</p>

							<Link to={`/products/${product._id}`} >Acessar</Link>
						</article>
					))
				}
				< div className="actions" >
					<button disabled={page === 1} onClick={this.PrevPage}>Anterior</button>
					<button disabled={page === productInfo} onClick={this.NextPage}>
						Proximo</button>
				</div >
			</div >
		);
	}
}

export default Main;
