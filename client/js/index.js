$(document).ready(function () {

    if (localStorage.getItem('token')) {
        isLoggedIn(true)

    }
    else {
        isLoggedIn(false)
    }

    // $('#click_home').click(function () {
    //     // $('#homepage_text').show()
    //     $('.signUpForm').hide()
    //     $('.signInForm').hide()
    //     $('.createTodo').hide()
    //     $('#todo').hide()

    // })

    $('#click_register').click(function () {
        // $('#homepage_text').hide()
        $('.signUpForm').show()
        $('.signInForm').hide()
        $('.createTodo').hide()
        $('.todo').hide()

    })

    $('#click_login').click(function () {
        $('.signUpForm').hide()
        $('.signInForm').show()
        $('.createTodo').hide()
        // $('.todo').hide()
    })

    // $('#todoButtonCreate').click(function () {
    //     $('.signUpForm').hide()
    //     $('.signInForm').hide()
    //     $('.createTodo').show()
    //     $('.todo').hide()
    // })
    $('#click_todo').click(function () {
        $('.todo').show()
    })
    // $('.editButton').click(function(){
    //     $('.edit').show()
    // })

});

function isLoggedIn(condition) {

    if (condition) {

        $('#click_todo').show()
        $('#signout').show()
        $('.signInForm').hide()
        $('#click_register').hide()
        $('#click_login').hide()
        $('#todo').show()
        $('#todoButtonCreate').show()

        getAlltodo()

    }
    else {
        $('#signout').hide()
        $('#todo').hide()
        $('#todoButtonCreate').hide()
        $('#click_todo').hide()
    }

}

function login() {

    let email = $('#email2').val()
    let password = $('#password2').val()
    console.log(email, password)
    event.preventDefault();
    axios.post('http://localhost:3000/users/login', {
        email,
        password
    })
        .then(function ({ data }) {
            console.log(data)
            localStorage.setItem('token', data)
            // console.log(data)
            // getAlltodo()
            // $('#todo').show()
            // $('#click_todo').show()
            // $('#signout').show()
            // $('.signInForm').hide()
            // $('#click_register').hide()
            // $('#click_login').hide()
            getAlltodo()
            swal("Success!", 'You have successfully login', "success");
            $('#todoButtonCreate').show()

        })
        .catch(err => {
            // console.log(err.message)
            swal("Error!", err.message, "error");
        })
}


function createTodo() {
    console.log("masuk ke create todo")

    let name = $('#inputTitleCreate').val()
    let description = $('#inputDescriptionCreate').val()
    let duedate = $('#inputDueDateCreate').val()
    let token = localStorage.getItem('token')

    event.preventDefault();
    $.ajax({
        url: 'http://localhost:3000/todo/create',
        method: 'POST',
        data: {
            name, description, duedate
        },
        headers: { token },
    })
        .done(function (data) {
            swal("Success!", 'You have successfully created Task', "success");
            getAlltodo()
            $('.createTodo').hide()
            // $('#student-list').prepend('<li>' + newStudent.name + '</li>');
            $('#inputDescriptionCreate').val(null)
            $('#inputTitleCreate').val(null)
            $('#inputDueDateCreate').val(null)
            $('#ModalCreate').modal('hide')
        })
        .fail(err => {
            let errMessage = (err.responseJSON.message)
            swal("Error!", errMessage , "error")
        });
}




function deleteTodo(todoId) {


    let token = localStorage.getItem('token')
    // let id = '5d50365ef9e4091ff0edff18'
    let id = todoId
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                event.preventDefault();
                $.ajax({
                    url: 'http://localhost:3000/todo',
                    method: "DELETE",
                    data: { id },
                    headers: { token }
                })
                    .done(result => {
                        swal("Success!", 'You have successfully  delete Task', "success");
                        getAlltodo()
                        console.log(result)
                    })
                    .fail(err => {
                        console.log(err)
                    })
            }
            else {
                swal("Your imaginary file is safe!");
            }
        })
}

