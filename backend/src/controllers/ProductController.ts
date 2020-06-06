import { Request, Response } from "express";
import { Product } from '../models/product'

class ProductController {
	public async store(req: Request, res: Response) {
		const product = new Product({
			name: req.body.name,
			description: req.body.description,
			url: req.body.url,
			created_at: new Date()
		})

		try {
			await product.save()
		}
		catch (e) {
			res.status(422).json({ error: e.error })
		}
		return res.json({
			product: product.getReturnJson(),
			message: 'Produto Salvo'
		})

	}

	public async list(req: Request, res: Response) {
		const { limit = 10, page = 1 } = req.query
		try {
			let option = { limit, page }
			Product.paginate({}, option)
				.then((result: any) => {
					console.log(result)
					return res.json(result)
				})
				.catch((err: any) => {
					return res.json(err)
				})

		}
		catch (e) {
			res.status(422).json({ error: e.error })
		}
	}

	public async show(req: Request, res: Response) {
		let product
		try {
			product = await Product.findById(req.params.id)
			if (!product) {
				return res.json({ message: 'Produto não encontrado' })
			}

		} catch (error) {
			res.status(422).json({ error: error.error })
		}
		return res.json(product)

	}

	public async update(req: Request, res: Response) {
		try {

			let product = await Product.findById(req.params.id)
			if (product) {
				product.name = req.body.name
				product.url = req.body.url
				product.description = req.body.description
				try {
					let salvo = await product.save()
					return res.json({
						product: salvo.getReturnJson(),
						message: 'Produto Atualizado'
					})
				} catch (error) { return res.json({ error: error.error }) }
			}


		} catch (error) {
			res.status(422).json({ error: error.error })
		}



	}

	public async delete(req: Request, res: Response) {
		try {
			await Product.findByIdAndDelete(req.params.id)
			return res.json({ message: 'Produto  Excluido' })
		} catch (error) {
			res.status(422).json({ error: error.error })
		}
	}

}

export default new ProductController()
