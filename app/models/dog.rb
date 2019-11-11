class Dog < ApplicationRecord
has_one :rating
has_many :comments
end
