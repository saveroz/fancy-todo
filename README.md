Fancy To Do By Savero

===
## Link Deploy
http://fancytodo.saveroz.com

===
## Usage
on server
```javascript
$ npm install
$ node app.js
```
on client 
```
$live-server
```

Access client via `http://fancytodo.saveroz.com`<br>
Access server via `http://35.240.188.102`

##  Routes
|Routes|HTTP|Header(s)|Body|Response|Description| 
|:--:|:--:|:--:|:--:|:--:|:--:|
|/users/register  |POST  |none|username: String (**required**), email: String (**required**),  password: String (**required**)|**Success**: Register a user, **Error**: Internal server error (Validation)|Register a user|
|/users/login  |POST  |none|email: String (**required**),  password: String (**required**)|**Success**: Login as a user, **Error**: Internal server error (Wrong e-mail/password)|Login as a user|
|/users/signIn  |POST  |none|email: String (**required**),  password: String (**required**)|**Success**: Login as a user (**via Google**), **Error**: Internal server error (Wrong e-mail/password)|Login as a user (**via Google**)|
|/todo  |GET  |token|none|**Success**: Show all todos of logged in user, **Error**: Internal server error|Show tasks of logged in user|
|/todo/create  |POST  |token|name: String (**required**), description: String (**required**), due_date: Date (**required**)|**Success**: Create a new todo, **Error**: Internal server error (Validation)|Create a new todo
|/todo |PATCH |token|id : String (**required**), name: String , description: String , due_date: Date |**Success**: update a new todo, **Error**: Internal server error (Validation)|update a new todo
|/todo  |DELETE|token|id:String(**required**)|**Success**: Delete a todo, **Error**: Internal server error|Delete a todo|
