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