function getAlltodo() {

    console.log('masuke ke get all')
    // $('#homepage_text').hide()
    $('#todo').show()
    $('#alltask').show()
    $('.signUpForm').hide()
    $('.signInForm').hide()

    let token = localStorage.getItem('token')

    $.ajax({
        url: 'http://localhost:3000/todo',
        method: 'GET',
        headers: { 'token': token }
    })
        .done(alltodo => {
            $('#alltask').empty()
            let num = 1
            for (let todo of alltodo) {
                let objtodo = JSON.stringify(todo)
                let template = ` <tr>
            <td>${num}</td>
            <td>${todo.name}</td>
            <td>${todo.description}</td>
            <td>${todo.duedate.slice(0, 10)}</td>
            <td>${todo.status}</td>
            <td><button onclick='editForm(${objtodo})' data-toggle="modal" data-target="#ModalEdit" class="editButton btn btn-primary" style="color:white">edit</button> || <button id="delete" onclick="deleteTodo('${todo._id}')" class="btn btn-primary"  style="color:white">delete</button></td>
            </tr>`

                num += 1

                $('#alltask').append(template)
            }

        })
        .fail(err => {
            console.log(err)
        })
}

function editForm(obj) {
    
    let todo = obj
    
    let template = `
    <form id="updateToDo">
    <div class="form-group">
        <label for="inputTitle">Title</label>
        <input type="text" class="form-control" id="inputTitleUpdate" value="${todo.name}"
            required>
    </div>
    <div class="form-group">
        <label for="inputDescription">Description</label>
        <textarea class="form-control" id="inputDescriptionUpdate" rows="3"
        > ${todo.description}</textarea>
    </div>
    <div class="form-group">
        <label for="inputDueDate">Due Date</label>
        <input type="date" class="form-control" id="inputDueDateUpdate"
            value="${todo.duedate}" required>
    </div>
            <div class="modal-footer">      
                <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" data-dismiss="modal"
             onclick="editTodo('${todo._id}')" >Submit!</button>
            </div>
        </form> 
  `
  $('#updateTodoModalForm').html(template)

}

function editTodo(todoId) {

    let cuy = todoId
    console.log(cuy)
    event.preventDefault();
    let id = todoId
    let name = $('#inputTitleUpdate').val()
    let description = $('#inputDescriptionUpdate').val()
    let duedate = $('#inputDueDateUpdate').val()
    let token = localStorage.getItem('token')

    event.preventDefault()
    $.ajax({
        url: 'http://localhost:3000/todo',
        method: "PATCH",
        data: { id, name, description, duedate },
        headers: { token }
    })
        .done(result => {
            console.log(result)
            swal("Success!", 'You have successfully edited Task', "success");
            getAlltodo()
            
        })
        .fail(err => {
            console.log(err)
        })
}

function signUp() {

    let username = $('#username').val()
    let email = $('#email').val()
    let password = $('#password').val()

    event.preventDefault();
    axios.post('http://localhost:3000/users/register', {
        username,
        email,
        password
    })
        .then(function ({ data }) {

            $('.signUpForm').hide()
            swal("Success!", data, "success");

        })
        .catch(err => {
            // console.log(err.message)
            swal("Error!", err.message, "error");
        })
}

function onSignIn(googleUser) {

    let idToken = googleUser.getAuthResponse().id_token

    axios({
        method: "POST",
        url: "http://localhost:3000/users/signIn",
        data: {
            idToken
        }
    })
        .then(response => {
            console.log(response.data)
            localStorage.setItem('token', response.data)
            getAlltodo()
            swal("Success!", 'You have successfully login', "success");
            $('#todoButtonCreate').show()
        })
        .catch(err => {
            console.log("error")
        })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut()
        .then(function () {
            $('#click_register').show()
            $('#click_login').show()
            $('#signout').hide()
            $('#click_todo').hide()
            $('.todo').hide()
            $('#todoButtonCreate').hide()
            localStorage.removeItem('token')
            console.log('User signed out.');
        })
        .catch(err => {
            console.log(err)
        });
}



