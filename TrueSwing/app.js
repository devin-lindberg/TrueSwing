// calculate player score. 
function mySum() {

    var H1 = document.getElementById('H1').value;
    var H2 = document.getElementById('H2').value;
    var H3 = document.getElementById('H3').value;
    var H4 = document.getElementById('H4').value;
    var H5 = document.getElementById('H5').value;
    var H6 = document.getElementById('H6').value;
    var H7 = document.getElementById('H7').value;
    var H8 = document.getElementById('H8').value;
    var H9 = document.getElementById('H9').value;
    var H10 = document.getElementById('H10').value;
    var H11 = document.getElementById('H11').value;
    var H12 = document.getElementById('H12').value;
    var H13 = document.getElementById('H13').value;
    var H14 = document.getElementById('H14').value;
    var H15 = document.getElementById('H15').value;
    var H16 = document.getElementById('H16').value;
    var H17 = document.getElementById('H17').value;
    var H18 = document.getElementById('H18').value;

    //start of player 1
    var P1OUT =

        parseInt(H1) +
        parseInt(H2) +
        parseInt(H3) +
        parseInt(H4) +
        parseInt(H5) +
        parseInt(H6) +
        parseInt(H7) +
        parseInt(H8) +
        parseInt(H9);

    if (!isNaN(P1OUT)) {
        document.getElementById('P1OUT').value = P1OUT;
    }

    var P1IN =

        parseInt(H10) +
        parseInt(H11) +
        parseInt(H12) +
        parseInt(H13) +
        parseInt(H14) +
        parseInt(H15) +
        parseInt(H16) +
        parseInt(H17) +
        parseInt(H18);

    if (!isNaN(P1IN)) {
        document.getElementById('P1IN').value = P1IN;
    }

    var P1total = P1OUT + P1IN;

    if (!isNaN(P1total)) {
        document.getElementById('P1total').value = P1total;
    }

        //end of player 1
        return p1total; 
    }


function isNumber(source, evt) {
    //Grab the event
    evt = (evt) ? evt : window.event;
    //Determine the character that was pressed
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    //Ensure the character was valid and that the length doesn't exceed 2 characters (1-99)
    if (charCode > 31 && (charCode < 48 || charCode > 57) || source.value.length >= 2) {
        return false;
    }
    return true;
}

// validation
function alphaOnly(event) {
    var key = event.charCode;
    return key == 32 || (key >= 65 && key <= 90) || (key >= 97 && key <= 122);
}




