# VueJs Authentication


**vuejs-authentication** is an application that you can use as a boiler plate for your future application using the MEVN stack (MongoDB - ExpressJs - VueJs - NodeJs) and Passport.js (using the local Strategy in this project)the authentication middleware for Node.js.

# How to serve the app:
## The ExpressJs backend api:
To install dependencies:
```bash
npm install
```
To spin up the backend server (on port 5000):
```bash
npm run dev
```

## The VueJS Application:
To install dependencies:
```bash
npm install
```
To spin up the backend server (on port 8080):
```bash
npm run serve
```
### The application now is available on (http://localhost:8080)

## Add your MongoDB configuration
##### Go to config/keys.js and add your MongoDB URI :

```javascript
module.exports = {
MongoURI : 'mongodb+srv://<user_name>:<password>@<cluster>/<database>?retryWrites=true&w=majority'
}
