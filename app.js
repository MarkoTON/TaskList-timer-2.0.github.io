// Adding event Listener to Button
document.getElementById("taskBtn").addEventListener("click", getTask);
// Creating Publick Array
let allObjTask = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

//// Get Value from HTML
function getTask(){
  // Clear UL of all task before adding new one...
  document.getElementById("taskList").innerHTML = "";
  // Input value
  let getTask = document.getElementById("task").value;
  
  if(getTask === null || getTask === "" || getTask === undefined) return false;
  // Timeduration for new task
  let timeDuration = document.getElementsByName("timeDuration");
  
  let pickedTime;
  for(let i = 0; i < timeDuration.length; i++){
    if(timeDuration[i].checked){
      pickedTime = timeDuration[i].value;
    }
  }
  // Creating timestamp
  let getTimeStamp = (new Date().getTime() + Number(pickedTime*1000));
  // Object for task
  let objTask = {
    task: getTask,
    time: getTimeStamp
  };
  
  allObjTask.push(objTask);
  
  // Set LS
  localStorage.setItem('items', JSON.stringify(allObjTask));
  // Restarting Input field
  document.getElementById("task").value = "";
  // Printing new task in UI
  printUI();
}

printUI();
// Printing UI from array
function printUI(){
  let ul = document.getElementById("taskList");
  
  allObjTask.forEach(element => {
    let li = document.createElement("li");
    // let a = document.createElement("a");
    // let delBtn = document.createElement("i");
    let text = document.createTextNode(element.task);
    li.setAttribute("class","list-group-item");
    // a.setAttribute("class", "delete-item d-inline");
    // delBtn.setAttribute("class", "fas fa-times float-right mt-1");
    // a.appendChild(delBtn);
    li.appendChild(text);
    // li.appendChild(a);
    ul.appendChild(li);
  });
}

//// Converting timestamp
function timeConverter(timeObj){
  // Getting timestamp from argument
  let timestamp = timeObj;// timeObj is timestamp of current task
  // Converting time
  var a = new Date(timestamp);
  
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  if( date < 10 ) date = "0" + date;
  var hour = a.getHours();
  if( hour < 10 ) hour = "0" + hour;
  var min = a.getMinutes();
  if( min < 10 ) min = "0" + min;
  var sec = (a.getSeconds());
  if( sec < 10 ) sec = "0" + sec;
  // Time format
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  //////////////////////////////////////////////////////
  // Converting time
  var currentTime = new Date();
  
  var currentMonths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var currentYear = currentTime.getFullYear();
  var currentMonth = currentMonths[currentTime.getMonth()];
  var currentDate = currentTime.getDate();
  if( currentDate < 10 ) currentDate = "0" + currentDate;
  var currentHour = currentTime.getHours();
  if( currentHour < 10 ) currentHour = "0" + currentHour;
  var currentMin = currentTime.getMinutes();
  if( currentMin < 10 ) currentMin = "0" + currentMin;
  var currentSec = currentTime.getSeconds();
  if( currentSec < 10 ) currentSec = "0" + currentSec;
  // Time format
  var currentTime = currentDate + ' ' + currentMonth + ' ' + currentYear + ' ' + currentHour + ':' + currentMin + ':' + currentSec;
  
  // Calling function to remove task
  if(currentTime > time){
    removeTask(timestamp);
  }
};

//// Reoving Task from array and UI

function removeTask(timestamp){
  // Restart UI
  document.getElementById("taskList").innerHTML = "";
  // Timestamp - has expired
  let expiredTimestamp = timestamp;
  
  const data = JSON.parse(localStorage.getItem('items'));
  for(let i = 0; i < data.length; i++){
    if(data[i].time === expiredTimestamp){
      data.splice(i,(1));
    }
  }
  // Returning array to original array
  allObjTask = data;
  // Set LS
  localStorage.setItem('items', JSON.stringify(allObjTask));
  // Print new UI
  printUI();
}

// var ulTaskList = document.querySelector("#taskList").addEventListener("click", removeTask);
// // Remove Task
// function removeTask(e) {
//   // console.log(e);
//   // if(e.parentElements === undefined) return;
//   if(e.target.parentElement.classList.contains('delete-item')) {
    
//     if(confirm('Are You Sure?')) {
//       e.target.parentElement.parentElement.remove();
      
//       // Remove from LS
//       removeTaskFromLocalStorage(e.target.parentElement.parentElement);
//     }
//   }
// }

// function removeTaskFromLocalStorage(elementDel){
//   // console.log(elementDel.textContent);
//   allObjTask.forEach((element,index) => {
//     // console.log(element.task)
//     if(elementDel.textContent === element.task){
//       allObjTask.splice(index, 1);
//     }
//   });
  
//   localStorage.setItem('items', JSON.stringify(allObjTask));
//   checkTime();
// }

// Seting Interval for checking timestamp
let timeInterval = setInterval(() => {
  checkTime();
}, 1000);

function checkTime(){
  for(let i = 0; i < allObjTask.length; i++){
    // Converting timestamp
    timeConverter(allObjTask[i].time);
  }
}

// Clear all task from Array and UI
document.getElementById("clearTask").addEventListener('click', function() {
  let ul = document.querySelector("ul");
  localStorage.clear();
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  allObjTask = [];
});