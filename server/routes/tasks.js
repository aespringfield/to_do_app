// requires & globals
var express = require('express');
var router = express.Router();
var pg = require('pg');

// create pg pool
var config = {
  host: 'localhost',
  port: 5432,
  database: 'chi',
  max: 20,
  idleTimeoutMillis: 30000
};

var pool = new pg.Pool(config);

// routes

// receives a task object with the following properties: description, complete
// makes INSERT query to "tasks" table in database
// sends back 201 status code
router.post('/create', function(req, res) {
  var task = req.body;
  console.log(task);
  pool.connect(function(connectionError, db, done) {
    if (connectionError) {
      console.log("ERROR CONNECTING TO DATABASE");
      res.sendStatus(500);
    } else {
      db.query('INSERT INTO "tasks" ("description", "complete") VALUES ($1, $2)',
      [task.description, task.complete], function(queryError, result) {
        done();
        if (queryError) {
          console.log("ERROR MAKING QUERY");
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
});

// makes a SELECT query to "tasks" table in database
// sends back an array of all task objects
router.get('/refresh', function(req, res) {
  pool.connect(function(connectionError, db, done) {
    if (connectionError) {
      console.log("ERROR CONNECTING TO DATABASE");
      res.sendStatus(500);
    } else {
      db.query('SELECT * FROM "tasks" ORDER BY "complete", "id" DESC', function(queryError, result){
        done();
        if (queryError) {
          console.log("ERROR MAKING QUERY");
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });
    }
  });
});

// makes an UPDATE query to "tasks" table in database
// sets boolean in "complete" column to true
// sends back 204 status code
router.put('/complete', function(req, res) {
  var task = req.body;
  pool.connect(function(connectionError, db, done) {
    if (connectionError) {
      console.log("ERROR CONNECTING TO DATABASE");
      res.sendStatus(500);
    } else {
      db.query('UPDATE "tasks" SET "complete" = $1 WHERE "id" = $2',
      [task.complete, task.id], function(queryError, result) {
        done();
        if (queryError) {
          console.log("ERROR MAKING QUERY");
          res.sendStatus(500);
        } else {
          res.sendStatus(204);
        }
      });
    }
  });
});

// makes a DELETE query to "tasks" table in database
// deletes task from database
// sends back 204 status code
router.delete('/delete', function(req, res) {
  var task = req.body;
  pool.connect(function(connectionError, db, done) {
    if (connectionError) {
      console.log("ERROR CONNECTING TO DATABASE");
      res.sendStatus(500);
    } else {
      db.query('DELETE FROM "tasks" WHERE "id"=$1',
      [task.id], function(queryError, result) {
        done();
        if (queryError) {
          console.log("ERROR MAKING QUERY");
          res.sendStatus(500);
        } else {
          res.sendStatus(204);
        }
      });
    }
  });
});

// exports
module.exports = router;
