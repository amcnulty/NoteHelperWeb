if (window.attachEvent) {window.attachEvent('onload', load);}
else if (window.addEventListener) {window.addEventListener('load', load, false);}
else {document.addEventListener('load', load, false);}
function load() {
    function showlegitExtras() {
        legitExtras.className = 'visible';
    }

    function hidelegitExtras() {
        legitExtras.className = 'hidden';
    }

    function addTransaction() {
        var newTransaction = document.createElement("div");
        newTransaction.innerHTML = '<div class="transaction">' +
        '<label class="transLabel" for="transDateInput">Date:</label>' +
        '<input id="transDateInput" type="date">' +
        '<br>' +
        '<label class="transLabel" for="merchInput">Merchant:</label>' +
        '<input id="merchInput" type="text">' +
        '<br>' +
        '<label class="transLabel" for="locInput">Location:</label>' +
        '<input id="locInput" type="text">' +
        '<br>' +
        '<label class="transLabel" for="amountInput">Dollar Amount:</label>' +
        '<input id="amountInput" type="number">' +
        '<input id="approved" name="status" type="radio">' +
        '<label for="approved">Approved</label>' +
        '<input id="declined" name="status" type="radio">' +
        '<label for="declined">Declined</label>' +
        '<input id="reversed" name="status" type="radio">' +
        '<label for="reversed">Reversed</label>' +
        '<br>' +
        '<label class="transLabel" for="multiple">Multiple?</label>' +
        '<input type="number" id="multiple">' +
      '</div>';
      transactionWrapper.appendChild(newTransaction);
    }

    function createNote() {
        noteString = '';
        var addOverride = false;
        if (employeeNum.value.trim() != '') {
            noteString += employeeNum.value.trim().toUpperCase() + ' VERIFIED ';
            for (var i = 0; i < checkboxes.length; i++) {
                if(checkboxes[i].checked) noteString += checkboxes[i].value + ' ';
            }
        }
        if (vFraud.checked) noteString += vFraud.value.trim() + ' ';
        if (vLegit.checked) {
            noteString += vLegit.value.trim() + ' ';
            noteString += kbaInput.value.trim() + ' ';
            if (overrideInput.value.trim() != '') addOverride = true;
        }
        console.log(transactionDivs.length);
        for (var i = 0; i < transactionDivs.length; i++) {
            var date = transactionDivs[i].querySelector("#transDateInput").value.trim() + ' ';
            date = date.substring(5, date.length).replace(/-/, '/');
            noteString += date;
            noteString += transactionDivs[i].querySelector("#merchInput").value.trim() + ' ';
            noteString += transactionDivs[i].querySelector("#locInput").value.trim() + ' ';
            noteString += "$" + transactionDivs[i].querySelector("#amountInput").value.trim();
            if (transactionDivs[i].querySelector("#approved").checked) noteString += '(' + transactionDivs[i].querySelector("#approved").value;
            if (transactionDivs[i].querySelector("#declined").checked) noteString += '(' + transactionDivs[i].querySelector("#declined").value;
            if (transactionDivs[i].querySelector("#reversed").checked) noteString += '(' + transactionDivs[i].querySelector("#reversed").value;
            if (transactionDivs[i].querySelector("#multiple").value.trim() != '') noteString += 'X' + transactionDivs[i].querySelector("#multiple").value.trim() + '); ';
        }
        if (addOverride) {
            var date = new Date();
            date.setDate(date.getDate() + 2);
            var mm = date.getMonth() + 1;
            var dd = date.getDate();
            var dateString = mm + "/" + dd;
            noteString += 'OVERRIDE ' + overrideInput.value.trim() + ' UNTIL ' + dateString;
        }
    }

    function showNote() {
        note.value = noteString;
        noteOutput.className = 'visible';
        noteOutput.style.display = 'block';
    }

    function hideNote() {
        noteOutput.className = 'hidden';
        noteOutput.style.display = 'none';
    }

    var legitExtras = document.getElementById("legitExtras");
    var transactionWrapper = document.getElementById("transactionWrapper");
    var noteOutput = document.getElementById("noteOutput");
    var note = document.getElementById("note");
    var noteString = '';
    // Buttons
    var exitButton = document.getElementById("exitButton");
    var fraudButton = document.getElementById("vFraud");
    var legitButton = document.getElementById("vLegit");
    var addTransButton = document.getElementById("addTransButton");
    var createNoteButton = document.getElementById("createNoteButton");
    var copyNoteButton = document.getElementById("copyNoteButton");
    var resetAllButton = document.getElementById("resetFormButton");
    // Form inputs
    var employeeNum = document.getElementById("employeeNum");
    var checkboxes = document.getElementsByClassName("CVcheckbox");
    var vFraud = document.getElementById("vFraud");
    var vLegit = document.getElementById("vLegit");
    var kbaInput = document.getElementById("kbaInput");
    var overrideInput = document.getElementById("overrideInput");
    var transactionDivs = document.getElementsByClassName("transaction");
    var transDateInput = document.getElementById("transDateInput");
    var merchInput = document.getElementById("merchInput");
    var locInput = document.getElementById("locInput");
    var amountInput = document.getElementById('amountInput');
    var approved = document.getElementById("approved");
    var declined = document.getElementById("declined");
    var reversed = document.getElementById("reversed");
    var multiple = document.getElementById("multiple");

    resetAllButton.addEventListener("click", function(e) {
        location.reload();
    }, false);

    createNoteButton.addEventListener("click", function(e) {
        createNote();
        showNote();
    }, false);

    fraudButton.addEventListener("change", function(e) {
        if(e.target.checked) {
            hidelegitExtras();
        }
    }, false)

    legitButton.addEventListener('change', function(e) {
        if(e.target.checked) {
            showlegitExtras();
        }
    }, false);

    addTransButton.addEventListener("click", function(e) {
        addTransaction();
    }, false);

    exitButton.addEventListener("click", function() {
        window.close();
    }, false);

    hideNote();
}
