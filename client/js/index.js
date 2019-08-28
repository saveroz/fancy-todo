$(document).ready(function () {
    $('.signUpForm').show()
    $('.signInForm').hide()

    if (localStorage.getItem('token')) {
        isLoggedIn(true)

    }
    else {
        isLoggedIn(false)
    }


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


    $('#click_todo').click(function () {
        $('.todo').show()
    })


});

const server_url = "http://35.240.188.102"

function isLoggedIn(condition) {

    if (condition) {

        $('#click_todo').show()
        $('#signout').show()
        $('#PoetryBox').show()
        $('#click_register').hide()
        $('#click_login').hide()
        $('#todo').show()
        $('#todoButtonCreate').show()
        $('.signUpForm').hide()
        $('.signInForm').hide()

        getAlltodo()
        randomPoetry()

    }
    else {
        $('#signout').hide()
        $('#todo').hide()
        $('#todoButtonCreate').hide()
        $('#click_todo').hide()
        $('.signUpForm').show()
        $('#PoetryBox').hide()
    }

}

function login() {

    let email = $('#email2').val()
    let password = $('#password2').val()
    console.log(email, password)
    event.preventDefault();
    axios.post(`${server_url}/users/login`, {
        email,
        password
    })
        .then(function ({ data }) {
            // console.log(data)
            localStorage.setItem('token', data)
            // console.log(data)
            // getAlltodo()
            // $('#todo').show()
            // $('#click_todo').show()
            // $('#signout').show()
            // $('.signInForm').hide()
            $('#click_register').hide()
            $('#click_login').hide()
            $('.signUpForm').hide()
            $('.signInForm').hide()
            $('#signout').show()
            $('#PoetryBox').show()
            getAlltodo()
            randomPoetry()
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
        url: `${server_url}/todo/create`,
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
            swal("Error!", errMessage, "error")
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
                    url: `${server_url}/todo`,
                    method: "DELETE",
                    data: { id },
                    headers: { token }
                })
                    .done(result => {
                        swal("Success!", 'You have successfully  delete Task', "success");
                        getAlltodo()
                        // console.log(result)
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
        url: `${server_url}/todo`,
        method: 'GET',
        headers: { 'token': token }
    })
        .done(alltodo => {
            $('#alltask').empty()
            $('.signUpForm').hide()
            let num = 1
            for (let todo of alltodo) {
                let objtodo = JSON.stringify(todo)
                let status = ""
                status = todo.status === true ? status = "completed" : status = "uncompleted"
                let color = todo.status === true ? "text-white bg-primary" : "text-white bg-danger"
                let cardclass = `card w-100 ${color}`
                let template =

                    `<div class="col-4 d-flex align-items-stretch mb-4">
                <div class="${cardclass}">
                  <div class="card-body">
                    <h5 class="card-title">${todo.name}</h5>
                    <p class="card-text">${todo.description}</p>
                    <p class="card-text">${new Date(todo.duedate).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p class="card-text">${status}</p>
                  </div>
                  <div class="card-footer" >
                    <button class="btn btn-light" data-toggle="modal" data-target="#ModalEdit" onclick='editForm(${objtodo})'>edit</button> |||   
                    <button class="btn btn-light" onclick="deleteTodo('${todo._id}')">delete</button>
                    </div>
                    </div>
                </div>`

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
            value="${new Date(todo.duedate).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}" required>
    </div>

    <div class="custom-control custom-radio">
             <input type="radio" id="customRadio1" name="inputStatus" value="true" class="inputStatus custom-control-input">
             <label class="custom-control-label" for="customRadio1">Done</label>
            </div>
         <div class="custom-control custom-radio">
            <input type="radio" id="customRadio2" name="inputStatus" value="false" class="inputStatus custom-control-input">
            <label class="custom-control-label" for="customRadio2">Not Done Yet</label>
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
    let id = todoId
    let name = $('#inputTitleUpdate').val()
    let description = $('#inputDescriptionUpdate').val()
    let duedate = $('#inputDueDateUpdate').val()
    let status = $('input[name=inputStatus]:checked').val();
    // console.log(status)
    status = status === "true" ? status = true : status = false
    // console.log(status)
    let token = localStorage.getItem('token')

    event.preventDefault()
    $.ajax({
        url: `${server_url}/todo`,
        method: "PATCH",
        data: { id, name, description, duedate, status },
        headers: { token }
    })
        .done(result => {
            // console.log(result)
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
    console.log('masuk ke signup')
    event.preventDefault();
    axios.post(`${server_url}/users/register`, {
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
        url: `${server_url}/users/signIn`,
        data: {
            idToken
        }
    })
        .then(response => {
            console.log(response.data)
            localStorage.setItem('token', response.data)
            $('.signUpForm').hide()
            $('.signInForm').hide()
            $('#signout').show()
            $('#PoetryBox').show()
            $('#PoetryThirdApi').empty()
            $('#click_register').hide()
            $('#click_login').hide()
            getAlltodo()
            swal("Success!", 'You have successfully login', "success");
            $('#todoButtonCreate').show()
            randomPoetry()
        })
        .catch(err => {
            console.log("error")
        })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    $('#click_register').show()
    $('#click_login').show()
    $('#signout').hide()
    $('#click_todo').hide()
    $('.todo').hide()
    $('#todoButtonCreate').hide()
    $('#PoetryThirdApi').empty()
    $('#PoetryBox').hide()
    localStorage.removeItem('token')
    
    auth2.signOut()
        .then(function () {
     
            console.log('User signed out.');
        })
        .catch(err => {
            console.log(err)
        });
}

function randomPoetry() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/"
    const url = "https://www.poemist.com/api/v1/randompoems"
    $('#PoetryThirdApi').empty()
    axios({
        method: "GET",
        url: `${proxyurl + url}`,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then(poems => {

            let poemContent = poems.data[0].content
            let poemTitle = poems.data[0].title
            poemContent = poemContent.split('\n').slice(6).join("")

            let template = `
        <div class='col-md-6 bg-light' style="border:8px solid gray;" id="PoetryThirdApi">
            
        <h2 class="mt-2">${poemTitle}</h2>
        <br>
    
        <p class="text-justify p-2"  >
        ${poemContent}
           
            
        </p>
        </div>
        `

            $('#PoetryBox').append(template)


            // console.log(poemTitle)
            // console.log(poemContent)
        })
        .catch(err => {
            console.log("error")
        })
}



