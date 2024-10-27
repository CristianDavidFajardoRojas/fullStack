const uri = `${location.href}`;

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
        body: JSON.stringify(data)
    };

    let peticion = await fetch(uri, config);
    let res = await peticion.json();
    alert(res.message);
    if(res.status == 200) {
        alert(res.status);
        location.href = "/notes";
    }
     
    

       
   
});