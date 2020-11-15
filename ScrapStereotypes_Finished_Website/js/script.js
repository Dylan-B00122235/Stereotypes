$(document).ready(function() {

var quiz = [{
  "question": "Guess the Course",
  "choices": ["Digital Media", "Social Care", "Digital Marketing", "Cyber Security", "Computing"],
  "correct": "Digital Marketing",
  "image": "images/DigitalMarketing52.png" 
}, {
  "question": "Guess the Course",
  "choices": ["Sports", "Cyber Security", "Art", "Science", "Digital Marketing"],
  "correct": "Cyber Security",
    "image": "images/CyberSecurity4.png"
}, {
    "question": "Guess the Course",
  "choices": ["Cyber Security", "Sports", "Tv and Film", "Digital Marketing", "Engineering" ],
  "correct": "Sports",
    "image": "images/SMC16.png"
}, {
  "question": "Guess the Course",
  "choices": ["Computing", "Engineering", "Science", "Sports", "Digital Media"],
  "correct": "Sports",
    "image": "images/SMC10.png"
}, {
  "question": "Guess the Course",
  "choices": ["Accounting", "Business", "Computing", "Drama", "Sports"],
  "correct": "Computing",
    "image": "images/Computing3.png"
}, {
  "question": "Guess the Course",
  "choices": ["Music", "Digital Media", "Digital Marketing", "Cyber Security", "Business"],
  "correct": "Digital Marketing",
    "image": "images/DigitalMarketing6.png"
}, {
  "question": "Guess the Course",
  "choices": ["Psychology", "Business", "Sports", "Cyber Security", "Engineering"],
  "correct": "Sports",
    "image": "images/SMC21.png"
}, {
  "question": "Guess the Course",
  "choices": ["Business", "Engineering", "Digital Media", "Social Care", "Sports"],
  "correct": "Engineering",
    "image": "images/MechatronicEngineering.png"
}, {
  "question": "Guess the Course",
  "choices": ["Science", "Cyber Security", "Computing", "Social Care", "Engineering"],
  "correct": "Cyber Security",
    "image": "images/CyberSecurity5.png"
}, {
  "question": "Guess the Course",
  "choices": ["Drama", "Engineering", "Law", "Digital Marketing", "Science"],
  "correct": "Digital Marketing",
    "image": "images/DigitalMarketing2.png"
}, {
  "question": "Guess the Course",
  "choices": ["Horticulture", "Computing", "Digital Media", "Psychology", "Sports"],
  "correct": "Computing",
    "image": "images/Computing.png"
}, {
  "question": "Guess the Course",
  "choices": ["Digital Marketing", "Film Studies", "Nursing", "Science", "Sports"],
  "correct": "Digital Marketing",
    "image": "images/DigitalMarketing3.png"
}, {
  "question": "Guess the Course",
  "choices": ["Business", "Engineering", "Digital Media", "Social Care", "Sports"],
  "correct": "Engineering",
    "image": "images/MechatronicEnginnering2.png"
}, {
  "question": "Guess the Course",
  "choices": ["Business", "Science", "Digital Marketing", "Drama", "Sports"],
  "correct": "Sports",
    "image": "images/SMC8.png"
}, {
  "question": "Guess the Course",
  "choices": ["Cyber Security", "Engineering", "Graphic Design", "Social Care", "Horticulture"],
  "correct": "Cyber Security",
    "image": "images/CyberSecurity3.png"
}, {
  "question": "Guess the Course",
  "choices": ["Science", "Sports", "Digital Media", "Psychology", "Engineering"],
  "correct": "Psychology",
    "image": "images/appliedPsychology2.png"
}, {
  "question": "Guess the Course",
  "choices": ["Film Studies", "Journalism", "Digital Marketing", "Engineering", "Sports"],
  "correct": "Digital Marketing",
    "image": "images/DigitalMarketing.png"
}, {
  "question": "Guess the Course",
  "choices": ["Sports", "Engineering", "Journalism", "Social Care", "Psychology"],
  "correct": "Sports",
    "image": "images/SMC.png"
}, {
  "question": "Guess the Course",
  "choices": ["Business", "Music", "MultiMedia", "Accounting", "Sports"],
  "correct": "Sports",
    "image": "images/SMC7.png"
}, {
  "question": "Guess the Course",
  "choices": ["Art", "Film Studies", "Digital Marketing", "Psychology", "Social Care"],
  "correct": "Psychology",
    "image": "images/appliedpsychology.png"

}];


// define elements
var content = $("content"),
  questionContainer = $("question"),
  choicesContainer = $("choices"),
  scoreContainer = $("score"),
  submitBtn = $("submit");


var currentQuestion = 0,
  score = 0,
  askingQuestion = true;

function $(id) { // shortcut for document.getElementById
  return document.getElementById(id);
}

function askQuestion() {
  var choices = quiz[currentQuestion].choices,
    choicesHtml = "";
    
  $("Artimage").src = quiz[currentQuestion].image;

  // loop through choices, and create radio buttons
  for (var i = 0; i < choices.length; i++) {
    choicesHtml += "<input type='radio' name='quiz" + currentQuestion +
      "' id='choice" + (i + 1) +
      "' value='" + choices[i] + "'>" +
      " <label for='choice" + (i + 1) + "'>" + choices[i] + "</label><br>";
  }

  // load the question
  questionContainer.textContent = "Q" + (currentQuestion + 1) + ". " +
    quiz[currentQuestion].question;

  // load the choices
  choicesContainer.innerHTML = choicesHtml;

  // setup for the first time
  if (currentQuestion === 0) {
    scoreContainer.textContent = "Score: 0 right answers out of " +
      quiz.length + " possible.";
    submitBtn.textContent = "Submit Answer";
  }
}

function checkAnswer() {
  // are we asking a question, or proceeding to next question?
  if (askingQuestion) {
    submitBtn.textContent = "Next Question";
    askingQuestion = false;

    // determine which radio button they clicked
    var userpick,
      correctIndex,
      radios = document.getElementsByName("quiz" + currentQuestion);
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) { // if this radio button is checked
        userpick = radios[i].value;
      }

      // get index of correct answer
      if (radios[i].value == quiz[currentQuestion].correct) {
        correctIndex = i;
      }
    }

    // setup if they got it right, or wrong
    var labelStyle = document.getElementsByTagName("label")[correctIndex].style;
    labelStyle.fontWeight = "bold";
    if (userpick == quiz[currentQuestion].correct) {
      score++;
      labelStyle.color = "green";
    } else {
      labelStyle.color = "red";
    }

    scoreContainer.textContent = "Score: " + score + " right answers out of " +
      quiz.length + " possible.";
  } else { // move to next question
    // setting up so user can ask a question
    askingQuestion = true;
    // change button text back to "Submit Answer"
    submitBtn.textContent = "Submit Answer";
    // if we're not on last question, increase question number
    if (currentQuestion < quiz.length - 1) {
      currentQuestion++;
      askQuestion();
    } else {
      showFinalResults();
    }
  }
}

function showFinalResults() {
  content.innerHTML = "<h2>You've Completed the Quiz!</h2>" +
    "<h2>Below are your results:</h2> " +
    "<h2>" + score + " out of " + quiz.length + " questions, " +
    Math.round(score / quiz.length * 100) + "%<h2>";
}

window.addEventListener("load", askQuestion, false);
submitBtn.addEventListener("click", checkAnswer, false);
});