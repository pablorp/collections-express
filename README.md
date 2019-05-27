# collections-express

Generic REST API for storing and querying data in a schemaless NOSQL database, useful for development and quick prototyping.

## How to use

**npm install**

**npm start**
*This will start a server on the port configured in process.env.PORT*

## Endpoints

**GET /:collection**
Returns the objects stored in the collection passed as parameter

**GET /:collection/:id**
Returns the object in the specified collection with the id passed as parameter (this id is assigned automatically by the database)

**POST /:collection**
Stores the object passed in the body in the collection. The databse will give it an id (_id property)

**PUT /:collection/:id**
Updates the object with the id specified with the object passed in the body

**DEL /:collection/:id**
Deletes the object with the id passed as parameter

## Dependencies
- MongoDB
- Express
