var express = require('express');
var router = express.Router();

router.get('/webhook', function(req, res, next) {
  if (req.query['hub.verify_token'] === 'thanhvt') {
    console.log(req.body)
    res.send(req.query['hub.challenge']);
  } else {
    res.send('nothing');
  }
});

router.post('/webhook', function(req, res, next) {
  console.log(req.body);
  res.send(req.query['hub.challenge']);
});

module.exports = router;

// module.exports = router => {
//   router.get('/webhook', function (req, res, next) {
//     if (req.query['hub_verify_token'] === 'thanhvt') {
//       console.log(req.body)
//       res.send(req.query['hub_challenge']);
//     } else {
//       res.send('nothing');
//     }
//   });
//
//   router.post('/webhook', function (req, res, next) {
//     if (req.query['hub_verify_token'] === 'thanhvt') {
//       console.log(req.body);
//       res.send(req.query['hub_challenge']);
//     } else {
//       res.send('nothing');
//     }
//   });
// }

