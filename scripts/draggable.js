'use strict'

let elemWidth = document.querySelector('.draggable').clientWidth;

document.onmousedown = (e) => {
  if (!e.target.classList.contains('draggable')) return;
  
  let draggable = e.target;
  
  let coords = draggable.getBoundingClientRect();
  
  let shiftY = e.clientY - coords.top;
  let shiftX = e.clientX - coords.left;

  draggable.style.width = elemWidth + 'px';
  draggable.style.position = 'absolute';
  draggable.style.zIndex = 1000;
  document.body.append(draggable);
  
  moveAt(e.pageX, e.pageY);

  function moveAt(pageX, pageY) {
    draggable.style.left = pageX - shiftX + 'px';
    draggable.style.top = pageY - shiftY + 'px';
  }
  

  let currentDroppable = null;
  function onMouseMove(e) {
    moveAt(e.pageX, e.pageY);

    draggable.hidden = true;
    let elementsBelow = document.elementsFromPoint(e.clientX, e.clientY);
    draggable.hidden = false;

    if (!elementsBelow) return;

    let droppableBelow;
    for (let element of elementsBelow) {
      if (element.classList.contains('droppable')) {
        droppableBelow = element;
      }
    }

    //console.log(droppableBelow);

    if (currentDroppable != droppableBelow) {

      if (currentDroppable) {
        leaveDroppable(currentDroppable);
      }

      currentDroppable = droppableBelow;
      if (currentDroppable) {
        enterDroppable(currentDroppable);
      }
    }
  }

  document.addEventListener('mousemove', onMouseMove);

  draggable.onmouseup = () => {
    document.removeEventListener('mousemove', onMouseMove);
    
    currentDroppable.append(draggable);
    draggable.style = null;
    leaveDroppable(currentDroppable);


    draggable.onmouseup = null;
  }
}

function leaveDroppable(droppable) {
  droppable.classList.remove('highlight');
}

function enterDroppable(droppable) {
  droppable.classList.add('highlight');
}

document.ondragstart = () => false;