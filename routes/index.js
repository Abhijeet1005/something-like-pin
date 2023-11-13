var express = require('express');
var router = express.Router();
const userModel = require('./users')
const postModel = require('./posts');
const { mongo } = require('mongoose');
const { all } = require('../app');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/createuser', async function(req, res, next) {
  let createduser = await userModel.create(
    {
      username: 'asc',
      password: 'asc',
      fullName: 'abhijet singh chauhan',
      posts: [],
      email: 'asc@gmail.com',
    })

  res.send(createduser)
});
router.get('/createpost', async function(req, res, next) {
  let createdpost = await postModel.create(
    {
      postText: 'this is second post from the same user ',
      user: '6552028edb72068061e6806b'
    }
  )
  let user  = await userModel.findOne({_id: '6552028edb72068061e6806b'})
  user.posts.push(createdpost._id);
  await user.save();
  res.send("done")
});

router.get('/userposts', async function(req, res, next) {
  let allusers = await userModel.findOne({_id: '6552028edb72068061e6806b'}).populate('posts') //This populates the IDs with the associated data and it knows coz we passed ref with type
  
  res.send(allusers)
});




module.exports = router;
