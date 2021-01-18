import { prop as Property, getModelForClass } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, ObjectType } from 'type-graphql'
import { User } from './User'
import { Ref } from '../types/Ref'


@ObjectType()
class Task {
	@Field()
	readonly _id: ObjectId

	@Field()
	@Property({ required: true })
	title: string

	@Field()
	@Property({ required: true })
	description: string

	@Field()
	@Property({ required: true })
	completedAt: string

	@Field(() => User)
	@Property({ ref: User, required: true })
	user: Ref<User>
}


const TaskModel = getModelForClass(Task)


export { Task, TaskModel }