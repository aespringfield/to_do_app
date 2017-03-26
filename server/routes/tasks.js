// requires & globals

// create pg pool

// routes

// receives a task object with the following properties: desc, complete
// makes INSERT query to "tasks" table in database
// sends back 201 status code
router.post('/create', function(req, res) {

});

// makes a SELECT query to "tasks" table in database
// sends back an array of all task objects
router.get('/refresh', function(req, res) {

});

// makes an UPDATE query to "tasks" table in database
// sets boolean in "complete" column to true
// sends back 204 status code
router.put('/complete', function(req, res) {

});

// makes a DELETE query to "tasks" table in database
// deletes task from database
// sends back 204 status code
router.delete('/delete', function(req, res) {

});

// exports
