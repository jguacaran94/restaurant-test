json.array! @restaurants do |r|
  json.extract! r, :id, :name, :description, :neighborhood, :address, :cuisine_type, :created_at, :updated_at

  json.reviews r.reviews.each do |r|
    json.name r.name
    json.rating r.rating
    json.comments r.comments
    json.created_at r.created_at
  end
end