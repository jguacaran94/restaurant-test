Rails.application.routes.draw do
  root 'restaurants#index'

  get 'restaurants', to: 'restaurants#restaurants', as: 'restaurants'
  post 'restaurants/:id/review', to: 'restaurants#review', as: 'review'
end
