'use strict'

const form = document.getElementById('todo');

let activities = JSON.parse(localStorage.getItem('activities')) || [];
console.log(activities);

form.addEventListener('submit', () => {
  let value = form.elements.activity.value;
  if (value == '') {
    alert('Invalid input!');
    return;
  } 

  let activity = {
    id: Date.now(),
    state: 'default',
    value: value,
  };

  activities.push(activity);
  localStorage.setItem("activities", JSON.stringify(activities));
});