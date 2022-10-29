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



addBtn.addEventListener("click", async function (e) {
        e.preventDefault();
        if (
            tasksTitleField.value !== "" &&
            clientNameField.value !== "" &&
            dateDueField.value !== "" &&
            priorityField.value !== "" &&
            statusField.value !== ""
        ) {
                tasksTitleFieldVal = tasksTitleField.value
            clientNameFieldVal = clientNameField.value
            dateDueFieldVal = dateDueField.value,
            priorityFieldVal = priorityField.value
            statusFieldVal = statusField.value

            document.getElementById("close-modal").click();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Task inserted successfully!',
                showConfirmButton: false,
                timer: 2000,
                showCloseButton: true
            });
    
            try {
                const res = await fetch('/addTaskItem', {
                    method: 'POST',
                    body: JSON.stringify({ tasksTitleFieldVal,
                        clientNameFieldVal,
                        dateDueFieldVal,
                        priorityFieldVal,
                        statusFieldVal }),
                    headers: { 'Content-Type': 'application/json' }
                });
                const data = await res
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
        var editValues = tasksList.get({
            id: idField.value,
        });
        if (
            tasksTitleField.value !== "" &&
            clientNameField.value !== "" &&
            dateDueField.value !== "" &&
            priorityField.value !== "" &&
            statusField.value !== ""
        ) {
        Array.from(editValues).forEach(async function (x) {
            isid = new DOMParser().parseFromString(x._values.id, "text/html");    
                tasksTitleFieldVal = tasksTitleField.value,
                clientNameFieldVal = clientNameField.value,
                dateDueFieldVal = dateDueField.value,
                statusFieldVal = statusField.value,
                priorityFieldVal = priorityField.value
                try {
                    const res = await fetch('/editTaskItem', {
                        method: 'PUT',
                        body: JSON.stringify({ id: itemId , 
                            tasksTitleFieldVal,
                            clientNameFieldVal,
                            dateDueFieldVal,
                            priorityFieldVal,
                            statusFieldVal}),
                        headers: { 'Content-Type': 'application/json' }
                    });
                    const data = await res
                    
                    console.log(data)
                }
                catch (err) {
                    console.log(err)
                }   
        });
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