var totalRight;
var totalLeft;
var totalStrike;

// listen to auth state changes of user.
auth.onAuthStateChanged(user => {
    //if user is logged in will setup screen with user information including previous rounds. 
    if (user) {
        db.collection('Users').doc(user.email).collection('Rounds').orderBy('date').onSnapshot(snapshot => {
            //setupAverage(spapshot.docs);
            setupGuides(snapshot.docs);            
            setupUI(user);
        });

    }
    // if no user is logged in. User will only have option to login or signup. 
    else {
        setupUI();
        setupGuides([]);
        //setupAverage([]);
    }
});

//Basic round log with just course name, date played, and score.
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var user = firebase.auth().currentUser;
   
    db.collection('Users').doc(user.email).collection('Rounds').doc().set({
        course: createForm['golfCourse'].value,
        date: createForm['title'].value,
        score: createForm['content'].value
    }).then(() => {
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});


// play muni modal advanved
const modalPlay = document.querySelector('#roundData');
modalPlay.addEventListener('submit', (e) => {
    e.preventDefault();
    var user = firebase.auth().currentUser;
    //must do operations here. then can write into DB
    // log advanced statistics here.
    db.collection('Users').doc(user.email).collection('Rounds').doc().set({
        date: modalPlay['roundDate'].value,
        course: "Asheville Municipal Golf Course",
        score: totalScore(),
        totalFairway: FIR(),
        greens: GIR(),
        putts: totalPutts()
    }).then(() => {
        const modal = document.querySelector('#modal-play');
        M.Modal.getInstance(modal).close();
        modalPlay.reset();
    }).catch(function (error) {
        console.log(error);
    })
});


// Calculate total putts for round
function totalPutts() {
    var totalPutts = parseInt(modalPlay['P1H1'].value)
        + parseInt(modalPlay['P1H2'].value)
        + parseInt(modalPlay['P1H3'].value)
        + parseInt(modalPlay['P1H4'].value)
        + parseInt(modalPlay['P1H5'].value)
        + parseInt(modalPlay['P1H6'].value)
        + parseInt(modalPlay['P1H7'].value)
        + parseInt(modalPlay['P1H8'].value)
        + parseInt(modalPlay['P1H9'].value)
        + parseInt(modalPlay['P1H10'].value)
        + parseInt(modalPlay['P1H11'].value)
        + parseInt(modalPlay['P1H12'].value)
        + parseInt(modalPlay['P1H13'].value)
        + parseInt(modalPlay['P1H14'].value)
        + parseInt(modalPlay['P1H15'].value)
        + parseInt(modalPlay['P1H16'].value)
        + parseInt(modalPlay['P1H17'].value)
        + parseInt(modalPlay['P1H18'].value);

    return totalPutts;
}


/// calculate total score
function totalScore() {
    var totalScore = parseInt(modalPlay['H1'].value)
        + parseInt(modalPlay['H2'].value)
        + parseInt(modalPlay['H3'].value)
        + parseInt(modalPlay['H4'].value)
        + parseInt(modalPlay['H5'].value)
        + parseInt(modalPlay['H6'].value)
        + parseInt(modalPlay['H7'].value)
        + parseInt(modalPlay['H8'].value)
        + parseInt(modalPlay['H9'].value)
        + parseInt(modalPlay['H10'].value)
        + parseInt(modalPlay['H11'].value)
        + parseInt(modalPlay['H12'].value)
        + parseInt(modalPlay['H13'].value)
        + parseInt(modalPlay['H14'].value)
        + parseInt(modalPlay['H15'].value)
        + parseInt(modalPlay['H16'].value)
        + parseInt(modalPlay['H17'].value)
        + parseInt(modalPlay['H18'].value);

    return totalScore;
}

//Calculate Greens in Regulation for round. 
function GIR() {
    var totalGreens = [
        parseInt(modalPlay['GIR1'].value),
        parseInt(modalPlay['GIR2'].value),
        parseInt(modalPlay['GIR3'].value),
        parseInt(modalPlay['GIR4'].value),
        parseInt(modalPlay['GIR5'].value),
        parseInt(modalPlay['GIR6'].value),
        parseInt(modalPlay['GIR7'].value),
        parseInt(modalPlay['FIR8'].value),
        parseInt(modalPlay['GIR9'].value),
        parseInt(modalPlay['GIR10'].value),
        parseInt(modalPlay['GIR11'].value),
        parseInt(modalPlay['GIR12'].value),
        parseInt(modalPlay['GIR13'].value),
        parseInt(modalPlay['GIR14'].value),
        parseInt(modalPlay['GIR15'].value),
        parseInt(modalPlay['GIR16'].value),
        parseInt(modalPlay['GIR17'].value),
        parseInt(modalPlay['GIR18'].value)
    ];
    var gir = 0;
    for (i = 0; i <= totalGreens.length; i++) {
        if (totalGreens[i] == 1) {
            gir += 1;
        } 
    }
    var greenString = gir + "/18";
    console.log(greenString);
    return greenString;
}


