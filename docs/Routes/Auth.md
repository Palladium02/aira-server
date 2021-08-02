# Auth Routes

## /weblogin (post)

The endpoint that handles login attempts from the Webapp (Aira-Studio). Takes an email and a password.

## /clientlogin (post)

The endpoint that handles login attempts from the different clients. Takes an email and a password.

## /isAuth (get)

When triggered it checks if the user is logged in or not. 

## /logout (get)

When triggered it deletes the session cookie and session on the server.