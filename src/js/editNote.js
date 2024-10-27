const uriWindows = `${location.href}`;
const uri = uriWindows.split('/notes')[0] + '/notes';
const idNote = new URL(window.location.href).searchParams.get("id");

const backBtn = document.getElementById('backBtn');
const modal = document.getElementById('modal');
const discardBtn = document.querySelector('.discard');
const saveBtn = document.querySelector('.save');
const title = document.querySelector('h1');
const description = document.querySelector('.description');





const getData = async () => {
    let config = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'x-version': '1.0.0'  
        }
    };

    let peticion = await fetch(`${uri}/${idNote}`, config);
    let res = await peticion.json();
    
    title.innerText = res.data.title;
    description.innerHTML = res.data.description;

    let originalTitle = title.innerText;
    let originalDescription = description.innerHTML;


    backBtn.addEventListener('click', () => {
        if (title.innerText !== originalTitle || description.innerHTML !== originalDescription) {
            modal.style.display = 'block';
        } else {
            console.log('No changes to save');
            location.href = "/notes";
        }
    });
    
    discardBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        title.innerText = originalTitle;
        description.innerHTML = originalDescription;
        console.log('Changes discarded');
        location.href = "/notes";
    });
    
    saveBtn.addEventListener('click', async() => {

        ///// Guardar Historial
        let config = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-version': '1.0.0'  
            },
            body: JSON.stringify(res.data)
        };
    
        let peticionHisotrial = await fetch(`${uri}/${idNote}/history`, config);
        let resHistorial = await peticionHisotrial.json();
        ///////////////////////////////////////////////////////////////


        ///// Guardar Cambio
        let dataUpdate = {
            title: title.innerText,
            description: description.innerHTML
        }
        let configUpdate = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'x-version': '1.0.0'  
            },
            body: JSON.stringify(dataUpdate)
        };
    
        let peticionUpdate = await fetch(`${uri}/${idNote}`, configUpdate);
        let resUpdate = await peticionUpdate.json();
        /////////////////////////////////////////////////

        modal.style.display = 'none';
        originalTitle = title.innerText;
        originalDescription = description.innerHTML;
        console.log('Changes saved');
        location.href = "/notes";
    });
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    





}

getData();



