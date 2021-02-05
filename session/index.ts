import { connect } from 'mongoose'


const createSesssion = async () => {
	const MONGO_URI = process.env.MONGO_URI || ''

	if (!MONGO_URI)	{
		throw new Error('Missing MONGO_URL')
	}

	const options = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	}

	await connect(MONGO_URI, options)
}


export { createSesssion as default }