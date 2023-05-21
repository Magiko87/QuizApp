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
  
      // Remove selection from previous answer
      let previousSelected = document.querySelector(".btn.selected");
      if (previousSelected) {
        previousSelected.classList.remove("selected");
      }
  
      showProgress();
    }
  }
  // Guess function
  function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function () {
         // Remove previous selected answer
    let previousSelected = document.getElementsByClassName("selected");
    if (previousSelected.length > 0) {
      previousSelected[0].classList.remove("selected");
    }

    // Add selected class to current answer
    button.classList.add("selected");

    // Process the answer
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
    new Question("Quale era il nome delle Torri gemelle,oggetto dell'attentato dell'11 settembre?", [" Twinks Towers", "Twin Towers", "Twist Towers", "Nessuna delle risposte "],"Twin Towers"),
    new Question("Perché l'ago della bussola punta verso il Nord?", ["La terra è come un magnete e l'ago magnetizzato punta verso il suo polo opposto.","Perchè il metallo conduce la temperatura e il freddo lo attrae","Nessuna delle risposte","Nel Polo nord si trovano più particelle magnetiche che in ogni altra area della terra"], "La terra è come un magnete e l'ago magnetizzato punta verso il suo polo opposto.") ,
    new Question("Chi è stato Presidente degli U.S.A. immediatamente prima di Barack Obama?", ["Jimmy Carter ", "George Bush","Ronald Reagan", "Bill Clinton"], "George Bush"),
    new Question("In che anno il Bergoglio è diventato Papa?", ["2011", "2013", "2015", "2017"],"2013"),
    new Question("In quale capitale è stata approvata la Costituzione dell'Unione Europea?", ["Roma", "Berlino", "Londra", "Bruxelles"], "Roma"),
    new Question("Quando è entrato in vigore in Italia il divieto di fumare nei locali pubblici? ", ["2005", "2002", "2006", "2003"], "2003"),
    new Question("Cosa significa la sigla Ris nell'Arma dei Carabinieri?", [" Reparto indagini sofisticazioni", "Reggimento italiano sottufficiali", "Reparto investigazioni scientifiche", "Raggruppamento italiano soldati"], "Reparto investigazioni scientifiche"),
    new Question("Nei tempi antichi e fino al secolo scorso si chiamava 'Persia'.Qual è il nome odierno di questo paese oggi?", ["Iran", "Kuwait", "Arabia Saudita", "Iraq"], "Iran"),
    new Question("Chi fu soprannominato il 'Flagello di Dio'?", ["Gengis Khan", "Attila", "Napoleone", "Alessandro Magno"], "Attila"),
    new Question("La Capitale dell'Algeria è ?", ["Fez", "Abu Dabi", "Algeri", " Tunisi"], "Algeri"),
  ];
  let quiz = new Quiz(questions);
  
  // Display question
  displayQuestion();
  
  // Countdown timer
  let time = 5;
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
  