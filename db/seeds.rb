# records = RestClient.get 'https://random.dog/doggos?filter=mp4,webm'

# parsedRecords = JSON.parse(records)

# parsedRecords.each do |record|
#     Dog.create(image_url: "https://random.dog/#{record}")
# end

# Dog.all.each do |dog|
#     Rating.create(value:rand(10..20), dog_id: dog.id)
# end

parsedDogs = JSON.parse(File.read('cuteemergency.json'))
parsedDogs2 = JSON.parse(File.read('cutestpetdogs.json'))
parsedDogs3 = JSON.parse(File.read('thedaiiypuppy.json'))


newDogs = parsedDogs.select do |dog|
    dog.extend Hashie::Extensions::DeepFind
    dog.deep_find("media_url")
end

newDogs.each do |dog|
    dog.extend Hashie::Extensions::DeepFind
    Dog.create(image_url: dog.deep_find("media_url"))
end

newDogs2 = parsedDogs2.select do |dog|
    dog.extend Hashie::Extensions::DeepFind
    dog.deep_find("media_url")
end

newDogs2.each do |dog|
    dog.extend Hashie::Extensions::DeepFind
    Dog.create(image_url: dog.deep_find("media_url"))
end

newDogs3 = parsedDogs3.select do |dog|
    dog.extend Hashie::Extensions::DeepFind
    dog.deep_find("media_url")
end

newDogs3.each do |dog|
    dog.extend Hashie::Extensions::DeepFind
    Dog.create(image_url: dog.deep_find("media_url"))
end

Dog.all.each do |dog|
    Rating.create(value:rand(10..20), dog_id: dog.id)
end

Dog.all.each do |dog|
    Comment.create(author:Faker::Name.first_name, content:Faker::TvShows::Buffy.quote, dog_id: dog.id)
end

Dog.all.each do |dog|
    i  = rand(1..20)
    i.times do
        Like.create(dog_id:dog.id)
    end
end

puts "Seeded!"
