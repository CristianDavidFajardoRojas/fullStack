const uri = `${location.href}`;

const notesContainer = document.getElementById('notesContainer');
const addBtn = document.getElementById('addBtn');
const colors = [
    '#f6acfa', // Pastel Rosa Fuerte
    '#FFABAB', // Pastel Rojo Claro
    '#60ff90', // Pastel Verde Menta
    '#f4de6c', // Pastel Amarillo Claro
    '#B8E0F9', // Pastel Cielo
    '#D5AAFF', // Pastel Lavanda Claro
];

const modal = document.getElementById('modal');
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
        notesContainer.innerHTML = '';
        notes.forEach((note, index) => {
            note.color = colors[index % colors.length];
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
            let notesDivs = document.querySelectorAll('.note')


            ////Eliminar nota
            notesDivs.forEach(noteDiv => {
                const closeBtn = noteDiv.querySelector('.delete-btn');
                closeBtn.addEventListener('click', async(e)=>{
                    let configDelete = {
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json',
                            'x-version': '1.0.0'  
                        }
                    };
                    let peticionDelete = await fetch(`${uri}/${noteDiv.id}` , configDelete);
                    getData();
                    
                })
            })            
            //////////////////////////////////////////////////////////////////////////////////////



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

saveBtn.onclick = async() => {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    if (title && description) {
        let dataInsert = {
            title: title,
            description: description
        }
        let configInsert = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-version': '1.0.0'  
            },
            body: JSON.stringify(dataInsert)
        };

        
        let peticionInsert = await fetch(`${uri}` , configInsert);
        let resInsert = await peticionInsert.json();
        alert(resInsert.message);   
        
        
        // Limpiar campos y cerrar el modal
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        modal.style.display = 'none';
        getData();
    } else {
        alert('Por favor, completa ambos campos.');
    }
}

///////

addBtn.addEventListener('click', addNote);


























