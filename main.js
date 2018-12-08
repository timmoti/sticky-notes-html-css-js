const addNoteButton = document.querySelector('#btnNew');

addNoteButton.addEventListener('click', addNewNote);
const notes = document.querySelector('#notes');

function addNewNote(title, content) {
  const newNote = document.createElement('li');

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

  newNote.appendChild(noteTitle);
  newNote.appendChild(image);
  newNote.appendChild(noteContent);
  notes.appendChild(newNote);

  let newestNote = notes.lastElementChild;
  newestNote.querySelector('img').addEventListener('click', function() {
    newestNote.parentNode.removeChild(newestNote);
  });

  addNoteEvent(newestNote);

  if (title && !MouseEvent) {
    const newNoteTitle = newestNote.querySelector('.note-title');
    newNoteTitle.value = title;
  }

  if (content) {
    const newNoteContent = newestNote.querySelector('.note-content');
    newNoteContent.textContent = content;
  }
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

let count = 0;

const storedNotes = localStorage.getItem('notes');
if (storedNotes) {
  const notesArray = JSON.parse(storedNotes);
  count = notesArray.length;

  for (let i = 0; i < count; i++) {
    let storedNote = notesArray[i];
    addNewNote(storedNote.title, storedNote.content);
  }
}

const saveNotesButton = document.querySelector('#btnSave');
saveNotesButton.addEventListener('click', saveNotes);

function saveNotes() {
  const notesArray = new Array();
  const listArray = Array.from(document.querySelectorAll('li'));
  listArray.forEach(element => {
    const title = element.querySelector('.note-title');
    const content = element.querySelector('.note-content');
    notesArray.push({
      title: title.value,
      content: content.value
    });
  });

  const jsonString = JSON.stringify(notesArray);
  localStorage.setItem('notes', jsonString);
  alert('Notes saved');
}
