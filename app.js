var express = require("express"),
  bodyParser = require("body-parser"),
  request = require("request"),
  app = express();

// Middleware for ejs, grabbing HTML and including static files
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}) );
app.use(express.static(__dirname + '/public'));

var bgColor;

app.get('/', function(req,res){

  var url = "http://www.colr.org/json/color/random";

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {

      var obj = JSON.parse(body);
      if(obj.colors[0].tags[0].name){
        bgColor = obj.colors[0].hex;
        res.render("global/index", {color:obj.colors, bgColor : bgColor});
      }
      if (obj.colors[0].tags[0].name === 'undefined'){
        bgColor = "999";
        res.send("something went wrong :(")
      }

    }
    if(error){
      bgColor = "999";
      res.send("Error :(")
    }
  });
});

// catch-all for 404 errors
app.get('*', function(req,res){
  res.status(404);
  res.send('404');
});


app.listen(3000, function(){
  console.log("get this party started on port 3000");
});
