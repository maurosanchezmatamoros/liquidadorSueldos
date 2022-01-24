const AlicuotaJubilacion = 0.11

const AlicuotaLey19032 = 0.03

const AlicuotaLey23660 = 0.03

let MesLiquidacion = prompt("Mes de liquidacion")
console.log ("Mes de liquidacion: " + MesLiquidacion)

let CantidadEmpleados = parseInt(prompt("Cantidad de empleados de la empresa"))
console.log ("Cantidad de empleados de la empresa: " + CantidadEmpleados)

for( i = 1 ; i <= CantidadEmpleados ; i++) {
    
    let ApellidoNombre = prompt("Apellido y nombre del empleado")
    console.log ("Empleado: " + ApellidoNombre)
    
    let SueldoHabitual = parseInt(prompt("Salario Basico de " + ApellidoNombre))
    
    let Ausencias = prompt("Ausencias injustificadas del mes de " + ApellidoNombre)
    
    let DiasTrabajados = 30 - Ausencias
    
    let SueldoBasico = SueldoHabitual / 30 * DiasTrabajados
    console.log ("Sueldo básico: $" + SueldoBasico)
    
    let Jubilacion = SueldoBasico * AlicuotaJubilacion
    console.log ("Jubilación: $" + Jubilacion)
    
    let Ley19032 = SueldoBasico * AlicuotaLey19032
    console.log ("Ley 19032: $" + Ley19032)
    
    let Ley23660 = SueldoBasico * AlicuotaLey23660
    console.log ("Ley 23660: $" + Ley23660)
    
    let SueldoBruto = SueldoBasico
    console.log ("Total sueldo bruto: $" + SueldoBruto)
    
    let Descuentos = Jubilacion + Ley19032 + Ley23660
    console.log ("Total descuentos: $" + Descuentos)
    
    let SueldoNeto = SueldoBruto - Descuentos
    console.log ("Sueldo neto a pagar: $" + SueldoNeto)

}



////////////













