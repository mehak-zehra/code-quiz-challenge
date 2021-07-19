//main-content element
var mainEl = document.querySelector(".main-content");
//element to display question
var questionDisplayEl = document.querySelector("#question-display");
//element to display correct/wrong answers
var resultEl = document.querySelector("#result-display");
//timer element
var timerEl = document.querySelector("#timer");
//created row element 
var rowEl = document.querySelector(".row");

// question/answer array
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
//variables
var questionIndex = 0;
var correct = 0;
var timer = 60;

//Start the quiz when the button is pressed
$("#quiz-btn").on("click", function () {
  startQuiz();
});

//When the quiz begins, Timer starts counting down and the main content is removed
var startQuiz = function () {
  mainEl.remove();
  startCountdown();

  //start with the first question
  loadQuestion(0);
}

//Timer countdown function
var startCountdown = function () {
  var timeinterval = setInterval(function () {
    if (timer > -1) {
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

//Loads a single question at the given index
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
    choicebtnEl.className = "btn btn-outline-warning list-group-item list-group-item-action"
    choicebtnEl.setAttribute("selection", i);

    choicebtnEl.addEventListener("click", function () {  
      var myAnswer = this.getAttribute("selection");
      if (myAnswer == questionsArr[questionIndex].correctAnswer) {
        correct++;
        timer += 3;
        resultEl.innerText = "Correct!";

      }
      else {
        timer -= 3;
        resultEl.innerText = "Wrong!"

      }

      //wait half a sec before loading next question
      setTimeout(function () {
        nextQuestion();
      }, 500);

    });

    createQuestionEl.appendChild(choicebtnEl);
  }

  questionDisplayEl.appendChild(createQuestionEl);
}

//Loading next question 
var nextQuestion = function () {
  if (questionIndex >= questionsArr.length - 1) {
    timer = 0;
  }
  else {
    var questionEl = document.querySelector(".question");
    resultEl.innerText = "";
    questionEl.remove();

    loadQuestion(++questionIndex);
  }
}

// when the user done with the quiz or timer runs out. Score will be displayed and user can save their score
var endQuiz = function () {
  questionDisplayEl.remove();
  resultEl.remove();

  var scoreDisplayEl = document.querySelector("#score-display")
  scoreDisplayEl.style.display = "block";

  var scoreDescriptionEl = document.querySelector("#score-description");
  if (correct === 10) {
    scoreDescriptionEl.innerText = "WOW! Congratulation! You got a perfect score!!"
    scoreDescriptionEl.className = "font-weight-bold"
  }
  else if (correct >= 7) {
    scoreDescriptionEl.innerText = "Good Job! You scored " + correct + " out of " + questionsArr.length + " questions correctly.";
  }
  else {
    scoreDescriptionEl.innerText = "You scored " + correct + " out of " + questionsArr.length + " questions correctly. You can do better, Try again!";
  }

  $("#submit-score").on("click", function () {

    var textboxEl = document.querySelector("#inputName");
    var userInitials = textboxEl.value;

    var score = (correct / questionsArr.length) * 100
    var highscores = JSON.parse(localStorage.getItem("highscores"));
    var date = moment().format("MM/DD/YYYY");

    if (!highscores) {
      highscores = [];
    }

    highscores.push({
      "name": userInitials,
      "score": score,
      "date": date
    })

    localStorage.setItem("highscores", JSON.stringify(highscores));
    $("#saveScoreModal").modal('hide');

  })
}