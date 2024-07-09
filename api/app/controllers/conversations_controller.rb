class ConversationsController < ApplicationController
  before_action :authenticate

  # GET /conversations
  def index
    @conversations = current_user.conversations.includes(:messages, conversation_users: :user)
  end

end