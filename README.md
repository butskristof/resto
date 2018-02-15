# Resto 

This application is meant to function as a Point of Sale system. We use it as our means of accounting at a yearly event we host to optimise our workflow for ordering food and drinks coupons. 

## Technical
The MERN stack forms the basis for the application. We decided not to use the MERN template, but build our own structure.  
Mongoose is used in tandem with MongoDB for storing data, Express manages the routing of the API and Node.js is the foundational framework. 

## Setup
To run the application, clone the git repository and execute `npm install` in both the root and client subdirectory.
Afterwards, run `npm start` in both the root and client directory, these will respectively start the API server and development frontend server.  
Lastly, you need to set up a MongoDB access point. We use the mLab free tier since our databases are fairly small but it's also possible to use a locally hosted Mongo environment. The access URI must be put in a `.env` file in the root folder and be formatted as follows: `MONGOLAB_URI="mongodb://<dbuser>:<dbpassword>@<mongoserveraddress>:<port>/<collection>"`.

If you want to put it in a production-like environment, it is advised to compile a production version of the React front end by running `npm run build` in the client directory. Afterwards, it suffises to only run the root directory server.  

When running in development, the front end can be accessed through http://localhost:3000/ . The API requests are proxied to port 3001 where the API server runs by default. This behaviour can be modified in `package.json`. 
