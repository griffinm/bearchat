Rails.application.routes.draw do
  mount ActionCable.server => '/ws'

  get "/health" => "health#show"

  resources :sessions, only: %i[create update]
  get "/current_user" => "users#show"
  resources :conversations, only: %i[index] do
    resources :messages, only: %i[index create]
  end
  resources :notes, only: %i[index create update destroy show]
end
