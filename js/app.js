if (window.attachEvent) {window.attachEvent('onload', load);}
else if (window.addEventListener) {window.addEventListener('load', load, false);}
else {document.addEventListener('load', load, false);}
function load() {
    function showlegitExtras() {
        legitExtras.className = 'visible';
    }

    function showFraudExtras() {
        cardComp.className = 'visible';
        cardLost.className = 'visible';
    }

    function hidelegitExtras() {
        legitExtras.className = 'hidden';
    }

    function hideFraudExtras() {
        cardComp.className = 'hidden';
        cardLost.className = 'hidden';
    }

    function addTransaction() {
        var newTransaction = document.createElement("div");
        newTransaction.innerHTML = '<div class="transaction">' +
        '<label class="transLabel" for="transDateInput' + transactionDivs.length + '">Date:</label>' +
        '<input name="transDateInput" id="transDateInput' + transactionDivs.length + '" type="date">' +
        '<br>' +
        '<label class="transLabel" for="merchInput' + transactionDivs.length + '">Merchant:</label>' +
        '<input name="merchInput" id="merchInput' + transactionDivs.length + '" type="text">' +
        '<br>' +
        '<label class="transLabel" for="locInput' + transactionDivs.length + '">Location:</label>' +
        '<input name="locInput" id="locInput' + transactionDivs.length + '" type="text">' +
        '<input name="keyed" type="checkbox" value="(KEYED)" id="keyed' + transactionDivs.length + '">' +
        '<label for="keyed' + transactionDivs.length + '">Keyed Entry</label>' +
        '<br>' +
        '<label class="transLabel" for="amountInput' + transactionDivs.length + '">Dollar Amount:</label>' +
        '<input name="amountInput" id="amountInput' + transactionDivs.length + '" type="number">' +
        '<input id="approved' + transactionDivs.length + '" name="status' + transactionDivs.length + '" type="radio">' +
        '<label for="approved' + transactionDivs.length + '">Approved</label>' +
        '<input id="declined' + transactionDivs.length + '" name="status' + transactionDivs.length + '" type="radio">' +
        '<label for="declined' + transactionDivs.length + '">Declined</label>' +
        '<input id="reversed' + transactionDivs.length + '" name="status' + transactionDivs.length + '" type="radio">' +
        '<label for="reversed' + transactionDivs.length + '">Reversed</label>' +
        '<br>' +
        '<label class="transLabel" for="multiple' + transactionDivs.length + '">Multiple?</label>' +
        '<input name="multiple" type="number" id="multiple' + transactionDivs.length + '">' +
      '</div>';
      transactionWrapper.appendChild(newTransaction);
    }

    function createNote() {
        noteString = '';
        var addOverride = false;
        // Employee section
        if (employeeNum.value.trim() != '') {
            noteString += employeeNum.value.trim().toUpperCase() + ' VERIFIED ';
            for (var i = 0; i < checkboxes.length; i++) {
                if(checkboxes[i].checked) noteString += checkboxes[i].value + ' ';
            }
        }
        // Fraud/Legit section
        if (vFraud.checked) {
            noteString += vFraud.value.trim();
            if (cardCompInput.checked) noteString += ' ' + cardCompInput.value;
            if (cardLostInput.checked) noteString += ' ' + cardLostInput.value;
            noteString += '; ';
        }
        if (vLegit.checked) {
            noteString += vLegit.value.trim();
            if (kbaInput.value.trim() != '') noteString += '/PINID KBA ' + kbaInput.value.trim();
            if (altKBAInput.checked) {
                noteString += '/PINID ALT KBA ';
                for (var i = 0; i < checkboxes.length; i++) {
                    if(checkboxes[i].checked) noteString += checkboxes[i].value + ' ';
                }
                noteString = noteString.substring(0, noteString.length - 1);
            }
            if (overrideInput.value.trim() != '') addOverride = true;
            noteString += '; ';
        }
        // Transactions section
        for (var i = 0; i < transactionDivs.length; i++) {
            var date = transactionDivs[i].querySelector("[name=transDateInput]").value.trim() + ' ';
            date = date.substring(5, date.length).replace(/-/, '/');
            noteString += date;
            noteString += transactionDivs[i].querySelector("[name=merchInput]").value.trim().toUpperCase() + ' ';
            noteString += transactionDivs[i].querySelector("[name=locInput]").value.trim().toUpperCase();
            if (transactionDivs[i].querySelector("[name=keyed").checked) noteString += transactionDivs[i].querySelector("[name=keyed").value.trim() + ' ';
            else noteString += ' ';
            noteString += "$" + transactionDivs[i].querySelector("[name=amountInput]").value.trim();
            var approvedId = '#approved' + i;
            var declinedId = '#declined' + i;
            var reversedId = '#reversed' + i;
            if (i == 0) {
                if (transactionDivs[i].querySelector("#approved").checked) {
                    noteString += '(A';
                }
            }
            else if (transactionDivs[i].querySelector(approvedId).checked) {
                noteString += '(A';
            }
            if (i == 0) {
                if (transactionDivs[i].querySelector("#declined").checked) {
                    noteString += '(D';
                }
            }
            else if (transactionDivs[i].querySelector(declinedId).checked) {
                noteString += '(D';
            }
            if (i == 0) {
                if (transactionDivs[i].querySelector("#reversed").checked) {
                    noteString += '(RVRSD';
                }
            }
            else if (transactionDivs[i].querySelector(reversedId).checked) {
                noteString += '(RVRSD';
            }
            if (transactionDivs[i].querySelector("[name=multiple]").value.trim() != '') noteString += 'X' + transactionDivs[i].querySelector("[name=multiple]").value.trim();
            noteString += '); ';
        }
        // Add override at the end
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

    function revealModal() {
        copyModal.className = 'reveal';
    }

    var legitExtras = document.getElementById("legitExtras");
    var transactionWrapper = document.getElementById("transactionWrapper");
    var noteOutput = document.getElementById("noteOutput");
    var note = document.getElementById("note");
    var noteString = '';
    var copyModal = document.getElementById("copyModal");
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
    var altKBAInput = document.getElementById("altKBA");
    var overrideInput = document.getElementById("overrideInput");
    var cardComp = document.getElementById("cardComp");
    var cardLost = document.getElementById("cardLost");
    var cardCompInput = document.getElementById("cardCompInput");
    var cardLostInput = document.getElementById("cardLostInput");
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

    copyNoteButton.addEventListener("click", function(e) {
        note.select();
        document.execCommand("copy");
        revealModal();
    }, false);

    copyModal.addEventListener("animationend", function(e) {
        copyModal.className = '';
    });

    copyModal.addEventListener("webkitAnimationEnd", function(e) {
        copyModal.className = '';
    });

    fraudButton.addEventListener("change", function(e) {
        if(e.target.checked) {
            hidelegitExtras();
            showFraudExtras();
        }
    }, false)

    legitButton.addEventListener('change', function(e) {
        if(e.target.checked) {
            showlegitExtras();
            hideFraudExtras();
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
