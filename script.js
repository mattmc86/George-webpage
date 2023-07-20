var questions = [
    {
      question: "Stadium of Light",
      choices: ["Sunderland", "Man Utd", "Wolves", "West Ham"],
      correctAnswer: "Sunderland",
    },
    {
      question: "Old Trafford",
      choices: ["Liverpool", "Newcastle", "Man Utd", "Man City"],
      correctAnswer: "Man Utd",
    },
    {
     question: "Stamford Bridge",
       choices: [
       "Crystal Palace",
        "Aston Villa",
        "Tottenham",
        "Chelsea",
      ],
      correctAnswer: "Chelsea",
    },
    {
       question: "Goodison Park",
      choices: ["Everton", "Liverpool", "Leeds", "Newcastle"],
      correctAnswer: "Everton",
    },

]; 
let questionsIndex = 0;

//assigning variables to HTML elements
var questionEl = document.querySelector(".questionContainer");
var enterEl = document.querySelector(".enterScore");
var highScoreEl = document.querySelector(".highScore");
var startEl = document.querySelector("#start-btn");
var timerEl = document.querySelector('.countdown');
var mainEl = document.querySelector('#main');
var answersEl = document.querySelector(".answerContainer");
var showQs = document.getElementById('displayQs');
var responseEL = document.getElementById('#response');
var scoresEl = document.getElementById('scoresList');


//var answerEl = document.querySelector(".answerButton");

function hideItems(){
  enterEl.classList.add('hide');
  highScoreEl.classList.add('hide');
}

hideItems();


function startGame(){
 
  startEl.classList.add('hide');
  createQuestion(questions);
  setTimer();
 
}

startEl.addEventListener("click", function() {
  startGame()
});

  //function to load the first question 
function createQuestion(){
   
   
    //var count = 0;
        //create
       var pEl = document.createElement('p');
       pEl.setAttribute('style', 'font-size:90px');
      
       //update
      // pEl.textContent = questions[count].question;
      pEl.textContent = questions[questionsIndex].question;
      //append
       //questionEl.appendChild(pEl);

       showQs.textContent = questions[questionsIndex].question

       var buttonArea = document.getElementById('answerContainer');
       buttonArea.innerHTML =''
  
       // loop for generating new button for each choice
       for (var i=0; i <=questions[questionsIndex].choices.length; i++){

        var buttonEl = document.createElement("button");
        buttonEl.setAttribute('style', 'background-color: green ;color: white ; padding-left:30px' 
        );
    
        buttonEl.textContent = questions[questionsIndex].choices[i];

        buttonEl.onclick = checkAnswer

        answersEl.appendChild(buttonEl);
  
      }

    }

  let seconds = 360
  let score = 0
  let incorrect = 0


  function checkAnswer(){

    if(this.textContent === questions[questionsIndex].correctAnswer){
      
      alert('correct');
      score += 1
      // var check = "correct";
      // check.textContent = check;
      // responseEL.appendChild(check);
    } else {
      alert ('incorrect');
      incorrect += 
      //timerValue -=10; 
      seconds -= 5;
    }

   questionsIndex++;

   if(questionsIndex === questions.length){
     endGame()
   } else {
     createQuestion()
   }
  }

  function setTimer(){

  var timeInterval = setInterval(function(){

  seconds--
  timerEl.textContent = "Time left " + seconds;

if(seconds === 0 ||questionsIndex === questions.length){
    timerEl.setAttribute('style', 'font-size:50px');
    timerEl.textContent = '0';
    clearInterval(timeInterval);
    //alert("Game Over")
    endGame()
  }

  }, 1000)

  };

// function setTimer(){
//   let timerValue = 30
    
//   var timerMinusSeconds = function (){
//       timerValue --
      
//       let timerCountdown = document.getElementById('timercountdowntext');
//       timerCountdown.innerHTML = "Time =" + timerValue;
      
//       if (timerValue == 0){
//           clearInterval(timerDown)
//       }
//   }
  
//   const timerDown = setInterval(timerMinusSeconds,1000)
    
// }
function endGame (){
  
  scoreTotal.textContent = score;
  //localStorage.setItem("scoreTotal" ,score)
   enterEl.classList.remove('hide');
   questionEl.classList.add('hide');
   answersEl.classList.add('hide');
   //timerEl.classList.add('hide');
   questionsIndex = 0;
  
}


// var userInitials = document.getElementById('#user-initials');
// var initials = document.querySelector('#initials').value;

// function displayInitial (){
//   localStorage.setItem('initials',initials)

// }
// var localInitials = localStorage.getItem('initials');
// userInitials.textContent = localInitials;
// displayInitial();



//var scoreEl = document.getElementById("scoreTotal")
var replayEl = document.getElementById("playAgain");
var submitEl = document.getElementById('submit');
var backEl = document.getElementById('goBack');
var clearEl = document.getElementById('clear');


submitEl.addEventListener("click", function() {
  submitScore();
  viewScore();
  playerInitials = initials.value;
  console.log(playerInitials);
  console.log(score);



});

replayEl.addEventListener("click", function() {
  questionEl.classList.remove('hide');
  answersEl.classList.remove('hide');
  highScoreEl.classList.add('hide');
  enterEl.classList.add('hide');
  seconds = 20
  score = 0
  incorrect = 0
  //timerEl.classList.remove('hide');
  startGame();
  
});

backEl.addEventListener("click", function() {
  //questionEl.classList.remove('hide');
  //answersEl.classList.remove('hide');
  highScoreEl.classList.add('hide');
  enterEl.classList.remove('hide');
  seconds = 20
  score = 0
  incorrect = 0
  //timerEl.classList.remove('hide');
  //startGame();
});

clearEl.addEventListener("click", function() {
  scoresEl.remove();
  
});

function viewScore(){
  highScoreEl.classList.remove('hide');
  enterEl.classList.add('hide');
  
}



function submitScore(){

var scores = JSON.parse(localStorage.getItem("scoreTotal"))|| [];
  initials = initials.value;
  var newScore = { initials, score };
  console.log(newScore)
  scores.push(newScore);
  localStorage.setItem("scoreTotal", JSON.stringify(scores));
  console.log("new score is " + scores);

for (var i = 0; i < scores.length; i++) {
  var scoreItem = document.createElement ("LI");
  
  scoreItem.innerHTML = scores [i].initials + " " + scores [i].score;
  //scoreItem.innerHTML = scores
  console.log("score item is " +scoreItem)
  console.log("scores "+ scores)
  // set the text of this new element
  scoresEl.appendChild(scoreItem);
}
  
}
