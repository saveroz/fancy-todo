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

// const server_url = "http://localhost:3000"
// let token = localStorage.getItem('token') || null

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
        $("#ProjectPage").hide()
        // getAllProjects()
        getAlltodo()
        randomPoetry()

    }
    else {
        $("#projectList").empty()
        $("#todoProjectList").empty()
        $("#Projectmembers").empty()
        $('#signout').hide()
        $('#todo').hide()
        $('#todoButtonCreate').hide()
        $('#click_todo').hide()
        $('.signUpForm').show()
        $('#PoetryBox').hide()
        $("#ProjectPage").hide()
    }

}



function showProjectsPage(){

    $("#todo").hide()
    $("#todoButtonCreate").hide()
    $("#PoetryBox").hide()
    $("#ProjectPage").show()
    getAllProjects()
}


function showMyTodos(){

    $("#todo").show()
    $("#todoButtonCreate").show()
    $("#PoetryBox").show()
    $("#ProjectPage").hide()

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
            localStorage.setItem('token', data.token)
            // console.log(data)
            // getAlltodo()
            $('#todo').show()
            $('#click_todo').show()
            $('#signout').show()
            $('.signInForm').hide()
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
            $('.signInForm').show()
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
    $('#alltask').empty()
    $("#projectList").empty()
    $("#todoProjectList").empty()
    $("#Projectmembers").empty()
    $('#click_register').show()
    $('#click_login').show()
    $('#signout').hide()
    $('#click_todo').hide()
    $('.todo').hide()
    $('#todoButtonCreate').hide()
    $('#PoetryThirdApi').empty()
    $('#PoetryBox').hide()
    $("#ProjectPage").hide()
    localStorage.removeItem('token')
    $('.signInForm').show()
    auth2.signOut()
        .then(function () {

            console.log('User signed out.');
        })
        .catch(err => {
            console.log(err)
        });
}

function beforeLogin(){


}

function afterLogin(){

}


