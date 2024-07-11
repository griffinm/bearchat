class PushService
  @@client

  def send_push(message, to_user)
    return unless to_user.fcm_token.present?

    payload = {
      message: {
        token: to_user.fcm_token,
        notification: {
          title: message.user.first_name,
          body: message.content,
        }
      }
    }

    client.push(payload)
  end

  def client
    @@client ||= Fcmpush.new(ENV.fetch("GC_PROJECT_ID"))
  end
end