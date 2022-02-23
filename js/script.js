const descontarJubilacion = x => x * 0.11
const descontarLey19032 = x => x * 0.03
const descontarLey23660 = x => x * 0.03
const descontarSindicato = (a,b) => a * b /100
const descontarAusencias = (a, b, c) => (a / b * c)

function diasDelMes(mes, ano) {
    return new Date(ano, mes, 0).getDate()
}

let totalSueldosBrutos = 0
let totalDescuentos = 0
let totalSueldosNetos = 0

const sumarTotales = () => {
totalSueldosBrutos = Liquidaciones.reduce((acc,curr) => acc + curr.sueldoBruto, 0)
totalDescuentos = Liquidaciones.reduce((acc,curr) => acc + curr.descuentos, 0)
totalSueldosNetos = Liquidaciones.reduce((acc,curr) => acc + curr.sueldoNeto, 0)
}

const mostrarTotales = () => {
    console.log("Total final de sueldos brutos: $" + totalSueldosBrutos.toFixed(2))
    console.log("Total final de descuentos: ( $" + totalDescuentos.toFixed(2) + ")")
    console.log("Total final de sueldos netos a pagar: $" + totalSueldosNetos.toFixed(2))

    document.getElementById("totalSueldosBrutos").innerText = `$${totalSueldosBrutos.toFixed(2)}`
    document.getElementById("totalDescuentos").innerText = `$${totalDescuentos.toFixed(2)}`
    document.getElementById("totalSueldosNetos").innerText = `$${totalSueldosNetos.toFixed(2)}`
}

let empleador = {}

let Empleados = []

let Liquidaciones = []

