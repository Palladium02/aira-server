# Utils

The utils folder is the place where small helper function are stored.

## isEmpty

|name|type|
|o|Array o. Object|

Simply return whether an array or object is empty or not.

## authGuard

|name|type|
|req|Express.Request|
|res|Express.Response|
|accepted|Function|
|declined|Function|

This function checks if a user is authenticated or not and based on that the accepted or declined function gets
executed.