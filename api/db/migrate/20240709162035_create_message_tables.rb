class CreateMessageTables < ActiveRecord::Migration[7.1]
  def change
    create_table :conversations do |t|

      t.timestamps
    end

    create_table :conversation_users do |t|
      t.belongs_to :conversation
      t.belongs_to :user

      t.timestamps
    end

    create_table :messages do |t|
      t.belongs_to :conversation
      t.belongs_to :user
      t.text :content

      t.timestamps
    end
  end
end
