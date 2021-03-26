class LoadJson < ActiveRecord::Migration[6.1]
  def up
    restaurants_json = JSON.parse(open("#{Rails.root}/db/migrate/restaurants.json").read)
    restaurants_json['restaurants'].each do |rest|
      restaurant = Restaurant.new(rest.except('reviews'))
      rest['reviews'].each do |rev|
        Review.create!(rev.merge(restaurant: restaurant))
      end
    end
  end

  def down
    Restaurant.destroy_all
  end
end
