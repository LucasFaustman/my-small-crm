/*
Template Name: Velzon - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: CRM-leads Js File
*/



var idField = document.getElementById("id-field"),
    leadNameField = document.getElementById("leadname-field"),
    // leadImg = document.getElementById("lead-img"),
    company_nameField = document.getElementById("company_name-field"),
    dateField = document.getElementById("date-field"),
    leads_scoreField = document.getElementById("leads_score-field"),
    phoneField = document.getElementById("phone-field"),
    locationField = document.getElementById("location-field"),
    addBtn = document.getElementById("add-btn"),
    editBtn = document.getElementById("edit-btn"),
    removeBtns = document.getElementsByClassName("remove-item-btn"),
    editBtns = document.getElementsByClassName("edit-item-btn");
    taskDetailsBtn = document.getElementsByClassName("task-details-btn")
refreshCallbacks();

document.getElementById("showModal").addEventListener("show.bs.modal", function (e) {
    if (e.relatedTarget.classList.contains("edit-item-btn")) {
        document.getElementById("exampleModalLabel").innerHTML = "Edit Lead";
        document.getElementById("showModal").querySelector(".modal-footer").style.display = "block";
        document.getElementById("add-btn").style.display = "none";
        document.getElementById("edit-btn").style.display = "block";
    } else if (e.relatedTarget.classList.contains("add-btn")) {
        document.getElementById("exampleModalLabel").innerHTML = "Add Lead";
        document.getElementById("showModal").querySelector(".modal-footer").style.display = "block";
        document.getElementById("edit-btn").style.display = "none";
        document.getElementById("add-btn").style.display = "block";
    } else {
        document.getElementById("exampleModalLabel").innerHTML = "List Lead";
        document.getElementById("showModal").querySelector(".modal-footer").style.display = "none";
    }
});
// ischeckboxcheck();

document.getElementById("showModal").addEventListener("hidden.bs.modal", function () {
    clearFields();
});

document.querySelector("#leadsList").addEventListener("click", function () {
    refreshCallbacks();
    ischeckboxcheck();
});

var table = document.getElementById("customerTable");
// save all tr
var tr = table.getElementsByTagName("tr");
var trlist = table.querySelectorAll(".list tr");


var tagInputField = new Choices('#taginput-choices', {
    removeItemButton: true,
  }
);

var tagInputFieldValue = tagInputField.getValue(true);
var tagHtmlValue = '';
Array.from(tagInputFieldValue).forEach((tag, index) => {
  tagHtmlValue += '<span class="badge badge-soft-primary me-1">'+tag+'</span>'
})

addBtn.addEventListener("click", async function (e) {
    e.preventDefault();
    if (
        leadNameField.value !== "" &&
        company_nameField.value !== "" &&
        dateField.value !== "" &&
        leads_scoreField.value !== "" &&
        phoneField.value !== "" &&
        locationField.value !== ""
    ) {

        leadNameField = leadNameField.value 
        company_nameField = company_nameField.value 
        dateField = dateField.value 
        leads_scoreField = leads_scoreField.value  
        phone = phoneField.value 
        locationField = locationField.value 
        
        var tagInputFieldValue = tagInputField.getValue(true);
        var tagHtmlValue = '';
        Array.from(tagInputFieldValue).forEach((tag, index) => {
            tagHtmlValue += '<span class="badge badge-soft-primary me-1">' + tag + '</span>'
        })

        document.getElementById("close-modal").click();
        clearFields();
        refreshCallbacks();
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Lead inserted successfully!',
            showConfirmButton: false,
            timer: 2000,
            showCloseButton: true
        });

        try {
            // signify to the server this is a post request to our database, and include the all inputs of task stringified to an object to pass onto the db
            const res = await fetch('/addLead', {
                method: 'POST',
                body: JSON.stringify({ leadNameField,
                    company_nameField,
                    dateField,
                    leads_scoreField,
                    phone,
                    locationField,
                    tagInputFieldValue }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res
            console.log(data)
            window.location.reload();
        }
            catch(err) {
                console.log(err)
            }


    }

    
});


editBtn.addEventListener("click", async function (e) {
    document.getElementById("exampleModalLabel").innerHTML = "Edit Contact";
    
        // isid = new DOMParser().parseFromString(x._values.id, "text/html");
        // var selectedid = isid.body.firstElementChild.innerHTML;

        var tagInputFieldValue = tagInputField.getValue(true);
        var tagHtmlValue = '';
        Array.from(tagInputFieldValue).forEach((tag, index) => {
            tagHtmlValue += '<span class="badge badge-soft-primary me-1">' + tag + '</span>'
        })
        // if (selectedid == itemId) {

            leadNameField = leadNameField.value 
        company_nameField = company_nameField.value 
        dateField = dateField.value 
        leads_scoreField = leads_scoreField.value  
        phone = phoneField.value 
        locationField = locationField.value 

        console.log(dateField)

        try {
            const res = await fetch('/editLead', {
                //update request
                method: 'PUT',
                body: JSON.stringify({ id: itemId , //get all the values from the form and send off to the server
                    leadNameField,
                    company_nameField,
                    dateField,
                    leads_scoreField,
                    phone,
                    locationField,
                    tagInputFieldValue}),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res
            
            console.log(data)

            if (res.redirect) {
                document.location.href = res.render
            }

            }
            catch(err) {
                console.log(err)
            }

    document.getElementById("close-modal").click();
    window.location.reload();
    clearFields();
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Lead updated Successfully!',
        showConfirmButton: false,
        timer: 2000,
        showCloseButton: true
    });

    
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
                            //fetch the deleteLead route
                            const res = await fetch('/deleteLead', {
                                //delete method
                                method: 'DELETE',
                                body: JSON.stringify({ id: itemId }), //stringify the item id and send it off
                                headers: { 'Content-Type': 'application/json' }
                            });
                            const data = await res
                            console.log(data.body)
                    
                        }
                        catch (err) {
                            console.log(err)
                        }   

                        document.getElementById("deleteRecordModal").click();
                        window.location.reload();
                    });
        });
    });

    Array.from(editBtns).forEach(function (btn) {
        btn.addEventListener("click", function (e) {

            itemId = e.target.closest("tr").children[0].innerText;

            // when editing a lead, get value from dom and input it into the form so users can easily update a lead
            leadNameField.value = e.target.closest("tr").children[1].innerText;
            company_nameField.value = e.target.closest("tr").children[2].innerText;
            leads_scoreField.value = e.target.closest("tr").children[3].innerText;
            phoneField.value = e.target.closest("tr").children[4].innerText;
            locationField.value = e.target.closest("tr").children[5].innerText;

            //our tag badge
            let tagBadge = e.target.closest("tr").children[6].innerText.split(' ')
            //if there are tags
            if(tagBadge){
                //get the array and for eacdh element
                Array.from(tagBadge).forEach((item) => {
                    //set tag input field to each element of array
                    tagInputField.setChoiceByValue(e.target.closest("tr").children[6].innerText.split(' '));
                })
            }

            dateField.value = e.target.closest("tr").children[7].innerText;
                    
                    
                
        });
    });
}

function clearFields() {
    leadNameField.value = "";
    company_nameField.value = "";
    dateField.value = "";
    leads_scoreField.value = "";
    phoneField.value = "";
    locationField.value = "";
    tagInputField.removeActiveItems();
    tagInputField.setChoiceByValue("0");
}

