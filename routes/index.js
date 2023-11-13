var express = require('express');
var router = express.Router();
const userModel = require('./users')
const postModel = require('./posts')


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
      postText: 'this is some dummy post text',
    }
  )

  res.send(createdpost)
});




module.exports = router;
