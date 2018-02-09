# README

## Quantified Self API

This project is the backend to a wellness application found here [Quantified Self](https://github.com/izaxveta/quantified-self).

## Getting Started

- Clone the repo: git clone https://github.com/marshallhouston/quantified-self-express.git
- Move into the directory and install Knex and Postgres. 
    ```
    $ cd quantified-self-express
    $ npm install knex pg --save
    ```
- Also install knex globally to use it on the command line.
    ```
    $ npm install knex -g
    ```
- Create the databases in Postgres.
    ```
    $ psql
    CREATE DATABASE quantified_self_express;
    CREATE DATABASE quantified_self_express_test;
    ```
- Run the migrations and seed the database.
    ```
    $ knex migrate:latest && knex seed:run
    ```
- Also run the migrations on the test database.
    ```
    $ knex migrate:latest --env test && knex seed:run --env test
    ```
- Start the server and visit an endpoint in the browser
    ```
    $ nodemon
    $ http://localhost:3000/api/v1/foods
    ```

## API Documentation

The following endpoints are available. All endpoints will return the data as JSON.

#### Foods Endpoints

- GET /api/v1/foods - returns all foods currently in the database 
- GET /api/v1/foods/:id - returns the food object with the specific :id you've passed in or 404 if the food is not found  
- POST /api/v1/foods - allows creating a new food with the parameters:  
{ food: { name: "Name of food here", calories: "Calories here"} }  
If food is successfully created, the food item will be returned. If the food is not successfully created, a 400 status code will be returned. Both name and calories are required fields.  
- PUT /api/v1/foods/:id - allows one to update an existing food with the parameters:  
{ food: { name: "Name of food here", calories: "Calories here"} }  
If food is successfully updated (name and calories are required fields), the food item will be returned. If the food is not successfully updated, a 400 status code will be returned.  
- DELETE /api/v1/foods/:id - will delete the food with the id passed in. If the food can't be found, a 404 will be returned.  

#### Meals Endpoints

- GET /api/v1/meals - returns all the meals in the database along with their associated foods  
- GET /api/v1/meals/:meal_id/foods - returns all the foods associated with the meal with an id specified by :meal_id or a 404 if the meal is not found  
- POST /api/v1/meals/:meal_id/foods/:id - adds the food with :id to the meal with :meal_id  
This creates a new record in the MealFoods table to establish the relationship between this food and meal. If the meal/food cannot be found, a 404 will be returned.  
- DELETE /api/v1/meals/:meal_id/foods/:id - removes the food with :id from the meal with :meal_id  
This deletes the existing record in the MealFoods table that creates the relationship between this food and meal. If the meal/food cannot be found, a 404 will be returned.  

## Testing

To run the test suite,
    ```
    NODE_ENV=test mocha --exit
    ```
    
## Built with

* [JavaScript](https://www.javascript.com/)
* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Knex.js](http://knexjs.org/)
* [Mocha](https://mochajs.org/)
* [Chai](https://chaijs.com/)



