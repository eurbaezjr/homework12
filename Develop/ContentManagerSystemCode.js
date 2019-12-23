const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table"); 

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "content_manager_system"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Empoyees",
        "Add Department",
        "Add Role", 
        "Add Employee", 
        "Update Employee Role",
        "Update Employee Manager",
        "Delete Department",
        "Delete Role",
        "Delete Employee",
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View All Departments":
        departmentSearch();
        break;

      case "View All Roles":
        rolesSearch();
        break;

      case "View All Empoyees":
        employeesSearch();
        break;
      
      case "Add Department":
        departmentAdd();
        break;

      case "Add Role":
        roleAdd();
        break;

      case "Add Employee":
        employeeAdd();
        break;

      case "Update Employee Role":
        employeeUpdate();
        break;

      case "Update Employee Manager":
        employeeManagerUpdate();
        break;

      case "Delete Department":
        deleteDepartment();
        break;

      case "Delete Role":
        deleteRole();
      break;

      case "Delete Employee":
        deleteEmployee();
      break;

      }
    });
}

function departmentSearch() {
      var query = "SELECT * FROM department_info";
      connection.query(query,function(err, res) {
        if (err) throw err;
          console.log("--------------------------------------------");
          console.table(res);
          console.log("--------------------------------------------");
          runSearch();
      });
    }

function rolesSearch() {
      var query = "SELECT id, title, salary, department_id FROM role_info";
      connection.query(query, function(err, res) {
        if (err) throw err;
        console.log("--------------------------------------------");
        console.table (res);
        console.log("--------------------------------------------");
        runSearch();
      });
}

function employeesSearch() {
  var query = "SELECT id, first_name, last_name, role_id, manager_id FROM employee_info";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.log("--------------------------------------------");
    console.table (res);
    console.log("--------------------------------------------");
    runSearch();
  });
}

function departmentAdd() {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "What department would you like to add?"
    })
    .then(function(answer) {
      var query = "INSERT INTO department_info SET ?";
      connection.query(query, {department: answer.department }, function(err, res) {
      if (err) throw err;
      console.log("-----------------NEW Department Succesfully Created-------------------");
      console.log("Department: " + answer.department + " ||");
      departmentSearch();
      });
    });
}

function roleAdd() {
  inquirer
    .prompt([{
      name: "title",
      type: "input",
      message: "What title would you like to add?"
    },
    {
      name: "salary",
      type: "input",
      message: "What is the role's salary?"
    },
    {
      name: "department_id",
      type: "input",
      message: "What is the department id for this role?"
    }])
    .then(function(answer) {
      var query = "INSERT INTO role_info SET ?";
      connection.query(query, {title: answer.title, salary: answer.salary, department_id: answer.department_id}, function(err, res) {
      if (err) throw err;
      console.log("-----------------NEW Role Successfully Created-------------------");
      console.log("|| New Title: " + answer.title + " || New Salary: " + answer.salary + " || Department ID: " + answer.department_id + " ||");
      rolesSearch();
      });
    });
}

function employeeAdd() {
  inquirer
    .prompt([{
      name: "first_name",
      type: "input",
      message: "What is the employee's first name?"
    },
    {
      name: "last_name",
      type: "input",
      message: "What is the employee's last name?"
    },
    {
      name: "role_id",
      type: "input",
      message: "What is the employee's role id?"
    },
    {
      name: "manager_id",
      type: "input",
      message: "What is the employee's manager id?"
    }
    ])
    .then(function(answer) {
      var query = "INSERT INTO employee_info SET ?";
      connection.query(query, {first_name: answer.first_name, last_name: answer.last_name, role_id: answer.role_id, manager_id: answer.manager_id}, function(err, res) {
      if (err) throw err;
      console.log("-----------------NEW Employee Successfully Added-------------------");
      console.log("|| First Name: " + answer.first_name + " || Last Name: " + answer.last_name + " || Role ID: " + answer.role_id + " || Manager ID: " + answer.manager_id + " ||");
      employeesSearch();
      });
    });
}

function employeeUpdate() {
  inquirer
    .prompt([{
      name: "first_name",
      type: "input",
      message: "What is the employee's first name?"
    },
    {
      name: "last_name",
      type: "input",
      message: "What is the employee's last name?"
    },
    {
      name: "role_id",
      type: "input",
      message: "What is the employee's new role id?"
    }])
    .then(function(answer) {
      var query = "UPDATE employee_info SET ? WHERE first_name = ? AND last_name = ?";
      connection.query(query,[{role_id: answer.role_id},answer.first_name,answer.last_name], function(err, res) {
      if (err) throw err;
      console.log("-----------------UPDATED Employee Role Successfully-------------------");
      console.log("|| First Name: " + answer.first_name + " || Last Name: " + answer.last_name + " || Role ID: " + answer.role_id + " ||");
      employeesSearch();
      });
    });
}

function employeeManagerUpdate() {
  inquirer
    .prompt([{
      name: "first_name",
      type: "input",
      message: "What is the employee's first name?"
    },
    {
      name: "last_name",
      type: "input",
      message: "What is the employee's last name?"
    },
    {
      name: "manager_id",
      type: "input",
      message: "What is the employee's new manager id?"
    }
    ])
    .then(function(answer) {
      var query = "UPDATE employee_info SET ? WHERE first_name = ? AND last_name = ?";
      connection.query(query,[{manager_id: answer.manager_id},answer.first_name,answer.last_name], function(err, res) {
      if (err) throw err;
      console.log("-----------------UPDATED Employee Role Successfully-------------------");
      console.log("|| First Name: " + answer.first_name + " || Last Name: " + answer.last_name + " || Manager ID: " + answer.manager_id + " ||");
      employeesSearch();
      });
    });
}

function deleteDepartment() {
  inquirer
    .prompt([{
      name: "department",
      type: "input",
      message: "Which department would you like to delete?"
    }
    ])
    .then(function(answer) {
      var query = "DELETE FROM department_info WHERE department = ?";
      connection.query(query,[answer.department], function(err, res) {
      if (err) throw err;
      console.log("-----------------DELETED Department Successfully-------------------");
      console.log("|| Department Name " + answer.department + " ||");
      departmentSearch();
      });
    });
}

function deleteRole() {
  inquirer
    .prompt([{
      name: "title",
      type: "input",
      message: "What is the title of the role you wish to delete?"
    }])
    .then(function(answer) {
      var query = "DELETE FROM role_info WHERE title = ?";
      connection.query(query,[answer.title], function(err, res) {
      if (err) throw err;
      console.log("-----------------DELETED Role Successfully-------------------");
      console.log("|| Title: " + answer.title + " ||");
      rolesSearch();
      });
    });
}

function deleteEmployee() {
  inquirer
    .prompt([{
      name: "first_name",
      type: "input",
      message: "What is the employee's first name?"
    },
    {
      name: "last_name",
      type: "input",
      message: "What is the employee's last name?"
    }])
    .then(function(answer) {
      var query = "DELETE FROM employee_info WHERE first_name = ? AND last_name = ?";
      connection.query(query,[answer.first_name,answer.last_name], function(err, res) {
      if (err) throw err;
      console.log("-----------------DELETED Employee Successfully-------------------");
      console.log("|| First Name: " + answer.first_name + " || Last Name: " + answer.last_name + " ||");
      employeesSearch();
      });
    });
}