import { ObjectType, Field } from 'type-graphql'
import { User } from '../entity/User'


@ObjectType()
class UserResponse	{
	@Field(() => User, { nullable: true })
	user?: User

	@Field(() => String, { nullable: true })
	token?: string
}


export { UserResponse as default }