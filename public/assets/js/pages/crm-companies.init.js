/*
Template Name: Velzon - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: CRM-companies Js File
*/


// list js
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
        "name",
        "owner",
        "industry_type",
        "star_value",
        "location",
        "employee",
        "website",
        "contact_email",
        "since",
        // { attr: "src", name: "image_src" }
    ],
    page: perPage,
    pagination: true,
    plugins: [
        ListPagination({
            left: 2,
            right: 2
        })
    ]
};
// Init list
var companyList = new List("companyList", options).on("updated", function (list) {
    list.matchingItems.length == 0 ?
        (document.getElementsByClassName("noresult")[0].style.display = "block") :
        (document.getElementsByClassName("noresult")[0].style.display = "none");
    var isFirst = list.i == 1;
    var isLast = list.i > list.matchingItems.length - list.page;
    // make the Prev and Nex buttons disabled on first and last pages accordingly
    (document.querySelector(".pagination-prev.disabled")) ? document.querySelector(".pagination-prev.disabled").classList.remove("disabled"): '';
    (document.querySelector(".pagination-next.disabled")) ? document.querySelector(".pagination-next.disabled").classList.remove("disabled"): '';
    if (isFirst) {
        document.querySelector(".pagination-prev").classList.add("disabled");
    }
    if (isLast) {
        document.querySelector(".pagination-next").classList.add("disabled");
    }
    if (list.matchingItems.length <= perPage) {
        document.querySelector(".pagination-wrap").style.display = "none";
    } else {
        document.querySelector(".pagination-wrap").style.display = "flex";
    }

    if (list.matchingItems.length > 0) {
        document.getElementsByClassName("noresult")[0].style.display = "none";
    } else {
        document.getElementsByClassName("noresult")[0].style.display = "block";
    }
});

// const xhttp = new XMLHttpRequest();
// xhttp.onload = function () {
//     var json_records = JSON.parse(this.responseText);
//     Array.from(json_records).forEach(function (raw){
//         companyList.add({
//             id: '<a href="javascript:void(0);" class="fw-medium link-primary">#VZ' + raw.id + "</a>",
//             name: raw.name,
//             owner: raw.owner,
//             industry_type: raw.industry_type,
//             star_value: raw.star_value,
//             location: raw.location,
//             employee: raw.employee,
//             website: raw.website,
//             contact_email: raw.contact_email,
//             since: raw.since,
//             // image_src: raw.image_src
//         });
//         companyList.sort('id', { order: "desc" });
//         refreshCallbacks();
//     });
//     companyList.remove("id", `<a href="javascript:void(0);" class="fw-medium link-primary">#VZ001</a>`);
// }
// xhttp.open("GET", "assets/json/company-list.json");
// xhttp.send();

// isCount = new DOMParser().parseFromString(
//     companyList.items.slice(-1)[0]._values.id,
//     "text/html"
// );

// customer image
// document.querySelector("#company-logo-input").addEventListener("change", function () {
//     var preview = document.querySelector("#companylogo-img");
//     var file = document.querySelector("#company-logo-input").files[0];
//     var reader = new FileReader();
//     reader.addEventListener("load",function () {
//         preview.src = reader.result;
//     },false);
//     if (file) {
//         reader.readAsDataURL(file);
//     }
// });

// var isValue = isCount.body.firstElementChild.innerHTML;

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
ischeckboxcheck();

document.getElementById("showModal").addEventListener("hidden.bs.modal", function () {
    clearFields();
});

document.querySelector("#companyList").addEventListener("click", function () {
    refreshCallbacks();
    ischeckboxcheck();
});

var table = document.getElementById("customerTable");
// save all tr
var tr = table.getElementsByTagName("tr");
var trlist = table.querySelectorAll(".list tr");

