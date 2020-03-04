class CreateNinjas < ActiveRecord::Migration[5.2]
  def change
    create_table :ninjas do |t|
      t.string :name
      t.integer :folder, default: 0
      
      t.timestamps
    end
  end
end
