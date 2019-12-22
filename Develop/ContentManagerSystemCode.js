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
        "Add Departments",
        "Add Roles", 
        "Add Employees", 
        "Update Employee Roles"
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
      
      case "Add Departments":
        departmentAdd();
        break;

      case "Add Roles":
        roleAdd();
        break;

      case "Add Employees":
        employeeAdd();
        break;

      case "Update Employee Roles":
        employeeUpdate();
        break;

      }
    });
}

function departmentSearch() {
      var query = "SELECT * FROM department_info";
      connection.query(query,function(err, res) {
          console.log("Department:" + res[0]);
          runSearch();
      });
    }

// function rolesSearch() {
//   inquirer
//     .prompt({
//       name: "role",
//       type: "input",
//       message: "What role would you like to search for?"
//     })
//     .then(function(answer) {
//       var query = "SELECT role FROM role_info WHERE ?";
//       connection.query(query, { role: answer.role }, function(err, res) {
//         for (var i = 0; i < res.length; i++) {
//           console.log("role: " + res[i].role);
//         }
//         runSearch();
//       });
//     });
// }

// function employeeSearch() {
//   inquirer
//     .prompt({
//       name: "employee",
//       type: "input",
//       message: "What employee would you like to search for?"
//     })
//     .then(function(answer) {
//       var query = "SELECT employee FROM employee_info WHERE ?";
//       connection.query(query, { employee: answer.employee }, function(err, res) {
//         for (var i = 0; i < res.length; i++) {
//           console.log("employee: " + res[i].employee);
//         }
//         runSearch();
//       });
//     });
// }

// // function departmentAdd() {
// //   inquirer
// //     .prompt({
// //       name: "department",
// //       type: "input",
// //       message: "What department would you like to add?"
// //     })
// //     .then(function(answer) {
// //       var query = "INSERT INTO department_info VALUE department_info WHERE ?";
// //       connection.query(query, { department: answer.department }, function(err, res) {
// //         for (var i = 0; i < res.length; i++) {
// //           console.log("department: " + res[i].department);
// //         }
// //         runSearch();
// //       });
// //     });
// // }

// // function roleAdd() {
// //   inquirer
// //     .prompt({
// //       name: "role",
// //       type: "input",
// //       message: "What role would you like to add?"
// //     })
// //     .then(function(answer) {
// //       var query = "INSERT INTO role_info VALUE role_info WHERE ?";
// //       connection.query(query, { role: answer.role }, function(err, res) {
// //         for (var i = 0; i < res.length; i++) {
// //           console.log("role: " + res[i].role);
// //         }
// //         runSearch();
// //       });
// //     });
// // }

// // function employeeAdd() {
// //   inquirer
// //     .prompt({
// //       name: "employee",
// //       type: "input",
// //       message: "What employee would you like to add?"
// //     })
// //     .then(function(answer) {
// //       var query = "INSERT INTO employee_info VALUE employee_info WHERE ?";
// //       connection.query(query, { employee: answer.employee }, function(err, res) {
// //         for (var i = 0; i < res.length; i++) {
// //           console.log("employee: " + res[i].employee);
// //         }
// //         runSearch();
// //       });
// //     });
// // }

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





