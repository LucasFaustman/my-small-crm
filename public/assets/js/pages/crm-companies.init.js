
var idField = document.getElementById("id-field"),
    companyNameField = document.getElementById("companyname-field"),
    companyLogoImg = document.getElementById("companylogo-img"),
    ownerField = document.getElementById("owner-field"),
    industry_typeField = document.getElementById("industry_type-field"),
    star_valueField = document.getElementById("star_value-field"),
    locationField = document.getElementById("location-field"),
    employeeField = document.getElementById("employee-field"),
    websiteField = document.getElementById("website-field"),
    contact_emailField = document.getElementById("contact_email-field"),
    addBtn = document.getElementById("add-btn"),
    editBtn = document.getElementById("edit-btn"),
    removeBtns = document.getElementsByClassName("remove-item-btn"),
    editBtns = document.getElementsByClassName("edit-item-btn");
    viewBtns = document.getElementsByClassName("view-item-btn");
    refreshCallbacks();
document.getElementById("showModal").addEventListener("show.bs.modal", function (e) {
    if (e.relatedTarget.classList.contains("edit-item-btn")) {
        document.getElementById("exampleModalLabel").innerHTML = "Edit Company";
        document.getElementById("showModal").querySelector(".modal-footer").style.display = "block";
        document.getElementById("add-btn").style.display = "none";
        document.getElementById("edit-btn").style.display = "block";
    } else if (e.relatedTarget.classList.contains("add-btn")) {
        document.getElementById("exampleModalLabel").innerHTML = "Add Company";
        document.getElementById("showModal").querySelector(".modal-footer").style.display = "block";
        document.getElementById("edit-btn").style.display = "none";
        document.getElementById("add-btn").style.display = "block";
    } else {
        document.getElementById("exampleModalLabel").innerHTML = "List Company";
        document.getElementById("showModal").querySelector(".modal-footer").style.display = "none";
    }
});

document.getElementById("showModal").addEventListener("hidden.bs.modal", function () {
    clearFields();
});

var table = document.getElementById("customerTable");
// save all tr
var tr = table.getElementsByTagName("tr");
var trlist = table.querySelectorAll(".list tr");

var count = 11;
addBtn.addEventListener("click", async function (e) {
     locationField = document.getElementById('location-field')
    e.preventDefault()
    if (
        companyNameField.value === "" ||
        ownerField.value === "" ||
        industry_typeField.value === "" ||
        star_valueField.value === "" ||
        locationField.value === "" ||
        employeeField.value === "" ||
        websiteField.value === "" ||
        contact_emailField.value === "" 
    ){
        document.getElementById('company-error').innerHTML = 'Please fill out all fields.'
    } else{
        companyName = companyNameField.value
        ownerName = ownerField.value
        industryType = industry_typeField.value
        starValue = star_valueField.value
        locationField = locationField.value
        employeeCount = employeeField.value
        websiteField = websiteField.value
        contactEmail = contact_emailField.value
    try {
            const res = await fetch('/addCompany', {
                method: 'POST',
                body: JSON.stringify({ companyName,
                    ownerName,
                    industryType,
                    starValue,
                    locationField,
                    employeeCount,
                    websiteField,
                    contactEmail }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json()
             if (data.error) { 
                    document.getElementById('company-error').innerHTML = data.error
             }else {
                    document.getElementById("close-modal").click();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Company inserted successfully!',
                        showConfirmButton: false,
                        showCloseButton: true
                    });
                    window.location.reload();
                }
        }
            catch(err) {
                document.getElementById('company-error').innerHTML = 'Server failure. Please try again later.'
            }

    }
});

editBtn.addEventListener("click", async function (e) {
    document.getElementById("exampleModalLabel").innerHTML = "Edit Company";
    websiteField = document.getElementById('website-field')

    if (
        companyNameField.value === "" ||
        ownerField.value === "" ||
        industry_typeField.value === "" ||
        star_valueField.value === "" ||
        locationField.value === "" ||
        employeeField.value === "" ||
        websiteField.value === "" ||
        contact_emailField.value === "" 

    ){
        document.getElementById('company-error').innerHTML = 'Please fill out all fields.'
    } else {

                companyName = companyNameField.value
                ownerName = ownerField.value
                industryType = industry_typeField.value
                starValue = star_valueField.value
                locationField = locationField.value
                employeeCount = employeeField.value
                websiteField = websiteField.value
                contactEmail = contact_emailField.value
            try {
                const res = await fetch('/editCompany', {
                    method: 'PUT',
                    body: JSON.stringify({ id: itemId ,
                        companyName,
                        ownerName,
                        industryType,
                        starValue,
                        locationField,
                        employeeCount,
                        websiteField,
                        contactEmail
                        }),
                    headers: { 'Content-Type': 'application/json' }
                });
                const data = await res.json()
                if (data.error) { 
                    document.getElementById('company-error').innerHTML = data.error
             }else {
                document.getElementById("close-modal").click();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Company updated Successfully!',
                    showConfirmButton: false,
                    timer: 2000,
                    showCloseButton: true
                });
                window.location.reload();
             }
                }
                catch(err) {
                    document.getElementById('company-error').innerHTML = 'Server failure. Please try again later.'
                }
}
});

