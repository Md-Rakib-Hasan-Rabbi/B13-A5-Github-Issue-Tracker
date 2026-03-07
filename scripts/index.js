const signInBtn = document.getElementById('sign-in-btn');
signInBtn.addEventListener('click', function() {

const usernameInput = document.getElementById('username').value;
const passwordInput = document.getElementById('password').value;

if(usernameInput=='admin' && passwordInput=='admin123'){
    alert('Login successful!');
    window.location.href = './home.html';
}
});