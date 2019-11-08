records = RestClient.get 'https://random.dog/doggos?filter=mp4,webm'

parsedRecords = JSON.parse(records)

500.times do
    Dog.create(image_url: "https://random.dog/#{parsedRecords.sample}")
end

puts "Seeded!"