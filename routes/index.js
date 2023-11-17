var express = require('express');
var router = express.Router();
const userModel = require('./users')
const postModel = require('./posts');
const { mongo } = require('mongoose');
const { all } = require('../app');
const passport = require('passport');
const localStrategy = require('passport-local') // this line helps the pasport to work with local authentication
passport.use(new localStrategy(userModel.authenticate()))

router.get('/',function(req,res){
  res.render('index',{title: 'Express'})
});

router.get('/login',function(req,res){
  res.render('login')
});

router.get('/feed',function(req,res){
  res.render('feed')
});

router.get('/profile',isLoggedIn,function(req,res){
  res.render("profile")
});

router.post('/register',function(req,res){
  const {username, email, fullname} = req.body; //Object destructuring to fetch all three
  const userData = new userModel({username, email, fullname}); //then just simply pass them directly

  userModel.register(userData,req.body.password) //This is due to plm
  .then(function(){
    passport.authenticate('local')(req,res,function(){  //Then I think this line automatically uses plm to fetch auth credentials to verify
      res.redirect('/profile')
    })
  })
});

router.post('/login',passport.authenticate('local',{
  successRedirect: "/profile",
  failureRedirect: "/login"
}),function(req,res){
});


router.post('/logout',function(req,res){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next();
  res.redirect('/login');
}



module.exports = router;
