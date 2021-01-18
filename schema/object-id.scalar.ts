import { GraphQLScalarType, Kind } from 'graphql'
import { ObjectId } from 'mongodb'


const objectIdScalar = new GraphQLScalarType({
	name: 'objectId',
	description: 'Mongo object id scalar type',
	parseValue(value: string)	{
		return new ObjectId(value)
	},
	serialize(value: ObjectId)	{
		return value.toHexString()
	},
	parseLiteral(ast)	{
		if (ast.kind === Kind.STRING)	{
			return new ObjectId(ast.value)
		}
		return null
	}
})


export { objectIdScalar as default }