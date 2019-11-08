class DogsController < ApplicationController
    def index
        dogs = Dog.all
        render json: dogs.to_json(:include => {
      :rating => {:only => [:dog_id, :value]}})
    end

end


