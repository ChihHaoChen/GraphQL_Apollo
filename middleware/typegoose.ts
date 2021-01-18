import { Model, Document } from 'mongoose'
import { getClassForDocument } from '@typegoose/typegoose'
import { MiddlewareFn } from 'type-graphql'


const convertDocument = (doc: Document)	=> {
	const convertedDocumentObj = doc.toObject()
	const DocumentClass = getClassForDocument(doc)

	Object.setPrototypeOf(convertedDocumentObj, DocumentClass?.prototype)

	return convertedDocumentObj
}


const TypegooseMiddleware: MiddlewareFn = async (_, next) => {
	const result = await next()

	if (Array.isArray(result))	{
		return result.map((item) => item instanceof Model ? convertDocument(item): item)
	}

	if (result instanceof Model)	{
		return convertDocument(result)
	}

	return result
}


export { TypegooseMiddleware as default }