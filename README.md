## This app is for demonstration purpose only
# Use of Auth0 in NodeJs and Express

### To recreate the app on local system please perform following setup

First, login to Auth0 and create a application and obtain the required credentials

```
http://localhost:3000/callback
```
Add callback URL to your Auth0 application

```
AUTH0_CLIENT_ID=
AUTH0_DOMAIN=
AUTH0_CLIENT_SECRET=
SESSION_SECRET=
AUTH0_CALLBACK_URL=http://localhost:3000/callback
```
create .env file and these values

```
npm install
```
This will install the required dependencies

```
npm run dev
```
This will start the project on port number 3000

> navigate to following URLs accordingly
1. http://localhost:3000/login
1. http://localhost:3000/user
1. http://localhost:3000/logout


> Thank You!