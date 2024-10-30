const uri = `https://full-stack-tau-seven.vercel.app/notes`;

const notesContainer = document.getElementById('notesContainer');
const searchInput = document.getElementById('searchInput');
const backButton = document.querySelector('.clear-button');
const colors = [
    '#f6acfa', // Pastel Rosa Fuerte
    '#FFABAB', // Pastel Rojo Claro
    '#60ff90', // Pastel Verde Menta
    '#f4de6c', // Pastel Amarillo Claro
    '#B8E0F9', // Pastel Cielo
    '#D5AAFF', // Pastel Lavanda Claro
];

let notes;
backButton.addEventListener('click', async()=>{
    location.href = 'index.html'
})

const getData = async() => {
    notesContainer.innerHTML = "<div class = 'imgAddNote'><img src = '../storage/img/cuate.png'><span>Search a first note !</span></div>"
    searchInput.addEventListener('change', async() => {


        let config = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-version': '1.0.0'  
            },
            body: JSON.stringify({text: searchInput.value})
        };
    
        let peticion = await fetch(uri, config);
        let res = await peticion.json();



        if (res.status == 200 && res.data.length !== 0 && searchInput.value !== ''){
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
                        e.stopPropagation(); 
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
                        location.href = `editNote.html?id=${noteDiv.id}`                    
                    })
                })            
                //////////////////////////////////////////////////////////////////////////////////////
    
    
            });
        } else {
            notesContainer.innerHTML = "<div class = 'imgAddNote'><img src = '../storage/img/cuate.png'><span>File not found. Try searching again.</span></div>"
        }
    });
}


getData();




























