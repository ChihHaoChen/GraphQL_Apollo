import { Request, Response } from 'express'


interface MyContext {
	req: Request
	res: Response
}


export { MyContext as default }
