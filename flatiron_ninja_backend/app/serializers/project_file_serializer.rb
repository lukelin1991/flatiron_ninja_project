class ProjectFileSerializer < ActiveModel::Serializer
  attributes :id, :name, :image_url
  # has_one :ninja
end
