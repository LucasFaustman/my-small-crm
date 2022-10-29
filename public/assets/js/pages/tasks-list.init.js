
var idField = document.getElementById("tasksId"),
    tasksTitleField = document.getElementById("taskName-field"),
    clientNameField = document.getElementById("clientName-field"),
    dateDueField = document.getElementById("duedate-field"),
    priorityField = document.getElementById("priority-field"),
    statusField = document.getElementById("ticket-status"),
    addBtn = document.getElementById("add-btn"),
    editBtn = document.getElementById("edit-btn"),
    removeBtns = document.getElementsByClassName("remove-item-btn"),
    editBtns = document.getElementsByClassName("edit-item-btn");
refreshCallbacks();

document.getElementById("showModal").addEventListener("show.bs.modal", function (e) {
    if (e.relatedTarget.classList.contains("edit-item-btn")) {
        document.getElementById("exampleModalLabel").innerHTML = "Edit Task";
        document.getElementById("showModal").querySelector(".modal-footer").style.display = "block";
        document.getElementById("add-btn").style.display = "none";
        document.getElementById("edit-btn").style.display = "block";
    } else if (e.relatedTarget.classList.contains("add-btn")) {
        document.getElementById("exampleModalLabel").innerHTML = "Add Task";
        document.getElementById("showModal").querySelector(".modal-footer").style.display = "block";
        document.getElementById("edit-btn").style.display = "none";
        document.getElementById("add-btn").style.display = "block";
    } else {
        document.getElementById("exampleModalLabel").innerHTML = "List Task";
        document.getElementById("showModal").querySelector(".modal-footer").style.display = "none";
    }
});

document.getElementById("showModal").addEventListener("hidden.bs.modal", function () {
    clearFields();
});

var table = document.getElementById("tasksTable");
// save all tr
var tr = table.getElementsByTagName("tr");
var trlist = table.querySelectorAll(".list tr");

var count = 11;
addBtn.addEventListener("click", async function (e) {
    e.preventDefault();
    if (
       // projectNameField.value !== "" &&
        tasksTitleField.value !== "" &&
        clientNameField.value !== "" &&
        dateDueField.value !== "" &&
        priorityField.value !== "" &&
        statusField.value !== ""
    ) {

        //assign the value of each input of the form to a new variable
        tasksTitleFieldVal = tasksTitleField.value
        clientNameFieldVal = clientNameField.value
        dateDueFieldVal = dateDueField.value,
        priorityFieldVal = priorityField.value
        statusFieldVal = statusField.value

        document.getElementById("close-modal").click();
         clearFields();
        refreshCallbacks();
         count++;
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Task inserted successfully!',
            showConfirmButton: false,
            timer: 2000,
            showCloseButton: true
        });

        try {
            // signify to the server this is a post request to our database, and include the all inputs of task stringified to an object to pass onto the db
            const res = await fetch('/addTaskItem', {
                method: 'POST',
                body: JSON.stringify({ tasksTitleFieldVal,
                    clientNameFieldVal,
                    dateDueFieldVal,
                    priorityFieldVal,
                    statusFieldVal }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = res
            console.log(data)
            if (data) 
            window.location.reload();
        }
            catch(err) {
                console.log(err)
            }



    }
});

editBtn.addEventListener("click", async function (e) {
    document.getElementById("exampleModalLabel").innerHTML = "Edit Order";
    

    if (
        tasksTitleField.value !== "" &&
        clientNameField.value !== "" &&
        dateDueField.value !== "" &&
        priorityField.value !== "" &&
        statusField.value !== ""
    ) {


    


       
            tasksTitleFieldVal = tasksTitleField.value,
            clientNameFieldVal = clientNameField.value,
            dateDueFieldVal = dateDueField.value,
            statusFieldVal = statusField.value,
            priorityFieldVal = priorityField.value
            console.log(dateDueFieldVal)

            
        
            try {
                const res = await fetch('/editTaskItem', {
                    //update request
                    method: 'PUT',
                    body: JSON.stringify({ id: itemId , //get all the values from the form and send off to the server
                        tasksTitleFieldVal,
                        clientNameFieldVal,
                        dateDueFieldVal,
                        priorityFieldVal,
                        statusFieldVal}),
                    headers: { 'Content-Type': 'application/json' }
                });
                const data = res
                
                console.log(data)
    
                
            }
            catch (err) {
                console.log(err)
            }   
        
    document.getElementById("close-modal").click();
     window.location.reload();
    clearFields();
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Task updated Successfully!',
        showConfirmButton: false,
        timer: 2000,
        showCloseButton: true
    });

}

});




function ischeckboxcheck() {
    Array.from(document.getElementsByName("checkAll")).forEach(function (x) {
        x.addEventListener("click", function (e) {
            if (e.target.checked) {
                e.target.closest("tr").classList.add("table-active");
            } else {
                e.target.closest("tr").classList.remove("table-active");
            }
        });
    });
}



function refreshCallbacks() {
    Array.from(removeBtns).forEach(async function (btn) {
        btn.addEventListener("click", function (e) {
            e.target.closest("tr").children[1].innerText;
            itemId = e.target.closest("tr").children[0].innerText;

                    document.getElementById("delete-record").addEventListener("click", async function () {

                        try {
                            //fetch the deleteTaskItem route
                            const res = await fetch('/deleteTaskItem', {
                                //delete method
                                method: 'DELETE',
                                body: JSON.stringify({ id: itemId , deletedTaskCount: 1}), //stringify the item id and send it off
                                headers: { 'Content-Type': 'application/json' }
                            });
                            const data = await res
                            console.log(data)

                            
                        }
                        catch (err) {
                            console.log(err)
                        }   
                        document.getElementById("deleteOrder").click();
                        window.location.reload();

                    });
        });
    });

    Array.from(editBtns).forEach(function (btn) {
        btn.addEventListener("click", function (e) {


            e.target.closest("tr").children[1].innerText;
            itemId = e.target.closest("tr").children[0].innerText;
            tasksTitleField.value = e.target.closest("tr").children[1].innerText;
            clientNameField.value = e.target.closest("tr").children[2].innerText;
            dateDueField.value = e.target.closest("tr").children[3].innerText;
            statusField.value = e.target.closest("tr").children[4].innerText.charAt(0).toUpperCase() + e.target.closest("tr").children[4].innerText.slice(1).toLowerCase();
            priorityField.value = e.target.closest("tr").children[5].innerText.charAt(0).toUpperCase() + e.target.closest("tr").children[5].innerText.slice(1).toLowerCase()
                
        });
    });

}

function clearFields() {
    tasksTitleField.value = "";
    clientNameField.value = "";
    dateDueField.value = "";
}


function isStatus(val) {
    switch (val) {
        case "Pending":
            return ('<span class="badge badge-soft-warning text-uppercase">' + val + "</span>");
        case "Inprogress":
            return ('<span class="badge badge-soft-secondary text-uppercase">' + val + "</span>");
        case "Completed":
            return ('<span class="badge badge-soft-success text-uppercase">' + val + "</span>");
        case "New":
            return ('<span class="badge badge-soft-info text-uppercase">' + val + "</span>");
    }
}

function isPriority(val) {
    switch (val) {
        case "High":
            return ('<span class="badge bg-danger text-uppercase">' + val + "</span>");
        case "Low":
            return ('<span class="badge bg-success text-uppercase">' + val + "</span>");
        case "Medium":
            return ('<span class="badge bg-warning text-uppercase">' + val + "</span>");
    }
}


