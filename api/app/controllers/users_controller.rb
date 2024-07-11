class UsersController < ApplicationController
  before_action :authenticate

  # GET /current_user
  def show
    @user = current_user
  end

  # POST /users
  def update
    if current_user.update(user_params)
      @user = current_user
    else
      render json: current_user.errors, status: :unprocessable_entity
    end
  end

  private def user_params
    params.require(:user).permit(
      :first_name,
      :last_name, 
      :email, 
      :password, 
      :password_confirmation,
      :fcm_token,
    )
  end
end