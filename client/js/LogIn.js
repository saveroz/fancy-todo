function onSignIn(googleUser) {

    let idToken = googleUser.getAuthResponse().id_token
    
    axios.post('http://localhost:3000/users/signIn', {idToken})
    .then( function ({data}){
        localStorage.setItem('token', data)
        $('#click_todo').show()
        $('#signout').show()
        $('.signInForm').hide()
    })
    .catch(err=>{
        console.log(err)
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut()
    .then(function () {
        $('#signout').hide()
        $('#click_todo').hide()
        localStorage.removeItem('token')
        console.log('User signed out.');
    })
    .catch(err=>{
        console.log(err)
    });
}
