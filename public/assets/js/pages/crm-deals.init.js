var dealTitle = document.getElementById("dealTitle");
var contact = document.getElementById("contact");
var stageValue = document.getElementById("stageValue");
var dealValue = document.getElementById("dealValue");
var dueDate = document.getElementById("dueDate");
var contactDescription = document.getElementById("contactDescription");
var companyName = document.getElementById("companyName");
addBtn = document.getElementById("add-btn"),
editStageBtn = document.getElementById("editdealstage-btn")
editDealStageBtns = document.getElementsByClassName('editDealStageBtns')
var editStageValue = document.getElementById('editStageValue')

addBtn.addEventListener('click', async function (event) {
    event.preventDefault();

    if(
        dealTitle.value === "" ||
        contact.value === "" ||
        stageValue.value === "" ||
        dealValue.value === "" ||
        dueDate.value === "" ||
        companyName.value === "" ||
        contactDescription.value === "" 
    || !dealTitle) {
        document.getElementById('deal-error').innerHTML = 'Please fill out all fields.'
    }



    else {

    dealTitleVal = dealTitle.value
    contactVal = contact.value
    stageValueVal = stageValue.value
    dealValueVal = dealValue.value
    dueDateVal = dueDate.value
    contactDescriptionVal = contactDescription.value
    companyNameVal = companyName.value


    try {
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
        const data = await res.json()
        if (data.error == 'Company name does not match') { 
            document.getElementById('deal-error').innerHTML = data.error
    } else {
        document.getElementById("close-modal").click();
        clearFields();
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
    }}
        catch(res) {
            console.log(res)
        }
    }

});

Array.from(editDealStageBtns).forEach(async function (btn) {
    btn.addEventListener("click", async function (e) {
       e.target.closest("itemIdContainer")
        let newItemId = e.target.closest('div').children[2].innerText
editStageBtn.addEventListener('click', async function (event) {

if (editStageValue.value !== "") {
    console.log(newItemId)
    console.log(editStageValue.value)
    editedStageVal = editStageValue.value;
    try {
        const res = await fetch('/editDealStage', {
            method: 'PUT',
            body: JSON.stringify({ newItemId, 
            editedStageVal }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = res
        console.log(data)
    }
        catch(err) {
            console.log(err)
        }
    document.getElementById("editdealstage").click();
        Swal.fire({
            title: 'Success!',
            text: 'Deal Stage Moved Successfully.',
            icon: 'success',
            showCancelButton: true,
            confirmButtonClass: 'btn btn-primary w-xs me-2 mt-2',
            cancelButtonClass: 'btn btn-danger w-xs mt-2',
            buttonsStyling: false,
            showCloseButton: true
        });
        window.location.reload();
}
});
    });
});

function clearFields() {
    if (dealTitle) {
    dealTitle.value = ""
    contact.value = ""
    stageValue.value = ""
    dealValue.value = ""
    dueDate.value = ""
    companyName.value = ""
    contactDescription = ""
    }
}