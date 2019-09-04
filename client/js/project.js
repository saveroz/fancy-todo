const server_url = "http://localhost:3000"
let token = localStorage.getItem("token") || null

function getAllProjects(){
    
    $("#projectList").empty()

    axios({
        url : `${server_url}/projects`,
        method : "GET",
        headers : {token}
    })
    .then(response=>{
        // console.log(response)
        let projects = response.data

        for (let project of projects){
            let template =` 
            <div class="col p-3" style="border-bottom: gray 2px solid;">
                    <div>
                            <p style="font-size: 19px;">${project.name}</p>
                    </div>
                    <div>
                            <button class="btn btn-secondary mb-3" onclick="projectDetails('${project._id}')">Project Details</button>
                    </div>
                    <div>       
                        <button class="btn btn-secondary">add member</button>
                        <button class="btn btn-secondary">add todo</button>
                        <button class="btn btn-secondary" onclick="deleteProject('${project._id}')">delete</button>
                    </div>
                    <!-- <hr> -->
                </div>
            `
            $("#projectList").prepend(template)
        }

    })
    .catch(err=>{
        console.log(response)
    })

}

function createProject(){

    let name = $('#inputProjectName').val()
    
    axios({
        url : `${server_url}/projects`,
        method : "POST",
        data : {name},
        headers : {token}
    })
    .then(response=>{
        $('#ModalCreateProject').modal('hide')
        $('#inputProjectName').val(null)
        getAllProjects()
        console.log(response.data)
    })
    .catch(err=>{
        console.log(err)
    })
}

function deleteProject(id){

    axios({
        url : `${server_url}/projects/${id}`,
        method : "DELETE",
        headers : {token}
    })
    .then(response=>{
        console.log(response.data)
        getAllProjects()
    })
    .catch(err=>{
        console.log(err)
    })

} 

function projectDetails(id){

    axios({
        url :`${server_url}/projects/${id}`,
        method :"GET",
        headers : {token}
    })
    .then(response=>{
        // console.log(response.data)
        let theProject = response.data
        let obj = {projectId : id}
        $("#Projectmembers").empty()
        for (let member of theProject.members){
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
    .catch(err=>{
        console.log(err)
    })

}

function removeMember(obj){

    const {projectId, memberId} = obj
    console.log(projectId)
    console.log(memberId)

    axios({
        url : `${server_url}/projects/${projectId}/removeMember`,
        method : "POST",
        data : {
           memberId
        },
        headers : {
            token
        }
    })
    .then(response=>{
        console.log(response.data)
    })
    .catch(err=>{
        console.log(err)
    })

}

function addMember(){





    
}
