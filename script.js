// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

// Collect employee data
const collectEmployees = function() {
  let addMore = true;
  let listOfEmployee = [];
  while (addMore) {
    const employee = {
      firstName: null,
      lastName: null,
      salary: null
    };
    employee.firstName = prompt("Enter employee first name", "");
    if (employee.firstName === null ) {
      alert("User cancelled.");
      return;
    } else {
      employee.firstName = employee.firstName.trim();
    }
    employee.lastName = prompt("Enter employee last name", "");
    if (employee.lastName === null ) {
      alert("User cancelled.");
      return;
    } else {
      employee.lastName = employee.lastName.trim();
    }
    employee.salary = prompt("Enter " + employee.firstName + " " + employee.lastName.charAt(0) + ". salary", 0);
    if (employee.salary === null ) {
      alert("User cancelled.");
      return;
    } else {
      employee.salary = Number(employee.salary.trim());
    }
    while (((employee.salary) < 0) || isNaN((employee.salary))) {
      employee.salary = prompt("Invalid number. Please enter employee: " + employee.firstName + " " + employee.lastName.charAt(0) + ". salary again.", 0);
    }
    listOfEmployee.push(employee);
    addMore = confirm("Add more employee?");
  }
  return listOfEmployee;
}

// Display the average salary
const displayAverageSalary = function(employeesArray) {
  let average;
  let total = 0;
  employeesArray.forEach(element => {
    total += element.salary;
  });
  average = total / employeesArray.length;
  console.log("The average employee salary between our " + employeesArray.length + " employee(s) is " + average + ".");
}

// Select a random employee
const getRandomEmployee = function(employeesArray) {
  const randomEmployee = Math.floor(Math.random() * employeesArray.length);
  console.log("Congratulations to " + employeesArray[randomEmployee].firstName + " " + employeesArray[randomEmployee].lastName + ", our random drawing winner!");
}

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
      style:"currency",
      currency:"USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function() {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
