$(document).ready(function() {

});

// listens for form submits through "Add task" button, stores task in database, and
// refreshes task list
function addTask() {
  $('.taskForm').on('submit', function(e) {
    e.preventDefault();
    refreshTasks();
  });
}

// POST request to store task in database

// GET request to refresh task list
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
// appends them to DOM
function appendTasks(taskArray) {
  $el = $(".taskContainer");
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
    var dataAttrTaskId = 'data-taskId=' + task.id;
    var dataAttrComplete = 'data-complete=' + task.complete;
    var taskDiv ='<div class="task"' + dataAttrTaskId + dataAttrComplete + '>' +
                  taskDesc + completeButton + deleteButton +
                  '</div';
    return taskDiv;
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
