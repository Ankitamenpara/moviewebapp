var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('home');
  
});
	

router.get('/thelist', function(req, res){
	var query = req.query
	res.send(query)
	
	//if(req.query.name=="yearAcc"){
		//router.get('/thelist', function(req, res){	
			var MongoClient = mongodb.MongoClient;

			var url = 'mongodb://localhost:27017/moviemongo';
			MongoClient.connect(url, function(err,db){
				if(err){
					console.log('unable to connect');
				}else {
					console.log('connect');
			
					var moviedata = db.collection('moviedata') 
					moviedata.aggregate([{$group : {_id : "$year" ,movies : {$sum: 1}}}, { $sort : {_id : 1}}]).toArray(function(err, result) {
			
						if(err){
							res.send(err);
						}else if (result.length){
							res.render('list',{"list": result
						});
						}else {
							res.send('no doc');
						}
						console.log(req.query.name);

						db.close();
					});
				}
			})
})
	/*}else if(req.query.name=="yearDes"){
	
		router.get('/thelist', function(req, res){
			var MongoClient = mongodb.MongoClient;

			var url = 'mongodb://localhost:27017/moviemongo';
			MongoClient.connect(url, function(err,db){
				if(err){
					console.log('unable to connect');
				}else {
					console.log('connect');
			

					var moviedata = db.collection('moviedata') 
					moviedata.aggregate([{$group : {_id : "$year" ,movies : {$sum: 1}}}, { $sort : {_id : -1}}]).toArray(function(err, result) {
			
						if(err){
						res.send(err);
						}else if (result.length){
							res.render('list',{"list": result
						});
						}else {
							res.send('no doc');
					}
					console.log(req.query.name);

				

					db.close();
				});
			}
		})
	})
	}else if(req.query.name=="movieAcc"){
	router.get('/thelist', function(req, res){
	var MongoClient = mongodb.MongoClient;

	var url = 'mongodb://localhost:27017/moviemongo';
	MongoClient.connect(url, function(err,db){
		if(err){
			console.log('unable to connect');
		}else {
			console.log('connect');
			//var collection = db.collection('moviedata');

			var moviedata = db.collection('moviedata') 
			moviedata.aggregate([{$group : {_id : "$year" ,movies : {$sum: 1}}}, { $sort : {movies : 1}}]).toArray(function(err, result) {
			//moviedata.find({}).toArray(function(err,result){
				//console.log(result)
				if(err){
					res.send(err);
				}else if (result.length){
					res.render('list',{"list": result
				});
				}else {
					res.send('no doc');
				}
				console.log(req.query.name);

				

				db.close();
			});
		}
	})
})
}else if(req.query.name=="movieDes"){
	router.get('/thelist', function(req, res){
	var MongoClient = mongodb.MongoClient;

	var url = 'mongodb://localhost:27017/moviemongo';
	MongoClient.connect(url, function(err,db){
		if(err){
			console.log('unable to connect');
		}else {
			console.log('connect');
			//var collection = db.collection('moviedata');

			var moviedata = db.collection('moviedata') 
			moviedata.aggregate([{$group : {_id : "$year" ,movies : {$sum: 1}}}, { $sort : {movies : -1}}]).toArray(function(err, result) {
			//moviedata.find({}).toArray(function(err,result){
				//console.log(result)
				if(err){
					res.send(err);
				}else if (result.length){
					res.render('list',{"list": result
				});
				}else {
					res.send('no doc');
				}
				console.log(req.query.name);

				

				db.close();
			});
		}
	})
})
}else{
	console.log('nothing');
}
});*/




module.exports = router;




