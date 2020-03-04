class NinjaSerializer < ActiveModel::Serializer
  attributes :id, :name, :folder
  has_many :project_files
end
