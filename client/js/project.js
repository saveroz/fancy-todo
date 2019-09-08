
function getAllProjects() {

    $("#projectList").empty()

    let token = localStorage.getItem("token")

    $.ajax({
        url: `${server_url}/projects`,
        method: "GET",
        headers: { token }
    })
        .done(projects => {

            for (let project of projects) {
                let template = ` 
            <div class="col p-3" style="border-bottom: gray 2px solid;">
                    <div>
                            <p style="font-size: 19px;">${project.name}</p>
                    </div>
                    <div>
                            <button class="btn btn-secondary mb-3" onclick="projectDetails('${project._id}')">Project Details</button>
                    </div>
                    <div>       
                        <button class="btn btn-secondary" data-toggle="modal" data-target="#memberModal" onclick="addMemberForm('${project._id}')">add member</button>
                        <button class="btn btn-secondary" data-toggle="modal" data-target="#templateModalAddTodo" onclick="addTodoForm('${project._id}')">add todo</button>
                        <button class="btn btn-secondary" onclick="deleteProject('${project._id}')">delete</button>
                    </div>
                    <!-- <hr> -->
                </div>
            `
                $("#projectList").prepend(template)
            }
        })
        .fail(err => {
            console.log(err)
        })
}

function createProject() {

    let name = $('#inputProjectName').val()
    let token = localStorage.getItem("token")
    Swal.showLoading()
    event.preventDefault()
    $.ajax({
        url: `${server_url}/projects`,
        method: "POST",
        data: { name },
        headers: { token }
    })
        .done(data => {
            Swal.close()
            Swal.fire({
                type : "success",
                title: "You have successfully created new project",
                showConfirmButton : false,
                timer :false
            })
            $('#ModalCreateProject').modal('hide')
            $('#inputProjectName').val(null)
            getAllProjects()
            // console.log(data)
        })
        .fail(err => {
            console.log(err)
            Swal.close()
            Swal.fire({
                type : "error",
                title: "You have failed created new project",
                showConfirmButton : false,
                timer :false
            })
        })

}

