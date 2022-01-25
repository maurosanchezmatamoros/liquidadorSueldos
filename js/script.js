const Jubilacion = (x) => x * 0.11
const Ley19032 = (x) => x * 0.03
const Ley23660 = (x) => x * 0.03

let TotalSueldosNetos = 0,
TotalSueldosBrutos = 0,
TotalDescuentos = 0

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
        let febrero = parseInt(prompt("¿Febrero tiene 28 o 29 días?"));
        if(febrero == 28) { DiasMesLiquidacion = 28 }
        else if(febrero == 29) { DiasMesLiquidacion = 29 }
        else { alert("No se reconoce la respuesta") }
        break;
    default:
        alert("No se reconoce la respuesta")
}

console.log("Dias del mes: " + DiasMesLiquidacion)

let CantidadEmpleados = parseInt(prompt("Cantidad de empleados de la empresa"))
console.log ("Cantidad de empleados de la empresa: " + CantidadEmpleados)

for( i = 1 ; i <= CantidadEmpleados ; i++) {
    let ApellidoNombre = prompt("Apellido y nombre del empleado");
    console.log("Empleado: " + ApellidoNombre);
    
    let SueldoHabitual = parseInt(prompt("Salario Basico de " + ApellidoNombre)).toFixed(2);
    
    let DiasAusencias = parseInt(prompt("Ausencias injustificadas del mes de " + ApellidoNombre));
    
    let SueldoBasico = SueldoHabitual;
    console.log("Sueldo básico: $" + SueldoBasico);

    let Ausencias = (SueldoBasico / DiasMesLiquidacion * DiasAusencias).toFixed(2);
    console.log("Ausencias (" + DiasAusencias + "): $ (" + Ausencias + ")");
    
    console.log("Jubilación: $ (" + (Jubilacion(SueldoBasico)).toFixed(2) + ")");
    
    console.log("Ley 19032: $ (" + (Ley19032(SueldoBasico)).toFixed(2) + ")");
    
    console.log("Ley 23660: $ (" + (Ley23660(SueldoBasico)).toFixed(2) + ")");
    
    let SueldoBruto = SueldoBasico - Ausencias;
    console.log("Total sueldo bruto: $" + SueldoBruto);
    
    let Descuentos = Jubilacion(SueldoBasico) + Ley19032(SueldoBasico) + Ley23660(SueldoBasico);
    console.log("Total descuentos: $" + Descuentos.toFixed(2));
    
    let SueldoNeto = SueldoBruto - Descuentos;
    console.log("Sueldo neto a pagar: $" + SueldoNeto.toFixed(2));

    TotalSueldosBrutos += SueldoBruto

    TotalDescuentos += Descuentos

    TotalSueldosNetos += SueldoNeto
}

console.log("Total final de sueldos brutos: $" + TotalSueldosBrutos)
console.log("Total final de descuentos: $ (" + TotalDescuentos + ")")
console.log("Total final de sueldos netos a pagar: $" + TotalSueldosNetos)

