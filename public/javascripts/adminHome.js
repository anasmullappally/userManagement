$(document).ready( function () {
    $('#table_id').DataTable();
} );

let password=document.getElementById('Password')
let button=document.getElementById('Enablebutton')

if(button){
    password.disabled=true
    button.addEventListener('click',()=>{
        if(password.disabled==true){
            password.disabled=false
            button.textContent='disable'
            button.style.backgroundColor='red'
        }else{
            password.disabled=true
            button.textContent='enable'
            button.style.backgroundColor='green'
        }
    })
}
