class NinjasController < ApplicationController
    def index
        ninjas = Ninja.all
        render json: ninjas
    end

    def show
        ninja = Ninja.find(params[:id])
        render json: ninja
    end

    def create
        ninja = Ninja.create(
            name: params[:name],
            folder: 0
        )

        all_files = [
            {
                # id: 1, #html
                name: "html",
                image_url: "html_icon.png"
            },
            {
                # id: 2, #css
                name: "css",
                image_url: "css_icon.png"
            },
            {
                # id: 3, #js
                name: "js",
                image_url: "js_icon.png"
            },
            {
                # id: 4, #git
                name: "git",
                image_url: "github_icon.png"
            },
            {
                # id: 5, #gif
                name: "gif",
                image_url: "gif_icon.png"
            },
            {
                # id: 6, #docx
                name: "docx",
                image_url: "docx_icon.png"
            },
            {
                # id: 7, #sql
                name: "sql",
                image_url: "sql_icon.png"
            },
            {
                # id: 8, #rb
                name: "rb",
                image_url: "rb_icon.png"
            },
            {
                # id: 9, #svg
                name: "svg",
                image_url: "svg_icon.png"
            },
            {
                # id: 10, #mp4
                name: "mp4",
                image_url: "mp4_icon.png"
            }
        ]

        all_files.each do |file_hash|
            ProjectFile.create(
                name: file_hash[:name],
                image_url: file_hash[:image_url],
                ninja: ninja
            )
        end
        
        render json: ninja
    end

    def destroy
        ninja = Ninja.find(params[:id])
        ninja.destroy
        render json: "99 bottles of dead nin's on the wall."
    end
end
