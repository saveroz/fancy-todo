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
        afterLogin()
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
        $('.signUpForm').hide()
        $('#PoetryBox').hide()
        $("#ProjectPage").hide()
        beforeLogin()
    }

}



function showProjectsPage() {

    $("#todo").hide()
    $("#todoButtonCreate").hide()
    $("#PoetryBox").hide()
    $("#ProjectPage").show()
    getAllProjects()
}


function showMyTodos() {

    $("#todo").show()
    $("#todoButtonCreate").show()
    $("#PoetryBox").show()
    $("#ProjectPage").hide()

}

function login() {

    let email = $('#email2').val()
    let password = $('#password2').val()
    // console.log(email, password)
    event.preventDefault();

    $.ajax({
        method: "POST",
        url: `${server_url}/users/login`,
        data: { email, password }
    })
        .done(data => {
            // console.log(data)
            localStorage.setItem('token', data.token)
            afterLogin()
            getAlltodo()
            randomPoetry()
            
            // swal("Success!", 'You have successfully login', "success");
            Swal.fire({
                type: "success",
                title: "You have successfulyy login",
                showConfirmButton: false,
                timer: 1500
            })
            $('#todoButtonCreate').show()

        })
        .fail(err => {
            Swal.fire({
                type: "error",
                title: err.responseJSON.message,
                showConfirmButton: false,
                timer: 1500
            })
        })

}

function signUp() {

    let username = $('#username').val()
    let email = $('#email').val()
    let password = $('#password').val()
    // console.log('masuk ke signup')
    event.preventDefault();

    $.ajax({
        url: `${server_url}/users/register`,
        method: "POST",
        data: { username, email, password },
    })
        .done(data => {
            $('.signUpForm').hide()
            $('.signInForm').show()
            // swal("Success!", data, "success");
            Swal.fire({
                type: 'success',
                title: 'You Have successfully register!',
                showConfirmButton: false,
                timer: 1500
            })
        })
        .fail((err) => {

            console.log(err.status)
            console.log(err.responseJSON.message)
            // swal("Error!", err.message, "error");
            Swal.fire({
                type: "error",
                title: err.responseJSON.message,
                showConfirmButton: false,
                timer: 1500
            })
        })

}

function onSignIn(googleUser) {

    let idToken = googleUser.getAuthResponse().id_token

    event.preventDefault()
    $.ajax({
        method: "POST",
        url: `${server_url}/users/signIn`,
        data: {
            idToken
        }
    })
        .done(data => {
            // console.log(data)
            localStorage.setItem('token', data.token)
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
        .fail(err => {
            console.log(err)
        })

}


function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();

    Swal.fire({
        title: "Are you sure you want to sign out ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    })
    .then(result=>{
        if(result.value){
            localStorage.removeItem('token')
            beforeLogin()
            auth2.signOut()
                .then(function () {
                    Swal.fire({
                        type: 'success',
                        title: 'You Have successfully logout!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    console.log('User signed out.');
                })
                .catch(err => {
                    console.log(err)
                });
        }
    })
  
}

function beforeLogin() {
    $("#MyProjectsNavItem").hide()
    $("#MyTodosNavItem").hide()
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
    $('.signInForm').show()

}

function afterLogin() {
    $("#MyProjectsNavItem").show()
    $("#MyTodosNavItem").show()
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
}


