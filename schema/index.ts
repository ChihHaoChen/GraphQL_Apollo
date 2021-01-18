import { GraphQLSchema } from 'graphql'
import { buildSchema } from 'type-graphql'
import { ObjectId } from 'mongodb'
import path from 'path'

import UserResolver from '../resolvers/UserResolver'
import AuthResolver from '../resolvers/AuthResolver'
import TaskResolver from '../resolvers/TaskResolver'
import ObjectIdScalar from './object-id.scalar'
import TypegooseMiddleware from '../middleware/typegoose'


// Builds TypeGraphQL executable schema
const createSchema = async (): Promise<GraphQLSchema> => {
	
	const schema = await buildSchema({
		// 1. Adds all typescript resolvers
		resolvers: [ UserResolver, AuthResolver, TaskResolver ],
		emitSchemaFile: path.resolve(__dirname, 'schema.gql'),

		// 2. Uses document converting middleware
		globalMiddlewares: [ TypegooseMiddleware ],

		// 3. Uses ObjectId scalar mapping
		scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
		validate: false
	})

	return schema
}


export { createSchema as default }