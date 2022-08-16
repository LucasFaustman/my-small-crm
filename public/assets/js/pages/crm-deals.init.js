var dealTitle = document.getElementById("dealTitle");
var contact = document.getElementById("contact");
var stageValue = document.getElementById("stageValue");
        var dealValue = document.getElementById("dealValue");
        var dueDate = document.getElementById("dueDate");
        var contactDescription = document.getElementById("contactDescription");
        var companyName = document.getElementById("companyName");
addBtn = document.getElementById("add-btn"),

addBtn.addEventListener('click', async function (event) {
    event.preventDefault();

    if(
        dealTitle.value !== "" &&
        contact.value !== "" &&
        stageValue.value !== "" &&
        dealValue.value !== "" &&
        dueDate.value !== "" &&
        companyName.value !== "" &&
        contactDescription.value !== "" 
    ) {

    dealTitleVal = dealTitle.value
    contactVal = contact.value
    stageValueVal = stageValue.value
    dealValueVal = dealValue.value
    dueDateVal = dueDate.value
    contactDescriptionVal = contactDescription.value
    companyNameVal = companyName.value



    try {
        // signify to the server this is a post request to our database, and include the all inputs of task stringified to an object to pass onto the db
        const res = await fetch('/addDeal', {
            method: 'POST',
            body: JSON.stringify({ dealTitleVal,
                contactVal,
                stageValueVal,
                dealValueVal,
                dueDateVal,
                companyNameVal,
                contactDescriptionVal }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res
        console.log(data)
        document.getElementById("close-modal").click();
        form.reset();
        Swal.fire({
            title: 'Success!',
            text: 'Deal Inserted successfully.',
            icon: 'success',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-primary w-xs me-2 mt-2',
            cancelButtonClass: 'btn btn-danger w-xs mt-2',
            buttonsStyling: false,
            showCloseButton: true
        });
        window.location.reload();
    }
        catch(err) {
            console.log(err)
        }
    }


})







// var contactNo = new Cleave("#contactNumber", {
//     delimiters: ['(', ')', '-'],
//     blocks: [0, 3, 3, 4]
// });

// var str_dt = function formatDate(date) {
//     var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//     var d = new Date(date),
//         month = '' + monthNames[(d.getMonth())],
//         day = '' + d.getDate(),
//         year = d.getFullYear();
//     if (month.length < 2)
//         month = '0' + month;
//     if (day.length < 2)
//         day = '0' + day;
//     return [day + " " + month, year].join(', ');
// };

// form = document.getElementById("deals-form");

// form.addEventListener('submit', function (event) {
//     event.preventDefault();
//     if (!form.checkValidity()) {
//         event.preventDefault()
//         form.classList.add('was-validated')
//     } else {
//         var dealTitle = document.getElementById("dealTitle").value;
//         var dealValue = document.getElementById("dealValue").value;
//         var deatType = document.getElementById("deatType").value;
//         var dealOwner = document.getElementById("dealOwner").value;
//         var dueDate = document.getElementById("dueDate").value;
//         var contactNumber = document.getElementById("contactNumber").value;
//         var contactEmail = document.getElementById("dealEmail").value;
//         var contactDescription = document.getElementById("contactDescription").value;
//         var avtar_title = dealOwner.split(" ");
//         var letters = null;

//         if (avtar_title.length >= 2) {
//             var first_letter = avtar_title[0].slice(0, 1);
//             var secont_letter = avtar_title[1].slice(0, 1);
//             letters = first_letter + secont_letter
//         } else {
//             var first_letter = avtar_title[0].slice(0, 1);
//             letters = first_letter
//         }

//         var avatar_ = `<div class="flex-shrink-0 avatar-xs me-2"><div class="avatar-title bg-soft-success text-success rounded-circle fs-13">` + letters + `</div></div>`;
//         var newDeals = `<div class="card">
//                             <div class="card-body">
//                                 <a class="d-flex align-items-center" data-bs-toggle="collapse" href="#` + dealTitle + `" role="button" aria-expanded="false" aria-controls="leadDiscovered1">
//                                     <div class="flex-shrink-0">
//                                         ` + avatar_ + `
//                                     </div>
//                                     <div class="flex-grow-1 ms-3">
//                                         <h6 class="fs-14 mb-1">` + dealTitle + `</h6>
//                                         <p class="text-muted mb-0">$` + dealValue + ` - ` + str_dt(dueDate) + `</p>
//                                     </div>
//                                 </a>
//                             </div>
//                             <div class="collapse border-top border-top-dashed" id="` + dealTitle + `">
//                                 <div class="card-body">
//                                     <h6 class="fs-14 mb-1">` + dealOwner + ` <small class="badge badge-soft-danger">4 Days</small></h6>
//                                     <p class="text-muted">` + contactDescription + `</p>
//                                     <ul class="list-unstyled vstack gap-2 mb-0">
//                                         <li>
//                                             <div class="d-flex">
//                                                 <div class="flex-shrink-0 avatar-xxs text-muted">
//                                                     <i class="ri-question-answer-line"></i>
//                                                 </div>
//                                                 <div class="flex-grow-1">
//                                                     <h6 class="mb-0">Meeting with Thomas</h6>
//                                                     <small class="text-muted">Yesterday at 9:12AM</small>
//                                                 </div>
//                                             </div>
//                                         </li>
//                                         <li>
//                                             <div class="d-flex">
//                                                 <div class="flex-shrink-0 avatar-xxs text-muted">
//                                                     <i class="ri-mac-line"></i>
//                                                 </div>
//                                                 <div class="flex-grow-1">
//                                                     <h6 class="mb-0">Product Demo</h6>
//                                                     <small class="text-muted">Monday at 04:41PM</small>
//                                                 </div>
//                                             </div>
//                                         </li>
//                                         <li>
//                                             <div class="d-flex">
//                                                 <div class="flex-shrink-0 avatar-xxs text-muted">
//                                                     <i class="ri-earth-line"></i>
//                                                 </div>
//                                                 <div class="flex-grow-1">
//                                                     <h6 class="mb-0">Marketing Team Meeting</h6>
//                                                     <small class="text-muted">Monday at 04:41PM</small>
//                                                 </div>
//                                             </div>
//                                         </li>
//                                     </ul>
//                                 </div>
//                                 <div class="card-footer hstack gap-2">
//                                     <button class="btn btn-warning btn-sm w-100" data-bs-toggle="tooltip" data-bs-placement="top" title="` + contactNumber + `"><i class="ri-phone-line align-bottom me-1"></i> Call</button>
//                                     <button class="btn btn-info btn-sm w-100" data-bs-toggle="tooltip" data-bs-placement="top" title="` + contactEmail + `"><i class="ri-question-answer-line align-bottom me-1"></i>
//                                         Message</button>
//                                 </div>
//                             </div>
//                         </div>`

//         let collapseShow;
//         switch (deatType) {
//             case 'Lead Disovered':
//                 collapseShow = "leadDiscovered";
//                 break;
//             case 'Contact Initiated':
//                 collapseShow = "contactInitiated";
//                 break;
//             case 'Need Identified':
//                 collapseShow = "needsIdentified";
//                 break;
//             case 'Meeting Arranged':
//                 collapseShow = "meetingArranged";
//                 break;
//             case 'Offer Accepted':
//                 collapseShow = "offerAccepted";
//                 break;
//         }

//         document.getElementById("close-modal").click();
//         document.getElementById(collapseShow).innerHTML += newDeals;
//         form.reset();
//         Swal.fire({
//             title: 'Success!',
//             text: 'Deal Inserted successfully in '+deatType+' Tab.',
//             icon: 'success',
//             showCancelButton: true,
//             confirmButtonClass: 'btn btn-primary w-xs me-2 mt-2',
//             cancelButtonClass: 'btn btn-danger w-xs mt-2',
//             buttonsStyling: false,
//             showCloseButton: true
//         });
//     }
// });



