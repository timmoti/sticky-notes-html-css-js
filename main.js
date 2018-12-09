const addNoteButton = document.querySelector('#btnNew');
const saveNotesButton = document.querySelector('#btnSave');
const searchBar = document.querySelector('#searchBar');
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

  const deleteNoteButton = document.createElement('img');
  Object.assign(deleteNoteButton, {
    className: 'hide',
    src: 'images/close.png'
  });

  newNote.appendChild(noteTitle);
  newNote.appendChild(deleteNoteButton);
  newNote.appendChild(noteContent);
  notes.appendChild(newNote);

  let newestNote = notes.lastElementChild;
  newestNote.querySelector('img').addEventListener('click', function() {
    newestNote.parentNode.removeChild(newestNote);
  });

  deleteNoteEvent(newestNote);

  if (title && typeof title === 'string') {
    const newNoteTitle = newestNote.querySelector('.note-title');
    newNoteTitle.value = title;
  }

  if (content) {
    const newNoteContent = newestNote.querySelector('.note-content');
    newNoteContent.textContent = content;
  }
}

function deleteNoteEvent(noteElement) {
  noteElement.addEventListener('mouseover', function() {
    const img = noteElement.querySelector('img');
    img.classList.remove('hide');
  });

  noteElement.addEventListener('mouseout', function() {
    const img = noteElement.querySelector('img');
    img.setAttribute('class', 'hide');
  });
}

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

function searchNotes() {
  const input = document.querySelector('#searchBar');
  const filter = input.value.toUpperCase();

  const li = notes.getElementsByTagName('li');

  for (let i = 0; i < li.length; i++) {
    let noteTitle = li[i].getElementsByTagName('input')[0].value;
    if (noteTitle.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = '';
    } else {
      li[i].style.display = 'none';
    }
  }
}

addNoteButton.addEventListener('click', addNewNote);
saveNotesButton.addEventListener('click', saveNotes);

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
