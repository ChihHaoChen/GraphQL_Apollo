import { 
	Resolver, 
	Query, 
	UseMiddleware, 
	Arg, 
	Ctx,
	FieldResolver,
	Root, 
	Mutation
} from 'type-graphql'
import { ObjectId } from 'mongodb'
import MyContext from '../types/MyContext'
import { User, UserModel } from '../entity/User'
import { Task, TaskModel } from '../entity/Task'
import ObjectIdScalar from '../schema/object-id.scalar'
import TaskInput from '../types/TaskInput'
import isAuthorized from '../middleware/isAuthorized'


@Resolver(() => Task)
class TaskResolver {
	@Query(() => Task, { nullable: true })
	task(@Arg('taskId', () => ObjectIdScalar) taskId: ObjectId)	{
		return TaskModel.findById(taskId)
	}


	@Query(() => [Task])
	@UseMiddleware(isAuthorized)
	tasks(@Ctx() ctx: MyContext)	{
		return TaskModel.find({ user: ctx.res.locals.userId })
	}


	@Mutation(() => Task)
	@UseMiddleware(isAuthorized)
	async addTask(
		@Arg('input') taskInput: TaskInput, @Ctx() ctx: MyContext): Promise<Task>	{
		const newTask = new TaskModel({ ...taskInput, user: ctx.res.locals.userId } as Task)

		await newTask.save()

		return newTask
	}


	@Mutation(() => Task)
	@UseMiddleware(isAuthorized)
	async updateTask(
		@Arg('taskId', () => ObjectIdScalar) taskInput: TaskInput,
		@Ctx() ctx: MyContext
	): Promise<Task>	{
		const { id, title, description, completedAt } = taskInput
		const task = await TaskModel.findOneAndUpdate({
			_id: id, user: ctx.res.locals.userId
		}, {
			title, description, completedAt
		}, {
			runValidators: true, new: true
		})
		if (!task)	{
			throw new Error('Task not found')
		}
		return task
	}


	@Mutation(() => Boolean)
	@UseMiddleware(isAuthorized)
	async removeTask(
		@Arg('taskId', () => ObjectIdScalar) taskId: ObjectId,
		@Ctx() ctx: MyContext
	): Promise<Boolean | undefined>	{

		const removedTask = await TaskModel.findOneAndDelete({
			_id: taskId,
			user: ctx.res.locals.userId
		})
		if (!removedTask) {
			throw new Error('Task not found')
		}

		return true
	}

	// FieldResolver assign tasks to the relevant users
	@FieldResolver()
	async user(@Root() task: Task): Promise<User | null>	{
		return await UserModel.findById(task.user)
	}
}


export { TaskResolver as default }
