document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const nickname = document.getElementById('nickname').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
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
    
    console.log('Sign up attempt:', { nombre, email, nickname, password });
    
    alert('Sign up successful!');
  

});