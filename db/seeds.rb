records = RestClient.get 'https://random.dog/doggos?filter=mp4,webm'

parsedRecords = JSON.parse(records)

500.times do
    Dog.create(image_url: "https://random.dog/#{parsedRecords.sample}")
end

Dog.all.each do |dog|
    Rating.create(value:rand(10.0..100.0), dog_id: dog.id)
end

puts "Seeded!"