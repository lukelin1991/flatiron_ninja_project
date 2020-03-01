class CreateNinjas < ActiveRecord::Migration[5.2]
  def change
    create_table :ninjas do |t|
      t.string :name
      t.integer :folder
      t.string :move_right
      t.string :move_up
      t.string :move_left
      t.string :move_down

      t.timestamps
    end
  end
end
