records = RestClient.get 'https://random.dog/doggos?filter=mp4,webm'

parsedRecords = JSON.parse(records)

parsedRecords.each do |record|
    Dog.create(image_url: "https://random.dog/#{record}")
end

Dog.all.each do |dog|
    Rating.create(value:rand(10..20), dog_id: dog.id)
end

puts "Seeded!"