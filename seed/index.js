const mongoose = require('mongoose')
const Campground = require('../models/campground');
const cities = require('../seed/cities')
const seedhelper = require('../seed/seedshelper')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database connected')
})
const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 300; i++) {
        const price = Math.floor(Math.random() * 30 + 10)
        const rand1000 = Math.floor(Math.random() * 1000)
        const camp = new Campground({
            author: '6352b5fd985173cc0e459f2e',
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
            geometry: { type: 'Point',
            coordinates: [
                cities[rand1000].longitude,
                cities[rand1000].latitude
            ] },
            title: `${sample(seedhelper.descriptors)} ${sample(seedhelper.places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil natus quidem perspiciatis et expedita architecto nemo corporis recusandae exercitationem, enim repellendus beatae odit unde eius possimus dolore sit, voluptas repellat!',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/duyqconpj/image/upload/v1671232380/YelpCamp/uhatygvp6ieyyqi7ipa4.jpg',
                    filename: 'YelpCamp/spisjnne3opswkcac7sq',
                },
                {
                    url: 'https://res.cloudinary.com/duyqconpj/image/upload/v1671208238/YelpCamp/tc4rmypk5edfcauso5ws.jpg',
                    filename: 'YelpCamp/wsrohjes1px1z1gifcvw',
                },
                {
                    url: 'https://res.cloudinary.com/duyqconpj/image/upload/v1671198367/YelpCamp/azgnopkweebxeoz4fibk.jpg',
                    filename: 'YelpCamp/kiwcuxjbxgxdrrl65mua',
                }]
        })
        await camp.save()
    }
}
seedDB().then(() => {
    mongoose.connection.close();
}) 