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

    let sub3 = document.querySelector(".sub3")
    sub3.removeAttribute("style", "display")
    let form2 = document.querySelector(".form2")
    form2.setAttribute("style", "display: flex")

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

    let sub4 = document.querySelector(".sub4")
    sub4.removeAttribute("style", "display")
    let form3 = document.querySelector(".form3")
    form3.setAttribute("style", "display: flex")

    let legajo = parseInt(document.getElementById("legajo").value)
    let apellidoNombre = document.getElementById("apellidoNombre").value
    let cuil = document.getElementById("cuil").value
    let sueldoHabitual = Number(document.getElementById("sueldoHabitual").value)

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

    let sub5 = document.querySelector(".sub5")
    sub5.removeAttribute("style", "display")
    let titulo2 = document.querySelector(".titulo2")
    titulo2.removeAttribute("style", "display")
    let tablaReciboSueldo = document.querySelector(".tablaReciboSueldo")
    tablaReciboSueldo.setAttribute("style", "display: flex")
    let totales = document.querySelector(".totales")
    totales.setAttribute("style", "display: flex")

    let anoLiquidacion = parseInt(document.getElementById("anoLiquidacion").value)
    let mesLiquidacion = parseInt(document.getElementById("mesLiquidacion").value)
    let diasMesLiquidacion = parseInt(diasDelMes(mesLiquidacion, anoLiquidacion))

    let sueldoHabitual = Empleados[i].sueldoHabitual
    let diasAusencias = parseInt(document.getElementById("diasAusencias").value)
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
    <td colspan="3" id="nombreEmpresaRecibo"></td>
</tr>
<tr>
    <td>CUIT:</td>
    <td colspan="3" id="cuitEmpresaRecibo"></td>
</tr>
<tr>
    <td>Domicilio:</td>
    <td colspan="3" id="domicilioEmpresaRecibo"></td>
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
    <td>Sueldo categoría:</td>
    <td colspan="3" id="sueldoHabitualRecibo${i}"></td>
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

    let tablaReciboSueldo = document.querySelector(".tablaReciboSueldo")
    tablaReciboSueldo.insertAdjacentHTML("beforeend", reciboSueldoNuevo)

    document.getElementById("nombreEmpresaRecibo").innerText = empleador.razonSocial
    document.getElementById("cuitEmpresaRecibo").innerText = empleador.cuitEmpresa
    document.getElementById("domicilioEmpresaRecibo").innerText = empleador.domicilioEmpresa
    document.getElementById(`periodoLiquidacionRecibo${i}`).innerText = Liquidaciones[i].mesLiquidacion + "/" + Liquidaciones[i].anoLiquidacion
    document.getElementById(`apellidoNombreRecibo${i}`).innerText = Empleados[i].apellidoNombre
    document.getElementById(`cuilRecibo${i}`).innerText = Empleados[i].cuil
    document.getElementById(`legajoRecibo${i}`).innerText = Empleados[i].legajo
    document.getElementById(`sueldoHabitualRecibo${i}`).innerText = `$${Empleados[i].sueldoHabitual}`
    document.getElementById(`sueldoBasicoRecibo${i}`).innerText = `$${Empleados[i].sueldoHabitual}`
    document.getElementById(`ausenciasRecibo${i}`).innerText = `$${Liquidaciones[i].ausencias.toFixed(2)}`
    document.getElementById(`jubilacionRecibo${i}`).innerText = `$${Liquidaciones[i].jubilacion.toFixed(2)}`
    document.getElementById(`ley19032Recibo${i}`).innerText = `$${Liquidaciones[i].ley19032.toFixed(2)}`
    document.getElementById(`ley23660Recibo${i}`).innerText = `$${Liquidaciones[i].ley23660.toFixed(2)}`
    document.getElementById(`sindicatoRecibo${i}`).innerText = `$${Liquidaciones[i].sindicato.toFixed(2)}`
    document.getElementById(`subtotalRemunerativoRecibo${i}`).innerText = `$${Liquidaciones[i].sueldoBruto.toFixed(2)}`
    document.getElementById(`subtotalDescuentosRecibo${i}`).innerText = `$${Liquidaciones[i].descuentos.toFixed(2)}`
    document.getElementById(`netoPagarRecibo${i}`).innerText = `$${Liquidaciones[i].sueldoNeto.toFixed(2)}`
}

console.log(Liquidaciones)

    sumarTotales()
    mostrarTotales()
}

