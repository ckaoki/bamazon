# bamazon
This project contains three javascript files that implement an Amazon-like storefront with a MySQL database. The app will take in orders from customers and deplete stock from the store's inventory. This app also tracks product sales across your store's departments and provides a summary of the highest-grossing departments in the store.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
1. Node.js must be installed on machine. See https://nodejs.org/en/download/ for instructions.
2. Mysql must be installed on machine. See https://dev.mysql.com/downloads/installer/ for instructions.
   1. A mysql connection must be created. See mysql documentation.
  
### Overview

1. At the heart of bamazon there is a mysql database 'bamazon' that contains two tables.
   * The 'products' table holds all of the information regarding the products that are for sale.
   * The 'departments' table holds all of the sales information accumulated for each department. 
2. The 'bamazonCustomer' javascript is a command line interface used by customer to make purchases.
3. The 'bamazonManager' javascript is a command line interface used by managers to:
   * View Products for Sale    
   * View Low Inventory    
   * Add to Inventory    
   * Add New Product
4. The 'bamazonSupervisor' javascript is a command line interface used by supervisors to:
   * View Product Sales by Department   
   * Create New Department
5. The file package.json contains the package dependancies that must be installed.
6. The file .gitignore contains the file types that are not pushed github.

### Installing

1. To install source files use git to clone files from https://github.com/ckaoki/bamazon.
2. In a bash terminal or Visual Code terminal navigate to the directory that you downloaded the files from github.
3. Install the Node packages (cli-table, inquirer, mysql) by entering the following in the terminal:   
    *npm install* 
4. Create the mysql database:
   1. Open command prompt or Git Bash terminal and change to directory (cd) where file is located.
   2. Open a connection to mysql by entering in the terminal "mysql -uroot -p"
   3. Enter "password" when prompted.  
   4. Enter "source bamazon.sql"
   5. You should see several "Query OK" messages, indicating that the database was successfully created.

### Operation
The bamazon apps can be operated by entering commands in the terminal as instructed below.
All apps provide prompts that are self explanitory.
1. Run app as a customer to purchase items:  
    *node bamazonCustomer.js*  
2. Run app as a manager to view product sales and control inventory:  
    *node bamazonManager.js*  
3. Run app as a supervisor to review department sales:  
    *node bamazonSupervisor.js*  



## Running the tests

Using git bash bamazon was run as directed in the previous section - **Operation**.  
The following section is a link to a video which documents testing.

### Test Videos:
The following link is a video that documents testing of the apps.
* [bamazon Test Video](testVideos/bamazonTestVideo.mp4)  

### Break down into end to end tests

Source files have been extensively tested by displaying pages in Visual Code.

### And coding style tests

I'm starting to get some style.

## Deployment

Navigate to https://github.com/ckaoki/bamazon to clone.

## Built With

* [Visual Studio Code](https://code.visualstudio.com/)

## Contributing

Please read our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use github for version control (https://github.com/your/project/tags). 

## In development
Implementing textual hints.

## Authors

* **Cullan Aoki** - *Initial work* - https://github.com/ckaoki/bamazon

## License

This project is not licensed.

## Acknowledgments
* Joe Rehfuss
* Trae Shanks
* Lan Truong
* James Hanley


