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

## users end point

### **Register New User**

Register new user to the database
| Route | HTTP | Headers |
|---|---|---|
|`/users/register`|POST|`none`|

Body :  
```
   username: String (Required)
   password: String (Required)
   email : String (Required) (Unique)
```
Success :
```
   status: 201
   message: 'You have successfully registered account'
```
error :
```
   status: 404
   message: 'failed to registered account'
```

### **Login User**

Login with user info
| Route | HTTP | Headers |
|---|---|---|
|`/users/login`|POST|`none`|

Body :
```
   email: String (Required)
   password: String (Required)
```
Success :
```
   status: 200
   message : 'Login successfull'
   data: 'token'
```
error :
```
   status: 404
   message: 'email/password is wrong'
```
## login with Google SignIn
Login with user info
| Route | HTTP | Headers |
|---|---|---|
|`/users/signIn`|POST|`idToken`|

Body :
```
    none

```
Success :
```
   status: 200
   message : 'Login successfully'
   data: 'token'
```
error :
```
   status: 404
   message: 'email/password is wrong'
```
## get all user
Login with user info
| Route | HTTP | Headers |
|---|---|---|
|`/users/login`|POST|`none`|

Body :
```
None
```
Success :
```
   status: 200
   data: all users information

```
error :
```
   status: 404
   message: 'data not found'
```


## Todos end point

### **Create todo**

Create new todo into the database
| Route | HTTP | Headers |
|---|---|---|
|`/todos`|POST|`token`|
Body :
```
   name: String (Required)
   description: String (Required)
   duedate : date(required)
   ProjectId : String(required)
```
   
success :
```
   status : 201
   message : 'questions has been created successfully'
   data : todo
```
error :
```
   status: 404
   message : 'failed to create questions'
```

### **Find All Todo**

Find all user's Todo which not affiliated with any project
| Route | HTTP | Headers |
|---|---|---|
|`/todos`|GET|`token`|
Body :
```
   none
   ```
success :
```
   status: 200
   data: 'all user's todo'
```
error:
```
   status: 404
   message: 'data not found'
```
   
### **Find todos project**

Find all questions in the database
| Route | HTTP | Headers |
|---|---|---|
|`/todos/projects/:id`|GET|`token`|
Body:
```
   none
```
success :
```
   status: 200
   data : all project todos
```
error :
```
   status: 404
   message: 'data not found'
```

### **Update todos**

Update a todos in the database
| Route | HTTP | Headers |
|---|---|---|
|`/todos/:id`|PATCH|`token`|

Body :
```
   name : String
   description: String 
   duedate : date
   status :boolean
    
```

success :
```
   status: 200
   message: 'update successfully'
```
error:
```
   status: 404
   message: 'update failed'
```

note : one of the body variable have to different from before 

### **Delete todos**
Delete todos in the database
| Route | HTTP | Headers |
|---|---|---|
|`/todos/:id`|DELETE|`token`|

Body :
```
   none
```
success :
```
   status: 200
   message: 'delete successfully'
```
error:
```
   status: 404
   message: 'failed to delete todo'
```


## Projects end point

### **Create Project**

Create new project into the database
| Route | HTTP | Headers |
|---|---|---|
|`/projects`|POST|`token`|
Body :
```
   name: String (Required)

```
   
success :
```
   status : 201
   message : 'project has been created successfully'
   data : project
```
error :
```
   status: 404
   message : 'failed to create project'
```

### **Find All Project**

Find all User's Project 
| Route | HTTP | Headers |
|---|---|---|
|`/todos`|GET|`token`|
Body :
```
   none
   ```
success :
```
   status: 200
   data: 'all user's Projects'
```
error:
```
   status: 404
   message: 'data not found'
```
   
### **Find one project**

Find all questions in the database
| Route | HTTP | Headers |
|---|---|---|
|`/projects/:id`|GET|`token`|
Body:
```
   none
```
success :
```
   status: 200
   data : project(Object)
```
error :
```
   status: 404
   message: 'data not found'
```

### **Update Project**

Update a todos in the database
| Route | HTTP | Headers |
|---|---|---|
|`/projects/:id`|PATCH|`token`|

Body :
```
   name : String
   member : Array
    
```

success :
```
   status: 200
   message: 'update successfully'
```
error:
```
   status: 404
   message: 'update failed'
```

note : one of the body variable have to different from before 

### **Delete projects**
Delete todos in the database
| Route | HTTP | Headers |
|---|---|---|
|`/projects/:id`|DELETE|`token`|

Body :
```
   none
```
success :
```
   status: 200
   message: 'delete successfully'
```
error:
```
   status: 404
   message: 'failed to delete data'
```

### **add Project Member**

add member into the project in the database
| Route | HTTP | Headers |
|---|---|---|
|`/projects/:id/addMember`|POST|`token`|
Body :
```
   membersId = array(required)

```
   
success :
```
   status : 201
   message : 'add new member has been successful'
   data : Object
```
error :
```
   status: 404
   message : 'failed to add new member'
```

### **remove Project Member**

add member into the project in the database
| Route | HTTP | Headers |
|---|---|---|
|`/projects/:id/removeMember`|POST|`token`|
Body :
```
   membersId = array(required)

```
   
success :
```
   status : 201
   message : 'remove member has been successful'
   data : Object
```
error :
```
   status: 404
   message : 'failed to remove member'
```

