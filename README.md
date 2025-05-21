

# Implementation Overview

- Monorepo, frontend using React/Typescript/StyleComponents and backend using NestJS/Node with postgreSQL database
- Runs in localhost and Docker 

## Additional Features

- Docker deployment configured and tested
- Nestjs is used on the backend to provide a robust and scalable framework and patterns
- To make it more realistic, product data is seeded into in the database on start up into a product table which is referenced from the shopping cart.
- Since there are no user requirements for different shopping carts, a default static cart is seeded into in the database on start up and referenced in the front end
- Consistent styling with re-usable components using typescript generics
- User-friendly error-handling, display and logging 

## Additional Libraries

- Front end: StyledComponents, axios, prettier, eslint
- Back end: Nesetjs, TypeORM

# Running the app

## run in dev mode 

### UI start prequisites: 
- postgres installed and running on port 5432
- create the required psql account to run ShoppingCart db locally (not required for Docker):

`psql -h localhost -p 5432 -U youradminaccount -d  postgres`

`CREATE USER shoppingcart_admin WITH PASSWORD 'shoppingcart_pwd';`
`ALTER USER shoppingcart_admin WITH CREATEDB;`
- Check the new acount is created:
`\du`

- node v20 +
- no other apps running on localhost:3000 or localhost: 4200
- Dev start frontend, backend and database: 
- From root, frontend and backend: `npm install` 
- From the root of the project: `npm run start` 
- Frontend URL: localhost: 4200
- BackendURL: localhost:3000 

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
