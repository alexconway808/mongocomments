//restify docs
//mongo docs

var fs = require('fs');

var mongoose = require ('mongoose');
mongoose.connect('mongodb://user1:Bunny2010!@ds061298.mongolab.com:61298/mongocomments') // copy in url from mongodb and add my username in front

//Create the comment schema
var Schema = mongoose.Schema;

//Define the comment schema
var commentSchema = new Schema({
  comment_text: String
});

//Define the comment model
var Comment = mongoose.model('Comment', commentSchema);

var restify = require('restify');

var server = restify.createServer({
  name: 'app',
  version: '0.0.0'

});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());


server.get(/.*/, function (req, res) {
  
  var body = "Hello World";
  
  res.writeHead(200, {
    'Content-Type': Buffer.byteLength(body),
    'Content-Type' : 'text/html'
  });

  res.write(body);
  res.send();

});


server.post('/post_comment', function(req, res){
  var comment = new Comment ({
    comment_text: req.body.comment
  });

  comment.save(function(err){

    res.send("Your comments have been saved");

  });

});


server.listen(1337, function () {
  console.log('%s listening at %s', server.name, server.url);
});


