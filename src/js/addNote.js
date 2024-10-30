const uri = `https://full-stack-tau-seven.vercel.app/notes`;

const backBtn = document.getElementById('backBtn');
const previewBtn = document.getElementById('previewBtn');
const imageBtn = document.getElementById('imageBtn');
const titleInput = document.querySelector('.title-input');
const contentInput = document.querySelector('.content-input');
const modal = document.getElementById('modal');
const saveBtn = document.querySelector('.save');

backBtn.addEventListener('click', () => {
    location.href = 'index.html'
});

previewBtn.addEventListener('click', () => {
    // Handle preview functionality
    console.log('Preview clicked');
});

imageBtn.addEventListener('click', async() => {
    let dataInsert = {
        title: titleInput.value.trim(),
        description: contentInput.value.trim()
    }
    if(dataInsert.title !== '' && dataInsert.description !== ''){
        let configInsert = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-version': '1.0.0'  
            },
            body: JSON.stringify(dataInsert)
        };
    
        console.log(JSON.stringify(dataInsert))
        let peticionInsert = await fetch(`${uri}` , configInsert);
        let resInsert = await peticionInsert.json(); 
        
        if(resInsert.status == 201){
            modal.style.display = 'block';
            saveBtn.addEventListener('click', ()=>{
                location.href = 'index.html'
            })
        }
        
    }

});


// Adjust textarea height based on content
contentInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
});

titleInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
});