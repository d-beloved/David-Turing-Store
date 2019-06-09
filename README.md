# Turing e-Store

A full-stack e-commerce app using Reactjs and Nodejs and Expressjs


The API endpoint is hosted on heroku [ here ](https://ayo-turing-shop.herokuapp.com/).

The postman documentation is [ here ](https://documenter.getpostman.com/view/5092825/S1TZyFpL?version=latest).

## Made With
  ### Server
    * Nodejs for server-side logic
    * Babel for transpiling
    * Express for api routes implementation
    * Heroku for hosting services
    * Mysql for the App's database

## Installation.
  * Install [Nodejs](https://nodejs.org/en/download/)
  * Clone this repo ``` git clone https://github.com/d-beloved/turing-e-Store.git ```
  * Run ```npm install``` to install the required dependencies
  * Navigate to http://localhost:8000


## Available APIs
<table>
  <tr>
      <th>HTTP REQUEST VERB</th>
      <th>API ENDPOINT/PATH</th>
      <th>ACTION</th>
  </tr>
  <tr>
      <td>POST</td>
      <td>/customers</td>
      <td>Registers a new customer on the app</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/customers/login</td>
      <td>Logs in a registered customer</td>
  </tr>
  <tr>
      <td>PUT</td>
      <td>/customer</td>
      <td>Updates a customer's profile</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/customer</td>
      <td>Gets a customer's profile</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/departments</td>
      <td>Gets all departments in the store</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/departments/:department_id</td>
      <td>Gets a department in the store</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/categories</td>
      <td>Gets all categories in the store</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/categories/:categpries_id</td>
      <td>Gets a category in the store</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/categories/indepartment/:department_id</td>
      <td>Gets the categories by department</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/products</td>
      <td>Get all the product in the store</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/products/incategory/:category_id</td>
      <td>Get all the product in a category</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/products/:product_id</td>
      <td>Get a product in the store</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/products/search?query_string=?&all_words=on&limit=?</td>
      <td>Search for a product in the store</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/attributes</td>
      <td>Get all attributes</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/attributes/:attributes_id</td>
      <td>Get an attribute</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/attributes/values/:attributes_id</td>
      <td>Get the value of an attribute</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/attributes//inproduct/:product_id</td>
      <td>Get the attributes of each product (colors and sizes</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/shoppingcart/generateuniqueid</td>
      <td>Generate the shopping cart ID</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/shoppingcart/add</td>
      <td>Add an item to Cart</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/shoppingcart/:cart_id</td>
      <td>Get items in the shopping cart</td>
  </tr>
  <tr>
      <td>PUT</td>
      <td>/shoppingcart/updatecart/:item_id</td>
      <td>Update the shopping cart item</td>
  </tr>
  <tr>
      <td>DEL</td>
      <td>/shoppingcart/empty/:cart_id</td>
      <td>Empty the shopping cart</td>
  </tr>
  <tr>
      <td>DEL</td>
      <td>/shoppingcart/removeProduct/:item_id</td>
      <td>Remove an item from the cart</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/tax</td>
      <td>Get all taxes</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/tax/:tax_id</td>
      <td>Get one tax</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/shipping/regions</td>
      <td>Get all shipping regions</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/shipping/regions/:shipping_id</td>
      <td>Get shipping info by region</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/orders</td>
      <td>Create an order</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/orders/:order_id</td>
      <td>Get order details</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/orders/inCustomer</td>
      <td>Get all orders by customers</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/stripe/charge</td>
      <td>Pay with stripe services</td>
  </tr>
</table>

For more details on how to use this API, check the **Documentation** out [ here ](https://documenter.getpostman.com/view/5092825/S1TZyFpL?version=latest).

## License and Copyright
&copy; Ayodeji Moronkeji

Licensed under the [MIT License](LICENSE).
