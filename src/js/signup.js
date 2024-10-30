const uri = `https://full-stack-tau-seven.vercel.app`;

document.getElementById('signupForm').addEventListener('submit', async(event) => {
    event.preventDefault();
    const nombre = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const nickname = document.getElementById('nickname').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const modal = document.getElementById('modal');
    const saveBtn = document.querySelector('.save');
    const textModal = document.querySelector('.text-model');   

    const nicknameRegex = /^[a-zA-Z0-9]+$/;
    if (!nicknameRegex.test(nickname)) {
        document.getElementById('nicknameError').textContent = 'Nickname can only contain letters and numbers.';
        return;
    } else {
        document.getElementById('nicknameError').textContent = '';
    }

    if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
    }
    
    let data = {
        nombre: nombre,
        email: email,
        nickname: nickname,
        password: password
    }

    let config = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'x-version': '1.0.0'  
        },
        body: JSON.stringify(data)
    };

    let urlPeticion = `${uri}/users`;

    let peticion = await fetch(urlPeticion, config);
    let res = await peticion.json();
  

    textModal.textContent = res.message
    modal.style.display = 'block';

    saveBtn.addEventListener('click', ()=> {
        if(res.status == 202) {
            location.href = "index.html";
        }else {
            modal.style.display = 'none';
        }
    })

});