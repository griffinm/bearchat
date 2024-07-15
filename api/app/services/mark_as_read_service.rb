class MarkAsReadService

  def mark_as_read(conversation:, message:, user:)
    most_read_time = message.created_at

    # Check for any previous messages
    unread = conversation.messages.where("created_at <= ? AND read_at IS NULL", most_read_time)

    # Mark all previous messages as read
    conversation.messages.where.not(user: user).each do |m|
      m.update(read_at: Time.now)
    end
  end

end