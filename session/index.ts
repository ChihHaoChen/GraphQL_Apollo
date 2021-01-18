import { connect } from 'mongoose'


const createSesssion = async () => {
	const MONGO_URL = process.env.MONGO_URL || ''

	if (!MONGO_URL)	{
		throw new Error('Missing MONGO_URL')
	}

	const options = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	}

	await connect(MONGO_URL, options)
}


export { createSesssion as default }