var express = require('express');
var router = express.Router();
var mongo = require("../db.js")

async function saveMessage(uuid, message) {
  const db = mongo.db("uuids");
  const collection = db.collection(uuid);
  const doc = await collection.findOne({});
    if (doc) {
      await collection.insertOne({ message: message });
    }
}

router.get('/', async function(req, res) {
  const uuid = req.query.uuid;
  if (uuid) {
    const db = mongo.db("uuids");
    try {
      // Try to find a document in the collection
      const doc = await db.collection(uuid).findOne({});
      if (doc) {
        // If we found a document, the collection exists
        res.render('send', { uuid: uuid });
      } else {
        // If we didn't find a document, the collection may not exist
        res.render('noSuchUser');
      }
    } catch (err) {
      // If the find operation failed, the collection does not exist
      res.render('noSuchUser');
    }
  } else {
    res.render('send');
  }
});


router.post('/inProgress', async function(req, res) {
  var uuid = req.body.uuid;
  var message = req.body.message;
  if (uuid && message) {
    await saveMessage(uuid, message);
    res.redirect('/send/done');
  }
  else {
    res.render("error")
  }
})

router.get('/done', function(req, res) {
  res.render("sent")
})

module.exports = router;

