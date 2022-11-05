var idField = document.getElementById("id-field"),
    leadNameField = document.getElementById("leadname-field"),
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
        document.getElementById("exampleModalLabel").innerHTML = "Edit Contact";
        document.getElementById("showModal").querySelector(".modal-footer").style.display = "block";
        document.getElementById("add-btn").style.display = "none";
        document.getElementById("edit-btn").style.display = "block";
    } else if (e.relatedTarget.classList.contains("add-btn")) {
        document.getElementById("exampleModalLabel").innerHTML = "Add Contact";
        document.getElementById("showModal").querySelector(".modal-footer").style.display = "block";
        document.getElementById("edit-btn").style.display = "none";
        document.getElementById("add-btn").style.display = "block";
    } else {
        document.getElementById("exampleModalLabel").innerHTML = "List Lead";
        document.getElementById("showModal").querySelector(".modal-footer").style.display = "none";
    }
});

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
        leadNameField.value === "" ||
        company_nameField.value === "" ||
        dateField.value === "" ||
        leads_scoreField.value === "" ||
        phoneField.value === "" ||
        locationField.value === ""
    ) {
        document.getElementById('contact-errors').innerHTML = 'Please fill out all fields.'

    } 
    
    else{

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
            const data = await res.json()
            if (data.error) { 
                document.getElementById('contact-errors').innerHTML = data.error
            } else {
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
                window.location.reload();
            }
            
        }
            catch(err) {
                console.log(err)
            }

    } 
});


editBtn.addEventListener("click", async function (e) {
    document.getElementById("exampleModalLabel").innerHTML = "Edit Contact";


    if (
        leadNameField.value === "" ||
        company_nameField.value === "" ||
        dateField.value === "" ||
        leads_scoreField.value === "" ||
        phoneField.value === "" ||
        locationField.value === ""
    ) {
        document.getElementById('contact-errors').innerHTML = 'Please fill out all fields.'

    } 
    
    else{



        var tagInputFieldValue = tagInputField.getValue(true);
        var tagHtmlValue = '';
        Array.from(tagInputFieldValue).forEach((tag, index) => {
            tagHtmlValue += '<span class="badge badge-soft-primary me-1">' + tag + '</span>'
        })

            leadNameField = leadNameField.value 
        company_nameField = company_nameField.value 
        dateField = dateField.value 
        leads_scoreField = leads_scoreField.value  
        phone = phoneField.value 
        locationField = locationField.value 

        try {
            const res = await fetch('/editLead', {
                method: 'PUT',
                body: JSON.stringify({ id: itemId , 
                    leadNameField,
                    company_nameField,
                    dateField,
                    leads_scoreField,
                    phone,
                    locationField,
                    tagInputFieldValue}),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json()
            if (data.error) { 
                document.getElementById('contact-errors').innerHTML = data.error
            } else {
                document.getElementById("close-modal").click();
                clearFields();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Lead updated Successfully!',
                    showConfirmButton: false,
                    timer: 2000,
                    showCloseButton: true
                });
                window.location.reload();
            }

            }
            catch(err) {
                console.log(err)
            }
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
                            const res = await fetch('/deleteLead', {
                                method: 'DELETE',
                                body: JSON.stringify({ id: itemId }), 
                                headers: { 'Content-Type': 'application/json' }
                            });
                            const data = await res.json()
                            if (data.error) { 
                                document.getElementById('contact-errors').innerHTML = data.error
                            } else {
                                document.getElementById("deleteRecordModal").click();
                                window.location.reload();
                            }
                            
                        }
                        catch (err) {
                            console.log(err)
                        }   
                    });
        });
    });

    Array.from(editBtns).forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            itemId = e.target.closest("tr").children[0].innerText;
            leadNameField.value = e.target.closest("tr").children[1].innerText;
            company_nameField.value = e.target.closest("tr").children[2].innerText;
            leads_scoreField.value = e.target.closest("tr").children[3].innerText;
            phoneField.value = e.target.closest("tr").children[4].innerText;
            locationField.value = e.target.closest("tr").children[5].innerText;
            let tagBadge = e.target.closest("tr").children[6].innerText.split(' ')
            if(tagBadge){
                Array.from(tagBadge).forEach((item) => {
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

