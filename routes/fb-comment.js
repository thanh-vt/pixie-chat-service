var express = require('express');
var router = express.Router();
require('dotenv').config();
const initOptions = {
  schema: 'pixie_chat'
};
const connectionParams = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
}

const pgp = require('pg-promise')(initOptions)
const db = pgp(connectionParams)

router.get('/webhook', function (req, res, next) {
  if (req.query['hub.verify_token'] === 'thanhvt') {
    console.log(req.body)
    res.send(req.query['hub.challenge']);
  } else {
    res.send('nothing');
  }
});

router.post('/webhook', async function (req, res, next) {
  console.log(typeof req.body);
  db.tx(t => {
    t.none('INSERT INTO request_info(body, create_time) VALUES(${body}, ${time})',
        {
          body: req.body,
          time: new Date()
        });

  }).then((data) => {
    console.log('INSERT SUCCESS:', req.body)
  })
  .catch((error) => {
    console.log('ERROR:', error)
  })
  .finally(() => {
    res.json(req.body);
  })
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

