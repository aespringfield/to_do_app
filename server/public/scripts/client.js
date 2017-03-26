$(document).ready(function() {
  submitTask();
});

// listens for form submits through "Add task" button, stores task in database, and
// refreshes task list
function submitTask() {
  $('.taskForm').on('submit', function(e) {
    e.preventDefault();

    // check to make sure input has been entered
    var description = $('.taskDesc').val();
    if (description) {

      // create task object
      var task = {
        description: $('.taskDesc').val(),
        complete: false
      };

      // store task in database and refresh task list
      storeAndRefresh(task);
    } else {
      $('.taskForm').trigger('reset');
      displayErrorMsg();
    }
  });
}

// takes task object with properties description, complete
// sends POST request to store task object in database
// if successful, refreshes tasks displayed on DOM
function storeAndRefresh(task) {
  $.ajax({
    type: 'POST',
    url: '/tasks/create',
    data: task,
    success: function(response) {
      console.log("Successful post");
      refreshTasks();
    },
    error: function() {
      console.log("Failed to post");
    }
  });
}

// sends GET request for all items in "tasks" table
// if successful, empties taskContainer and appends all tasks
function refreshTasks() {
  $.ajax({
    type: 'GET',
    url: '/tasks/refresh',
    success: function(response) {
      console.log(response);
      appendTasks(response);
    }
  });
}

// takes an array of task objects with properties id, description, and complete
// empties taskContainer of old set of tasks
// appends new set of tasks to DOM
function appendTasks(taskArray) {
  $el = $(".taskContainer");
  $el.empty();
  for (var i = 0; i < taskArray.length; i++) {
    var taskDiv = createTaskDiv(taskArray[i]);
    $el.append(taskDiv);
  }
}

// takes a task object with properties id, description, and complete
// creates a div with the task description, a complete button, and a delete button
function createTaskDiv(task) {
    var taskDesc = '<p>' + task.description + '</p>';
    var completeButton = '<button class="completeButton">Complete</button>';
    var deleteButton = '<button class="deleteButton">Delete</button>';
    var dataAttrTaskId = 'data-taskId=' + task.id + " ";
    var dataAttrComplete = 'data-complete=' + task.complete;
    var taskDiv ='<div class="task"' + dataAttrTaskId + dataAttrComplete + '>' +
                  taskDesc + completeButton + deleteButton +
                  '</div';
    return taskDiv;
}

// displays message if user clicks "Add task" without entering any input
function displayErrorMsg() {
  console.log("WHOOPS");
  $(".taskDesc").attr("placeholder", "Please enter a task");
}

// listens for clicks on "complete" button and calls functions to:
// change presentation of task
// change boolean in "complete" column in database to true

// changes presentation of task

// PUT request to change boolean in "complete" column in database to true

// listens for clicks on "delete" button and calls functions to:
// remove task from database
// refresh task list

// DELETE request to remove task from database
