const express = require('express');
const router = express.Router({ mergeParams: true });// para que podamos usar nuestros parametros de id ????
const catchAsync = require('../utils/catchAsync');
const reviews = require('../controllers/reviews')
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')

const ExpressError = require('../utils/ExpressError');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;
