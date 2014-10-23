Color-api
=========

Example of calling an external API to generate and store a color

    
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
        res.send("Error :(")
      }
    });


## Use cases

1. If you need a color when adding an object to the database
- Assign the generated color to a color varaible and add that

Example:
    var color;
    var url = "http://www.colr.org/json/color/random";
  
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
  
        var obj = JSON.parse(body);
        if(obj.colors[0].tags[0].name){
          color = obj.colors[0].hex;
          return color;
        }
        
      }
      
      
    });
    
    
You now have a color variable. If your user model looked like this:

USER
|- name
|- email
|- age
|- password
|- color
