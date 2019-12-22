var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
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
        "Update Employee Role"
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

      }
    });
}

function departmentSearch() {
      var query = "SELECT * FROM department_info";
      connection.query(query,function(err, res) {
        if (err) throw err;
          // console.log("-----------------List of Departments-------------------");
        for (var i = 0; i < res.length; i++) {
          console.log("|| ID: " + res[i].id + " || Department: " + res[i].department + " ||");
        }
          // console.log("--------------------------------------------");
          runSearch();
      });
    }

function rolesSearch() {
      var query = "SELECT id, title, salary, department_id FROM role_info";
      connection.query(query, function(err, res) {
        if (err) throw err;
         console.log("-----------------List of Roles-------------------");
        for (var i = 0; i < res.length; i++) {
          console.log("|| ID: " + res[i].id + " || Title: " + res[i].title + " || Salary: " + res[i].salary + " || Department ID: " + res[i].department_id + " ||"  );
        }
        console.log("--------------------------------------------");
        runSearch();
      });
}

function employeesSearch() {
  var query = "SELECT id, first_name, last_name, role_id, manager_id FROM employee_info";
  connection.query(query, function(err, res) {
    if (err) throw err;
     console.log("-----------------RESPONSE-------------------");
    for (var i = 0; i < res.length; i++) {
      console.log("|| ID: " + res[i].id + " || First Name: " + res[i].first_name + " || Last Name: " + res[i].last_name + " || role ID: " + res[i].role_id + " || Manager ID: " + res[i].manager_id + " ||" );
    }
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
      console.log("-----------------Department Succesfully Created-------------------");
      console.log("|| Department: " + answer.department + " ||");
      console.log("------------------------------------------------------------------");
      runSearch();
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
      console.log("-----------------Role Successfully Created-------------------");
      console.log("|| Title: " + answer.title + " || Salary: " + answer.salary + " || Department ID: " + answer.department_id + " ||");
      console.log("-------------------------------------------------------------");
      runSearch();
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
      console.log("-----------------Role Successfully Created-------------------");
      console.log("|| First Name: " + answer.first_name + " || Last Name: " + answer.last_name + " || Role ID: " + answer.role_id + " || Manager ID: " + answer.manager_id + " ||");
      console.log("-------------------------------------------------------------");
      runSearch();
      });
    });
}

// // function employeeUpdate() {
// //   inquirer
// //     .prompt({
// //       name: "employee",
// //       type: "input",
// //       message: "What employee would you like to add?"
// //     })
// //     .then(function(answer) {
// //       var query = "UPDATE employee_info SET VALUE employee_info WHERE ?";
// //       connection.query(query, { employee: answer.employee }, function(err, res) {
// //         for (var i = 0; i < res.length; i++) {
// //           console.log("employee: " + res[i].employee);
// //         }
// //         runSearch();
// //       });
// //     });
// // }





