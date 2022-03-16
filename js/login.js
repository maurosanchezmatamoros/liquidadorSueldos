let Usuarios = []

if(JSON.parse(localStorage.getItem("logins"))!=null) {
    Usuarios = JSON.parse(localStorage.getItem("logins"))
}

class Login {
    constructor (newUser, newUserPass){
    this.username = newUser
    this.password = newUserPass
    }
}

function signUp() {
    const newUser = document.getElementById("username-sign").value
    const newUserPass = document.getElementById("password-sign").value
    const userFound = Usuarios.find(user => user.username == newUser)
    if(userFound){swal("El usuario ya se encuentra registrado", "", "warning")}
    else if(newUser.length < 6 || newUser.length > 12 || newUserPass.length < 6 || newUserPass.length > 12 ){
        swal("El usuario y clave deben tener entre 6 y 12 caracteres", "", "warning")}
    else{
    swal("Usuario creado!", "", "success")
    .then(() => {
        const newSignUp = new Login(newUser, newUserPass)
        Usuarios.push(newSignUp)
        const UsuariosJSON = JSON.stringify(Usuarios)
        localStorage.setItem("logins", UsuariosJSON)
        sessionStorage.setItem("loginSession", newUser)
        createUser.addEventListener("click", window.location.href = "../pages/liquidador.html")
    })}
}

function logIn() {
    const newUserLog = document.getElementById("username").value
    const newPassLog = document.getElementById("password").value
    const userFoundLog = Usuarios.findIndex(user => user.username == newUserLog)
    const userNotFound = !Usuarios.find(user => user.username == newUserLog)
    if(userNotFound){swal("El usuario no se encuentra registrado", "", "warning")}
    else if(Usuarios[userFoundLog].password!=newPassLog){swal("Contraseña incorrecta", "", "warning")}
    else{
    swal("Has ingresado correctamente!", "", "success")
    .then(() => {
        sessionStorage.setItem("loginSession", newUserLog)
        createUser.addEventListener("click", window.location="../pages/liquidador.html")
    })}
}

const logUser = document.querySelector(".inicio__login__submit")
logUser.addEventListener("click", logIn)

const createUser = document.querySelector(".inicio__signup__submit")
createUser.addEventListener("click", signUp)







