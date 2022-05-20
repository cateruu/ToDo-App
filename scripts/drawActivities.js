'use strict'

const defaultContainer = document.getElementById('activities');
const importantContainer = document.getElementById('important');
const doneContainer = document.getElementById('done');

let storage = JSON.parse(localStorage.getItem('activities')) || [];

for (let activity of storage) {
  createActivity(activity);
}

function createActivity(activity) {
  // create single activity
  let div = document.createElement('div');
  div.setAttribute('data-id', activity.id);
  div.classList.add('activity', 'draggable');
  div.innerHTML = `<span class='text'>${activity.value}</span>`;

  // buttons container
  let buttons = document.createElement('div');
  buttons.classList.add('buttons');
  div.append(buttons);

  // upgrade, done and delete buttons
  let checkmark = document.createElement('button');
  let bin = document.createElement('button');
  let upgrade = document.createElement('button');
  checkmark.innerHTML = '<img src="./images/done.png" alt="done" title="done" height="16px">';
  bin.innerHTML = '<img src="./images/delete.png" alt="delete" title="delete" height="16px">';
  upgrade.innerHTML = '<img src="./images/upgrade.png" alt="upgrade" title="upgrade" height="16px">';
  buttons.append(upgrade, checkmark, bin);

  // time
  let time = document.createElement('span');
  time.classList.add('time');
  let date = new Date(activity.id);
  let hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  time.innerHTML = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${hours}:${minutes}`;
  div.prepend(time);



  switch(activity.state) {
    case 'default':
      defaultContainer.append(div);
      break;
    case 'important':
      importantContainer.append(div);
      break;
    case 'done':
      doneContainer.append(div);
      div.classList.add('highlight');
      break;
    default:
      console.log(new Error(`Wrong state in activity id: "${activity.id}"!`));
      break;
  }
}
