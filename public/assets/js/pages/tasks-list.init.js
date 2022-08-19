/*
Template Name: Velzon - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: Tasks-list init js
*/


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
var perPage = 8;

//Table
var options = {
    valueNames: [
        "id",
       // "project_name",
        "tasks_name",
        "client_name",
        //"assignedto",
        "due_date",
        "status",
        "priority",
    ],
    page: perPage,
    pagination: true,
    plugins: [
        ListPagination({
            left: 2,
            right: 2,
        }),
    ],
};

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

// const xhttp = new XMLHttpRequest();
// xhttp.onload = function () {
//     var json_records = JSON.parse(this.responseText);
//     Array.from(json_records).forEach(function (raw) {
//         var imgHtml = `<div class="avatar-group">`;
//         // Array.from(raw.assignedto).forEach(function (img) {
//         //     imgHtml += `
//         //         <a href="javascript: void(0);" class="avatar-group-item" data-img="${img}" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Username">
//         //             <img src="assets/images/users/${img}" alt="" class="rounded-circle avatar-xxs" />
//         //         </a>
//         //     `;
//         // });
//         // imgHtml += `</div>`;
//         tasksList.add({
//             id: '<a href="apps-tasks-details" class="fw-medium link-primary">#VLZ' + raw.id + "</a>",
//             // project_name: '<a href="apps-projects-overview" class="fw-medium link-primary">' + raw.project_name + "</a>",
//             tasks_name: raw.tasks_name,
//             client_name: raw.client_name,
//             // assignedto: imgHtml,
//             due_date: raw.due_date,
//             status: isStatus(raw.status),
//             priority: isPriority(raw.priority)
//         });
//         tasksList.sort('id', { order: "desc" });
//         refreshCallbacks();
//     });
//     tasksList.remove("id", `<a href="apps-tasks-details" class="fw-medium link-primary">#VLZ501</a>`);
// }


isCount = new DOMParser().parseFromString(
    tasksList.items.slice(-1)[0]._values.id,
    "text/html"
);

// var isValue = isCount.body.firstElementChild.innerHTML;

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
refreshCallbacks();
//filterOrder("All");

function filterOrder(isValue) {
    var values_status = isValue;
    tasksList.filter(function (data) {
        var statusFilter = false;
        matchData = new DOMParser().parseFromString(
            data.values().status,
            "text/html"
        );
        var status = matchData.body.firstElementChild.innerHTML;
        if (status == "All" || values_status == "All") {
            statusFilter = true;
        } else {
            statusFilter = status == values_status;
        }
        return statusFilter;
    });
    tasksList.update();
}

function updateList() {
    var values_status = document.querySelector(
        "input[name=status]:checked"
    ).value;

    data = userList.filter(function (item) {
        var statusFilter = false;

        if (values_status == "All") {
            statusFilter = true;
        } else {
            statusFilter = item.values().sts == values_status;
        }
        return statusFilter;
    });

    userList.update();
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

document.getElementById("showModal").addEventListener("hidden.bs.modal", function () {
    clearFields();
});

document.querySelector("#tasksList").addEventListener("click", function () {
    refreshCallbacks();
    ischeckboxcheck();
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
            const data = res.json()
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
                const data = res.json()
                
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


// var example = new Choices(priorityField, {
//     searchEnabled: false,
// });

// var statusVal = new Choices(statusField, {
//     searchEnabled: false,
// });

// function SearchData() {
//     var isstatus = document.getElementById("idStatus").value;
//     var pickerVal = document.getElementById("demo-datepicker").value;

//     var date1 = pickerVal.split(" to ")[0];
//     var date2 = pickerVal.split(" to ")[1];

//     tasksList.filter(function (data) {
//         matchData = new DOMParser().parseFromString(
//             data.values().status,
//             "text/html"
//         );
//         var status = matchData.body.firstElementChild.innerHTML;
//         var statusFilter = false;
//         var dateFilter = false;

//         if (status == "all" || isstatus == "all") {
//             statusFilter = true;
//         } else {
//             statusFilter = status == isstatus;
//         }

//         if (
//             new Date(data.values().due_date.slice(0, 12)) >= new Date(date1) &&
//             new Date(data.values().due_date.slice(0, 12)) <= new Date(date2)
//         ) {
//             dateFilter = true;
//         } else {
//             dateFilter = false;
//         }

//         if (statusFilter && dateFilter) {
//             return statusFilter && dateFilter;
//         } else if (statusFilter && pickerVal == "") {
//             return statusFilter;
//         } else if (dateFilter && pickerVal == "") {
//             return dateFilter;
//         }
//     });
//     tasksList.update();
// }

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
            var itemValues = tasksList.get({
                id: itemId,
            });
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

document.querySelector(".pagination-next").addEventListener("click", function () {
    document.querySelector(".pagination.listjs-pagination") ?
        document.querySelector(".pagination.listjs-pagination").querySelector(".active") ?
        document.querySelector(".pagination.listjs-pagination").querySelector(".active").nextElementSibling.children[0].click() : "" : "";
});

document.querySelector(".pagination-prev").addEventListener("click", function () {
    document.querySelector(".pagination.listjs-pagination") ?
        document.querySelector(".pagination.listjs-pagination").querySelector(".active") ?
        document.querySelector(".pagination.listjs-pagination").querySelector(".active").previousSibling.children[0].click() : "" : "";
});

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