//calculate Fairways in Reglation
function FIR() {
    //store results for each shot into array
    var fairway = [
        parseInt(modalPlay['FIR1'].value),
        parseInt(modalPlay['FIR2'].value),
        parseInt(modalPlay['FIR3'].value),
        parseInt(modalPlay['FIR5'].value),
        parseInt(modalPlay['FIR7'].value),
        parseInt(modalPlay['FIR8'].value),
        parseInt(modalPlay['FIR9'].value),
        parseInt(modalPlay['FIR10'].value),
        parseInt(modalPlay['FIR11'].value),
        parseInt(modalPlay['FIR12'].value),
        parseInt(modalPlay['FIR14'].value),
        parseInt(modalPlay['FIR15'].value),
        parseInt(modalPlay['FIR16'].value),
        parseInt(modalPlay['FIR17'].value),
        parseInt(modalPlay['FIR18'].value)
    ];
    //Check for fairway variance of each shot and store either hit, leftMiss, rightMiss
    var missRight = 0;
    var fairwayStrike = 0;
    var missLeft = 0;
    for (i = 0; i <= fairway.length; i++) {
        // miss right
        if (fairway[i] == 1) {
            missRight += 1;
        }
        //check Fairway Hit
        if (fairway[i] == 2) {
            fairwayStrike += 1;
        }
        //miss left
        if (fairway[i] == 3) {
            missLeft += 1;
        }
    }
    console.log(missRight + " " + fairwayStrike + " " + missLeft + "");

    // var totalRight = missRight * 100 / fairway.length;
    // var totalStrike = fairwayStrike * 100 / fairway.length;
    // var totalLeft = missLeft * 100 / fairway.length;
    // console.log(totalRight.toFixed(0) + " You hit: " + totalStrike.toFixed(0) + " " + totalLeft.toFixed(0) + " " );  
    // var fairwayString = "Miss Right:%" + totalRight.toFixed(0) + " Fairways Hit:%" + totalStrike.toFixed(0) + " Miss Right:% " + missRight.toFixed(0);

    // Store Fairway Variance for round in String
    var fairwayString = "Missed Right:" + missRight + "/15 ," + " Fairways Hit: " + fairwayStrike + "/15 ," + " Missed Left:" + missLeft + "/15";

    return fairwayString;

}

// //Reset Password
// const resetPassForm = document.querySelector('#reset-form')
// resetPassForm.addEventListener('click',  (e) => {
//     e.preventDefault();
//     getEmail();
//     console.log(emailAddress);
//     var auth = firebase.auth();    
//     auth.sendPasswordResetEmail(emailAddress).then(function() {
//     // Email sent.
//     alert('reset link sent to provided email address');
//     console.log("email sent");
//     }).catch(function(error) {
//     // An error happened.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     if(errorCode =='auth/invalid-email'){
//         alert(errorMessage);
//     }else if(errorCode == 'auth/user-not-found'){
//         alert(errorMessage);
//     }
//     console.log(error);
//     });
// });

function getEmail(){
    const emailAddress = resetPassForm['password-reset'].value;
}

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit',  (e) => {
    e.preventDefault();

    //get user info
    const email = signupForm['signup-email'].value;
    const pass = signupForm['signup-password'].value;

    // sign up the user
    auth.createUserWithEmailAndPassword(email, pass).then(cred => {
        return db.collection('Users').doc(cred.user.email).set({
            userName: signupForm['signup-userName'].value
        });

    }).then(() => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
        signupForm.querySelector('.error').innerHTML = err.message;
    })
});

//log out
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log("Signed out");
    });
});

// sign in
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //get user info
    const email = loginForm['login-email'].value;
    const pass = loginForm['login-password'].value;
    //sign in user
    auth.signInWithEmailAndPassword(email, pass).then(cred => {
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
        loginForm.querySelector('.error').innerHTML = err.message;
    }).catch(err => {
        loginForm.querySelector('.error').innerHTML = err.message;
    });

});