class ProjectFileSerializer < ActiveModel::Serializer
  attributes :id, :images, :is_found
  has_one :ninja
end
