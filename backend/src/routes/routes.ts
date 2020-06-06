import express from 'express'

import ProductController from '../controllers/ProductController'

const routes = express.Router()

//Produto
routes.post('/product', ProductController.store)
routes.get('/products', ProductController.list)
routes.get('/products/:id', ProductController.show)
routes.put('/products/:id', ProductController.update)
routes.delete('/products/:id', ProductController.delete)



export default routes
