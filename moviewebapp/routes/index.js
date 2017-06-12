var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/moviemongo';

/* GET home page. */
router.get('/', function(req, res, next) {
  
  MongoClient.connect(url, function(err, db){
    
    if (err) {
      console.log('unable to connect', err);
      return;
    }

    console.log(req.query);
    const sortParam = req.query.field || '_id';
    let sortDirection = req.query.dir || 'asc';
    if (sortDirection === 'asc') {
      sortDirection = 1;
    } else {
      sortDirection = -1;
    }

    const sortObj = {
      $sort: {}
    };

    // Set sorting params
    sortObj.$sort[sortParam] = sortDirection;

    console.log(sortObj)

    var query = req.query;
    var moviedata = db.collection('moviedata') 
    moviedata.aggregate([{$group : {_id : "$year" ,movies : {$sum: 1}}}, sortObj]).toArray(function(err, result) {
  
      if(err){
        res.send(err);
      }else if (result.length){
        res.render('list',{"list": result});
      }else {
        res.send('no doc');
      }

      db.close();
    });
  })
});
  

module.exports = router;
