///////////// VARIABLES ////////////////

const $categorias= document.getElementById("categoria")
    
let totalSueldosBrutos = 0
let totalDescuentos = 0
let totalSueldosNetos = 0

let empleador = {}
let Empleados = []
let Liquidaciones = []
let Categorias = []

///////////// FUNCIONES ////////////////

const descontarJubilacion = x => x * 0.11
const descontarLey19032 = x => x * 0.03
const descontarLey23660 = x => x * 0.03
const descontarSindicato = (a,b) => a * b /100
const descontarAusencias = (a, b, c) => (a / b * c)

function diasDelMes(mes, ano) {
    return new Date(ano, mes, 0).getDate()
}

const sumarTotales = () => {
totalSueldosBrutos = Liquidaciones.reduce((acc,curr) => acc + curr.sueldoBruto, 0)
totalDescuentos = Liquidaciones.reduce((acc,curr) => acc + curr.descuentos, 0)
totalSueldosNetos = Liquidaciones.reduce((acc,curr) => acc + curr.sueldoNeto, 0)
}

const mostrarTotales = () => {
    document.getElementById("totalSueldosBrutos").innerText = `$${totalSueldosBrutos.toFixed(2)}`
    document.getElementById("totalDescuentos").innerText = `$${totalDescuentos.toFixed(2)}`
    document.getElementById("totalSueldosNetos").innerText = `$${totalSueldosNetos.toFixed(2)}`
}

const imprimirRecibos = () => {
    let areaImprimir = document.querySelector(".tablaReciboSueldo").outerHTML
    let areaTotal = document.body.innerHTML
    document.body.innerHTML = areaImprimir
    window.print()
    backBody = () => document.body.innerHTML = areaTotal
    setTimeout(backBody, 0)
}

///////////// CLASES ////////////////
class claseEmpleador {
    constructor (nombreEmpresa, cuitEmpresa, domicilioEmpresa){
    this.razonSocial = nombreEmpresa
    this.cuitEmpresa = cuitEmpresa
    this.domicilioEmpresa = domicilioEmpresa
    }
}
class claseEmpleados {
    constructor (apellidoNombre, legajo, cuil, sueldoHabitual, categoria){
    this.legajo = legajo
    this.apellidoNombre = apellidoNombre
    this.cuil = cuil
    this.sueldoHabitual = sueldoHabitual
    this.categoria = categoria
    }
}
class claseLiquidaciones {
    constructor (anoLiquidacion, mesLiquidacion, diasMesLiquidacion, diasAusencias, ausencias, jubilacion, ley19032, ley23660, sindicato, sueldoHabitual) {
    this.anoLiquidacion = anoLiquidacion
    this.mesLiquidacion = mesLiquidacion
    this.diasMesLiquidacion = diasMesLiquidacion
    this.diasAusencias = diasAusencias
    this.ausencias = ausencias
    this.jubilacion = jubilacion
    this.ley19032 = ley19032
    this.ley23660 = ley23660
    this.sindicato = sindicato
    this.sueldoBruto = sueldoHabitual - this.ausencias
    this.descuentos = this.jubilacion + this.ley19032 + this.ley23660 + this.sindicato
    this.sueldoNeto = this.sueldoBruto - this.descuentos
    }
}

///////////// JSON ////////////////

fetch("../data/comercio.json")
.then((res) => (res.ok? res.json() : Promise.reject(res)))
.then((data) => {
        Categorias = data
        data.forEach((cat) => {
            const option = document.createElement("option")
            option.innerText = `${cat.categoria} - ${cat.letra}`
            option.setAttribute("value", `${cat.categoria} - ${cat.letra}`)
            $categorias.append(option)
        })
})
.catch((err) => {
    swal(`Error ${err.status}`, "No se pueden obtener las categorías", "warning")
    })

///////////// BIENVENIDA ////////////////

let usuarioLogueado = sessionStorage.getItem("loginSession")
let bienvenida = document.getElementById("bienvenida")
bienvenida.innerHTML = `Hola ${usuarioLogueado}!!! <a id="logOut" href="../index.html">Cerrar sesión</a>`
let logOut = document.getElementById("logOut")
let clearStorage = () => sessionStorage.clear()
logOut.addEventListener("click", clearStorage)

if(!usuarioLogueado){
    window.location.href = "../index.html"
}

///////////// FORM 1 ////////////////

