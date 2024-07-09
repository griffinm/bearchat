class JwtService

  def create(user)
    payload = { 
      user_id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      exp: 30.days.from_now.to_i,
    }
    JWT.encode payload, ENV['JWT_SECRET'], 'HS256'
  end

  def user_from_token(token)
    decoded_token = JWT.decode token, ENV['JWT_SECRET'], true, { algorithm: 'HS256' }
    User.find(decoded_token.first['user_id'])
  end

end