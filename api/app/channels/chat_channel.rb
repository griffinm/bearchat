class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_for current_user
  end

  def unsubscribed
    stop_all_streams
  end

  def receive(data)
    event_type = data["event_name"]

    if event_type == "typing"
      conversation = current_user.conversations.find(data["conversation_id"])
      conversation.users.each do |user|
        next if (user.id === current_user.id)
        ChatChannel.broadcast_to(user, {
          type: 'typing',
          data: {
            user_id: current_user.id,
            conversation_id: conversation.id,
          },
        })
      end
    end
  end
end
