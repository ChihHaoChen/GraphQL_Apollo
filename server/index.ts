import './env'
import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import cors from 'cors'

import createSchema from '../schema'
import createSesssion from '../session'


const port = process.env.PORT || 8000

const createServer = async () => {
	try	{
		// 1. Creates the mongoose connection
		await createSesssion()

		// 2. Creates the express server
		const app = express()

		// 3. Allows CORS from a local client
		const corsOptions = {
			origin: 'http://localhost:3000',
			credentials: true
		}
		app.use(cors(corsOptions))

		// 4. Allows JSON requests
		app.use(express.json())

		const schema = await createSchema()

		// 4. Creates a GraphQL server
		const apolloServer = new ApolloServer({
			schema,
			context: ({ req, res }) => ({ req, res }),
			introspection: true,
			playground: {
				settings: {
					'request.credentials': 'include'
				}
			}
		})

		apolloServer.applyMiddleware({ 
			app, 
			path: '/api/graphql',
			//cors: corsOptions
	})

		app.listen({ port }, () => {
			console.log(`Server is ready at http://localhost:${port}${apolloServer.graphqlPath}`)
		})
	} catch(err) {
		console.log(err)
	}
}


createServer()