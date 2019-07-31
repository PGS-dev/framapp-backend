# Frame app node backend
repo with backend for frame-app

********
## Requirements
- docker and docker-compose
- node.js

********
## Scripts for running dev
```bash
npm run dev-containers
// start dev environment (mongo and server)

npm run dev-containers-detatch
// start dev environment (mongo and server) in detatch mode

npm run seed
// init db with sample data
```

********
## Api and Postman
Api is located in ./docks/postman/api  

if u don't like postman you can open .json file to read "api"

**keep in mind**  all authorized routes need "authorization" header with jwt token   
token is generated after login   
you need firstly run ```npm run seed```  (while app is running) and login with:  

```bash
{
 "email": "admin@admin.com",  
 "password" : "admin"  
}
```

other way is register user by "/sign-in"  

********
## Postman environment
Environments for postman is located in ./docks/postman/environment  

- {{path}} should looks like http://0.0.0.0:3000 or PORT from .env  
- {{prefix}} default is '/api' or your APP_PREFIX   
- {{authToken}} must be a generated jwt key after login

********

## Read text below if need run app in production  

## Scripts for running prod
```bash
npm run prod-containers (detatch mode)
// production running need setup varables in .env 
```

## .env (production only)
 ENV (must be set to PROD)   
 PORT   
 DB_CONFIG  (mongo connection link)  
 SECRET_JWT_KEY    
 JWT_EXPIRED  
 APP_PREFIX 