function refreshCallbacks() {
    Array.from(removeBtns).forEach(async function (btn) {
        btn.addEventListener("click", function (e) {
            e.target.closest("tr").children[1].innerText;
            itemId = e.target.closest("tr").children[0].innerText;
                    document.getElementById("delete-record").addEventListener("click", async function () {
                        refreshCallbacks()
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Company deleted successfully!',
                        showConfirmButton: false,
                        timer: 2000,
                        showCloseButton: true
                    });

                        try {
                            const res = await fetch('/deleteCompany', {                   
                                method: 'DELETE',
                                body: JSON.stringify({ id: itemId }), 
                                headers: { 'Content-Type': 'application/json' }
                            });
                            const data = await res.json()
                if (!data.error) { 
                            document.getElementById("deleteRecordModal").click();
                            window.location.reload();
                         }
                        }
                        catch(err) {
                            document.getElementById('company-error').innerHTML = 'Server failure. Please try again later.'
                        }
                    });
        });
    });

    Array.from(editBtns).forEach( function (btn) {
        btn.addEventListener("click", function (e) {
            e.target.closest("tr").children[1].innerText;
            itemId = e.target.closest("tr").children[0].innerText;
            companyNameField.value = e.target.closest("tr").children[1].innerText;
            ownerField.value = e.target.closest("tr").children[2].innerText;
            ownerField.value.value = e.target.closest("tr").children[2].innerText;
            industry_typeField.value = e.target.closest("tr").children[3].innerText;
            star_valueField.value = e.target.closest("tr").children[4].innerText;
            locationField.value = e.target.closest("tr").children[5].innerText;
            websiteField.value = e.target.closest("tr").children[6].innerText;
            contact_emailField.value = e.target.closest("tr").children[7].innerText;
            employeeField.value = e.target.closest("tr").children[8].innerText;
        });
    });

    Array.from(viewBtns).forEach( function (btn) {
        btn.addEventListener("click", function (e) {
            itemId = e.target.closest("tr").children[0].innerText;
            companyNameField.value = e.target.closest("tr").children[1].innerText;
            ownerField.value = e.target.closest("tr").children[2].innerText;
            ownerField.value.value = e.target.closest("tr").children[2].innerText;
            industry_typeField.value = e.target.closest("tr").children[3].innerText;
            star_valueField.value = e.target.closest("tr").children[4].innerText;
            locationField.value = e.target.closest("tr").children[5].innerText;
            websiteField.value = e.target.closest("tr").children[6].innerText;
            contact_emailField.value = e.target.closest("tr").children[7].innerText;
            employeeField.value = e.target.closest("tr").children[8].innerText;

                    var codeBlock = `
                        <div class="card-body text-center">
                            <h5 class="mt-3 mb-1">${companyNameField.value}</h5>
                            <p class="text-muted">${ownerField.value}</p>

                            <ul class="list-inline mb-0">
                                <li class="list-inline-item avatar-xs">
                                    <a href="https://${websiteField.value}/"
                                        class="avatar-title bg-soft-success text-success fs-15 rounded">
                                        <i class="ri-global-line"></i>
                                    </a>
                                </li>
                                <li class="list-inline-item avatar-xs">
                                    <a href="mailto:${contact_emailField.value}"
                                        class="avatar-title bg-soft-danger text-danger fs-15 rounded">
                                        <i class="ri-mail-line"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive table-card">
                                <table class="table table-borderless mb-0">
                                    <tbody>
                                        <tr>
                                            <td class="fw-medium" scope="row">Industry Type</td>
                                            <td>${industry_typeField.value}</td>
                                        </tr>
                                        <tr>
                                            <td class="fw-medium" scope="row">Location</td>
                                            <td>${locationField.value}</td>
                                        </tr>
                                        <tr>
                                            <td class="fw-medium" scope="row">Employee Count</td>
                                            <td>${employeeField.value}</td>
                                        </tr>
                                        <tr>
                                            <td class="fw-medium" scope="row">Rating</td>
                                            <td>${star_valueField.value} <i class="ri-star-fill text-warning align-bottom"></i></td>
                                        </tr>
                                        <tr>
                                            <td class="fw-medium" scope="row">Website</td>
                                            <td>
                                                <a href="${websiteField.value}"
                                                    class="link-primary text-decoration-underline">${websiteField.value}</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="fw-medium" scope="row">Contact Email</td>
                                            <td>${contact_emailField.value}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    `;
                    document.getElementById('company-view-detail').innerHTML = codeBlock;
                }
        );
    });
}

function clearFields() {
    companyNameField.value = "";
    ownerField.value = "";
    industry_typeField.value = "";
    star_valueField.value = "";
    locationField.value = "";
    employeeField.value = "";
    websiteField.value = "";
    contact_emailField.value = "";
}



