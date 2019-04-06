var userName;
var age;
var email;
var first;
var last;
var driver;
var wood3;
var wood5;
var wood7;
var iron3;
var iron4;
var iron5;
var iron6;
var iron7;
var iron8;
var iron9;
var uid;
var p1total;


// get user info from registration 
function getUserInfo() {
    first = document.getElementById('first_name').value;
    last = document.getElementById('last_name').value;
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    createUser();
}

// create new user.
async function createUser() {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
        var user = firebase.auth().currentUser;
        console.log(user.uid);
        uid = user.uid;
        //var errorMessage = error.message;
         // ...
    });

    //var user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user.uid);
            userData(user.email);
        } else {
            // No user is signed in.
        }
    });

}


// write user info to database
function userData(user) {
    if (user != undefined) {
        db.collection("Users").doc(user).set({
            Email: user
        })
            .then(function () {
                console.log("succesfull write");                
            })
            .catch(function (error) {
                console.error("doesnt work", error)
            });
    }
    else {
        alert("undefined");
    }

}



//sign in to app. If sign in successful route to course selection. 
function signIn() {
    email = document.getElementById('email').value;
    password = document.getElementById('pwd').value;
    console.log(email + password);
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorMessage = error.message;
        window.alert(errorMessage);
        console.log(errorMessage);
        console.log(cred.user);
        // ...
    });
    //showUserInfo();
    var user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user.uid);
            console.log("Signed In")
            document.location.href = 'course.html';
        } else {
            
        }
    });
}

function getEmailReset(){
    alert("Please enter email");
    var emailAddress = document.getElementById('email').value;    
    resetPassword(emailAddress);
}

function resetPassword(emailAddress){
var auth = firebase.auth();

auth.sendPasswordResetEmail(emailAddress).then(function() {
  // Email sent.
  alert('reset link sent to provided email address');
  console.log("email sent");
}).catch(function(error) {
  // An error happened.
  alert("error did not send");
});
}






// log out of application
function logOut() {
    firebase.auth().signOut().then(function(){
        console.log("sign out successful");
        document.location.href = 'index.html';
    }).catch(function(error){
        console.log("error signing out");
    });
}




// get current user. 
function showUserInfo() {
    window.alert("poops");
    var user = firebase.auth().currentUser;
    window.alert(user.email);
    if (user == undefined) {
        window.alert("undefined");
    }
    document.getElementById("userInfo").innerHTML = "Welcome " + user.email;
}


// select from one of four local courses. 
function courseSelection(){
    course = document.getElementById("clubSelector").value;
    if(course == "municipal"){
        document.location.href = 'municipal.html';
    }
    if(course == "blackMountain"){
        document.location.href = 'blackMtn.html';
    }
    if(course == "reemsCreek"){
        document.location.href = 'reemscreek.html';
    }
    if(course == "broadmoor"){
        document.location.href = 'broadmoor.html';
    }
}









// }
// // Add new User to database with neccessary fields. 

// function retrieveUserInfo() {
//     db.collection("Users").where("userName", "==", "Carl1").get().then(function (querySnapshot) {
//         querySnapshot.forEach(function (doc) {
//             userName = String(doc.data().userName);
//             localStorage.setItem("userName", userName);
//         });

//     });
//     console.log("test");
//     userName = localStorage.getItem("userName");
//     console.log(userName);
// }

function getBagSetup() {
    retrieveUserInfo();
    // var bagArray  = [];
    // for(i =0; i <= document.getElementById('clubSelector').length; i++){
    //     bagArray[i]= document.getElementById('clubSelector')[i];
    // }
    // console.log(bagArray.toString);
    // userName = document.getElementById('userName').value;
    // first = document.getElementById('first').value;
    // last = document.getElementById('last').value;
    // email = document.getElementById('email').value;
    // age = document.getElementById('age').value;
    // console.log(userName + first + last + email + age);
    // addUser();
}

// function addBagSetup() {
//     db.collection("Users").doc(userName).collection("Bag_Setup").doc("clubs").set({
//         First: first,
//         Last: last,
//         Age: age,
//         Email: email,
//         User_name: userName
//     })
//         .then(function () {
//             console.log("successfule write");
//         })
//         .catch(function (error) {
//             console.error("shit dont work", error);
//         });
// }


// calculate player score. 
function mySum() {

    var P1H1 = document.getElementById('P1H1').value;
    var P1H2 = document.getElementById('P1H2').value;
    var P1H3 = document.getElementById('P1H3').value;
    var P1H4 = document.getElementById('P1H4').value;
    var P1H5 = document.getElementById('P1H5').value;
    var P1H6 = document.getElementById('P1H6').value;
    var P1H7 = document.getElementById('P1H7').value;
    var P1H8 = document.getElementById('P1H8').value;
    var P1H9 = document.getElementById('P1H9').value;
    var P1H10 = document.getElementById('P1H10').value;
    var P1H11 = document.getElementById('P1H11').value;
    var P1H12 = document.getElementById('P1H12').value;
    var P1H13 = document.getElementById('P1H13').value;
    var P1H14 = document.getElementById('P1H14').value;
    var P1H15 = document.getElementById('P1H15').value;
    var P1H16 = document.getElementById('P1H16').value;
    var P1H17 = document.getElementById('P1H17').value;
    var P1H18 = document.getElementById('P1H18').value;

    //start of player 1
    var P1OUT =

        parseInt(P1H1) +
        parseInt(P1H2) +
        parseInt(P1H3) +
        parseInt(P1H4) +
        parseInt(P1H5) +
        parseInt(P1H6) +
        parseInt(P1H7) +
        parseInt(P1H8) +
        parseInt(P1H9);

    if (!isNaN(P1OUT)) {
        document.getElementById('P1OUT').value = P1OUT;
    }

    var P1IN =

        parseInt(P1H10) +
        parseInt(P1H11) +
        parseInt(P1H12) +
        parseInt(P1H13) +
        parseInt(P1H14) +
        parseInt(P1H15) +
        parseInt(P1H16) +
        parseInt(P1H17) +
        parseInt(P1H18);

    if (!isNaN(P1IN)) {
        document.getElementById('P1IN').value = P1IN;
    }

    var P1total = P1OUT + P1IN;

    if (!isNaN(P1total)) {
        document.getElementById('P1total').value = P1total;
    }

        //end of player 1
    submitScore(P1total);
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


// submits players round under current user and selected date.
function submitScore(total) {
    var dz = getDate();
    getUserEmail();    
    var user1 = firebase.auth().currentUser;
    db.collection("Users").doc(user1.email).collection("Rounds").doc(dz).set({
        score: total
    })
        .then(function () {
            console.log("successfule write");
        })
        .catch(function (error) {
            console.error("shit dont work", error);
        });
}

//retrieves date player is to log score under. 
function getDate() {
    var date1 = document.getElementById("myDate").value;
    if (date1 == "") {
        alert("please select date");
    }

    document.getElementById("date").innerHTML = date1.toString();
    console.log(date1);
    return date1;
}


// retrieves Current user and displays at top of selected course.
function getUserEmail(){
    var USER2 = firebase.auth().currentUser;
    console.log(USER2.email);
    if(USER2 != undefined){
        document.getElementById("userEmail").innerHTML = "welcome " + USER2.email;
    }     
}



// calculates green in regulation percentage.
function gir() {

}

// calculates fairway hit percentage. 
function fairwayHit() {

}