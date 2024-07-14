class SendMessageJob < ApplicationJob
  queue_as :default

  def perform(message)
    conversation = message.conversation
    
    # Send to any WS listeners
    conversation.users.each do |user|
      next if (user.id === message.user_id)
      Rails.logger.info("Sending message to user #{user.id}")
      ChatChannel.broadcast_to(user, formatted_ws_message(message) )
    end

    # Send push notifications
    conversation.users.each do |user|
      next if (user.id === message.user_id)
      PushService.new.send_push(message, user)
    end
  end

  private def formatted_ws_message(message)
    {
      type: 'message',
      data: message.to_json,
    }
  end
end
