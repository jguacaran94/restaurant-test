class AddReviews < ActiveRecord::Migration[6.1]
  def up
    create_table :reviews do |t|
      t.string :name, null: false
      t.integer :rating, null: false
      t.string :comments, null: false
      t.references :restaurant, null: false, foreign_key: true

      t.timestamps
    end
  end
  def down
    drop_table :reviews
  end
end
