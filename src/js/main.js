const uri = `${location.href}`;

const notesContainer = document.getElementById('notesContainer');
const addBtn = document.getElementById('addBtn');
const colors = [
    '#FFB3BA', // Pastel Rosa
    '#FFDFBA', // Pastel Naranja
    '#FFFBBA', // Pastel Amarillo
    '#FFFFBA', // Pastel Amarillo Claro
    '#BAFFC9', // Pastel Verde Menta
    '#BAE1FF', // Pastel Azul Claro
    '#FFC3A0', // Pastel Melocotón
    '#FF677D', // Pastel Rosa Fuerte
    '#F8B400', // Pastel Amarillo Mostaza
    '#F67280', // Pastel Coral
    '#F5C6D0', // Pastel Rosa Suave
    '#A7C6ED', // Pastel Azul Pastel
    '#FFD1B5', // Pastel Melón
    '#B3E5E0', // Pastel Aqua
    '#FF9AA2', // Pastel Rosa Claro
    '#FFABAB', // Pastel Rojo Claro
    '#B2B2D0', // Pastel Gris Azulado
    '#B8E0F9', // Pastel Cielo
    '#EAB8B8', // Pastel Rosa Claro
    '#A0E7E5', // Pastel Aqua Claro
    '#D5AAFF', // Pastel Lavanda Claro
];


const modal = document.getElementById('modal');
const closeBtn = document.getElementById('closeBtn');
const saveBtn = document.getElementById('saveBtn');

let notes;



const getData = async() => {
    let config = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'x-version': '1.0.0'  
        }
    };

    let peticion = await fetch(uri, config);
    let res = await peticion.json();
    if (res.status == 200 && res.data.length !== 0){
        notes = res.data;
        console.log(notes);
        notesContainer.innerHTML = '';
        notes.forEach(note => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            note.color = randomColor;
            const noteElement = document.createElement('div');
            noteElement.id = note._id;
            noteElement.className = 'note';
            noteElement.style.backgroundColor = note.color;
            noteElement.innerHTML = `
                ${note.title}
                <button class="delete-btn" onclick="deleteNote(${note.id})">X</button>
            `;
            notesContainer.appendChild(noteElement);


            ///// Seleccionar todos los divs.
            ////Eliminar nota
            

        });
    } else {
        notesContainer.innerHTML = "<div class = 'imgAddNote'><img src = '../storage/img/rafiki.png'><span>Create your first note !</span></div>"
    }
}

getData();





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


























