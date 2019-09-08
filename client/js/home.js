const server_url = "http://localhost:3000"

function createTodo() {
    // console.log("masuk ke create todo")

    let name = $('#inputTitleCreate').val()
    let description = $('#inputDescriptionCreate').val()
    let duedate = $('#inputDueDateCreate').val()

    let token = localStorage.getItem("token")
    Swal.showLoading()
    event.preventDefault();
    $.ajax({
        url : `${server_url}/todos`,
        method : "POST",
        data : { name, description, duedate},
        headers : {token}
    })
    .done(data=>{
        Swal.close()
        Swal.fire("Success!", 'You have successfully created Task', "success");
        getAlltodo()
            // $('.createTodo').hide()
            // $('#student-list').prepend('<li>' + newStudent.name + '</li>');
        $('#inputDescriptionCreate').val(null)
        $('#inputTitleCreate').val(null)
        $('#inputDueDateCreate').val(null)
        $('#ModalCreate').modal('hide')
    })
    .fail(err=>{
        // let errMessage = (err.responseJSON.message)
        Swal.close()
        Swal.fire({
            type: 'error',
            title: 'You have failed to created task',
            showConfirmButton: false,
            timer: 1500
        })
    })
}




function deleteTodo(todoId) {

    let token = localStorage.getItem("token")

    // let id = '5d50365ef9e4091ff0edff18'
    let id = todoId
    Swal.fire({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    })
        .then((result) => {
            if (result.value) {
                Swal.showLoading()
                event.preventDefault();
                $.ajax({
                    url: `${server_url}/todos/${id}`,
                    method: "DELETE",
                    headers: { token }
                })
                .done(response=>{
                    let deletedTodo = response
                    if (deletedTodo.ProjectId) {
                        getProjectTodo(deletedTodo.ProjectId)
                    }
                    getAlltodo()
                    Swal.close()
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                })
                .fail(err=>{
                    Swal.close()
                    Swal.fire({
                        type: 'error',
                        title: 'You have failed to deleted task',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    // console.log(err)
                })
            }
            else{
                
            }
        })
}

function getAlltodo() {

    let token = localStorage.getItem("token")
    
    $('#todo').show()
    $('#alltask').show()
    // $('.signUpForm').hide()
    // $('.signInForm').hide()

    $.ajax({
        url: `${server_url}/todos`,
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
                    `
                <div class="col-4 d-flex align-items-stretch mb-4">
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
                </div>
                `

                num += 1

                $('#alltask').prepend(template)
            }

        })
        .fail(err => {
            console.log(err.status)
            // console.log(err.responseJSON.message)
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

    let token = localStorage.getItem("token")
    let id = todoId
    let name = $('#inputTitleUpdate').val()
    let description = $('#inputDescriptionUpdate').val()
    let duedate = $('#inputDueDateUpdate').val()
    let status = $('input[name=inputStatus]:checked').val();
    // console.log(status)
    status = status === "true" ? status = true : status = false
    // console.log(status)
    Swal.showLoading()
    event.preventDefault()
    $.ajax({
        url: `${server_url}/todos/${id}`,
        method: "PATCH",
        data: { name, description, duedate, status },
        headers: { token }
    })
    .done(todo=>{
        if (todo.ProjectId) {
            getProjectTodo(todo.ProjectId)
        }
        else{
            getAlltodo()
        }
        
        // swal("Success!", 'You have successfully edited Task', "success");
        Swal.close()
        Swal.fire({
            type : 'success',
            title : "you have successfully edited task",
            showConfirmButton: false,
            timer: 1500
        })
    })
    .fail(err=>{
        // console.log(err)
        Swal.close()
        Swal.fire({
            type: 'error',
            title: 'You have failed to edit task',
            showConfirmButton: false,
            timer: 1500
        })
    })

}

function getProjectTodo(id) {

    let token = localStorage.getItem("token")

    $.ajax({
        url: `${server_url}/todos/projects/${id}`,
        method: "GET",
        headers: { token }
    })
    .done(todosProjects=>{
            $("#todoProjectList").empty()
            
            for (let todo of todosProjects) {
                let objtodo = JSON.stringify(todo)
                let status = ""
                status = todo.status === true ? status = "completed" : status = "uncompleted"
                let color = todo.status === true ? "text-white bg-primary" : "text-white bg-danger"
                let cardclass = `card w-75 ${color} mb-3`
                let template =
                    `
                <div class="${cardclass}">
                    <div class="card-body">
                      <h5 class="card-title">${todo.name}</h5>
                      <p class="card-text">${todo.description}</p>
                      <p class="card-text">${new Date(todo.duedate).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <p class="card-text">${status}</p>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-light" data-toggle="modal" data-target="#ModalEdit" onclick='editForm(${objtodo})'>edit</button>
                        |||
                        <button class="btn btn-light" onclick="deleteTodo('${todo._id}')">delete</button>
                    </div>
                </div>
                `
                $("#todoProjectList").append(template)
            }
    })
    .fail(err=>{
        console.log(err)
    })

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

        })
        .catch(err => {
            console.log("error")
        })
}


