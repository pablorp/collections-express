# collections-express

Super barebones schemaless NoSQL document database for storing and querying data from web and mobile apps, accessible via REST api.

## How to use

**npm install**

**npm start**
*This will start a server on the port configured in process.env.PORT*

## Endpoints
*The base URL is set to /col, so all paths are relative to that*

**GET /**
Returns the list of collections currently on the DB

**POST /**
Creates a new collection. Expects the following object:
{"name":"users", "file":"users.db"}
A users.db file will be created in the db folder

**DEL /:collection**
Deletes the collection with the name passed as parameter

**GET /:collection**
Returns the objects stored in the collection passed as parameter (name)

**GET /:collection/:id**
Returns the object in the specified collection with the id passed as parameter (this id is assigned automatically by the database)

**POST /:collection**
Stores the object passed in the body in the collection. The databse will give it an id (_id property)

**PUT /:collection/:id**
Updates the object with the id specified with the object passed in the body

**DEL /:collection/:id**
Deletes the object with the id passed as parameter

## Dependencies
- NeDB
- Express
