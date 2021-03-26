class AddRestaurants < ActiveRecord::Migration[6.1]
  def up
    create_table :restaurants do |t|
      description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!'
      t.string :name, null: false
      t.string :description, null: false, default: description
      t.string :neighborhood, null: false
      t.string :address, null: false
      t.string :cuisine_type, null: false

      t.timestamps
    end
  end

  def down
    drop_table :restaurants
  end
end
