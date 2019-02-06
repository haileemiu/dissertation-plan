# Taina Coaching and Training application
# Dev handoff notes
Run locally: 1 terminal `npm run server` & 1 terminal `npm run client`.  

> No need to run build locally, when you push to master, it will push to Heroku and build there. `"heroku-postbuild"` in scripts.

## Current features:
- public accessible `/about` page with login and registrations
- Personal Goals nested task list
- Dissertation steps nested task list
> Both of the lists create the default information on registration of a new user. `user.router.js`  
- Coaching contact page with form and content

## Features to complete:

### Registration
- redirect on successfully registration
- photo on left
- password retype actually check for match

### User Alerts for errors
- search all files for `to do`

### Sending emails for password reset and contact form
- reset password link that sends email is currently in the code, just commented out because nodemailer is not able to use `service: 'gmail'` in production. 
    - see `forgot-password.router.js` & `LoginPage.js`
- contact form on the `/about` page & `/coaching` page should also set to go when an appropriate service is set up `coaching.router.js`
- resources:
    - https://nodemailer.com/usage/using-gmail/
    - https://nodemailer.com/transports/ses/
    - https://nodemailer.com/transports/#built-in-transports
    - https://codeburst.io/four-different-scripts-to-send-email-using-aws-ses-part-2-379ec4b1969c

### Forum
- Depending on hours left and the clients priorities, NodeBB may be an option. 
- Resources: 
    - https://nodebb.org/
    - https://github.com/NodeBB/NodeBB Open Source
    - JD said that for start ups it is only $100 a month for hosting

## Build Labs 
- in github > taina-app > Projects > Open project board
    - see a list of tasks / issues
- live on herkou https://taina-app.herokuapp.com/#/about
    - you will need to have JD give you access to his Build Labs Heroku group
- link to Kristen's design axure design https://bzmwc8.axshare.com/#id=1c8rd6&p=home&g=1
    - images and style guide can be found in Zoho Documents and/or Kristen can share dropbox folder with you
- If any major issues, ask JD for my contact info (preferably my personal email).

>Don't forget to set up your .env file with PUBLIC_URL and SERVER_SESSION_SECRET. You may also want to add an ADMIN_EMAIL and MAIL_PW for testing using a gmail account (suggest create a random 1 because you need to set it to accept less secure apps). NOTE: will only work locally.  

> Database structure is in the `database.sql` file. PostgresQL database named `taina_app`

#### Things to change when you get the actual domain url:
- package.json
    - homepage
- heroku 
    - settings > Reveal Config Vars > PUBLIC_URL

#### Things to change when you get real email:
- heroku
    - settings > Reveal Config Vars > ADMIN_EMAIL and MAIL_PW


---
---

# DIRECTIONS THAT CAME WITH THE BASE REPO FROM PRIME DIGITAL ACADEMY 

# Express/Passport with React
This version uses React to control the login requests and redirection in coordination with client-side routing.

We **STRONGLY** recommend following these instructions carefully. It's a lot, and will take some time to set up, but your life will be much easier this way in the long run.

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

Create a new database called `prime_app` and create a `person` table:

```SQL
CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL
);
```

If you would like to name your database something else, you will need to change `prime_app` to the name of your new database name in `server/modules/pool.js`

## Download (Don't Clone) This Repository

* Don't Fork or Clone. Instead, click the `Clone or Download` button and select `Download Zip`.
* Unzip the project and start with the code in that folder.
* Create a new GitHub project and push this code to the new repository.

## Development Setup Instructions

* Run `npm install`
* Create a `.env` file at the root of the project and paste this line into the file:
    ```
    SERVER_SESSION_SECRET=superDuperSecret
    ```
    While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`

## Debugging

To debug, you will need to run the client-side separately from the server. Start the client by running the command `npm run dev:client`. Start the debugging server by selecting the Debug button.

![VSCode Toolbar](documentation/images/vscode-toolbar.png)

Then make sure `Launch Program` is selected from the dropdown, then click the green play arrow.

![VSCode Debug Bar](documentation/images/vscode-debug-bar.png)


## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

* Start postgres if not running already by using `brew services start postgresql`
* Run `npm start`
* Navigate to `localhost:5000`

## Lay of the Land

* `src/` contains the React application
* `public/` contains static assets for the client-side
* `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
* `server/` contains the Express App

## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Herkoku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy
