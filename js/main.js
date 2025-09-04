import { quizData } from "./quizData.js";
import { Quiz } from "./quiz.js";

const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const nextBtn = document.getElementById('nextBtn');



const quiz = new Quiz(quizData);
let selectedAnswer = null;

function loadQuestion() {
  const currentQ = quiz.getCurrentQuestion();

  questionEl.textContent = currentQ.question;
  answersEl.innerHTML = '';

  currentQ.answers.forEach((ans, index) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.textContent = ans;

    btn.addEventListener('click', () => {
      selectedAnswer = index;
      nextBtn.disabled = false;


      //highlight selection
      Array.from(answersEl.querySelectorAll('button')).forEach(b => b.style.background = 'seaGreen');
      btn.style.background = 'darkOrange';
    })
    li.appendChild(btn);
    answersEl.appendChild(li);
  })

  nextBtn.disabled = true;
}

nextBtn.addEventListener('click', () => {
  if (selectedAnswer !== null) {
    quiz.checkAnswer(selectedAnswer);
    selectedAnswer = null;
  }


  if (quiz.nextQuestion()) {
    loadQuestion();
  } else {
    questionEl.textContent = `Quiz finished! Your score: ${quiz.score}/${quiz.quizData.length}`;
    answersEl.innerHTML = '';
    nextBtn.style.display = 'none';
  }
})


loadQuestion();