var express = require('express');
var router = express.Router();

const userRoutes = require('./users');

const app = new express();

app.use('fb-comment', userRoutes)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
