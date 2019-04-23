const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const accountExtras = document.querySelector('.account-extras');
var li2;
var totalRounds;
var tick;
var avg
var li;


const setupUI = (user) => {
    if (user) {
        //show account details. 
        db.collection('Users').doc(user.email).get().then(doc => {
            const html = `
            <div> Logged in as ${user.email}</div>
            <div> User name is ${doc.data().userName}</div>
            `;
            accountDetails.innerHTML = html;
        });

        //toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    }
    else {
        //hide account details
        accountDetails.innerHTML = '';
        //toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}
var scoreTotal = 0;
var numScores = 0;
//setup previous round display. 
const setupGuides = (data) => {
    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const guide = doc.data();
            //Average Score
            scoreTotal += parseInt(guide.score);
            numScores += 1;
            //Advanced Score output         
            var checker = guide.totalFairway;
            if (checker !== undefined) {                
                li = `
            <li>
                <div class ="collapsible-header grey lighten-4">Date: ${guide.date}</div>
                <div class ="collapsible-body white">Course: ${guide.course}</div>
                <div class ="collapsible-body white">Score: ${guide.score}</div>                    
                <div class ="collapsible-body white">Fairway: ${guide.totalFairway}</div>
                <div class ="collapsible-body white">Greens in Regulation: ${guide.greens}</div>
                <div class ="collapsible-body white">Putts: ${guide.putts}</div>                
            </li>
            `;      
              
            }
             // Standard Score output
            else {
               li = `
            <li>
                <div class ="collapsible-header grey lighten-4">Date: ${guide.date}</div>
                <div class ="collapsible-body white">Course: ${guide.course}</div>
                <div class ="collapsible-body white">Score: ${guide.score}</div>
            </li>
            `;                 
            }

            html = html + li;
        });
        // Calculate Average round score
        const avgScore = scoreTotal / numScores;
        avgScore.toFixed(0);
        guideList.innerHTML = html;
        const AVERAGE = `
            <div> Average Round Score: ${avgScore.toFixed(0)} </div>
        `;
        accountExtras.innerHTML = AVERAGE;
        
    } else {
        // Show if user is not logged in or has not logged a round yet
        guideList.innerHTML = '<h5 class="center-align"> Welcome to TrueSwing! Login or Sign up to get started</h5><p>' +
            '<p> TrueSwing is aimed towards the average golfer wanting to improve their game by being provided with advanced data about each of their rounds</p>'
    }

}

// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});

    var elems = document.querySelectorAll('.datepicker');
    M.Datepicker.init(elems, {});

    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});

    var elems = document.querySelectorAll('.carousel');
    M.Carousel.init(elems, {});

});
