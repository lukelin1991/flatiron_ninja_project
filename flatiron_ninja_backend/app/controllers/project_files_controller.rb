class ProjectFilesController < ApplicationController
    def index
        pFiles = ProjectFile.all
        render json: pFiles
    end
end
