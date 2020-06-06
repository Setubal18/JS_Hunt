import mongoose from 'mongoose'
import { mongodb } from '../config/environments'


function connectionBD() {
	mongoose.connect(mongodb.uri,
		{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => {
			console.log('Banco Conectado')
		}).catch(() => {
			console.log('error Banco')
		})

}

export default connectionBD
