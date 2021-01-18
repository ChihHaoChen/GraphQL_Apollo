import { InputType, Field } from 'type-graphql'

import { ObjectId } from 'mongodb'
import { Task } from '../entity/Task'


@InputType()
class TaskInput implements Partial<Task>	{
	
	@Field({ nullable: true })
	id?: ObjectId

	@Field()
	title: string

	@Field({ nullable: true })
	description?: string

	@Field()
	completedAt: string
}


export { TaskInput as default }