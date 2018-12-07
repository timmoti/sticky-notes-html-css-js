const addNoteButton = document.querySelector('#btnNew');

addNoteButton.addEventListener('click', addNewNote);

function addNewNote(title, content) {
  const notes = document.querySelector('#notes');
  const li = document.createElement('li');
  li.setAttribute('class', 'colour');

  const noteTitle = document.createElement('input');
  Object.assign(noteTitle, {
    type: 'text',
    className: 'note-title',
    placeholder: 'Untitled'
  });

  const noteContent = document.createElement('textarea');
  noteContent.setAttribute('class', 'note-content');

  const image = document.createElement('img');
  Object.assign(image, {
    className: 'hide',
    src: 'images/close.png'
  });

  li.appendChild(noteTitle);
  li.appendChild(image);
  li.appendChild(noteContent);
  notes.appendChild(li);

  let newNote = notes.lastElementChild;
  newNote.querySelector('img').addEventListener('click', function() {
    newNote.parentNode.removeChild(newNote);
  });

  addNoteEvent(newNote);
}

function addNoteEvent(noteElement) {
  noteElement.addEventListener('mouseover', function() {
    const img = noteElement.querySelector('img');
    img.classList.remove('hide');
  });

  noteElement.addEventListener('mouseout', function() {
    const img = noteElement.querySelector('img');
    img.setAttribute('class', 'hide');
  });
}
