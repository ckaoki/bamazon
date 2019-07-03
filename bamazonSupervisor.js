var inquirer = require("inquirer");
var mysql = require("mysql");
var cliTable = require("cli-table"); 

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    menuOptions();
});

function menuOptions(){
    inquirer.prompt([    
        {
            name: "viewProducts",
            message: "Menu Options",
            type:"list",
            choices: ["View Product Sales by Departmnet", "Create New Department"]
        },
    ]).then(function(response){
        switch(response.viewProducts){
            case 'View Product Sales by Departmnet':
                viewProductSalesByDepartment();
                break;
            case 'Create New Department':
                createNewDepartment();               
        }
    });
}

// view product sales by department
function viewProductSalesByDepartment() {
    console.log("Below are the products listd by department.");

    var query = "SELECT departments.department_id, departments.department_name, departments.over_head_costs, ";
    query += "SUM(products.product_sales) AS product_sales, SUM(products.product_sales) - departments.over_head_costs AS total_profit ";
    query += "FROM departments INNER JOIN products ON (departments.department_name = products.department_name) ";
    query += "GROUP by departments.department_name";
    connection.query(query, function(err, data) {
        if (err) throw err;
   
        var headers = Object.keys(data[0]);
        var table = new cliTable({
            head: headers,
        });  

        data.forEach(element => {
            element.over_head_costs = '$' + element.over_head_costs.toFixed(2).toString();  // format price as currency
            element.product_sales = '$' + element.product_sales.toFixed(2).toString();  // format price as currency
            element.total_profit = '$' + element.total_profit.toFixed(2).toString();  // format price as currency
            var item =  Object.values(element);           
            table.push(item);           
        });        
        
        console.log(table.toString());
    });
    connection.end();

};

// add a new deparment
function createNewDepartment(){
    console.log('new');
    inquirer.prompt([    
        {
            name: "departmentName",
            message: "Enter new department name: ",
            type:"input",
        },
        {
            name: "overHeadCosts",
            message: "Enter over head costs: ",
            type:"number",
        }
    ]).then(function(response){
        var query = "INSERT INTO departments SET department_name = ?, over_head_costs = ?"    
        connection.query(query, [response.departmentName, response.overHeadCosts], function(err, data){
            if(err) throw err; 
            console.log(`Added product: ${response.departmentName}`);            
            connection.end();
        });
    });
}
