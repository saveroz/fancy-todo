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
        getAllProjects()
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
        $("#ProjectPage").hide()
    }

}



function showProjectsPage(){

    $("#todo").hide()
    $("#todoButtonCreate").hide()
    $("#PoetryBox").hide()
    $("#ProjectPage").show()
}


function showMyTodos(){

    $("#todo").show()
    $("#todoButtonCreate").show()
    $("#PoetryBox").show()
    $("#ProjectPage").hide()

}




