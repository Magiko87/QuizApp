// Create a quiz class
class Quiz {
    constructor(questions) {
      this.score = 0;
      this.questions = questions;
      this.questionsIndex = 0;
    }
  
    getQuestionsIndex() {
      return this.questions[this.questionsIndex];
    }
  
    guess(answer) {
      if (this.getQuestionsIndex().isCorrectAnswer(answer)) {
        this.score++;
      }
      this.questionsIndex++;
    }
  
    isEnded() {
      return this.questionsIndex === this.questions.length;
    }
  }
  
  // Create a question class
  class Question {
    constructor(text, choices, answer) {
      this.text = text;
      this.choices = choices;
      this.answer = answer;
    }
  
    isCorrectAnswer(choice) {
      return this.answer === choice;
    }
  }
  
  // Display question
  function displayQuestion() {
    if (quiz.isEnded()) {
      showScores();
    } else {
      // Show question
      let questionElement = document.getElementById("question");
      questionElement.innerHTML = quiz.getQuestionsIndex().text;
  
      // Show options
      let choices = quiz.getQuestionsIndex().choices;
      for (let i = 0; i < choices.length; i++) {
        let choiceElement = document.getElementById("choice" + i);
        choiceElement.innerHTML = choices[i];
        guess("btn" + i, choices[i]);
      }
  
      showProgress();
    }
  }
  
  // Guess function
  function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function () {
      quiz.guess(guess);
      displayQuestion();
    };
  }
  
  // Show quiz progress
  function showProgress() {
    let currentQuestionNumber = quiz.questionsIndex + 1;
    let progressElement = document.getElementById("progress");
    progressElement.innerHTML = `Domanda ${currentQuestionNumber} di ${quiz.questions.length}`;
  }
  
  // Show scores Quiz Completed
  function showScores() {
    let quizEndHTML = `
      <h1>Quiz Completato</h1>
      <h2 id="score">Il Tuo Punteggio: ${quiz.score} di ${quiz.questions.length}</h2>
      <div class="quiz-repeat">
        <a href="index.html">Ripeti il Quiz</a>
      </div>
    `;
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = quizEndHTML;
  }
  
  // Create quiz questions
  let questions = [
    new Question("Per quale azienda lavora ora Marco?", ["Martino Tlc", "Martino", "Tecno2000", "Palazzo Italia"], "Martino"),
    new Question("Quanto è preoccupante la follia di Petillo?", ["Poco", "Abbastanza", "Assai", "Irrecuperabile"], "Irrecuperabile"),
    new Question("Con quanti colleghi va daccordo Mirko?", ["Nessuno", "Pochi", "Molti", "Tutti"], "Pochi"),
    new Question("Di chi è la Cit.'Io sono Palazzo Italia'?", ["Moviola", "Paolo", "Stefano", "Buratti"], "Stefano"),
    new Question("Chi ha inventato l'intuitiva parola 'PIOVE'?", ["Riccardo", "Ivana", "Daniele", "Tarantelli"], "Daniele"),
    // new Question("", ["Paris", "London", "Berlin", "Rome"], "Paris"),
    // new Question("What's the capital of France?", ["Paris", "London", "Berlin", "Rome"], "Paris"),
    // new Question("What's your name?", ["Daniele", "Luca", "Marco", "Gianni"], "Daniele"),
    // new Question("What's your favorite color?", ["Red", "Blue", "Green", "Yellow"], "Blue"),
    // new Question("What's the capital of France?", ["Paris", "London", "Berlin", "Rome"], "Paris"),
  ];
  let quiz = new Quiz(questions);
  
  // Display question
  displayQuestion();
  
  // Countdown timer
  let time = 10;
  let quizTimeInSeconds = time * 60;
  let counting = document.getElementById("count-down");
  
  function startCountdown() {
    let quizTimer = setInterval(function () {
      if (quizTimeInSeconds <= 0) {
        clearInterval(quizTimer);
        showScores();
      } else {
        let minutes = Math.floor(quizTimeInSeconds / 60);
        let seconds = quizTimeInSeconds % 60;
        counting.innerHTML = `TIME: ${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        quizTimeInSeconds--;
      }
    }, 1000);
  }
  
  // Start countdown when the document is loaded
  document.addEventListener("DOMContentLoaded", function () {
    startCountdown();
  });
  