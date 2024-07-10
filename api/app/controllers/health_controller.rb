class HealthController < ApplicationController
  def show
    render json: { status: 'UP' }
  end
end