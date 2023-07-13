var express = require('express');
var router = express.Router();
var mongo = require('../db');
var ObjectId = require('mongodb').ObjectId;

async function getMessages(uuid, pass) {
  const db = mongo.db("uuids");

  // Check if the collection with the name 'uuid' exists
  const doc = await collection.findOne({});
  const collection = db.collection(uuid);
  if (doc) {
    const result = await collection.find({}).toArray();
    return result;
  }
}

async function deleteMessage(uuid, messageId) {
  try {
    const db = mongo.db("uuids");
    const collection = db.collection(uuid);
    await collection.deleteOne({ _id: new ObjectId(messageId) });
  } catch (error) {
    console.error(error);
  }
}

router.get('/', async function(req, res) {
  const uuid = req.query.uuid;
  const pass = req.query.pass;
  if (uuid && pass) {
    var result = await getMessages(uuid, pass);
    if (result === null) {
      res.render('noSuchUser');  // Render different template if collection does not exist
    } else {
      res.render('viewMessages', { uuid: uuid, result: result });
    }
  } else {
    res.render('inputId');
  }
});

router.post('/deleteMessage', async function(req, res) {
  const uuid = req.body.uuid;
  const messageId = req.body.messageId;
  if (uuid && messageId) {
    await deleteMessage(uuid, messageId);
    res.redirect('back');  // Redirect to the home page (or wherever you want) after deleting
  } else {
    res.render('error', { message: 'Missing parameters for message deletion.' });
  }
});



module.exports = router;
