const express = require('express')
const router = express.Router();
const users = require('../controllers/users')
const catchAsync = require('../utils/catchAsync')
const passport = require('passport');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    //este paso es como el que hicimos con bcrypt de comparar los hashes y si es correcto asignarle a session un id 
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

// router.get('/logout', (req, res) => {// no funciona
//     req.logout(); // passport nos agregaautomaticamente esta funcionaliidad 
//     req.flash('success', 'See you soon! Goodbye!');
//     res.redirect('/campgrounds');
// })

router.get("/logout", users.logout);

module.exports = router
