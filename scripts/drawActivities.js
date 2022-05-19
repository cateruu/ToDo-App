'use strict'

const defaultContainer = document.getElementById('activities');
const importantContainer = document.getElementById('important');
const doneContainer = document.getElementById('done');

let storage = JSON.parse(localStorage.getItem('activities')) || [];

for (let activity of storage) {
  // create single activity
  let div = document.createElement('div');
  div.setAttribute('data-id', activity.id);
  div.classList.add('activity', 'draggable');
  div.innerHTML = `<span>${activity.value}</span>`;

  createActivity(activity, div);
}

function createActivity(activity, container) {
  // buttons container
  let buttons = document.createElement('div');
  buttons.classList.add('buttons');
  container.append(buttons);

  // done and delete buttons
  let checkmark = document.createElement('button');
  let bin = document.createElement('button');
  checkmark.innerHTML = '<img src="./images/done.png" alt="done" title="done" height="25px">';
  bin.innerHTML = '<img src="./images/delete.png" alt="delete" title="delete" height="25px">';
  buttons.append(checkmark, bin);

  // time
  let time = document.createElement('span');
  time.classList.add('time');
  let date = new Date(activity.id);
  time.innerHTML = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  container.prepend(time);

  switch(activity.state) {
    case 'default':
      defaultContainer.append(container);
      break;
    case 'important':
      importantContainer.append(container);
      break;
    case 'done':
      doneContainer.append(container);
      break;
    default:
      console.log(new Error(`Wrong state in activity id: "${activity.id}"!`));
      break;
  }
}
