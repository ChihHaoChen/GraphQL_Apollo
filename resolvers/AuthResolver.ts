import { Arg, Mutation, Resolver } from 'type-graphql'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import { User, UserModel } from '../entity/User'
import AuthInput from '../types/AuthInput'
import UserResponse from '../types/UserResponse'


const storeUserId = (user: User): Object => {
	const payload = { id: user._id }
	const token = jwt.sign(payload, process.env.SESSION_SECRET || 'fdsaftjjwer235724tuyiwrg')

	return { user, token }
}


@Resolver()
class AuthResolver	{

	@Mutation(() => UserResponse)
	async signUp(@Arg('input') { email, password, phone }: AuthInput): Promise<UserResponse>	{
		// 1. Check if user's email already stored in database
		const existingUser = await UserModel.findOne({ email })

		if (existingUser)	{
			throw new Error('Email alreay in use')
		}

		// 2. Create a new user with a hashed password
		const hashedPassword = await bcrypt.hash(password, 10)
		const user = new UserModel({ email, password: hashedPassword, phone })
		await user.save()

		// 3. Store the userId with the token payload
		return storeUserId(user)
	}

	
	@Mutation(() => UserResponse)
	async signIn(@Arg('input') { email, password }: AuthInput): Promise<UserResponse>	{
		const user = await UserModel.findOne({ email })

		if (!user) {
			throw new Error('A invalid user')
		}

		const checkPassword = await bcrypt.compare(password, user.password)
		if(!checkPassword)	{
			throw new Error('A invalid password')
		}

		// 3. Store the userId with the token payload
		return storeUserId(user)
	}
}


export { AuthResolver as default }