let enviarFormDatosGenerales = document.querySelector(".formDatosGenerales")
enviarFormDatosGenerales.addEventListener("submit", guardarForm1)

function guardarForm1(event) {

    event.preventDefault()

    let nombreEmpresa = document.getElementById("nombreEmpresa").value
    let cuitEmpresa = document.getElementById("cuitEmpresa").value
    let domicilioEmpresa = document.getElementById("domicilioEmpresa").value
    
    empleador = new claseEmpleador(nombreEmpresa, cuitEmpresa, domicilioEmpresa)
    
    let sub3 = document.querySelector(".sub3")
    sub3.removeAttribute("style", "display")
    let form2 = document.querySelector(".form2")
    form2.setAttribute("style", "display: flex")

    sub3.scrollIntoView({behavior: "smooth"})
} 

/////////////// FORM 2 ///////////////////

let agregarDatosEmpleados = document.querySelector(".formDatosEmpleados")
agregarDatosEmpleados.addEventListener("submit", agregarEmpleado)

let empleadosCargadosUl = document.querySelector(".empleadosCargados")

function agregarEmpleado(event) {

    event.preventDefault()
    
    let legajo = parseInt(document.getElementById("legajo").value)
    let apellidoNombre = document.getElementById("apellidoNombre").value
    let cuil = document.getElementById("cuil").value
    
    let categoria = document.getElementById("categoria").value
    let catValue = categoria.split(" - ")[0]
    let letraValue = categoria.split(" - ")[1]
    let sueldoHabitual = Categorias.find(item => (item.categoria == catValue && item.letra == letraValue)).basico
    
    let legajoFound = Empleados.find((obj) => obj.legajo === legajo)
    if (legajoFound) {
        swal("El legajo ya se encuentra cargado", "", "warning")
    } else {
        const nuevoEmpleado = new claseEmpleados (apellidoNombre, legajo, cuil, sueldoHabitual, categoria)
        Empleados.push(nuevoEmpleado)
    
        let agregarLi = document.createElement("li")
        empleadosCargadosUl.appendChild(agregarLi)
        agregarLi.innerHTML = `Legajo N° ${legajo} - ${apellidoNombre} - <span id="del-${legajo}" style="cursor: pointer">Eliminar</span>`

        let eliminarEmpleadoCreado = document.getElementById(`del-${legajo}`)
        eliminarEmpleadoCreado.addEventListener("click", eliminarEmpleado)

        enviarFormDatosEmpleados.scrollIntoView({behavior: "smooth"})
    }
}

const eliminarEmpleado = ((e) => {
    let idLegajo = e.target.id
    let nroLegajo = idLegajo.split("-")[1]
    let indexLegajo = Empleados.findIndex((obj) => obj.legajo == nroLegajo)
    Empleados.splice(indexLegajo, 1)
    let elem = e.target
    elem.parentNode.remove(elem)
})

let enviarFormDatosEmpleados = document.querySelector(".formDatosEmpleados__div-submit")
enviarFormDatosEmpleados.addEventListener("click", guardarForm2)

function guardarForm2() {

    let sub4 = document.querySelector(".sub4")
    sub4.removeAttribute("style", "display")
    let form3 = document.querySelector(".form3")
    form3.setAttribute("style", "display: flex")

    let divAusencias = document.querySelector(".formDatosLiquidacion__div-ausencias")
    divAusencias.innerHTML = `<div>Días de ausencias en el mes</div>`
    Empleados.forEach((obj) => {
    divAusencias.innerHTML += `<div><label for="diasAusencias">${obj.legajo} - ${obj.apellidoNombre}</label>
    <input id=diasAusencias${Empleados.indexOf(obj)} name="diasAusencias" type="number" min="0" max="31" size="2" required></div>`
    })

    sub4.scrollIntoView({behavior: "smooth"})
}

/////////////// FORM 3 ///////////////////


let enviarFormDatosLiquidacion = document.querySelector(".formDatosLiquidacion")
enviarFormDatosLiquidacion.addEventListener("submit", guardarForm3)

