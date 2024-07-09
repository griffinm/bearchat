class User < ApplicationRecord
  has_secure_password

  has_many :conversation_users
  has_many :conversations, through: :conversation_users
  has_many :messages

  validates :email, presence: true, uniqueness: true
end