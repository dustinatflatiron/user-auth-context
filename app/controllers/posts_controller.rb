class PostsController < ApplicationController
  def index
    posts = Post.all
    render json: posts, status: 200
  end
end
