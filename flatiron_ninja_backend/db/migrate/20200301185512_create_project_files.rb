class CreateProjectFiles < ActiveRecord::Migration[5.2]
  def change
    create_table :project_files do |t|
      t.string :name
      t.string :image_url
      t.belongs_to :ninja, foreign_key: true
      t.timestamps
    end
  end
end
