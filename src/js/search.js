const uri = `${location.href}`;

const notesContainer = document.getElementById('notesContainer');
const searchInput = document.getElementById('searchInput');
const colors = [
    '#f6acfa', // Pastel Rosa Fuerte
    '#FFABAB', // Pastel Rojo Claro
    '#60ff90', // Pastel Verde Menta
    '#f4de6c', // Pastel Amarillo Claro
    '#B8E0F9', // Pastel Cielo
    '#D5AAFF', // Pastel Lavanda Claro
];

let notes;

const getData = async() => {

    searchInput.addEventListener('change', () => {
        alert(searchInput.value)
    });

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



            ////Editar nota
            notesDivs.forEach(noteDiv => {
                noteDiv.addEventListener('click', async(e)=>{
                    location.href = `notes/edit?id=${noteDiv.id}`                    
                })
            })            
            //////////////////////////////////////////////////////////////////////////////////////


        });
    } else {
        notesContainer.innerHTML = "<div class = 'imgAddNote'><img src = '../storage/img/rafiki.png'><span>Create your first note !</span></div>"
    }
}

getData();




























