const uri = `https://full-stack-tau-seven.vercel.app/users/login`;

const modal = document.getElementById('modal');
const saveBtn = document.querySelector('.save');
const textModal = document.querySelector('.text-model');    

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    let data = {};
    data.email = email;
    data.password = password;

    let config = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'x-version': '1.0.0'  
        },
        body: JSON.stringify(data),
        credentials: 'include'
    };

    let peticion = await fetch(uri, config);
    let res = await peticion.json();
    

    
    textModal.textContent = res.message
    modal.style.display = 'block';

    saveBtn.addEventListener('click', async()=> {
        if(res.status == 200) {
            // location.href = "index.html";
            let config = {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'x-version': '1.0.0'  
                },
                credentials: 'include'
            };
        
            let peticion = await fetch(`https://full-stack-tau-seven.vercel.app/notes`, config);
            let res = await peticion.json();
            console.log(res)
        }else {
            modal.style.display = 'none';
        }
    })
     
    

       
   
});