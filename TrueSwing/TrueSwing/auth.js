
// listen to auth state changes
auth.onAuthStateChanged(user => {
    if (user) {
        db.collection('Users').doc(user.email).collection('Rounds').onSnapshot(snapshot => {
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
    })
})



// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = signupForm['signup-email'].value;
    const pass = signupForm['signup-password'].value;

    // sign up the user
    auth.createUserWithEmailAndPassword(email, pass).then(cred => {
        return db.collection('Users').doc(cred.user.uid).set({
            userName: signupForm['signup-userName'].value
        });

    }).then(() => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
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
    });

});