function deleteProject(id) {

    let token = localStorage.getItem("token")

    Swal.fire({
        title: "Are you sure ?",
        text: "Once deleted, you will not be able to recover this project!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    })
    .then(result=>{

        if(result.value){
            Swal.showLoading()
            event.preventDefault()
            $.ajax({
                url: `${server_url}/projects/${id}`,
                method: "DELETE",
                headers: { token }
            })
                .done(data => {
                    // console.log(data)
                    Swal.close()
                    Swal.fire({
                        type : "success",
                        title : "you have successfully delete the project",
                        showConfirmButton : false,
                        timer : 1500
                    })
                    getAllProjects()
                })
                .fail(err => {
                    console.log(err.responseJSON.message)
                    Swal.close()
                    Swal.fire({
                        type : "error",
                        title : "you have failed delete the project",
                        showConfirmButton : false,
                        timer : 1500
                    })
                })
        }

        else {

        }



    })



}


function getProjectTodo(id) {

    let token = localStorage.getItem("token")

    $.ajax({
        url: `${server_url}/todos/projects/${id}`,
        method: "GET",
        headers: { token }
    })
        .done(todosProjects => {
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
        .fail(err => {
            console.log(err)
        })

}


function projectDetails(id) {

    let token = localStorage.getItem("token")

    getProjectTodo(id)

    $.ajax({
        url: `${server_url}/projects/${id}`,
        method: "GET",
        headers: { token }
    })
        .done(theProject => {
            let obj = { projectId: id }
            $("#Projectmembers").empty()
            for (let member of theProject.members) {
                obj["memberId"] = member._id
                let input = JSON.stringify(obj)
                let template = `
            <li class="mb-3">
            <div class="row ">
                    <button disabled class="btn btn-outline-dark ml-3 mr-2" style="color:black;font-weight:bold">${member.username}</button>
                    <button class="btn btn-secondary btn-sm" onclick='removeMember(${input})'>remove</button>
            </div>
            </li>
             `

                $('#Projectmembers').prepend(template)
            }
        })
        .fail(err => {
            console.log(err)
        })

}

function removeMember(obj) {

    const { projectId, memberId } = obj
    console.log(projectId)
    console.log(memberId)

    let token = localStorage.getItem("token")

    Swal.fire({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    })
        .then(result => {
            if (result.value) {
                Swal.showLoading()
                event.preventDefault()
                $.ajax({
                    url: `${server_url}/projects/${projectId}/removeMember`,
                    method: "POST",
                    data: {
                        memberId
                    },
                    headers: {
                        token
                    }
                })
                    .done(data => {
                        projectDetails(projectId)
                        Swal.close()
                        Swal.fire({
                            type : "success",
                            title : "You have successfully remove this member",
                            showConfirmButton : false,
                            timer : 1500
                        })
                        console.log(data)
                    })
                    .fail(err => {
                        console.log(err)
                        Swal.close()
                        Swal.fire({
                            type : "error",
                            title : "You have failed remove this member",
                            showConfirmButton : false,
                            timer : 1500
                        })
                    })
            }
            else {

            }
        })




}


function getAllUsers() {

    let token = localStorage.getItem("token")

    $.ajax({
        url: `${server_url}/users`,
        method: "GET",
        headers: { token }
    })
        .done(users => {
            let template = ''
            for (let user of users) {
                template += `<option value="${user._id}">${user.username}</option>`
            }
            $("#userlist").prepend(template)
        })
        .fail(err => {
            console.log(err)
        })

}


function addMemberForm(projectId) {

    // console.log(projectId)
    // console.log("masuk ke add member form")
    getAllUsers()
    let template =
        `<div class="modal fade" id="memberModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="memberModaltitle">Add Member</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form >
        <div class="modal-body">
            <select multiple class="form-control" id="userlist">
            </select>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary" data-dismiss="modal" onclick="addMember('${projectId}')">Add member</button>
        </div>
      </form>
      </div>
    </div>
    </div>`
    // console.log("setelah template")
    $("#modaladdmember").html(template)
    // console.log("setelah template 2")
}

function addMember(projectId) {

    let membersId = $("#userlist").val()
    let token = localStorage.getItem("token")

    event.preventDefault()
    Swal.showLoading()
    axios({
        url: `${server_url}/projects/${projectId}/addMember`,
        method: "POST",
        data: { membersId },
        headers: { token }
    })
        .then(response => {
            // console.log(response.data)
            Swal.close()
            Swal.fire({
                type: "success",
                title: "You have successfully added member to this project",
                showConfirmButton: false,
                timer: 1500
            })
            projectDetails(projectId)
        })
        .catch(err => {
            console.log(err)
            Swal.fire({
                type: 'error',
                title: 'You have failed to to added member to this project',
                showConfirmButton: false,
                timer: 1500
            })
        })

}


function addTodoForm(projectId) {

    let template =
        `
    <div class="modal fade" id="templateModalAddTodo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Create Todo</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div id="addTodoModalForm" class="modal-body">
                    <form id="addTodoForm" >
                        <div class="form-group">
                            <label>Title</label>
                            <input type="text" class="form-control" id="addTodoTitle" placeholder="Title"
                                required="true">
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <textarea class="form-control" id="addTodoDescription" rows="3" required="true"
                                placeholder="description"></textarea>
                        </div>
                        <div class="form-group">
                            <label>Due Date</label>
                            <input type="date" class="form-control" id="addTodoDuedate" required="true">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary" data-dismiss="modal" onclick="addTodo('${projectId}')">Submit!</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    `
    $("#modalAddTodo").html(template)
}



function addTodo(projectId) {

    let token = localStorage.getItem("token")

    let name = $('#addTodoTitle').val()
    let description = $('#addTodoDescription').val()
    let duedate = $('#addTodoDuedate').val()
    let ProjectId = projectId
    Swal.showLoading()

    $.ajax({
        url: `${server_url}/todos`,
        method: "POST",
        data: { name, description, duedate, ProjectId },
        headers: { token }
    })
        .done(data => {
            console.log(data)
            Swal.close()
            Swal.fire({
                type: "success",
                title: "You have successfully created new todo in project",
                showConfirmButton: false,
                timer: 1500
            })
            getProjectTodo(projectId)
        })
        .fail(err => {
            console.log(err)
            Swal.close()
            Swal.fire({
                type: "error",
                title: "failed to create new todo in project",
                showConfirmButton: false,
                timer: 1500
            })
        })

}
