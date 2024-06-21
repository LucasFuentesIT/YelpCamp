const Campground = require('../models/campground');
const Review = require('../models/review')

module.exports.createReview = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Created new review!') // req.flash para trabajar con el flash. primer termino asigna una 'variable',y segundo 'mensaje flash'
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findOneAndUpdate(id, { $pull: { reviews: reviewId } });//operador $pull en mongoDB.com https://www.mongodb.com/docs/manual/reference/operator/update/pull/
    await Review.findOneAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review!')
    res.redirect(`/campgrounds/${id}`)
}
