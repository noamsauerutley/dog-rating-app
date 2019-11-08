class RatingsController < ApplicationController

    def index
        render json: Rating.all
    end
end
