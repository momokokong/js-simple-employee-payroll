// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

// Collect employee data
// function: collectEmployees
// parameter: None
// return: an array:listOfEmployee of object:employee containing employee info(firstName, lastName, salary)
// Descriptions: 
// boolean: addMore (init as true) determines whether or not the user wants to add more employee.
// Then the flow enters a while loop with condition being addMore.  Within the while loop it prompt the user to 
// enter firstName, lastName, and salary.  For each entry it check whether it's an valid input.
// firstName and lastName can be anything as long as the user does not cancel (NULL).  Salary must be a number
// greater or eaqual to 0 and not NULL. If the user chooses cancel, the javascrip would quit from that point.
// Once the user entered three valid answers, it push the object:employee to listOfEmployee then check with 
// the user whether to add more. 
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
// function: displayAverageSalary
// parameter: employeesArray: an array of object:employee containing employee info(firstName, lastName, salary)
// return: None
// Descriptions: 
// The function takes in the employeesArray and add each employee's salary to a total, then divide it by the 
// numbers of employee(employeesArray) to get the average. The function does not return anything but would 
// output the average to console. 
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
// function: getRandomEmployee
// parameter: employeesArray: an array of object:employee containing employee info(firstName, lastName, salary)
// return: None
// Descriptions: 
// The random number is determined by Math.random() * employeesArray.length then floor it to an integer. Therefore, 
// it's always any integer from 0 to (employeesArray.length - 1) and used as the index for the lucky winner!  
// The function does not return anything but would output the info of the lucky winner.
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
