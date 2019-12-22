DROP DATABASE IF EXISTS content_manager_system;
CREATE database content_manager_system;

USE content_manager_system;

CREATE TABLE employee_info (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role_info (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL (65,2) NULL,
  department_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE department_info (
  id INT NOT NULL AUTO_INCREMENT,
  department VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

SELECT * FROM employee_info;
select * from role_info;
select * from department_info;

INSERT INTO employee_info (first_name,last_name,role_id,manager_id)
VALUES ("Eduardo","Urbaez",3000,4000);

INSERT INTO role_info (title, salary,department_id)
VALUES ("Manager", 160000.99, 3000);

INSERT INTO department_info (department)
VALUES ("Marketing");

