# Sun Shades Store

This Express app is a Ecommerce store for Sun Glassess

In order to see the Price List, a user needs to Login. If you do not have a login, you must register.

**Home Page**
![](/screenshots/home.png)

**Access Price List without logging in**
![](/screenshots/nologin.png)

**Login**
![](/screenshots/login.png)

**Price List**
![](/screenshots/pricelist.png)

Postman Tests:
---

1. JSON API endpoint to get a list of all products
    * GET localhost:3000/product
2. JSON API endpoint to get a product by id
    * GET localhost:3000/product/01
3. JSON AP endpoint to create a product
    * POST localhost:3000/product
	* Body: x-www-form-urlencoded
	```
	{
    "id": "08",
    "brand": "PERSOL",
    "model": "PO2803S",
    "color": "Black/Green",
    "gender": "Men",
    "price": "315.99"
	}
	```
4. JSON AP endpoint to delete a product by id
    * DELETE http://localhost:3000/product/08
5. JSON AP endpoint to update a product by id
    * POST localhost:3000/product
	* Body: x-www-form-urlencoded
	```
	{
    "id": "08",
    "brand": "BURBERRY",
    "model": "BE3074",
    "color": "Grey/Grey",
    "gender": "Ladies",
    "price": "249.99"
  	}
	```
6. JSON AP endpoint to register a user
    * POST localhost:3000/register
	* Body: x-www-form-urlencoded
	```
	{
    "username": "bob",
    "password": "bob"
  	}
	```
7. JSON AP endpoint to login a user
    * POST localhost:3000/register
	* Body: x-www-form-urlencoded
	```
	{
    "username": "bob",
    "password": "bob"
  	}
	```
