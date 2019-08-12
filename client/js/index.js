$(document).ready(function () {
    $('.signUpForm').hide()
    $('.edit').hide()
    $('.signInForm').hide()
    $('.createTodo').hide()
    $('.todo').hide()
    $('#click_todo').hide()

    $('#signUpForm').submit(function () {

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

                // console.log(data)
                $('.signUpForm').hide()
                swal("Success!", data, "success");

            })
            .catch(err => {
                // console.log(err.message)
                swal("Error!", err.message, "error");
            })
    })


    $('#signInForm').submit(function () {

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
                $('.signInForm').hide()
                $('#click_todo').show()
                $('#click_todo').show()
                swal("Success!", 'You have successfully login', "success");

            })
            .catch(err => {
                // console.log(err.message)
                swal("Error!", err.message, "error");
            })
    })

    $('#click_home').click(function () {
        $('#homepage_text').show()
        $('.signUpForm').hide()
        $('.signInForm').hide()
        $('.createTodo').hide()
    $('.todo').hide()
    
    })

    $('#click_register').click(function () {
        $('#homepage_text').hide()
        $('.signUpForm').show()
        $('.signInForm').hide()
        $('.createTodo').hide()
    $('.todo').hide()
    
    })

    $('#click_login').click(function () {
        $('#homepage_text').hide()
        $('.signUpForm').hide()
        $('.signInForm').show()
        $('.createTodo').hide()
    $('.todo').hide()
    
    })

    $('#click_todo').click(function () {
        $('.todo').show()
        // $('#homepage_text').hide()
        $('.signUpForm').hide()
        $('.signInForm').hide()
        let token = localStorage.getItem('token')

    $('#todoButtonCreate').click(function(){
        $('.signUpForm').hide()
        $('.signInForm').hide()
        $('.createTodo').show()
        $('.todo').hide()
    })
 
        $.ajax({
            url: 'http://localhost:3000/todo',
            method: 'GET',
            headers: { 'token': token }
        })
            .done(alltodo => {
                $('#alltask').empty()
                let num = 1
                for (let todo of alltodo) {

                    let template = ` <tr>
                <td>${num}</td>
                <td>${todo.name}</td>
                <td>${todo.description}</td>
                <td>${todo.duedate}</td>
                <td>${todo.status}</td>
                <td><button id="editTodo" value="${todo._id}" class="btn btn-primary" style="color:white">edit</button> || <button id="delete" onclick="deleteTodo('${todo._id}')" class="btn btn-primary"  style="color:white">delete</button></td>
                </tr>`

                    num += 1

                    $('#alltask').append(template)
                }

            })
            .fail(err => {
                console.log(err)
            })
    })

    $('#editTodo').click(function (){
        $('.todo').hide()
        $('.edit').show()
    })

    $('#createTodoForm').submit(function () {

        let name = $('#todo-name').val()
        let description = $('#todo-description').val()
        let duedate = $('#todo-duedate').val()
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
                console.log(data)
                // $('#student-list').prepend('<li>' + newStudent.name + '</li>');
            })
            .fail(err => {
                console.log(err)
            });
    })

});
function confirmation() {
    return confirm('Are you sure you want to remove this todo?');
}

function deleteTodo(todoId) {

    confirmation()


    let token = localStorage.getItem('token')
    // let id = '5d50365ef9e4091ff0edff18'
    let id = todoId

    event.preventDefault();
    $.ajax({
        url: 'http://localhost:3000/todo',
        method: "DELETE",
        data: { id },
        headers: { token }
    })
        .done(result => {
            console.log(result)
        })
        .fail(err => {
            console.log(err)
        })
}

function editTask(todoId) {

    event.preventDefault();
    let id = todoId
    let name = $('#todo-name').val()
    let description = $('#todo-description').val()
    let duedate = $('#todo-duedate').val()
    let token = localStorage.getItem('token')

    $.ajax({
        url: 'http://localhost:3000/todo',
        method: "PATCH",
        data: { id },
        headers: { token }
    })
        .done(result => {
            console.log(result)
        })
        .fail(err => {
            console.log(err)
        })
}




