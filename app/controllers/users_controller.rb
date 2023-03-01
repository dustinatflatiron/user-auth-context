class UsersController < ApplicationController
  wrap_parameters false

  rescue_from ActiveRecord::RecordNotFound, with: :not_authenticated

  def show
    user = User.find_by!(id: session[:user_id])
    render json: user, status: 200
  end

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user
  end

  private 

  def user_params
    params.permit(:username, :password)
  end

  def not_authenticated(err)
    head :unauthorized
  end
end
