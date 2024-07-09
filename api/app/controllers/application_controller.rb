class ApplicationController < ActionController::API
  
  def current_user
    @current_user
  end

  def authenticate
    begin
      @current_user = JwtService.new.user_from_token(request.headers['x-bc-token'])
    rescue
      render json: { error: 'Unauthorized' }, status: :unauthorized
      return false
    end
  end

end
