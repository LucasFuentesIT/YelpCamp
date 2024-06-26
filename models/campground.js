const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Review = require('./review')

const ImageSchema = new Schema({
    url: String,
    filename: String
})
ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
})

const opts = {toJSON:{virtuals:true}}

const CampgroundSchema = new Schema({
    title: String,
    price: Number,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }]
},opts);


CampgroundSchema.virtual('properties.popUpMarkup').get(function () { // agregamos una propiedad virtual por fuera del schema
    return `<strong><a href='campgrounds/${this._id}'>${this.title}</a></strong>
    <p>${this.description.substring(0,30)}...</p>`;
})

CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.remove({
            _id: {
                $in: doc.reviews
            }
            //de esta forma se elimina todo el esquema donde se hizo el
            //  campamento y con el if elimina todo lo que esta dentro del array de las reviws 

        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema)