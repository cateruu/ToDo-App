'use strict'

document.onclick = (e) => {
  if(e.target.tagName != 'IMG') return;
  
  let titleAttribute = e.target.getAttribute('title');
  
  if (titleAttribute != 'done' && titleAttribute != 'delete') return;

  let activityElement = e.target.closest('div.activity');
  let elementId = activityElement.dataset.id;

  // delete the element
  if (titleAttribute == 'delete') {
    
    // update localStorage
    let tempStorage = [];
    for (let activity of JSON.parse(localStorage.getItem('activities'))) {
      if (activity.id != elementId) {
        tempStorage.push(activity);
      }
    }

    localStorage.setItem('activities', JSON.stringify(tempStorage));

    activityElement.remove();
    return;
  }

  // activity done
  if (titleAttribute == 'done') {

    // update localStorage
    let tempStorage = [];
    for (let activity of JSON.parse(localStorage.getItem('activities'))) {
      if (activity.id == elementId) {
        activity.state = 'done';
      }

      tempStorage.push(activity);
    }

    localStorage.setItem('activities', JSON.stringify(tempStorage));
    activityElement.remove();
    
    // move activity to done container
    let doneContainer = document.getElementById('done');
    doneContainer.append(activityElement);
    activityElement.classList.add('highlight');
  }
}