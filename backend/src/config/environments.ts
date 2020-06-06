require('dotenv').config()
export const mongodb = {
	uri: process.env.DB_HOST || ''
}
