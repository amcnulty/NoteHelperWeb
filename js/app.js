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
      '</div>';
      transactionWrapper.appendChild(newTransaction);
    }

    function createNote() {

    }

    function showNote() {
        noteOutput.className = 'visible';
        noteOutput.style.display = 'block';
    }

    function hideNote() {
        noteOutput.className = 'hidden';
        noteOutput.style.display = 'none';
    }

    var exitButton = document.getElementById("exitButton");
    var fraudButton = document.getElementById("vFraud");
    var legitButton = document.getElementById("vLegit");
    var legitExtras = document.getElementById("legitExtras");
    var transactionWrapper = document.getElementById("transactionWrapper");
    var addTransButton = document.getElementById("addTransButton");
    var noteOutput = document.getElementById("noteOutput");
    var createNoteButton = document.getElementById("createNoteButton");
    var copyNoteButton = document.getElementById("copyNoteButton");
    var resetAllButton = document.getElementById("resetFormButton");

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
