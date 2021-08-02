# Authentication

## Session

The Session class represents a session it holds certain information about the user and will
emit a delete event after 2 hours.

### Parameter

|name|type|
|email|string|
|username|string|
|id|string|
|emitter|EventEmitter|

After the properties are set via the constructor a timeout is started.

## Authentication

The Authentication class takes care of storing all sessions and deleting them
needed. It can create, delete and verify sessions.

### Parameter

|name|type|
|path|string|
|userTableName|string|

### Methods

#### login (public)

|name|type|
|email|string|
|password|string|

This method is used to create a session when a user tries to login.
First the database is queried to check if the user exists. Then the credentials
checked. If everything goes fine a session is created.

#### logout (public)

|name|type|
|id|string|

This method takes an id and deletes the corresponding session.

#### isValidId (public)

|name|type|
|id|string|

This method takes an id and checkes if there is a session saved with that id.

#### getSession (public)

|name|type|
|id|string|

This method takes an id and returns the information that is saved under this id.