import { InputType, Field } from 'type-graphql'


@InputType()
class AuthInput	{
	@Field()
	email: string

	@Field({ nullable: true })
	phone: string

	@Field()
	password: string
}


export { AuthInput as default }