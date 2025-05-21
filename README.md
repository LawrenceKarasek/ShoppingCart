

# Implementation Overview

- Monorepo, frontend using React/Typescript/StyleComponents and backend using NestJS/Node with postgreSQL database
- Runs in localhost and Docker 

## Additional Features

- Nestjs is used on the backend to provide a robust and scalable framework and patterns
- To make it more realistic, product data is populate in the database on start up into a product table which is referenced from the shopping cart.
- Consistent styling with re-usable components using typescript generics
- User-friendly errors and logging related 

## Additional Libraries

- Front end: tailwindcss, debounce, axios, prettier, eslint

- Back end: 
- As part of the auth implementation described below, the following libraries are used:
-   jsonwebtoken: used for auth implementation for storing/verifying cookies
-   bcrypt: usd for hashing passwords to store security as part of auth implementation


# Running the app

## run in dev mode 
- create the required psql account to run ShoppingCart db locally (not required for Docker):

`psql -h localhost -p 5432 -U youradminaccount -d  postgres`

`CREATE USER shoppingcart_admin WITH PASSWORD 'shoppingcart_pwd';`
`ALTER USER shoppingcart_admin WITH CREATEDB;`
- Check the new acount is created:
`\du`

- prequisites: 
- node v20 +
- no other apps running on localhost:3000 or localhost: 4200

- Dev start frontend, backend and database: 
- From root, frontend and backend: `npm install` 
- From the root of the project: `npm run start` 

## Run in Docker
- prequisite: Docker is running
- Docker start frontend, backend and database: 
- From the root of the project: `docker compose up --build `
- If redeploying/restarting containers, first run: `docker compose down`


# Project Structure:Front End

## src/components

- There are the highest level functional components of the application for displaying URL and User functionality

##  src/api

- This contains code for managing the asyncnronous requesting and loading of data from the api

## src/ui

- This contains reusable UI elements for higher-level components.

## src/types

- This contains typescript types.

# Project Structure:Back End
- Using the Express/Nestjs framework

## modules/app

- Configuration information for module types

## modules/database

- Entity definitions, database configuration and module configuration

## modules/cart

- Module, controller and service for endpoint access and CRUD operations for shopping cart data including cart_item entities and related products

## modules/tracker

- Module, controller and service for endpoint access and storing product data 
