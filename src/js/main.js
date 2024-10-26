const notesContainer = document.getElementById('notesContainer');
const addBtn = document.getElementById('addBtn');
const colors = ['#FFC0CB', '#FFB6C1', '#90EE90', '#FFFFE0', '#E0FFFF', '#D8BFD8'];
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('closeBtn');
const saveBtn = document.getElementById('saveBtn');

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



///////
function addNote() {
    modal.style.display = 'block'; // Mostrar el modal
}

closeBtn.onclick = function() {
    modal.style.display = 'none'; // Cerrar el modal
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none'; // Cerrar si se hace clic fuera del modal
    }
}

saveBtn.onclick = function() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    if (title && description) {
        // Aquí puedes agregar la lógica para guardar la nota
        console.log('Título:', title);
        console.log('Descripción:', description);
        
        // Limpiar campos y cerrar el modal
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        modal.style.display = 'none';
    } else {
        alert('Por favor, completa ambos campos.');
    }
}

///////

addBtn.addEventListener('click', addNote);

renderNotes();
























