#Order @ Table
##General
Our application makes it easier for customers of an eatery or restaurant to order without waiting for waiter to take their order. The web app consists of three parts: the client which customers use to order, a dashboard interface for the cooking staff to see the orders, and a back-end server which ties the other to components together. The application can be found here [Order@Table](http://2id63.azurewebsites.net/).

###Testing
For testing, we used multiple devices and browsers. On a desktop PC running Windows 10, we tested the website using the webkit browsers Google Chrome and Vivaldi, and Mozilla Firefox. On a notebook running Windows 8.1, the website was tested in both Google Chrome and Mozilla Firefox. Furthermore, an iPad with iOS 8.1 and Safari was used for testing. Lastly, a Samsung Galaxay S III on Android 4.3 with both Google Chrome and the default browser was used. On all the devices and browsers, the website loaded, responded as expected and the website scaled nicely on smaller screens and window sizes.

##Front-end Design
Our front-end is built on [Foundation](http://foundation.zurb.com/), which made it easy to implement components such as the sidebar menu. For the interaction with the web app, we use [AngularJS](https://angularjs.org/). AngularJS and its features such as controllers, directives, and services simplifies the communication to the back-end and the visualization of the received data. The screens below show the sequence of creating a order, including the log in procedure to create an id for the table, to identify the orders![alt tag](screens/screen (3).png?raw=true) ![alt tag](screens/screen (5).png?raw=true)![alt tag](screens/screen (4).png?raw=true)![alt tag](screens/screen (6).png?raw=true)![alt tag](screens/screen (1).png?raw=true)![alt tag](screens/screen (2).png?raw=true)

##Back-end Design
Our back-end is built on [Node.js](https://nodejs.org/en/) and [Express.js](http://expressjs.com/). With these frameworks we could easily implement the REST API which is core to our application. Without the API the two other components can't show or send any information to each other.

When the API is called the back-end process the request and then calls the [Mongoose](http://mongoosejs.com/) module for easy interaction with the database. The retrieved information of the database is then processed and sent back to the caller.

##Database
The web app uses a MongoDB storage hosted on [MongoLab](https://www.mongolab.com/), which is fully managed MongoDB-as-a-Service. The application uses the Mongoose module which greatly simplifies the interaction with the database.

The database consists of four schemas:

 - Items(**_id**, name, price, *category*)
 - Category(**_id**, name)
 - User(**_id**, table, createdAt, expiresAt)
 - Order(**_id**, status, *user*, [{*id*, amount}])

Bold refers to primary keys and italics refer to foreign keys.

##REST API

Base URL: http://2id63.azurewebsites.net/api/

###Items
 - **GET items** Returns all the available items.
 - **GET items/:item_id** Return the item with matching ID.
 - **POST items** Create and returns the newly created item. *Requires the following fields: name, price, and category_name.*
 - **PUT items/:item_id** Update and returns the item with the matching ID. *Requires the following fields: name, price, and category_name.*
 - **DELETE items/:item_id** Delete the item with the matching ID.

####Categories
 - **GET items/categories** Returns all the available categories
 - **GET items/categories/:category_name** Returns all the items from the category.
 - **POST items/categories/** Create and returns the category if it does not exist. Else it will just return the category. *Requires the following fields: category_name.*
 - **DELETE items/categories/category_name** Delete the categroy with the matching name.

###Users

 - **GET users** Returns all users.
 - **GET users/:user_id** Returns the user with the matching ID.
 - **POST users** Create and returns the newly created user. *Requires the following fields: table and duration in hours.*

###Orders
 - **GET orders** Returns all orders.
 - **GET orders/:order_id** Returns the order with the matching ID.
 - **POST order** Create and returns the newly created order. Will return a 401 status code when the user is not permitted to place an order. *Requires the following fields: user and an array of item_id's and amount.*
