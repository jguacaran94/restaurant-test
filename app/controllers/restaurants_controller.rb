class RestaurantsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
  end

  def restaurants
    @restaurants = Restaurant.includes(:reviews)
  end

  def review
    restaurant = Restaurant.find(params[:id])
    @review = Review.new(restaurant: restaurant)
    @review.assign_attributes(review_params)
    @review.save

    render json: @review, status: :ok
  end

  private
  def review_params
    params.require(:review).permit([:name, :rating, :comments])
  end
end
