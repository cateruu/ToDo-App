'use strict'

const form = document.getElementById('todo');

form.onsubmit = () => {
  let activities = JSON.parse(localStorage.getItem('activities')) || [];

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
  localStorage.setItem('activities', JSON.stringify(activities));
};