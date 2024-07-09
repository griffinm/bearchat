class UsersController < ApplicationController
  before_action :authenticate

  # GET /current_user
  def show
    @user = current_user
  end
end