import { MiddlewareFn } from 'type-graphql'
import MyContext from '../types/MyContext'
import jwt from 'jsonwebtoken'


const APP_SECRET = process.env.SESSION_SECRET || 'fdsaftjjwer235724tuyiwrg'

const isAuthorized: MiddlewareFn<MyContext> = async ({ context }, next) => {
	const authorization = context.req.headers['authorization']

	try	{
		const token = authorization?.replace('Bearer ', '')!
		const user = jwt.verify(token, APP_SECRET) as any;
		context.res.locals.userId = user.id

		return next()
	}	catch(err)	{
		throw new Error(err.message)
	}
}


export { isAuthorized as default }
