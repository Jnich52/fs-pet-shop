const express = require("express");
//{} are there for destructuring
const { Client, Pool } = require("pg");
//const Client = require('pg').Client
//goes into the specific object and grabs info
const app = express();
app.use(express.json());
const PORT = 8080;

const morGan = require("morgan");
const { restart } = require("nodemon");

const connectionString = "postgresql://postgres:docker@127.0.0.1:5432/pet_shop";
const client = new Client({
  connectionString: connectionString,
});
client.connect();

app.get("/", (req, res) => {
  res.send("Hello World");
});

// app.get("/pets", (req, res) => {
//   res.send("Something new");
// });

app.get("/pets", function (req, res) {
  client
    .query("SELECT * FROM pets")
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      res.send(err);
      console.error(err);
    });
});

app.get("/pets/:id", function (req, res) {
  client
    .query(`SELECT * FROM pets WHERE id = ${req.params.id}`)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      res.send(err);
      console.error(err);
    });
});

app.patch("/pets/:id", (req, res) => {
  console.log(req.body);
  let animal = req.body;
  let setStr = "";
  let elements = [];
  for (element in animal) {
    console.log(element, animal[element]);
    elements.push(element + "='" + animal[element] + "'");
  }
  console.log(elements.toString());

  client
    .query(`UPDATE pets SET ${elements.toString()} WHERE id=${req.params.id} `)
    .then((result) => {
      res.send(req.body);
    });
});

app.delete("/pets/:id", (req, res) => {
  client
    .query(`DELETE FROM pets WHERE id = ${req.params.id}`)
    //   res.send("DELETE pets Called");
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      res.send(err);
      console.error(err);
    });
});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});

client
  .query(`UPDATE pets SET ${elements.toString()} WHERE id=${req.params.id} `)
  .then((result) => {
    res.send(req.body);
  });

// app.get("/pets/1", function (req, res) {
//   fs.readFile(petsPath, "utf8", function (err, data) {
//     if (err) {
//       console.error(err.stack);
//       return res.sendStatus(404);
//     }
//     var database = JSON.parse(data);
//     var fun = database[1];
//     res.send(JSON.stringify(fun));
//   });
// });

app.listen(PORT, () => {
  console.log(`Our app running on ${PORT}`);
});
