records = RestClient.get 'https://random.dog/doggos'

parsedRecords = JSON.parse(records)

500.times do
    Dog.create(image_url: parsedRecords.sample)
end

puts "Seeded!"