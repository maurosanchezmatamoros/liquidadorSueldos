const descontarJubilacion = (x) => x * 0.11
const descontarLey19032 = (x) => x * 0.03
const descontarLey23660 = (x) => x * 0.03

//Datos de la empresa y liquidación en general

let Empresa = prompt("Nombre de la empresa")
console.log ("Nombre de la empresa: " + Empresa)

let AnoLiquidacion = parseInt(prompt("Año de liquidacion (en número)"))

let MesLiquidacion = parseInt(prompt("Mes de liquidacion (en número)"))
console.log ("Período de liquidacion: " + MesLiquidacion + "/" + AnoLiquidacion)

switch (MesLiquidacion) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
        DiasMesLiquidacion = 31
        break;
    case 4:
    case 6:
    case 9:
    case 11:
        DiasMesLiquidacion = 30
        break;
    case 2:
        if(AnoLiquidacion % 4 == 0) {DiasMesLiquidacion = 29}
        else DiasMesLiquidacion = 28
        break;
    default:
        alert("No se reconoce la respuesta")
}

console.log("Dias del mes: " + DiasMesLiquidacion)

let CantidadEmpleados = parseInt(prompt("Cantidad de empleados de la empresa"))
console.log ("Cantidad de empleados de la empresa: " + CantidadEmpleados)

let SueldosEmpleados = [] 

function ReciboSueldo (ApellidoNombre, SueldoHabitual, DiasAusencias) {
    this.ApellidoNombre = ApellidoNombre;
    this.SueldoHabitual = SueldoHabitual;
    this.DiasAusencias = DiasAusencias;
    this.Ausencias = (SueldoHabitual / DiasMesLiquidacion * DiasAusencias);
    this.Jubilacion = descontarJubilacion(SueldoHabitual);
    this.Ley19032 = descontarLey19032(SueldoHabitual);
    this.Ley23660 = descontarLey23660(SueldoHabitual);
    this.SueldoBruto = SueldoHabitual - this.Ausencias;
    this.Descuentos = this.Jubilacion + this.Ley19032 + this.Ley23660;
    this.SueldoNeto = this.SueldoBruto - this.Descuentos;
}

for( i = 1 ; i <= CantidadEmpleados ; i++) {
    const ApellidoNombre = prompt("Apellido y nombre del empleado")
    const SueldoHabitual = parseInt(prompt("Salario Basico del empleado"))
    const DiasAusencias = parseInt(prompt("Ausencias injustificadas del mes del empleado"))

    const nuevoRecibo = new ReciboSueldo (ApellidoNombre, SueldoHabitual, DiasAusencias)
    SueldosEmpleados.push(nuevoRecibo)
}

console.log(SueldosEmpleados)

const TotalSueldosBrutos = SueldosEmpleados.reduce((acc,curr) => acc + curr.SueldoBruto, 0)
const TotalDescuentos = SueldosEmpleados.reduce((acc,curr) => acc + curr.Descuentos, 0)
const TotalSueldosNetos = SueldosEmpleados.reduce((acc,curr) => acc + curr.SueldoNeto, 0)

console.log("Total final de sueldos brutos: $" + TotalSueldosBrutos.toFixed(2))
console.log("Total final de descuentos: ( $" + TotalDescuentos.toFixed(2) + ")")
console.log("Total final de sueldos netos a pagar: $" + TotalSueldosNetos.toFixed(2))

