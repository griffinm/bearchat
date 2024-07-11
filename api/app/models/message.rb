class Message < ApplicationRecord
  belongs_to :conversation
  belongs_to :user

  validates :content, presence: true

  after_create :broadcast_message
  
  # TODO: make this async
  private def broadcast_message
    # Push to the app
    ActionCable.server.broadcast("ChatChannel", self.to_json)
    
    # Create a push notification
    self.conversation.users.each do |user|
      next (user.id === self.user_id)
      PushService.new.send_push(self, user)
    end
  end

  def to_json
    {
      id: self.id,
      content: self.content,
      userId: self.user_id,
      conversationId: self.conversation_id,
      createdAt: self.created_at,
    }
  end
end