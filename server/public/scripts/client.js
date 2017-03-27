// when document loads, display all tasks in database
// listen for form submissions & clicks on complete/delete buttons
$(document).ready(function() {
  refreshTasks();
  submitTask();
  markTaskComplete();
  deleteTask();
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
        label: $('.labelChoice').val(),
        complete: false
      };

      // store task in database and refresh task list
      storeAndRefresh(task);
      resetInput();
    } else {
      indicateBadInput();
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
    var $newTask = $el.children().last();
    var confirmBox = createConfirmationDiv();
    $newTask.append(confirmBox);
    checkForComplete($newTask);
  }
}

// takes a task object with properties id, description, and complete
// creates a div with the task description, a complete button, and a delete button
function createTaskDiv(task) {
    var taskDesc = '<span class="taskListing">' + task.description + '</span>';
    var completeButton = '<button class="completeButton">Complete</button>';
    var deleteButton = '<button class="deleteButton">Delete</button>';
    var dataAttrTaskId = 'data-task_id=' + task.id + " ";
    var dataAttrComplete = 'data-complete=' + task.complete;
    var taskDiv ='<div class="task"' + dataAttrTaskId + dataAttrComplete + '>' +
                  taskDesc + deleteButton + completeButton +
                  '</div';
    return taskDiv;
}

// creates hidden confirmation div
function createConfirmationDiv(){
  var html = '<div class="confirmation hidden">' +
            '<span class="confirmText">Are you sure?</span>' +
            '<button class="cancel">Cancel</button>' +
            '<button class="continue">Continue</button></div>';
  return html;
}

// resets input field with original placeholder text and no error indicators
function resetInput() {
  $('.taskDesc').attr('placeholder', 'Task description').removeClass('badInput').val("");
}

// changes placeholder text & shows error indicators
// if user clicks "Add task" without entering any input
function indicateBadInput() {
  $('.taskDesc').attr('placeholder', 'Please enter a task').addClass('badInput');
}

// listens for clicks on "complete" button and calls functions to:
// change presentation of task
// change boolean in "complete" column in database to true
function markTaskComplete() {
  $('.taskContainer').on('click', '.completeButton', function() {
    var taskId = $(this).parent().data('task_id');
    changeCompleteBool(taskId);
  });
}

// checks to see if a task element had a true value for data-complete and
// changes its presentation on the DOM
// hides complete button
function checkForComplete($task) {
  var complete = $task.data('complete');
  if (complete) {
    $task.addClass('complete');
    $task.find('.completeButton').addClass('hidden');
  }
}

// takes the id of a task
// sends PUT request to change boolean in "complete" column in database to true
function changeCompleteBool(taskId) {
  $.ajax({
    type: "PUT",
    url: "/tasks/complete",
    data: {id: taskId, complete: true},
    success: function(response) {
      console.log("Successful update");
      refreshTasks();
    }
  });
}

// listens for clicks on "delete" button and calls functions to:
// remove task from database
// refresh task list
function deleteTask() {
  $('.taskContainer').on('click', '.deleteButton', function() {
    var $taskEl = $(this).parent();
    // var taskId = $taskEl.data("task_id");
    confirmDelete($taskEl);
    // deleteFromDB(taskId)
  });
}

// asks user to confirm deletion
function confirmDelete($taskEl) {
  var $confirmDiv = $taskEl.find(".confirmation");
  $confirmDiv.slideDown();
  $('.taskContainer').on('click', '.continue', function() {
    var taskId = $taskEl.data("task_id");
    deleteFromDB(taskId);
  });
  $('.taskContainer').on('click', '.cancel', function() {
    $(this).parent().slideUp();
  });
}

// takes the id of a task
// sends DELETE request to remove task from database
function deleteFromDB(taskId) {
  $.ajax({
    type: 'DELETE',
    url: 'tasks/delete',
    data: {id: taskId},
    success: function(response) {
      console.log("Successful delete");
      refreshTasks();
    }
  });
}
