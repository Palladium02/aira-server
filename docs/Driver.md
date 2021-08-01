# Driver

## DatabaseError

The DatabaseError is a class to represent an error that
can be created and returned by the actual Driver.

### Parameter

|name|type|default|
|---|---|---|
|description|string|''|
|date|number|Date.now()|

## Driver

The Driver class is the (only) instance that directly works with the
stored data. It also provides statistics about the data and the
requests made to each specific database.

### Types

If you are interested in the type definitions, please read the corresponding Types.ts file in the Driver folder.

### Parameter

|name|type|default|
|---|---|---|
|folderName|string|no default|


### Methods

#### find (public)

|name|type|default|
|---|---|---|
|query|DatabaseQuery|no default|
|databaseName|string|no default|
|onlyOne|boolean|false|

This method takes a query and searches the database which has been specified with the databaseName
parameter. A empty query, a not given or wrong database name are conditions which will lead to a direct exit of
the method. When these conditions are fulfilled then the names of all files in the database are loaded.
After that the schema file is loaded and checked with the checkQuery method.
The schmema.json lives in the same directory as the other files of a table so needs to be removed from
the fileNames array. Now the fileNames array only contains the names of entries.
For each filename the compare method is called. When Driver.compare returns true the entry is added to the
matches. Finally a DatabaseResponse is returned.
The compare method is called for each file seperatly as each entry is a single file. With this approach
a little bit of performance is sacrificed for better memory usage.

#### compare (private)

|name|type|default|
|---|---|---|
|entry|DatabaseEntry|no default|
|query|DatabaseQuery|no default|

This method takes every key in the query and performs a short type check wether the value is typeof object or not.
If the type is not object a direct comparison needs to be performed. False is returned when the values do not match.
The other case where the value is typeof object further computation has to be done.
In the following process the method loops over the keys in the DatabaseOperatorObject and value comparisons are
made according to the keys in the DatabaseOperatorObject. If a comparisons fails false is returned else nothing happens until the
method finishes. In the end true is returned hence all comparisons worked out and the entry is a match.

#### insert (public)

|name|type|default|
|---|---|---|
|query|DatabaseQuery|no default|
|update|DatabaseEntry|no default|
|databaseName|string|no default|

The insert method is responsible to create a new entry in the database. Firstly the query and the update are
checked if they are valid. If not the method exits and returns a DatabaseInsertResponse with a DatabaseError object.
When both query and update are valid an object id is generated. If the update object misses any fields that had been
specified in the schema then these fields will be filled with default values that either are specified in the schema file
or are the general defaults for the type of the affected field.

#### update (public)

|name|type|default|
|---|---|---|
|query|DatabaseQuery|no default|
|update|DatabaseEntry|no default|
|databaseName|string|no default|

This method updates a specific entry in the database. The method exits if there is no entry that matches the query.
Then the update object is checked if it is valid else the method also exits. The next step is to update the fields of the entry.
A guard clause prevents an override of the object id. Lastly the updated entry is written to the database.

#### deleteEntry (public)

|name|type|default|
|---|---|---|
|query|DatabaseQuery|no default|
|databaseName|string|no default|

A method to delete an entry based on a query. If a matching entry is found that entry is deleted else the method exits with a DatabaseError.

#### dropTable (public)

|name|type|default|
|tableName|string| no default|

If a table with the given name exists that specific table will be deleted.


#### getTableNames (public)

|name|type|default|
|---|---|---|
|username|string|no default|

This method takes the names of all tables in the users database. It removes meta.json from the list as fs.readdirSync returns every
entry from a folder.

#### getSizeOfAllTables (public)

|name|type|default|
|---|---|---|
|username|string|no default|

This methods sums up the sizes of all folders/tables in the users database.

#### checkQuery (public)

|name|type|default|
|---|---|---|
|schema|Object|no default|
|query|DatabaseQuery|no default|

This method loops over the keys of the query and checks if the schema has the same
keys.

#### checkOperators (public)

|name|type|default|
|---|---|---|
|operatorObjec|DatabaseOperatorObject|no default|

This method loopes over the keys of the operatorObject and checks if the operatorObject only
contains valid keys.