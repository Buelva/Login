// REFERENCIAS

const formRegistro = document.getElementById("formRegistro")
const formLogin = document.getElementById("formLogin")

const passwordRegistro = document.getElementById("password")
const repetirRegistro = document.getElementById("repetir")
const verPasswordRegistro = document.getElementById("verPasswordRegistro")
const nivelSeguridad = document.getElementById("nivelSeguridad")
const textoSeguridad = document.getElementById("textoSeguridad")

const mensajeError = document.getElementById("mensajeError")

const jumpscare = document.getElementById("jumpscare")
const scream = document.getElementById("scream")
const RUTA_AUDIO_JUMPSCARE = "audio/jumpscare-sound-fnaf-4.mp3"

if(scream){

scream.src = RUTA_AUDIO_JUMPSCARE

}


// CAMBIAR FORMULARIOS

function mostrarLogin(){

formRegistro.classList.add("oculto")
formLogin.classList.remove("oculto")

}

function mostrarRegistro(){

formLogin.classList.add("oculto")
formRegistro.classList.remove("oculto")

}

if(verPasswordRegistro){

verPasswordRegistro.addEventListener("change", function(){

let tipo = verPasswordRegistro.checked ? "text" : "password"

passwordRegistro.type = tipo
repetirRegistro.type = tipo

})

}

function actualizarSeguridadPassword(){

if(!passwordRegistro || !nivelSeguridad || !textoSeguridad){
return
}

let password = passwordRegistro.value
let puntaje = 0

if(password.length >= 8){
puntaje++
}

if(/[A-Z]/.test(password)){
puntaje++
}

if(/[a-z]/.test(password)){
puntaje++
}

if(/[0-9]/.test(password)){
puntaje++
}

if(/[^A-Za-z0-9]/.test(password)){
puntaje++
}

let porcentaje = (puntaje / 5) * 100
let nivel = "Muy débil"
let color = "#ff0000"

if(puntaje >= 4){
nivel = "Fuerte"
color = "#00ff9c"
}else if(puntaje === 3){
nivel = "Media"
color = "#ffd500"
}else if(puntaje === 2){
nivel = "Baja"
color = "#ff7b00"
}

if(password.length === 0){

nivelSeguridad.style.width = "0%"
nivelSeguridad.style.background = "#ff0000"
textoSeguridad.textContent = "Seguridad"
return

}

nivelSeguridad.style.width = porcentaje + "%"
nivelSeguridad.style.background = color
textoSeguridad.textContent = "Seguridad: " + nivel

}

if(passwordRegistro){

passwordRegistro.addEventListener("input", actualizarSeguridadPassword)
actualizarSeguridadPassword()

}


// REGISTRO

formRegistro.addEventListener("submit", function(e){

e.preventDefault()

mensajeError.textContent = ""

let usuario = document.getElementById("usuario").value
let password = document.getElementById("password").value
let repetir = document.getElementById("repetir").value


// VALIDAR CONTRASEÑA

if(password !== repetir){

mensajeError.textContent = "Las contraseñas no coinciden"
return

}


// OBTENER USUARIOS

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []


// VERIFICAR SI YA EXISTE

let existe = usuarios.find(u => u.usuario === usuario)

if(existe){

mensajeError.textContent = "Ese usuario ya existe"
return

}


// CREAR USUARIO

let nuevoUsuario = {

usuario: usuario,
password: password

}


// GUARDAR USUARIO

usuarios.push(nuevoUsuario)

localStorage.setItem("usuarios", JSON.stringify(usuarios))


// LIMPIAR

formRegistro.reset()
actualizarSeguridadPassword()


// ACTIVAR JUMPSCARE

activarJumpscare()

})




// LOGIN

formLogin.addEventListener("submit", function(e){

e.preventDefault()

let usuario = document.getElementById("loginUsuario").value
let password = document.getElementById("loginPassword").value


let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []


let encontrado = usuarios.find(function(u){

return u.usuario === usuario && u.password === password

})


if(encontrado){

activarJumpscare()

}else{

alert("Usuario o contraseña incorrectos")

}

})




// FUNCION JUMPSCARE
function activarJumpscare(){

jumpscare.style.display = "flex"

if(scream){

scream.currentTime = 0
scream.play().catch(()=>{})

}

setTimeout(function(){

if(scream){

scream.pause()
scream.currentTime = 0

}

window.location.href = "Terror.html"

},4000)
}