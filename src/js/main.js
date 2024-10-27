const uri = `${location.href}`;

const notesContainer = document.getElementById('notesContainer');
const addBtn = document.getElementById('addBtn');
const colors = [
    '#FF9AA2', // Pastel Rosa Claro
    '#FFB3BA', // Pastel Rosa
    '#F5C6D0', // Pastel Rosa Suave
    '#FFDFBA', // Pastel Naranja
    '#FFFBBA', // Pastel Amarillo
    '#EAB8B8', // Pastel Rosa Claro
    '#FFFFBA', // Pastel Amarillo Claro
    '#D5AAFF', // Pastel Lavanda Claro
    '#BAFFC9', // Pastel Verde Menta
    '#BAE1FF', // Pastel Azul Claro
    '#FFD1B5', // Pastel Melón
    '#FFC3A0', // Pastel Melocotón
    '#FF677D', // Pastel Rosa Fuerte
    '#F8B400', // Pastel Amarillo Mostaza
    '#F67280', // Pastel Coral
    '#A7C6ED', // Pastel Azul Pastel
    '#B3E5E0', // Pastel Aqua
    '#B2B2D0', // Pastel Gris Azulado
    '#B8E0F9', // Pastel Cielo
    '#FFABAB', // Pastel Rojo Claro
    '#A0E7E5', // Pastel Aqua Claro
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


























