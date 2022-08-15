/*
Template Name: Velzon - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Project overview init js


*/

// Init list
var tasksList = new List("tasksList", options).on("updated", function (list) {
    list.matchingItems.length == 0 ?
        (document.getElementsByClassName("noresult")[0].style.display = "block") :
        (document.getElementsByClassName("noresult")[0].style.display = "none");
    var isFirst = list.i == 1;
    var isLast = list.i > list.matchingItems.length - list.page;
    // make the Prev and Nex buttons disabled on first and last pages accordingly
    document.querySelector(".pagination-prev.disabled") ?
        document.querySelector(".pagination-prev.disabled").classList.remove("disabled") : "";
    document.querySelector(".pagination-next.disabled") ?
        document.querySelector(".pagination-next.disabled").classList.remove("disabled") : "";
    if (isFirst)
        document.querySelector(".pagination-prev").classList.add("disabled");
    if (isLast)
        document.querySelector(".pagination-next").classList.add("disabled");
    if (list.matchingItems.length <= perPage)
        document.querySelector(".pagination-wrap").style.display = "none";
    else
        document.querySelector(".pagination-wrap").style.display = "flex";
    if (list.matchingItems.length == perPage)
        document.querySelector(".pagination.listjs-pagination").firstElementChild.children[0].click()
    if (list.matchingItems.length > 0)
        document.getElementsByClassName("noresult")[0].style.display = "none";
    else
        document.getElementsByClassName("noresult")[0].style.display = "block";
});

var checkAll = document.getElementById("checkAll");
if (checkAll) {
    checkAll.onclick = function () {
        var checkboxes = document.querySelectorAll('.form-check-all input[type="checkbox"]');
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = this.checked;
            if (checkboxes[i].checked) {
                checkboxes[i].closest("tr").classList.add("table-active");
            } else {
                checkboxes[i].closest("tr").classList.remove("table-active");
            }
        }
    };
}

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
   // assignedtoNameField = 'Demo Assign', //document.getElementById("assignedtoName-field"),
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
            // clearFields();
            // count++;
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
                const data = await res
                if (data) 
                window.location.reload();
            }
                catch(err) {
                    console.log(err)
                }
    
    
    
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
