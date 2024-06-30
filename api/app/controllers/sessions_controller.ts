import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'


export default class SessionsController {
  async store({
    auth,
    request,
    response,
  }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    return {
      user: user.serialize(),
      token: {
        type: 'bearer',
        value: token.value!.release(),
      }
    }
  }
}
