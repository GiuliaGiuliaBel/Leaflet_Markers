const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const url = 'mongodb://localhost/markers';
const log = require('../libs/log')(module);
app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/api/user_places_reviews', (req, res) => {
  db.collection('markers').find().toArray().then(markers=> {
    res.json({ records: markers })
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});

app.post('/api/user_places_reviews', (req, res) => {
  const newMarker = req.body;
  db.collection('markers').insertOne(newMarker).then(result =>
    db.collection('markers').find({ _id: result.insertedId }).limit(1).next()
    ).then(newMarker => {
     res.json(newMarker);
   }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});

let db;
app.get("*",(req, res) => {
  res.sendFile(path.resolve('static/index.html'));
  console.log('App started on port 3000');
});

process.on('uncaughtException', function (err) {
  log.error((new Date).toUTCString() + ' uncaughtException:', err.message);
  log.error(err.stack);
  process.exit(1);
});

MongoClient.connect(url).then(connection => {
  db = connection;
  app.listen(PORT,onListening);
});

function onListening(){
  console.log(`Listening on port ${PORT}`)
}