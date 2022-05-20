'use strict'

let clearBttn = document.getElementById('clear');

clearBttn.onclick = () => {
  // update localStorage
  let tempStorage = [];
  for (let activity of JSON.parse(localStorage.getItem('activities'))) {
    if (activity.state != 'done') {
      tempStorage.push(activity)
    }
  }

  localStorage.setItem('activities', JSON.stringify(tempStorage));

  // remove activity elements from html
  let doneContainer = document.getElementById('done');
  let activityElements = doneContainer.querySelectorAll('.activity');

  activityElements.forEach((element) => {
    element.remove();
  });
}