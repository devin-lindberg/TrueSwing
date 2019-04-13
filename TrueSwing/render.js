

  function showScores(){
    var user = firebase.auth().currentUser;
    db.collection('Users').doc(user.email).collection('Rounds').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            renderCafe(doc);
        })
    });
  }
function renderCafe(doc) {
    const cafeList = document.querySelector('#cafe-list');
    let li = document.createElement('li');
    let email = document.createElement('span');
    //let round = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    email.textContent = doc.data().score;
    //round.textContent = doc.
    
    
    li.appendChild(email);

    cafeList.appendChild(li);
   }
   console.log("test");
   


 