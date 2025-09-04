export class Quiz {
  constructor(quizData) {
    this.quizData = quizData;
    this.currentIndex = 0;
    this.score = 0;
  }



  getCurrentQuestion() {
    return this.quizData[this.currentIndex];
  }


  checkAnswer(answerIndex) {
    if (answerIndex === this.getCurrentQuestion().correct) {
      this.score++;
      return true;
    }
    return false;
  }


  hasNextQuestion() {
    return this.currentIndex < this.quizData.length - 1;
  }


  nextQuestion() {
    if (this.hasNextQuestion()) {
      this.currentIndex++;
      return true;
    }
    return false;
  }
}