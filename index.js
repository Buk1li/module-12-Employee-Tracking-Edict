const mysql = require('mysql2');
const inquirer = require('inquirer');

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Bassword',
    database: 'company_db'
});

// Connect to MySQL
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
    start();
});

// Start the application
function start() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'selection',
                message: 'What would you like to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Exit'
                ]
            }
        ])
        .then((answer) => {
            switch (answer.selection) {
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRole();
                    break;
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateEmployeeRole();
                    break;
                case 'Exit':
                    db.end();
                    console.log('Goodbye!');
                    break;
            }
        });
}

// Function to view all departments
function viewDepartments() {
    db.query('SELECT * FROM department', (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.table(res);
            start();
        }
    });
}

// Function to view all roles
function viewRole() {
    db.query(`SELECT role.id, role.title, role.salary, department.name AS department 
    FROM role 
    JOIN department ON role.department_id = department.id`,
        function (err, res) {
            if (err) {
                console.log(err);
            } else {
                console.table(res);
                start();
            }
        }
    );
}

// Function to view all employees
function viewEmployees() {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
            FROM employee
            LEFT JOIN employee manager ON employee.manager_id = manager.id
            INNER JOIN role ON employee.role_id = role.id
            INNER JOIN department ON role.department_id = department.id`,
        function (err, res) {
            if (err) {
                console.log(err);
            } else {
                console.table(res);
                start();
            }
        }
    );
}

// Function to add a department
function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the department?'
            }
        ])
        .then((answer) => {
            db.query(
                'INSERT INTO department SET ?',
                {
                    name: answer.name
                },
                (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Department was successfully added!');
                        start();
                    }
                }
            );
        });
}

// Function to add a role
function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of the role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary for the role?'
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'What is the department ID for the role?'
            }
        ])
        .then((answer) => {
            db.query(
                'INSERT INTO role SET ?',
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department_id
                },
                (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Role was successfully added!');
                        start();
                    }
                }
            );
        });
}

// Function to add an employee
function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'What is the first name of the employee?'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'What is the last name of the employee?'
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'What is the role ID for the employee?'
            },
            {
                type: 'input',
                name: 'manager_id',
                message: 'What is the manager ID for the employee (if applicable)?'
            }
        ])
        .then((answer) => {
            db.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role_id,
                    manager_id: answer.manager_id
                },
                (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Employee was successfully added!');
                        start();
                    }
                }
            );
        });
}

// Function to update an employee role
function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'employee_id',
                message: 'What is the ID of the employee being updated?'
            },
            {
                type: 'input',
                name: 'new_role_id',
                message: 'What is the employee\'s new role ID?'
            }
        ])
        .then((answer) => {
            db.query(
                'UPDATE employee SET role_id = ? WHERE id = ?',
                [answer.new_role_id, answer.employee_id],
                (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Employee role was successfully updated!');
                        start();
                    }
                }
            );
        });
}