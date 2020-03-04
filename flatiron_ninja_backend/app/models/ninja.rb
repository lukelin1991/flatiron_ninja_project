class Ninja < ApplicationRecord
    has_many :project_files, dependent: :destroy
end
