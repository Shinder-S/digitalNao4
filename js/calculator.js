// html elements
/* 
Number() + Number

*/
// You need to add the salary per hour and the hours per month to get the gross salary

let salaryPerHour = document.getElementById('txt_salary');
let hoursPerMonth = document.getElementById('txt_month');
let basicSalaryPerMonth = document.getElementById('txt_basic');
let Salary = document.getElementById('txt_gross'); // result
let CalcButton = document.getElementById('calc');


CalcButton.addEventListener('click',DoCalculation)
console.log(salaryPerHour, hoursPerMonth, basicSalaryPerMonth, Salary)

function DoCalculation(){

/*
1h -15euro
basicSalary = 289h*15
Salary after Taxes= basicsalary - basicsalary*21/100

*/
/* 
Changing 
Number() to Number

*/
let basicSalary = Number(hoursPerMonth.value) * Number(salaryPerHour.value);
let SalarywithTax = basicSalary * 21/100;
basicSalaryPerMonth.value=basicSalary;
Salary.value= basicSalary - SalarywithTax;
console.log(SalarywithTax);
console.log(salaryPerHour.value);
}