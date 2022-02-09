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
totalSueldosBrutos = SueldosEmpleados.reduce((acc,curr) => acc + curr.sueldoBruto, 0)
totalDescuentos = SueldosEmpleados.reduce((acc,curr) => acc + curr.descuentos, 0)
totalSueldosNetos = SueldosEmpleados.reduce((acc,curr) => acc + curr.sueldoNeto, 0)
}

const mostrarTotales = () => {
    console.log("Total final de sueldos brutos: $" + totalSueldosBrutos.toFixed(2))
    console.log("Total final de descuentos: ( $" + totalDescuentos.toFixed(2) + ")")
    console.log("Total final de sueldos netos a pagar: $" + totalSueldosNetos.toFixed(2))

    document.getElementById("totalSueldosBrutos").innerText = `$${totalSueldosBrutos.toFixed(2)}`
    document.getElementById("totalDescuentos").innerText = `$${totalDescuentos.toFixed(2)}`
    document.getElementById("totalSueldosNetos").innerText = `$${totalSueldosNetos.toFixed(2)}`
}

let SueldosEmpleados = [] 

let Liquidaciones = []

class LiquidacionGeneral {
    constructor (nombreEmpresa, cuitEmpresa, domicilioEmpresa, anoLiquidacion, mesLiquidacion, diasMesLiquidacion){
    this.nombreEmpresa = nombreEmpresa
    this.cuitEmpresa = cuitEmpresa
    this.domicilioEmpresa = domicilioEmpresa
    this.anoLiquidacion = anoLiquidacion
    this.mesLiquidacion = mesLiquidacion
    this.diasMesLiquidacion = diasMesLiquidacion
    }
}
class ReciboSueldo {
    constructor (apellidoNombre, legajo, cuil, sueldoHabitual, diasAusencias, diasMesLiquidacion, ausencias, jubilacion, ley19032, ley23660, sindicato){
    this.apellidoNombre = apellidoNombre
    this.legajo = legajo
    this.cuil = cuil
    this.sueldoHabitual = sueldoHabitual
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

let enviarFormDatosGenerales = document.querySelector(".formDatosGenerales")
enviarFormDatosGenerales.addEventListener("submit", guardarForm1)

function guardarForm1(ev) {
    ev.preventDefault()
    
    let anoLiquidacion = parseInt(document.getElementById("anoLiquidacion").value)
    let mesLiquidacion = parseInt(document.getElementById("mesLiquidacion").value)
    let nombreEmpresa = document.getElementById("nombreEmpresa").value
    let cuitEmpresa = document.getElementById("cuitEmpresa").value
    let domicilioEmpresa = document.getElementById("domicilioEmpresa").value
    let diasMesLiquidacion = parseInt(diasDelMes(mesLiquidacion, anoLiquidacion))

    const nuevaLiquidacion = new LiquidacionGeneral(nombreEmpresa, cuitEmpresa, domicilioEmpresa, anoLiquidacion, mesLiquidacion, diasMesLiquidacion)
    Liquidaciones.push(nuevaLiquidacion)

    console.log(Liquidaciones)
    console.log("Se creó una nueva Liquidación")
} 

/////////////// FORM 2 ///////////////////

let enviarFormDatosEmpleados = document.querySelector(".formDatosEmpleados")
enviarFormDatosEmpleados.addEventListener("submit", guardarForm2)

function guardarForm2(ev) {
    ev.preventDefault()
    
    let apellidoNombre = document.getElementById("apellidoNombre").value
    let legajo = parseInt(document.getElementById("legajo").value)
    let cuil = document.getElementById("cuil").value
    let sueldoHabitual = parseInt(document.getElementById("sueldoHabitual").value)
    let diasAusencias = parseInt(document.getElementById("diasAusencias").value)
    let alicuotaSindicato = parseInt(document.getElementById("alicuotaSindicato").value)
    let diasMesLiquidacion = Liquidaciones[0].diasMesLiquidacion
    let ausencias = descontarAusencias(sueldoHabitual, diasMesLiquidacion, diasAusencias)
    let sindicato = descontarSindicato(sueldoHabitual, alicuotaSindicato)

    if(!(document.getElementById("descuentoJubilacion").checked)) {jubilacion = 0}
    else {jubilacion = descontarJubilacion(sueldoHabitual)}
    if(!(document.getElementById("descuentoLey19032").checked)) {ley19032 = 0}
    else {ley19032 = descontarLey19032(sueldoHabitual)}
    if(!(document.getElementById("descuentoLey23660").checked)) {ley23660 = 0}
    else {ley23660 = descontarLey23660(sueldoHabitual)}

    const nuevoRecibo = new ReciboSueldo (apellidoNombre, legajo, cuil, sueldoHabitual, diasAusencias, diasMesLiquidacion, ausencias, jubilacion, ley19032, ley23660, sindicato)
    SueldosEmpleados.push(nuevoRecibo)

    console.log(SueldosEmpleados)

    sumarTotales()
    mostrarTotales()

////////////// COMPLETAR RECIBOS ////////////////////

document.getElementById("nombreEmpresaRecibo").innerText = Liquidaciones[0].nombreEmpresa
document.getElementById("cuitEmpresaRecibo").innerText = Liquidaciones[0].cuitEmpresa
document.getElementById("domicilioEmpresaRecibo").innerText = Liquidaciones[0].domicilioEmpresa
document.getElementById("periodoLiquidacionRecibo").innerText = Liquidaciones[0].mesLiquidacion + "/" + Liquidaciones[0].anoLiquidacion
document.getElementById("apellidoNombreRecibo").innerText = SueldosEmpleados[0].apellidoNombre
document.getElementById("cuilRecibo").innerText = SueldosEmpleados[0].cuil
document.getElementById("legajoRecibo").innerText = SueldosEmpleados[0].legajo
document.getElementById("sueldoHabitualRecibo").innerText = `$${SueldosEmpleados[0].sueldoHabitual}`
document.getElementById("sueldoBasicoRecibo").innerText = `$${SueldosEmpleados[0].sueldoHabitual}`
document.getElementById("ausenciasRecibo").innerText = `$${SueldosEmpleados[0].ausencias.toFixed(2)}`
document.getElementById("jubilacionRecibo").innerText = `$${SueldosEmpleados[0].jubilacion.toFixed(2)}`
document.getElementById("ley19032Recibo").innerText = `$${SueldosEmpleados[0].ley19032.toFixed(2)}`
document.getElementById("ley23660Recibo").innerText = `$${SueldosEmpleados[0].ley23660.toFixed(2)}`
document.getElementById("sindicatoRecibo").innerText = `$${SueldosEmpleados[0].sindicato.toFixed(2)}`
document.getElementById("subtotalRemunerativoRecibo").innerText = `$${SueldosEmpleados[0].sueldoBruto.toFixed(2)}`
document.getElementById("subtotalDescuentosRecibo").innerText = `$${SueldosEmpleados[0].descuentos.toFixed(2)}`
document.getElementById("netoPagarRecibo").innerText = `$${SueldosEmpleados[0].sueldoNeto.toFixed(2)}`

}
