var express = require('express');
var router = express.Router();
const {v4: uuidv4} = require('uuid');
var mongo = require('../db')

async function create () {
  // generate random uuid
  const uuid = uuidv4();
  const pass = uuidv4();
  const db = mongo.db("uuids");
  const collection = db.collection(uuid);
  // create exists with value true
  await collection.insertOne({ password: pass }, function(err) {
    if (err) throw err;
  });
  return [uuid, pass];
}

router.get('/', async function(req, res) {
  var createQuery = req.query.create; // $_GET["id"]
  if (createQuery) {
    var result = await create();
    var [uuid, pass] = result;
    res.render('created', { uuid: uuid, pass: pass})
  } else {
    res.render('create');
  }
});


module.exports = router;
