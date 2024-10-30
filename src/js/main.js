const uri = `https://full-stack-tau-seven.vercel.app/notes`;

const notesContainer = document.getElementById('notesContainer');
const addBtn = document.getElementById('addBtn');
const searchImg = document.querySelector('#searchImg')
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
        },
        credentials: 'include'
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



             ////Editar nota
             notesDivs.forEach(noteDiv => {
                noteDiv.addEventListener('click', async(e)=>{
                    location.href = `editNote.html?id=${noteDiv.id}`                    
                })
            })            
            //////////////////////////////////////////////////////////////////////////////////////


            ////Eliminar nota
            notesDivs.forEach(noteDiv => {
                const closeBtn = noteDiv.querySelector('.delete-btn');
                closeBtn.addEventListener('click', async(e)=>{
                    e.stopPropagation(); 
                    let configDelete = {
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json',
                            'x-version': '1.0.0'  
                        },
                        credentials: 'include'
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


searchImg.addEventListener('click', async() => {
    location.href = 'search.html';
})


///////
function addNote() {
    location.href = 'addNote.html' // Mostrar el modal
}

///////

addBtn.addEventListener('click', addNote);


























