# Node.js MongoDB boilerplate
A web API boilerplate made to be used in projects for database connection using Node.js, MongoDB. 

This is a web API boilerplate that I use in my different web applications. 

## How to start
Clone the repo
#### After cloning make sure to install the dependecies

 ```npm install``` 

### Mongoose
I have created an authorization boilerplate to be used as a sample.
Where schemas can be added using mongoose that will directly interact with mongoDB. 

### Environment variables
```process.env.*``` are the configuration variables used in the different applications. 
```process.env.NODE_ENV``` should be 'production' when deployed. i.e.
```process.env.NODE_ENV === 'production'```

##### NOTE: You can add a dev.js in the config folder to use keys in your local environment.

To run it in the dev environment
``` npm run dev```

##### Dev port - ```localhost:5000```
##### Prod port = ```process.env.PORT```
