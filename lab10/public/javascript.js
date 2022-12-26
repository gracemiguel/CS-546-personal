let myForm = document.getElementById("login-form")
let error = document.getElementById("error")
let username = document.getElementById('username');
let password = document.getElementById('password');

if(myForm){
    console.log('there is a form')
    myForm.addEventListener('submit', (event)=>{
        event.preventDefault();
        if(username.value.trim() && password.value.trim()){
            username = username.value
            password = password.value
        }
        else{
            error.hidden = false
        }
    })
}