import { prop as Property, getModelForClass } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, ObjectType } from 'type-graphql'


@ObjectType()
class User {
	@Field()
	readonly _id: ObjectId

	@Field()
	@Property({ required: true })
	email: string

	@Field()
	@Property({ required: true })
	password: string

	@Field()
	@Property({ required: false })
	phone: string
}


const UserModel = getModelForClass(User)

export { User, UserModel }
