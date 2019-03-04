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

///works


// const cafeList = document.querySelector('#cafe-list');
// function renderCafe(doc) {
//     let li = document.createElement('li');
//     let userName = document.createElement('span');
//     let age = document.createElement('span');

//     li.setAttribute('data-id', doc.id);
//     userName.textContent = doc.data().userName;
//     age.textContent = doc.data().Age;

//     li.appendChild(userName);
//     li.appendChild(age);

//     cafeList.appendChild(li);
// }

// db.collection('Users').get().then(snapshot => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc);
//     })
// });

//write user info to database
function setUser() {
    admin.auth().createUser({
        email: "user@example.com",
        emailVerified: false,
        phoneNumber: "+11234567890",
        password: "secretPassword",
        displayName: "John Doe",
        photoURL: "http://www.example.com/12345678/photo.png",
        disabled: false
    })
        .then(function (userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log("Successfully created new user:", userRecord.uid);
        })
        .catch(function (error) {
            console.log("Error creating new user:", error);
        });
}


function googleLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();


    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log("Logged In")
        window.location = 'profile.html';
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.error(errorMessage);
        // ...
    });
}


// log out of application
function logOut() {
    firebase.auth().signOut().then(function () {
        console.log("Signed out")
        window.location = 'index.html';
    }).catch(function (error) {
        console.error("stil signed in")
    });
}


function getUserInfo() {
    userName = document.getElementById('userName').value;
    first = document.getElementById('first').value;
    last = document.getElementById('last').value;
    email = document.getElementById('email').value;
    age = document.getElementById('age').value;
    console.log(userName + first + last + email + age);
    addUser();
}

function addUser() {
    db.collection("Users").doc(userName).set({
        First: first,
        Last: last,
        Age: age,
        Email: email,
        userName: userName
    })
        .then(function () {
            console.log("successfule write");
        })
        .catch(function (error) {
            console.error("shit dont work", error);
        });

}
// Add new User to database with neccessary fields. 

function retrieveUserInfo() {
    db.collection("Users").where("userName", "==", "Carl1").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            userName = String(doc.data().userName);
            localStorage.setItem("userName", userName);
        });

    });
    console.log("test");
    userName = localStorage.getItem("userName");
    console.log(userName);
}

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

function addBagSetup() {
    db.collection("Users").doc(userName).collection("Bag_Setup").doc("clubs").set({
        First: first,
        Last: last,
        Age: age,
        Email: email,
        User_name: userName
    })
        .then(function () {
            console.log("successfule write");
        })
        .catch(function (error) {
            console.error("shit dont work", error);
        });
}

function selectCourse(sel) {
    if (sel.val() = 'municipal') this.form.submit();
}


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

    // console.log("test");
    // var d = new Date();
    // var c = document.getElementById("date").innerHTML = d.getDate();
    // console.log(c);

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

function alphaOnly(event) {
    var key = event.charCode;
    return key == 32 || (key >= 65 && key <= 90) || (key >= 97 && key <= 122);
}



function submitScore(totalScore) {
    var dz = getDate();
        db.collection("Users").doc("DevinL").collection("Rounds").doc(dz).set({
        score: totalScore
    })
        .then(function () {
            console.log("successfule write");
        })
        .catch(function (error) {
            console.error("shit dont work", error);
        });
}


function getDate() {
    var date1 = document.getElementById("myDate").value;
    if(date1 == ""){
        alert("please select date");
    }
    
    document.getElementById("date").innerHTML = date1.toString();
    console.log(date1);    
    return date1;
}






// function submitScore(totalScore) {
//     var date1 = document.getElementById("myDate").value;
//     document.getElementById("date").innerHTML = date1.toString();
//     db.collection("Users").doc("DevinL").collection("Rounds").doc(date1).set({
//         score: totalScore
//     })
//         .then(function () {
//             console.log("successfule write");
//         })
//         .catch(function (error) {
//             console.error("shit dont work", error);
//         });
// }


// function getDate() {
//     var date1 = document.getElementById("myDate").value;
//     document.getElementById("date").innerHTML = date1.toString();
//     console.log(date1);
//     return date1;
// }
