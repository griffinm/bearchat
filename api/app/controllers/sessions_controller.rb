class SessionsController < ApplicationController

  def create
    username = params[:email]
    password = params[:password]

    user = User.authenticate_by(
      email: username,
      password: password
    )

    if user
      token = JwtService.new.create(user)
      render json: { 
        token: token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
        }
      }
    else
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

end