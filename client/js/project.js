
function getAllProjects() {

    $("#projectList").empty()

    axios({
        url: `${server_url}/projects`,
        method: "GET",
        headers: { token }
    })
        .then(response => {
            // console.log(response)
            let projects = response.data

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
        .catch(err => {
            console.log(response)
        })

}

function createProject() {

    let name = $('#inputProjectName').val()

    axios({
        url: `${server_url}/projects`,
        method: "POST",
        data: { name },
        headers: { token }
    })
        .then(response => {
            $('#ModalCreateProject').modal('hide')
            $('#inputProjectName').val(null)
            getAllProjects()
            console.log(response.data)
        })
        .catch(err => {
            console.log(err)
        })
}

function deleteProject(id) {

    axios({
        url: `${server_url}/projects/${id}`,
        method: "DELETE",
        headers: { token }
    })
        .then(response => {
            console.log(response.data)
            getAllProjects()
        })
        .catch(err => {
            console.log(err)
        })

}


function getProjectTodo(id){
    axios({
        url: `${server_url}/todos/projects/${id}`,
        method: "GET",
        headers: { token }
    })
        .then(response => {
            $("#todoProjectList").empty()
            // console.log(response.data)
            let todosProjects = response.data

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
        .catch(err => {
            console.log(err)
        })
}









function projectDetails(id) {

    getProjectTodo(id)

    axios({
        url: `${server_url}/projects/${id}`,
        method: "GET",
        headers: { token }
    })
        .then(response => {
            // console.log(response.data)
            let theProject = response.data
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
        .catch(err => {
            console.log(err)
        })

}

function removeMember(obj) {

    const { projectId, memberId } = obj
    console.log(projectId)
    console.log(memberId)

    event.preventDefault()
    axios({
        url: `${server_url}/projects/${projectId}/removeMember`,
        method: "POST",
        data: {
            memberId
        },
        headers: {
            token
        }
    })
        .then(response => {
            projectDetails(projectId)
            console.log(response.data)
        })
        .catch(err => {
            console.log(err)
        })

}


function getAllUsers() {

    axios({
        url: `${server_url}/users`,
        method: "GET",
        headers: { token }
    })
        .then(response => {
            // console.log(response.data)
            const users = response.data
            let template = ''
            for (let user of users) {
                template += `<option value="${user._id}">${user.username}</option>`
            }
            $("#userlist").prepend(template)
        })
        .catch(err => {
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

    // console.log(projectId)

    let membersId = $("#userlist").val()

    event.preventDefault()
    axios({
        url: `${server_url}/projects/${projectId}/addMember`,
        method: "POST",
        data: { membersId },
        headers: { token }
    })
        .then(response => {
            console.log(response.data)
            projectDetails(projectId)
        })
        .catch(err => {
            console.log(err)
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

    let name = $('#addTodoTitle').val()
    let description = $('#addTodoDescription').val()
    let duedate = $('#addTodoDuedate').val()
    let ProjectId = projectId
    axios({
        url: `${server_url}/todos`,
        method: "POST",
        data: { name, description, duedate, ProjectId },
        headers: { token }
    })
        .then(response => {
            getProjectTodo(projectId)
            console.log(response.data)
        })
        .catch(err => {
            console.log(err)
        })
}