var count = 11;
addBtn.addEventListener("click", async function (e) {
    if (
        companyNameField.value !== "" &&
        ownerField.value !== "" &&
        industry_typeField.value !== "" &&
        star_valueField.value !== "" &&
        locationField.value !== "" &&
        employeeField.value !== "" &&
        websiteField.value !== "" &&
        contact_emailField.value !== "" 

    ) {

        companyName = companyNameField.value
        ownerName = ownerField.value
        industryType = industry_typeField.value
        starValue = star_valueField.value
        locationField = locationField.value
        employeeCount = employeeField.value
        websiteField = websiteField.value
        contactEmail = contact_emailField.value

        console.log(ownerField.value)
        console.log(companyName)




        companyList.add({
            id: '<a href="javascript:void(0);" class="fw-medium link-primary">#VZ' + count + "</a>",
            // image_src: companyLogoImg.src,
            name: companyNameField.value,
            owner: ownerField.value,
            industry_type: industry_typeField.value,
            star_value: star_valueField.value,
            location: locationField.value,
            employee: employeeField.value,
            website: websiteField.value,
            contact_email: contact_emailField.value,
            
            // since: sinceField.value
            
        });
        companyList.sort('id', { order: "desc" });
        document.getElementById("close-modal").click();
        clearFields();
        refreshCallbacks();
        count++;
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Company inserted successfully!',
            showConfirmButton: false,
            timer: 2000,
            showCloseButton: true
        });


        try {
            // signify to the server this is a post request to our database, and include the all inputs of task stringified to an object to pass onto the db
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
    document.getElementById("exampleModalLabel").innerHTML = "Edit Company";
    var editValues = companyList.get({
        id: idField.value,
    });
    Array.from(editValues).forEach(async function (x) {
        isid = new DOMParser().parseFromString(x._values.id, "text/html");
        var selectedid = isid.body.firstElementChild.innerHTML;
        if (selectedid == itemId) {
        
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
                    //update request
                    method: 'PUT',
                    body: JSON.stringify({ id: itemId , //get all the values from the form and send off to the server
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
                const data = await res

                window.location.reload();
                
                console.log(data)
    
    
                }
                catch(err) {
                    console.log(err)
                }



            
            x.values({
                id: `<a href="javascript:void(0);" class="fw-medium link-primary">${idField.value}</a>`,
                name: companyNameField.value,
                owner: ownerField.value,
                industry_type: industry_typeField.value,
                star_value: star_valueField.value,
                location: locationField.value,
                employee: employeeField.value,
                website: websiteField.value,
                contact_email: contact_emailField.value,
            });
        }
    });
    document.getElementById("close-modal").click();
    clearFields();
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Company updated Successfully!',
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
            var itemValues = companyList.get({
                id: itemId,
            });

            // Array.from(itemValues).forEach(async function (x) {
            //     deleteid = new DOMParser().parseFromString(x._values.id, "text/html");

            //     var isElem = deleteid.body.firstElementChild;
            //     var isdeleteid = deleteid.body.firstElementChild.innerHTML;

            //     if (isdeleteid == itemId) {
                    document.getElementById("delete-record").addEventListener("click", async function () {

                        try {
                            //fetch the deletecompany route
                            const res = await fetch('/deleteCompany', {
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
                        // companyList.remove("id", isElem.outerHTML);
                        document.getElementById("deleteRecordModal").click();
                        window.location.reload();
                    });
                // }
            // });
        });
    });

    Array.from(editBtns).forEach( function (btn) {
        btn.addEventListener("click", function (e) {
            //get all the values of the dataset to plug into the form when needing to edit
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
            //get all the values of the data set to plug into the card
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
                                    <a href="${websiteField.value}"
                                        class="avatar-title bg-soft-success text-success fs-15 rounded">
                                        <i class="ri-global-line"></i>
                                    </a>
                                </li>
                                <li class="list-inline-item avatar-xs">
                                    <a href="javascript:void(0);"
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
    // companyLogoImg.src = "assets/images/users/multi-user.jpg";
    companyNameField.value = "";
    ownerField.value = "";
    industry_typeField.value = "";
    star_valueField.value = "";
    locationField.value = "";
    employeeField.value = "";
    websiteField.value = "";
    contact_emailField.value = "";
    // sinceField.value = "";
}

// Delete Multiple Records
function deleteMultiple(){
    ids_array = [];
    var items = document.getElementsByName('chk_child');
    for (i = 0; i < items.length; i++) {
        if (items[i].checked == true) {
            var trNode = items[i].parentNode.parentNode.parentNode;
            var id = trNode.querySelector("td a").innerHTML;
            ids_array.push(id);
        }
    }
    if (typeof ids_array !== 'undefined' && ids_array.length > 0) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonClass: 'btn btn-primary w-xs me-2 mt-2',
            cancelButtonClass: 'btn btn-danger w-xs mt-2',
            confirmButtonText: "Yes, delete it!",
            buttonsStyling: false,
            showCloseButton: true
        }).then(function (result) {
            if (result.value) {
                for (i = 0; i < ids_array.length; i++) {
                    companyList.remove("id", `<a href="javascript:void(0);" class="fw-medium link-primary">${ids_array[i]}</a>`);
                }
                document.getElementById("checkAll").checked = false;
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your data has been deleted.',
                    icon: 'success',
                    confirmButtonClass: 'btn btn-info w-xs mt-2',
                    buttonsStyling: false
                });
            }
        });
    } else {
        Swal.fire({
            title: 'Please select at least one checkbox',
            confirmButtonClass: 'btn btn-info',
            buttonsStyling: false,
            showCloseButton: true
        });
    }
}

document.querySelector(".pagination-next").addEventListener("click", function () {
    (document.querySelector(".pagination.listjs-pagination")) ? (document.querySelector(".pagination.listjs-pagination").querySelector(".active")) ?
    document.querySelector(".pagination.listjs-pagination").querySelector(".active").nextElementSibling.children[0].click(): '': '';
});
document.querySelector(".pagination-prev").addEventListener("click", function () {
    (document.querySelector(".pagination.listjs-pagination")) ? (document.querySelector(".pagination.listjs-pagination").querySelector(".active")) ?
    document.querySelector(".pagination.listjs-pagination").querySelector(".active").previousSibling.children[0].click(): '': '';
});