function guardarForm3(event) {

    event.preventDefault()

    Liquidaciones = []

    let tablaReciboSueldo = document.querySelector(".tablaReciboSueldo")
    tablaReciboSueldo.innerText = ""
    let sub5 = document.querySelector(".sub5")
    let titulo2 = document.querySelector(".titulo2")
    let totales = document.querySelector(".totales")
    let divBotonImprimir = document.querySelector(".divBotonImprimir")

    let botonImprimirRecibos = document.getElementById("botonImprimirRecibos")
    botonImprimirRecibos.addEventListener("click", imprimirRecibos)
    
    for (i = 0 ; i < Empleados.length ; i++ ) {

        sub5.removeAttribute("style", "display")
        titulo2.removeAttribute("style", "display")
        tablaReciboSueldo.setAttribute("style", "display: flex")
        totales.setAttribute("style", "display: flex")
        divBotonImprimir.setAttribute("style", "display: flex")

        let anoLiquidacion = parseInt(document.getElementById("anoLiquidacion").value)
        let mesLiquidacion = parseInt(document.getElementById("mesLiquidacion").value)
        let diasMesLiquidacion = parseInt(diasDelMes(mesLiquidacion, anoLiquidacion))

        let sueldoHabitual = Empleados[i].sueldoHabitual

        let diasAusencias = parseInt(document.getElementById(`diasAusencias${i}`).value)

        let alicuotaSindicato = Number(document.getElementById("alicuotaSindicato").value)
        let ausencias = descontarAusencias(Empleados[i].sueldoHabitual, diasMesLiquidacion, diasAusencias)
        let sindicato = descontarSindicato(Empleados[i].sueldoHabitual, alicuotaSindicato)

        if(!(document.getElementById("descuentoJubilacion").checked)) {jubilacion = 0}
        else {jubilacion = descontarJubilacion(Empleados[i].sueldoHabitual)}
        if(!(document.getElementById("descuentoLey19032").checked)) {ley19032 = 0}
        else {ley19032 = descontarLey19032(Empleados[i].sueldoHabitual)}
        if(!(document.getElementById("descuentoLey23660").checked)) {ley23660 = 0}
        else {ley23660 = descontarLey23660(Empleados[i].sueldoHabitual)}

        const nuevaLiquidacion = new claseLiquidaciones (anoLiquidacion, mesLiquidacion, diasMesLiquidacion, diasAusencias, ausencias, jubilacion, ley19032, ley23660, sindicato, sueldoHabitual)
        Liquidaciones.push(nuevaLiquidacion)

        }

////////////// COMPLETAR RECIBOS ////////////////////

    for (i = 0 ; i < Liquidaciones.length ; i++ ) {

        let reciboSueldoNuevo = 
        `<table class="tablaReciboSueldo__in" cellspacing="0" cellpadding="3px">
        <tr>
            <th colspan="4">Datos de la empresa</th>
        </tr>
        <tr>
            <td>Razón social:</td>
            <td colspan="3" class="nombreEmpresaRecibo"></td>
        </tr>
        <tr>
            <td>CUIT:</td>
            <td colspan="3" class="cuitEmpresaRecibo"></td>
        </tr>
        <tr>
            <td>Domicilio:</td>
            <td colspan="3" class="domicilioEmpresaRecibo"></td>
        </tr>
        <tr>
            <td>Período de liquidación:</td>
            <td colspan="3" id="periodoLiquidacionRecibo${i}"></td>
        </tr>
        <tr>
            <th colspan="4">Datos del empleado</th>
        </tr>
        <tr>
            <td>Apellido y Nombre:</td>
            <td colspan="3" id="apellidoNombreRecibo${i}"></td>
        </tr>
        <tr>
            <td>CUIL:</td>
            <td colspan="3" id="cuilRecibo${i}"></td>
        </tr>
        <tr>
            <td>Legajo N°:</td>
            <td colspan="3" id="legajoRecibo${i}"></td>
        </tr>
        <tr>
            <td>Sueldo básico:</td>
            <td id="sueldoHabitualRecibo${i}"></td>
            <td>Categoría:</td>
            <td id="categoriaRecibo${i}"></td>
        </tr>
        <tr>
            <th>Concepto</th>
            <th>Remunerativo</th>
            <th>No remunerativo</th>
            <th>Descuentos</th>
        </tr>
        <tr>
            <td>Sueldo básico:</td>
            <td id="sueldoBasicoRecibo${i}"></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>Ausencias:</td>
            <td id="ausenciasRecibo${i}"></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>Jubilación:</td>
            <td></td>
            <td></td>
            <td id="jubilacionRecibo${i}"></td>
        </tr>
        <tr>
            <td>Ley 19032:</td>
            <td></td>
            <td></td>
            <td id="ley19032Recibo${i}"></td>
        </tr>
        <tr>
            <td>Ley 23660:</td>
            <td></td>
            <td></td>
            <td id="ley23660Recibo${i}"></td>
        </tr>
        <tr>
            <td>Sindicato:</td>
            <td></td>
            <td></td>
            <td id="sindicatoRecibo${i}"></td>
        </tr>
        <tr>
            <td>SUBTOTALES:</td>
            <td id="subtotalRemunerativoRecibo${i}"></td>
            <td id="subtotalNoRemunerativoRecibo${i}"></td>
            <td id="subtotalDescuentosRecibo${i}"></td>
        </tr>
        <tr>
            <td colspan="3">SUELDO NETO A PAGAR</td>
            <td id="netoPagarRecibo${i}"></td>
        </tr>
        </table>`

        tablaReciboSueldo = document.querySelector(".tablaReciboSueldo")
        tablaReciboSueldo.insertAdjacentHTML("beforeend", reciboSueldoNuevo)

        document.getElementById(`periodoLiquidacionRecibo${i}`).innerText = Liquidaciones[i].mesLiquidacion + "/" + Liquidaciones[i].anoLiquidacion
        document.getElementById(`apellidoNombreRecibo${i}`).innerText = Empleados[i].apellidoNombre
        document.getElementById(`cuilRecibo${i}`).innerText = Empleados[i].cuil
        document.getElementById(`legajoRecibo${i}`).innerText = Empleados[i].legajo
        document.getElementById(`sueldoHabitualRecibo${i}`).innerText = `$${Empleados[i].sueldoHabitual}`
        document.getElementById(`sueldoBasicoRecibo${i}`).innerText = `$${Empleados[i].sueldoHabitual}`
        document.getElementById(`categoriaRecibo${i}`).innerText = `${Empleados[i].categoria}`
        document.getElementById(`ausenciasRecibo${i}`).innerText = `$${Liquidaciones[i].ausencias.toFixed(2)}`
        document.getElementById(`jubilacionRecibo${i}`).innerText = `$${Liquidaciones[i].jubilacion.toFixed(2)}`
        document.getElementById(`ley19032Recibo${i}`).innerText = `$${Liquidaciones[i].ley19032.toFixed(2)}`
        document.getElementById(`ley23660Recibo${i}`).innerText = `$${Liquidaciones[i].ley23660.toFixed(2)}`
        document.getElementById(`sindicatoRecibo${i}`).innerText = `$${Liquidaciones[i].sindicato.toFixed(2)}`
        document.getElementById(`subtotalRemunerativoRecibo${i}`).innerText = `$${Liquidaciones[i].sueldoBruto.toFixed(2)}`
        document.getElementById(`subtotalDescuentosRecibo${i}`).innerText = `$${Liquidaciones[i].descuentos.toFixed(2)}`
        document.getElementById(`netoPagarRecibo${i}`).innerText = `$${Liquidaciones[i].sueldoNeto.toFixed(2)}`
    }

    let nombreEmpresaRecibo = document.querySelectorAll(".nombreEmpresaRecibo")
    let cuitEmpresaRecibo = document.querySelectorAll(".cuitEmpresaRecibo")
    let domicilioEmpresaRecibo = document.querySelectorAll(".domicilioEmpresaRecibo")

    nombreEmpresaRecibo.forEach( obj => (obj.innerText = empleador.razonSocial))
    cuitEmpresaRecibo.forEach( obj => (obj.innerText = empleador.cuitEmpresa))
    domicilioEmpresaRecibo.forEach( obj => (obj.innerText = empleador.domicilioEmpresa))

    sumarTotales()
    mostrarTotales()

    let endProyect = document.getElementById("endProyect")
    endProyect.innerHTML = `Adios ${usuarioLogueado}!!! <a id="logOutFin" href="../index.html">Cerrar sesión</a>`
    let logOutFin = document.getElementById("logOutFin")
    endProyect.setAttribute("style", "display: block")
    logOutFin.addEventListener("click", clearStorage)

    scrollFinal = () => logOutFin.scrollIntoView({behavior: "smooth"})
    setTimeout(scrollFinal, 0)
}

///////////// FINALIZAR ////////////////


