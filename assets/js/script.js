var mainEl = document.querySelector(".main-content");
var questionDisplayEl = document.querySelector("#question-display");
var resultEl = document.querySelector("#result-display");
var timerEl = document.querySelector("#timer");
var rowEl = document.querySelector(".row");


var questionsArr = [
  {
    question: "What are variables used for in JavaScript Programs?",
    choices: ["Storing numbers, dates, or other values", "Varying randomly", "Causing high-school algebra flashbacks", "None of the above"],
    correctAnswer: 0
  },
  {
    question: "  ______ tag is an extension to HTML that can enclose any number of JavaScript statements",
    choices: ["<SCRIPT>", "<BODY>", "<HEAD>", "<TITLE>"],
    correctAnswer: 0

  },
  {
    question: "Which of the following event fires when the form element loses the focus: <button>, <input>, <label>, <select>, <textarea>?",
    choices: ["onfocus", "onblur", " onclick", "ondblclick"],
    correctAnswer: 1

  },
  {
    question: "JavaScript is interpreted by _________",
    choices: ["Client", "Server", "Object", "None of the above"],
    correctAnswer: 0
  },
  {
    question: "Is it possible to nest functions in JavaScript?",
    choices: ["True", "False", "Maybe", "None of the above"],
    correctAnswer: 0
  },

  {
    question: "What should appear at the very end of your JavaScript? The <script LANGUAGE='JavaScript'>",
    choices: ["The </script>", " The <script>", "The END statement", "None of the above"],
    correctAnswer: 0

  },

  {
    question: " The _______ method of an Array object adds and/or removes elements from an array.",
    choices: ["Reverse", "Shift", "Slice", "Splice"],
    correctAnswer: 3
  },

  {
    question: " ____________ is the tainted property of a window object",
    choices: ["Pathname", "Protocol", "Defaultstatus", "Host"],
    correctAnswer: 2
  },

  {
    question: "Using _______ statement is how you test for a specific condition.",
    choices: ["Select", "If", "Switch", "For"],
    correctAnswer: 1
  },

  {
    question: " Why so JavaScript and Java have similar name?",
    choices: ["JavaScript is a stripped-down version of Java", "JavaScript's syntax is loosely based on Java's", "They both originated on the island of Java", "None of the above"],
    correctAnswer: 1
  },
]

var questionIndex = 0;
var correct = 0;
var wrong = 0;
var timer = 10;
var userAnswers = [];

$("#quiz-btn").on("click", function () {
  startQuiz();
});

// 
var startQuiz = function () {

  mainEl.remove();
  startCountdown();
  loadQuestion(questionIndex);
}

//function for timer 

var startCountdown = function() {
    var timeinterval = setInterval (function(){
        if(timer > -1){
          timerEl.innerText = timer;
          timer--;
        }
        else {
          timerEl.setAttribute("style", "color: red;")
          clearInterval(timeinterval);
          endQuiz();
        }
    }, 1000)
}


var loadQuestion = function (index) {
  var createQuestionEl = document.createElement("div");
  createQuestionEl.className = "question list-group";

  var qDetailEl = document.createElement("h1");
  qDetailEl.textContent = questionsArr[index].question;
  
  createQuestionEl.appendChild(qDetailEl);

  for (var i = 0; i < 4; i++) {
    var choicebtnEl = document.createElement("button");
    choicebtnEl.textContent = questionsArr[index].choices[i];
    choicebtnEl.type = "button"
    choicebtnEl.className = "btn btn-primary list-group-item list-group-item-action"
    choicebtnEl.setAttribute("selection", i);

    choicebtnEl.addEventListener("click", function () {

      // save selection to my scantron/answerSheet/userAnswers    
      userAnswers[questionIndex] = this.getAttribute("selection");
      if(userAnswers[questionIndex] == questionsArr[questionIndex].correctAnswer){
        correct++; 
        timer += 3;
        resultEl.innerText = "Correct!";
      }
      else {
        wrong++;
        timer  -= 3;
        resultEl.innerText = "Wrong!"

      }
      setTimeout(function() {
        nextQuestion();
      }, 1000);
       
    });

    createQuestionEl.appendChild(choicebtnEl);
  }

  
  questionDisplayEl.appendChild(createQuestionEl);
}

// sorry, this function has a bad name, its not only removing question, its doing more than that. Maybe nextQuestion?
var nextQuestion = function() {
  if(questionIndex >= questionsArr.length - 1) {
    timer = 0;
  }
  else {
    var questionEl = document.querySelector(".question");
    resultEl.innerText = "";
    questionEl.remove();
  
    loadQuestion(++questionIndex);
  }
}

// 
var endQuiz = function()  {

  questionDisplayEl.remove(); 
  resultEl.textContent = "Let's see how you did!";

  

  //create a form for submitting initials
  var formEl = document.createElement("form");
  formEl.setAttribute("id", "initials");
  var inputEl = document.createElement("input");
  inputEl.setAttribute("type", "text");
  inputEl.setAttribute("name", "user-initials");
  inputEl.className = "user-initials";
  inputEl.setAttribute("placeholder", "Enter Your Initials");
  formEl.appendChild(inputEl);

  //submit button

  var submitEl = document.createElement("button");
  submitEl.className = "btn btn-primary";
  submitEl.setAttribute("id", "save-initials");
  submitEl.textContent = "Submit";

  // addEventLister for submit button 
  submitEl.addEventListener("click", function(event){
    // event.preventDefault();

    var textboxEl = document.querySelector(".user-initials");
    var userInitials = textboxEl.value;
    console.log(userInitials);


    var score = (correct/questionsArr.length)*100
    console.log(score + "%");
    console.log("saving score");
    var highscores = JSON.parse(localStorage.getItem("highscores"));
    if(!highscores) {
      highscores = [];
    }
    highscores.push({
      "name" : userInitials,
      "score" : score
    }) 

    console.log(highscores);


    localStorage.setItem("highscores",JSON.stringify(highscores));
  })

  formEl.appendChild(submitEl);
  rowEl.appendChild(formEl);
  console.log("end quiz")

}
// save to highscores -- local storage

var saveHighScore = function() {

 
}

var loadScore = function() {
  
}




