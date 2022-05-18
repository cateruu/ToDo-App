'use strict'

let currentDroppable = null;

document.onmousedown = (e) => {
  if (!e.target.classList.contains('draggable')) return;
  
  let draggable = e.target;
  
  let coords = draggable.getBoundingClientRect();
  
  let shiftY = e.clientY - coords.top;
  let shiftX = e.clientX - coords.left;

  let elemWidth = coords.width;

  draggable.style.width = elemWidth - 10 + 'px';
  draggable.style.position = 'absolute';
  draggable.style.zIndex = 1000;
  document.body.append(draggable);
  
  moveAt(e.pageX, e.pageY);

  function moveAt(pageX, pageY) {
    draggable.style.left = pageX - shiftX + 'px';
    draggable.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(e) {
    moveAt(e.pageX, e.pageY);

    let elementsBelow = document.elementsFromPoint(e.clientX, e.clientY);

    if (!elementsBelow) return;

    let droppableBelow;
    for (let element of elementsBelow) {
      if (element.classList.contains('droppable')) {
        droppableBelow = element;
      }
    }

    if (currentDroppable != droppableBelow) {

      if (currentDroppable) {
        leaveDroppable(currentDroppable);
      }

      if (droppableBelow) {
        currentDroppable = droppableBelow;
      } 

      if (currentDroppable) {
        enterDroppable(currentDroppable);
      }
    }
  }

  document.addEventListener('mousemove', onMouseMove);

  draggable.onmouseup = () => {
    document.removeEventListener('mousemove', onMouseMove);

    leaveDroppable(currentDroppable);
    currentDroppable.append(draggable);
    draggable.style = null;
    currentDroppable = null;
  
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
document.ondblclick = () => false;