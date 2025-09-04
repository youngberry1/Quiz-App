import { quizData } from "./quizData.js";
import { Quiz } from "./quiz.js";

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const timerEl = document.getElementById("timer");

const quiz = new Quiz(quizData);

let selectedAnswer = null;
let timer;
let timeLeft = 15;

// Load current question
function loadQuestion() {
  const currentQ = quiz.getCurrentQuestion();
  questionEl.textContent = currentQ.question;
  answersEl.innerHTML = "";
  nextBtn.disabled = true;
  selectedAnswer = null;

  // Reset timer
  clearInterval(timer);
  timeLeft = 15;
  timerEl.textContent = `Time: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      revealAnswer();
      nextBtn.disabled = false;
    }
  }, 1000);

  // Render answer buttons
  currentQ.answers.forEach((ans, index) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = ans;
    btn.addEventListener("click", () => selectAnswer(index));
    li.appendChild(btn);
    answersEl.appendChild(li);
  });
}

// Handle answer selection
function selectAnswer(index) {
  if (selectedAnswer !== null) return;
  selectedAnswer = index;

  // Highlight selected answer
  Array.from(answersEl.querySelectorAll("button")).forEach((btn, i) => {
    btn.style.background = i === index ? "crimson" : "seaGreen";
    btn.style.color = "white";
  });

  clearInterval(timer);
  nextBtn.disabled = false;
}

// Reveal correct answer (after selection or timer)
function revealAnswer() {
  const currentQ = quiz.getCurrentQuestion();
  Array.from(answersEl.querySelectorAll("button")).forEach((btn, i) => {
    if (i === currentQ.correct) {
      btn.style.background = "green";
      btn.style.color = "white";
    } else if (i === selectedAnswer) {
      btn.style.background = "crimson";
      btn.style.color = "white";
    } else {
      btn.style.background = "gray";
      btn.style.color = "white";
    }
  });
}

// Next button click
nextBtn.addEventListener("click", () => {
  // Check answer if selected
  if (selectedAnswer !== null) {
    quiz.checkAnswer(selectedAnswer);
  }

  revealAnswer(); // show correct answer

  // Short delay before moving to next question
  setTimeout(() => {
    if (quiz.nextQuestion()) {
      loadQuestion();
    } else {
      showResults();
    }
  }, 1000);
});

// Restart quiz
restartBtn.addEventListener("click", () => {
  quiz.currentIndex = 0;
  quiz.score = 0;
  restartBtn.style.display = "none";
  nextBtn.style.display = "inline-block";
  loadQuestion();
});

// Show final score
function showResults() {
  questionEl.textContent = `Quiz finished! Your score: ${quiz.score}/${quiz.quizData.length}`;
  answersEl.innerHTML = "";
  nextBtn.style.display = "none";
  restartBtn.style.display = "inline-block";
  timerEl.textContent = "";
}

// Initial load
loadQuestion();
