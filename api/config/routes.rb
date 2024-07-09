Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  resources :sessions, only: %i[create]
  get "/current_user" => "users#show"
  resources :conversations, only: %i[index] do
    resources :messages, only: %i[index create]
  end
end
