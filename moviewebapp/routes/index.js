var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('home');
  
});
	

router.get('/thelist', function(req, res){

	
	var MongoClient = mongodb.MongoClient;

	var url = 'mongodb://localhost:27017/moviemongo';
	MongoClient.connect(url, function(err,db){
		
		if(err){
			console.log('unable to connect');
		}else {
			console.log('connect');
			var query = req.query;
			res.send(query)

			if(res.query.name==="yearacc"){
				var moviedata = db.collection('moviedata') 
				moviedata.aggregate([{$group : {_id : "$year" ,movies : {$sum: 1}}}, { $sort : {_id : 1}}]).toArray(function(err, result) {
			
					if(err){
						res.send(err);
					}else if (result.length){
						res.render('list',{"list": result});
					}else {
						res.send('no doc');
					}
					console.log(req.query.name);

					db.close();
				});
			}else if(res.query.name==="yeardes"){

				var moviedata = db.collection('moviedata') 
				moviedata.aggregate([{$group : {_id : "$year" ,movies : {$sum: 1}}}, { $sort : {_id : 1}}]).toArray(function(err, result) {
			
					if(err){
						res.send(err);
					}else if (result.length){
						res.render('list',{"list": result});
					}else {
						res.send('no doc');
					}
					console.log(req.query.name);

					db.close();
				});

			}else if(res.query.name==="movieacc"){

				var moviedata = db.collection('moviedata') 
				moviedata.aggregate([{$group : {_id : "$year" ,movies : {$sum: 1}}}, { $sort : {_id : 1}}]).toArray(function(err, result) {
			
					if(err){
						res.send(err);
					}else if (result.length){
						res.render('list',{"list": result});
					}else {
						res.send('no doc');
					}
					console.log(req.query.name);

					db.close();
				});
			}else(res.query.name==="moviedes"){

				var moviedata = db.collection('moviedata') 
				moviedata.aggregate([{$group : {_id : "$year" ,movies : {$sum: 1}}}, { $sort : {_id : 1}}]).toArray(function(err, result) {
			
					if(err){
						res.send(err);
					}else if (result.length){
						res.render('list',{"list": result});
					}else {
						res.send('no doc');
					}
					console.log(req.query.name);

					db.close();
				});
			}

		}
	})
})
	

module.exports = router;




