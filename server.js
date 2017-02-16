var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongo = require('mongodb');
var assert = require('assert');
app.set('port', (process.env.PORT || 5000));
var path = require('path');
app.use(express.static('public'));
var MongoClient = require('mongodb').MongoClient;
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/css/:in', function(req, res) {
    res.sendFile(path.join(__dirname + '/css/'+req.params.in));
});
app.get('/js/:in', function(req, res) {
    res.sendFile(path.join(__dirname + '/js/'+req.params.in));
});
app.get('/Pages/:in', function(req, res) {
    res.sendFile(path.join(__dirname + '/Pages/'+req.params.in));
});
app.get('/lib/:in', function(req, res) {
    res.sendFile(path.join(__dirname + '/lib/'+req.params.in));
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/api/books' , function(req,res){
    //returns all book;
    console.log("all books");
    MongoClient.connect("mongodb://muthu-97:bookuser@ds153609.mlab.com:53609/book-app", function(err, db) {
  if(err) { console.log('error');return false; }
  var result='[';
  db.collection("books").find().toArray(function(err, sd) {
    for(var i=0;i<sd.length;i++){
        result+=JSON.stringify(sd[i]);
        if(sd.length-1!=i)
        result+=',';
    }
    result+=']';
    res.send(result);
  });
  });
});
app.post('/api/books' , function(req,res){
//creates a new book
console.log("add book");
var book={};
    book.title=req.body.title;
    book.author=req.body.author;
    book.releaseYear=req.body.releaseYear;
    book.genre=req.body.genre;
    MongoClient.connect("mongodb://muthu-97:bookuser@ds153609.mlab.com:53609/book-app", function(err, db) {
  if(err) { console.log('error');return false; }
  db.collection("books").insert(book);
  res.send(book);
  });

});

app.get('/api/books/:id' , function(req,res){
    //returns a book;
    console.log("1 book");
    var q={};
    q._id= new mongo.ObjectID(req.params.id);
    MongoClient.connect("mongodb://muthu-97:bookuser@ds153609.mlab.com:53609/book-app", function(err, db) {
  if(err) { console.log('error');return false; }
  db.collection("books").find(q).toArray(function(err, sd) {
    res.send(sd[0]);
  });
  });

  });

app.put('/api/books/:id' , function(req,res){
    console.log("update book");
    var q={};
    q._id= new mongo.ObjectID(req.params.id);
    var book={};
   book.title=req.body.title;
    book.author=req.body.author;
    book.releaseYear=req.body.releaseYear;
    book.genre=req.body.genre;
    MongoClient.connect("mongodb://muthu-97:bookuser@ds153609.mlab.com:53609/book-app", function(err, db) {
  if(err) { console.log('error');return false; }
  db.collection("books").update(q,book);
  res.send(book);
  });
  });

app.delete('/api/books/:id' , function(req,res){
    //deletes a book;
    console.log("delete book");
  var q={};
    q._id= new mongo.ObjectID(req.params.id);
    MongoClient.connect("mongodb://muthu-97:bookuser@ds153609.mlab.com:53609/book-app", function(err, db) {
  if(err) { console.log('error');return false; }
  db.collection("books").remove(q);
  });
  });