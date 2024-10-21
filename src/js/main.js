const notesContainer = document.getElementById('notesContainer');
const addBtn = document.getElementById('addBtn');
const colors = ['#FFC0CB', '#FFB6C1', '#90EE90', '#FFFFE0', '#E0FFFF', '#D8BFD8'];

let notes = [
    { id: 1, title: 'UI concepts worth existing', color: '#FFC0CB' },
    { id: 2, title: 'Book Review : The Design of Everyday Things by Don Norman', color: '#FFB6C1' },
    { id: 3, title: 'Animes produced by Ufotable', color: '#90EE90' },
    { id: 4, title: 'Mangas planned to read', color: '#FFFFE0' },
    { id: 5, title: 'Awesome tweets collection', color: '#E0FFFF' },
    { id: 6, title: 'List of free & open source apps', color: '#D8BFD8' }
];

function renderNotes() {
    notesContainer.innerHTML = '';
    notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.style.backgroundColor = note.color;
        noteElement.innerHTML = `
            ${note.title}
            <button class="delete-btn" onclick="deleteNote(${note.id})">X</button>
        `;
        notesContainer.appendChild(noteElement);
    });
}

function addNote() {
    const newNote = {
        id: Date.now(),
        title: 'New Note',
        color: colors[Math.floor(Math.random() * colors.length)]
    };
    notes.push(newNote);
    renderNotes();
}

function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    renderNotes();
}

addBtn.addEventListener('click', addNote);

renderNotes();
