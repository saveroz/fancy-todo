Fancy To Do By Savero
===
## Usage
```javascript
$ npm install
$ node app.js
```
Access client via `http://localhost:8080`<br>
Access server via `http://localhost:3000`

##  Routes
|Routes|HTTP|Header(s)|Body|Response|Description| 
|:--:|:--:|:--:|:--:|:--:|:--:|
|/users/register  |POST  |none|username: String (**required**), email: String (**required**),  password: String (**required**)|**Success**: Register a user, **Error**: Internal server error (Validation)|Register a user|
|/users/login  |POST  |none|email: String (**required**),  password: String (**required**)|**Success**: Login as a user, **Error**: Internal server error (Wrong e-mail/password)|Login as a user|
|/users/signIn  |POST  |none|email: String (**required**),  password: String (**required**)|**Success**: Login as a user (**via Google**), **Error**: Internal server error (Wrong e-mail/password)|Login as a user (**via Google**)|
|/todo  |GET  |token|none|**Success**: Show all todos of logged in user, **Error**: Internal server error|Show tasks of logged in user|
|/todo/create  |POST  |token|name: String (**required**), description: String (**required**), due_date: Date (**required**)|**Success**: Create a new todo, **Error**: Internal server error (Validation)|Create a new todo
|/todo  |DELETE|token|none|**Success**: Delete a todo, **Error**: Internal server error|Delete a todo|
