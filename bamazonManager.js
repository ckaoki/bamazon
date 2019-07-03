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
            choices: ["View Products", "View Low Inventory", "Add to Inventory", "Add New Product"]
        },
    ]).then(function(response){
        switch(response.viewProducts){
            case 'View Products':
                viewProducts();
                break;
            case 'View Low Inventory':
                viewLowInventory();
                break;
            case 'Add to Inventory':
                addToInventory();
                break;
            case 'Add New Product':
                addNewProduct();
                break;
        }
    });
}

// view all products
function viewProducts() {
    console.log("Below are the products available at Bamazon.");
    var query = "SELECT * FROM products"
    connection.query(query, function(err, data) {
        if (err) throw err;
   
        var headers = Object.keys(data[0]);
        var table = new cliTable({
            head: headers,
        });  

        data.forEach(element => {
            element.price = '$' + element.price.toFixed(2).toString();  // format price as currency
            element.product_sales = '$' + element.product_sales.toFixed(2).toString();  // format price as currency
            var item =  Object.values(element);           
            table.push(item);           
        });        
        
        console.log(table.toString());
        connection.end();
    });

};

// display low inventory
function viewLowInventory() {
    console.log("Below are the products with inventory less than 5 units.");
    var query = "SELECT * FROM products"
    connection.query(query, function(err, data) {
        if (err) throw err;
   
        var headers = Object.keys(data[0]);
        var table = new cliTable({
            head: headers,
        });  

        data.forEach(element => {
            element.price = '$' + element.price.toFixed(2).toString();  // format price as currency
            element.product_sales = '$' + element.product_sales.toFixed(2).toString();  // format price as currency
            if(element.stock_quantity < 5){
                table.push(Object.values(element));  
            }
        });        
        
        console.log(table.toString());
        connection.end();
    });

};

// add units to current stock
function addToInventory(){
    inquirer.prompt([    
        {
            name: "itemID",
            message: "Enter item ID: ",
            type:"number",
        },
        {
            name: "quantity",
            message: "Enter quantity you would like to add: ",
            type:"number: ",
        },
    ]).then(function(response){
        var query = "SELECT * FROM products WHERE ?"    
        connection.query(query, {item_id: response.itemID}, function(err, data){
            if(err) throw err; 
            if(data === undefined || data.length < 1){
                console.log(`Item ID: ${response.itemID} not found.`)
            }   
            else{
                var currentCount = data[0].stock_quantity;
                var newCount = currentCount + parseInt(response.quantity);
                query = "UPDATE products SET stock_quantity = ? WHERE item_id = ?"
                connection.query(query,[newCount, response.itemID], function(err, data2){
                    if (err) throw err;
                    console.log(`Item ID: ${response.itemID} quantity has been updated to ${newCount}`); 
                })
            }
            connection.end();
        });
    });

}

// add a new product
function addNewProduct(){
    inquirer.prompt([    
        {
            name: "productName",
            message: "Enter product name: ",
            type:"input",
        },
        {
            name: "departmentName",
            message: "Enter departement name: ",
            type:"input",
        },
        {
            name: "price",
            message: "Enter the items price: ",
            type:"number",
        },
        {
            name: "stockQuantity",
            message: "Enter quantity you would like to add: ",
            type:"number",
        }
    ]).then(function(response){
        var query = "INSERT INTO products SET product_name = ?, department_name = ?, price = ?, stock_quantity = ?"    
        connection.query(query, [response.productName, response.departmentName, response.price, response.stockQuantity], function(err, data){
            if(err) throw err; 
            console.log(`Added product: ${response.productName}`);            
            connection.end();
        });
    });

}
