class CreateNotes < ActiveRecord::Migration[7.1]
  def change
    create_table :notes do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title
      t.text :content
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
