# REST Endpoints

## /login

### GET
<b>Purpose:</b> Gets all current users that are logged in</br>
<b>Headers:</b> LoginToken<br>
<b>Body:</b> Empty

### DELETE
<b>Purpose:</b> Invalidates all LoginTokens (Logout all users)<br>
<b>Headers:</b> LoginToken<br>
<b>Body:</b> Empty

### POST
<b>Purpose:</b> Gets LoginToken to be used by client<br>
<b>Headers:</b> Empty<br>
<b>Body:</b> Valid JSON representation of Credentials

## /login/{id}

### GET
<b>Purpose:</b> Validates given token. Renews token expiration date.<br>
<b>Headers:</b> Empty<br>
<b>Body:</b> Empty

### DELETE
<b>Purpose:</b> Deletes LoginToken with given id (Logout)<br>
<b>Headers:</b> Empty<br>
<b>Body:</b> Empty

## /users

### GET
<b>Purpose:</b> Gets all current users<br>
<b>Headers:</b> LoginToken<br>
<b>Body:</b> Empty

### DELETE
<b>Purpose:</b> Deletes all users<br>
<b>Headers:</b> LoginToken<br>
<b>Body:</b> Empty

### POST
<b>Purpose:</b> Adds user<br>
<b>Headers:</b> LoginToken<br>
<b>Body:</b> Valid JSON representation of new user

## /users/{id}

### GET
<b>Purpose:</b> Gets user with given id<br>
<b>Headers:</b> LoginToken<br>
<b>Body:</b> Empty

### DELETE
<b>Purpose:</b> Deletes user with given id<br>
<b>Headers:</b> LoginToken<br>
<b>Body:</b> Empty

### PUT
<b>Purpose:</b> Updates user with given id<br>
<b>Headers:</b> LoginToken<br>
<b>Body:</b> Valid JSON representation for updated user

## /games

### GET
<b>Purpose:</b> Gets all current games<br>
<b>Headers:</b> LoginToken<br>
<b>Body:</b> Empty

### DELETE
<b>Purpose:</b> Deletes all current games<br>
<b>Headers:</b> LoginToken<br>
<b>Body:</b> Empty

### POST
<b>Purpose:</b> Adds game<br>
<b>Headers:</b> LoginToken<br>
<b>Body:</b> JSON representation of a the new game
