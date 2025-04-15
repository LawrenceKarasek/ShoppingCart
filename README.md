#  Requirements
- Build a React application that allows you enter a URL
- When the form is submitted, return a shortened version of the URL
- Save a record of the shortened URL to a database
- Ensure the slug of the URL (abc123 in the screenshot above) is unique
- When the shortened URL is accessed, redirect to the stored URL
- If an invalid slug is accessed, display a 404 Not Found page
- You should have a list of all URLs saved in the database
- Add support for accounts so people can view the URLs they have created
- Validate the URL provided is an actual URL
- Display an error message if invalid
- Make it easy to copy the shortened URL to the clipboard
- Allow users to modify the slug of their URL
- Track visits to the shortened URL
- Add rate-limiting to prevent bad-actors
- Add a dashboard showing how popular your URLs are
- Build a Docker image of your application

# Implementation Overview

- Monorepo, front end using React/Typescript/Tailwindcss and back end using NestJS/Node with postgreSQL database
- Docker deployment 

## Additional Features

- User Accounts implemented using Login/Registration using JWT 
- NestJS endpoints secured using middleware with JWT
- Consistent styling with re-usable components
- Inline user editing/validation/updating of short names using debounce
- User-friendly errors and logging related to 404 Errors, duplicate/invalid short name, invalid domain name or invalid/already registered credentials
- Copying: user notification is displayed in bottom right with timeout
- Rate limiting implemented using customizable time segment: rate minutes

## Additional Libraries

- Front end: tailwindcss, debounce, axios, prettier, eslint

- Back end: 
- As part of the auth implementation described below, the following libraries are used:
-   jsonwebtoken: used for auth implementation for storing/verifying cookies
-   bcrypt: usd for hashing passwords to store security as part of auth implementation


# Running the app

- prequisite: Docker is running
- node v20
- no other apps running on localhost:3000 or localhost: 4200

- Dev start frontend, backend and database: 
- From frontend and backend: `npm install` 
- From the root of the project: `npm run start` 

- Docker start frontend, backend and database: 
- From the root of the project: `docker compose up --build `
- If redeploying/restarting containers, first run: `docker compose down -v --remove-orphans`

- Register/Login:
- Since auth is implemented a login is required: register using any properly formatted email and password (not validated)

# Project Structure:Front End

## src/components

- There are the highest level functional components of the application for displaying URL and User functionality

##  src/api

- This contains code for managing the asyncnronous requesting and loading of data from the api, for URLs and Users

## src/ui

- This contains reusable UI elements for higher-level components.

## src/types

- This contains types for URL and User.

# Project Structure:Back End

## modules/app

- Configuration information for module types and middleware using JWT

## modules/database

- Entity definitions, database configuration and module configuration

## modules/short-name

- Module service for generating and storing unique short-names

## modules/tracker

- Module for managing logs for URL short access, including storage and rate limiting 

## modules/url

- Module for managing creation, editing and fetching of URL short names

## modules/user

- Module for managing registering, logging in and logging out