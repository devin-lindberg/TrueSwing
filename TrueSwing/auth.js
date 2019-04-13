var totalRight;
var totalLeft;
var totalStrike;

// listen to auth state changes
auth.onAuthStateChanged(user => {
    if (user) {
        db.collection('Users').doc(user.email).collection('Rounds').orderBy('date').onSnapshot(snapshot => {
            setupGuides(snapshot.docs)
            setupUI(user);
        });

    }
    else {
        setupUI();
        setupGuides([]);
    }
});

//log round
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var user = firebase.auth().currentUser;
    // console.log(user.uid);
    
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
    totalScore();
    //GIR();
    
    var promise = FIR();
     promise.then(function(totalRight){
        db.collection('Users').doc(user.email).collection('Rounds').doc().set({
            date: modalPlay['roundDate'].value,
            //score: totalScore,
            totalright: totalRight
            }).then(() => {
            const modal = document.querySelector('#modal-play');
            M.Modal.getInstance(modal).close();
            modalPlay.reset();
        }).catch(function(error){
            console.log(error);
        })  
     })         
 
});


function totalPutts(){
    totalPutts = parseInt(modalPlay['P1H1'].value)
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
    totalScore = parseInt(modalPlay['H1'].value)
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

function GIR() {
    var totalGreens = modalPlay['GIR1'];
    if(totalGreens.checked == true){
        console.log("truee");
    }
    else{
        console.log("false");
    }    
    
}

function FIR() {
    return new Promise(function(resolve, reject){
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
            parseInt(modalPlay['FIR18'].value)];
        
            console.log(fairway.toString());
            console.log(fairway.length);
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
            console.log(missRight + " " +  fairwayStrike + " " + missLeft  + "");
        
            var totalRight = missRight * 100 / fairway.length;
            var totalStrike = fairwayStrike * 100 / fairway.length;
            var totalLeft = missLeft * 100 / fairway.length;
            console.log(totalRight.toFixed(0) + " You hit: " + totalStrike.toFixed(0) + " " + totalLeft.toFixed(0) + " " );  
           
            if(totalRight > 0){
                resolve(totalRight);
                return totalRight;
            } else {
                reject("not defined");
            }      
    });
    
}





// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
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