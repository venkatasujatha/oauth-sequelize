const passport =require('passport');
const express = require('express');
const appConfig = require('../config/config')
var router = express.Router();

router.get('/index',function (req, res) {
    res.render('/home/tectoro/Downloads/oauth-api/views/pages/index.ejs');
})

router.get('/login',isLoggedIn, function (req, res) {
    res.render('/home/tectoro/Downloads/oauth-api/views/pages/login.ejs',{user: req.user});
})
router.get('/profile',isLoggedIn, function (req, res) {
    res.render('/home/tectoro/Downloads/oauth-api/views/pages/profile.ejs',{user: req.user});
})


router.get('/auth/facebook',passport.authenticate('facebook',{scope:['public_profile','email']}));

router.get('/auth/facebook/callback',function () {
    passport.authenticate('facebook',{success:'/profile',failureRedirect:'/error'})
})

router.get('/logout',function(req, res){
    req.logOut();
    res.redirect('/index');
})
function isLoggedIn(req, res,next) {
    if(req.isAuthenticated())
    return next();
    res.redirect('/index');
}

module.exports=router