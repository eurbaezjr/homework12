# homework12

This is a Content Management System (CMS) command line application that manages a company's employees database using node, inquirer, and MySQL.

The database schema contains three tables:

Department:

id - INT PRIMARY KEY

name - VARCHAR(30) to hold department name


Role:

id - INT PRIMARY KEY

title -  VARCHAR(30) to hold role title

salary -  DECIMAL to hold role salary

department_id -  INT to hold reference to department role belongs to


Employee:

id - INT PRIMARY KEY

first_name - VARCHAR(30) to hold employee first name

last_name - VARCHAR(30) to hold employee last name

role_id - INT to hold reference to role employee has

manager_id - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager


The application allows the user to:

Add departments, roles, employees

View departments, roles, employees

Update employee roles

Update employee managers

Delete departments, roles, employees
