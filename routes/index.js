var express = require('express');
var router = express.Router();
const userModel = require('./users')
const postModel = require('./posts');
const { mongo } = require('mongoose');
const { all, post } = require('../app');
const passport = require('passport');
const upload = require('./multer')
const localStrategy = require('passport-local') // this line helps the pasport to work with local authentication
passport.use(new localStrategy(userModel.authenticate()))

router.get('/',function(req,res){
  res.render('index',{title: 'Express'})
});

router.get('/login', function(req, res) {
  // console.log(req.flash('error')) //make sure to comment this when passing the error in render so that the flash doesnt get called twice and the array gets reset
  res.render('login', { error: req.flash('error') });
});

router.get('/feed',isLoggedIn,function(req,res){
  res.render('feed')
});
router.get('/forgot',function(req,res){
  res.redirect("/")
});

router.post('/upload',isLoggedIn ,upload.single('file'),async function(req,res){ //here the upload.single("file") fetches the filename from the requests and sends it to multer for name change and upload
  if(!req.file){
    return res.status(404).send("where the file at bro?")
  }
  const user = await userModel.findOne({username: req.session.passport.user})
  const newPost = await postModel.create({
    postText: req.body.caption,
    user: user._id,
    image: req.file.filename  //This contains the changed filename after submit that uuid creates
  });
  user.posts.push(newPost._id)
  await user.save();
  res.redirect("/profile")
});

router.get('/profile',isLoggedIn,async function(req,res){
  const user = await userModel.findOne({
    username: req.session.passport.user //passport store the logged in user in this session token
  }).populate("posts")
  
  res.render("profile", {user: user})
});

router.get('/settings',isLoggedIn,function(req,res){
  res.send("settings")
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
  failureRedirect: "/login",
  failureFlash: true
}),function(req,res){
});

router.get('/logout',function(req,res){
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
