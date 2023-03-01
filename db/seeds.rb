# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Post.destroy_all

5.times do 
    u = User.create(username: Faker::Internet.username, password: 'pass')
    2.times do 
        u.posts.create(title: Faker::Lorem.word, content: Faker::Lorem.paragraph(sentence_count: 4, random_sentences_to_add: 8))
    end
end
