class MessagesController < ApplicationController
  before_action :authenticate

  # POST /conversations/:conversation_id/messages
  def create
    conversation = Conversation.find(params[:conversation_id])
    content = message_params[:content]
    user = current_user

    @message = conversation.messages.create(
      content: content,
      user: user,
    )
  end

  # GET /conversations/:conversation_id/messages
  def index
    conversation = current_user.conversations.find(params[:conversation_id])
    @messages = conversation.messages
  end

  # PATCH /conversations/:conversation_id/messages/:id
  def update
    if (message_params[:read_at])
      conversation = current_user.active_conversation
      message = conversation.messages.find(params[:id])
      MarkAsReadService.new.mark_as_read(
        conversation: conversation, 
        message: message, 
        user: current_user
      )
    end
  end

  private def message_params
    params.require(:message).permit(:content, :read_at)
  end
end