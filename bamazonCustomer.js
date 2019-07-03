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
    showAllProducts();
});

function showAllProducts() {
    console.log("Below are the products available at Bamazon.");
    var query = "SELECT item_id, product_name, price FROM products"
    connection.query(query, function(err, data) {
        if (err) throw err;
   
        var headers = Object.keys(data[0]);
        var table = new cliTable({
            head: headers,
        });  

        data.forEach(element => {
            element.price = '$' + element.price.toFixed(2).toString();
            var item =  Object.values(element);
            table.push(item);           
        });        
        
        console.log(table.toString());
        promptCustomerForPurchase();
    });

};

function promptCustomerForPurchase(){
    inquirer.prompt([
    
        {
            name: "itemID",
            message: "Enter ID of the product they would like to buy?",
            type:"number",
        },
        {
            name: "units",
            message: "Enter how many units you would like to buy?",
            type:"number",
        }
    ]).then(function(response){
        itemIDFromCustomer = response.itemID;
        unitsFromCustomer = response.units;
        placeOrder(response.itemID, response.units);
    });

    function placeOrder(itemID, unitsToBuy){
        var query = "SELECT * FROM products WHERE ?"

        connection.query(query, {item_id: itemID}, function(err, data){
            if(err) throw err;    
            var stockQuantity =  data[0].stock_quantity;
            var productSales = data[0].product_sales;
            if(unitsToBuy >  stockQuantity)
            {
                console.log("Sorry, insufficient stock on hand.");                
            }
            else{
                stockQuantity -= unitsToBuy;
                productSales += unitsToBuy * data[0].price;
                var query = "UPDATE products SET stock_quantity = ?, product_sales = ? WHERE item_id=?";
                connection.query(query, [stockQuantity, productSales, itemID], function(){
                    if(err) throw err;                    
                })
                var totalPrice = unitsToBuy * parseFloat(data[0].price);
                console.log("The total cost of you purchase is $" + totalPrice.toFixed(2));
            }
            connection.end();
        });
    }
}