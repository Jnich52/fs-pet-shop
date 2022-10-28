
const fs = require('fs');
const http = require('http');
const port = process.env.PORT || 8000;

const server = http.createServer(function(req, res) {
    if (req.method === 'GET' && req.url === '/pets'){
        fs.readFile("pets.json", 'utf-8', function(error, data) {
            if(error){
            console.error(err.stack);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Not Found');
            };
                  
            var pets = JSON.parse(data)
            console.log(pets)
            petsJSON = JSON.stringify(pets)
            res.setHeader('Content-Type', 'application/json')
            res.end(petsJSON)
            
        })
    } else if (req.method === 'GET' && req.url === '/pets/0') {
        fs.readFile('pets.json' , 'utf-8', function(error, data){
            if (error){
                console.error(err.stack);
             res.statusCode = 500;
             res.setHeader('Content-Type', 'text/plain');
             return res.end(pets.JSON);
            }
            var pets = JSON.parse(data)
            var petsJSONAt0 = JSON.stringify(pets[0]);
            res.setHeader('Content-Type', 'application/json');
            res.end(petsJSONAt0);
            })
     }
     else if (req.method === 'GET' && req.url === '/pets/1') {
         fs.readFile('pets.json' , 'utf-8', function(error, data){
            if (error){
                console.error(err.stack);
             res.statusCode = 500;
             res.setHeader('Content-Type', 'text/plain');
             res.end('Internal Service Error');
             }
             var pets = JSON.parse(data)
             var petsJSONAt1 = JSON.stringify(pets[1]);
             res.setHeader('Content-Type', 'application/json');
             res.end(petsJSONAt1);
            })
     }

     else {
     res.statusCode= 404;
     res.setHeader('Content-Type', 'text/plain');
     res.end('Not found');
}
})

server.listen(port, function() {
    console.log('Listening on port', port);
  })