class claseEmpleador {
    constructor (nombreEmpresa, cuitEmpresa, domicilioEmpresa){
    this.razonSocial = nombreEmpresa
    this.cuitEmpresa = cuitEmpresa
    this.domicilioEmpresa = domicilioEmpresa
    }
}
class claseEmpleados {
    constructor (apellidoNombre, legajo, cuil, sueldoHabitual){
    this.legajo = legajo
    this.apellidoNombre = apellidoNombre
    this.cuil = cuil
    this.sueldoHabitual = sueldoHabitual
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

///////////// FORM 1 ////////////////

let enviarFormDatosGenerales = document.querySelector(".formDatosGenerales__div-submit")
enviarFormDatosGenerales.addEventListener("click", guardarForm1)

function guardarForm1() {

    let nombreEmpresa = document.getElementById("nombreEmpresa").value
    let cuitEmpresa = document.getElementById("cuitEmpresa").value
    let domicilioEmpresa = document.getElementById("domicilioEmpresa").value
    empleador = new claseEmpleador(nombreEmpresa, cuitEmpresa, domicilioEmpresa)
    console.log(empleador)
    console.log("Se guardaron los datos del empleador")
} 

/////////////// FORM 2 ///////////////////

let enviarFormDatosEmpleados = document.querySelector(".formDatosEmpleados__div-submit")
enviarFormDatosEmpleados.addEventListener("click", guardarForm2)

let empleadosCargadosUl = document.querySelector(".empleadosCargados")

function guardarForm2() {
    let legajo = parseInt(document.getElementById("legajo").value)
    let apellidoNombre = document.getElementById("apellidoNombre").value
    let cuil = document.getElementById("cuil").value
    let sueldoHabitual = parseInt(document.getElementById("sueldoHabitual").value)

    const nuevoEmpleado = new claseEmpleados (apellidoNombre, legajo, cuil, sueldoHabitual)
    Empleados.push(nuevoEmpleado)

    let agregarLi = document.createElement("li")
    empleadosCargadosUl.appendChild(agregarLi)
    agregarLi.innerHTML = `Legajo N° ${legajo} - ${apellidoNombre} - <span id="del-${legajo}" style="cursor: pointer">Eliminar</span>`

    console.log(Empleados)
    console.log("Se guardaron los datos del empleado")

    let eliminarEmpleadoCreado = document.getElementById(`del-${legajo}`)
    eliminarEmpleadoCreado.addEventListener("click", eliminarEmpleado)
}

const eliminarEmpleado = (e) => {
    let idLegajo = e.target.id
    let nroLegajo = idLegajo.split("-")[1]
    let indexLegajo = Empleados.findIndex(obj => (obj.legajo == nroLegajo))
    Empleados.splice(indexLegajo, 1)
    console.log(Empleados)
    let elem = e.target
    elem.parentNode.remove(elem)
}

/////////////// FORM 3 ///////////////////


let enviarFormDatosLiquidacion = document.querySelector(".formDatosLiquidacion__div-submit")
enviarFormDatosLiquidacion.addEventListener("click", guardarForm3)

function guardarForm3() {

    for (i = 0 ; i < Empleados.length ; i++ ) {

    let titulo2 = document.querySelector(".titulo2")
    titulo2.setAttribute("style", "visibility:visible")
    let tablaReciboSueldo = document.querySelector(".tablaReciboSueldo")
    tablaReciboSueldo.setAttribute("style", "visibility:visible")
    let totales = document.querySelector(".totales")
    totales.setAttribute("style", "visibility:visible")

    let anoLiquidacion = parseInt(document.getElementById("anoLiquidacion").value)
    let mesLiquidacion = parseInt(document.getElementById("mesLiquidacion").value)
    let diasMesLiquidacion = parseInt(diasDelMes(mesLiquidacion, anoLiquidacion))

    let sueldoHabitual = Empleados[i].sueldoHabitual
    let diasAusencias = parseInt(document.getElementById("diasAusencias").value)
    let alicuotaSindicato = parseInt(document.getElementById("alicuotaSindicato").value)
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

    console.log(Liquidaciones)

    sumarTotales()
    mostrarTotales()

////////////// COMPLETAR RECIBOS ////////////////////

document.getElementById("nombreEmpresaRecibo").innerText = empleador.razonSocial
document.getElementById("cuitEmpresaRecibo").innerText = empleador.cuitEmpresa
document.getElementById("domicilioEmpresaRecibo").innerText = empleador.domicilioEmpresa
document.getElementById("periodoLiquidacionRecibo").innerText = Liquidaciones[0].mesLiquidacion + "/" + Liquidaciones[0].anoLiquidacion
document.getElementById("apellidoNombreRecibo").innerText = Empleados[0].apellidoNombre
document.getElementById("cuilRecibo").innerText = Empleados[0].cuil
document.getElementById("legajoRecibo").innerText = Empleados[0].legajo
document.getElementById("sueldoHabitualRecibo").innerText = `$${Empleados[0].sueldoHabitual}`
document.getElementById("sueldoBasicoRecibo").innerText = `$${Empleados[0].sueldoHabitual}`
document.getElementById("ausenciasRecibo").innerText = `$${Liquidaciones[0].ausencias.toFixed(2)}`
document.getElementById("jubilacionRecibo").innerText = `$${Liquidaciones[0].jubilacion.toFixed(2)}`
document.getElementById("ley19032Recibo").innerText = `$${Liquidaciones[0].ley19032.toFixed(2)}`
document.getElementById("ley23660Recibo").innerText = `$${Liquidaciones[0].ley23660.toFixed(2)}`
document.getElementById("sindicatoRecibo").innerText = `$${Liquidaciones[0].sindicato.toFixed(2)}`
document.getElementById("subtotalRemunerativoRecibo").innerText = `$${Liquidaciones[0].sueldoBruto.toFixed(2)}`
document.getElementById("subtotalDescuentosRecibo").innerText = `$${Liquidaciones[0].descuentos.toFixed(2)}`
document.getElementById("netoPagarRecibo").innerText = `$${Liquidaciones[0].sueldoNeto.toFixed(2)}`
}