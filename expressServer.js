var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var fs = require('fs');
var http = require('http');
var path = require('path');
var petsPath = path.join(__dirname, "pets.json");

//app.get('/pets/:id', function(req, res) {

app.get('/pets', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(err, petsJSON) {
      if (err) {
        console.error(err.stack);
        return res.sendStatus(404);
      }
      var pets = JSON.parse(petsJSON)
      res.send(petsJSON);
    });
});
app.get('/pets/0', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(err, slime) {
      if (err) {
        console.error(err.stack);
        return res.sendStatus(404);
      }
      var database = JSON.parse(slime)
      var boring = database[0];
      res.send(JSON.stringify(boring));
    });
});
app.get('/pets/1', function(req, res) {
    fs.readFile(petsPath, 'utf8', function(err, data) {
      if (err) {
        console.error(err.stack);
        return res.sendStatus(404);
      }
      var database = JSON.parse(data)
      var fun = database[1];
      res.send(JSON.stringify(fun));
    });
});
  
//  app.get('/pets/:num', (req, res) => {
//     const num = req.params.num;
//     if (!number(num)) {
//         res.status(404).json({ error: {message: "Not found"} });
//         console.log("Not found, please enter a proper number")
//     } else {
//         res.json({ message: `${num} is a great number.`})
//     }
    app.get('/pets/:num', (req, res, next) => {
        const num = req.params.num
        if (!Number(num)) {
          next({ status: 400, message: 'Please enter a number!' })
        } else {
          res.json({ message: `${num} is a great number.` })
        }
      })
      
      app.use((err, req, res, next) => {
        res.status(err.status).json({ error: err })
      })


app.listen(8080, function(){
    console.log(`Listening on port: ${port}`);
})
