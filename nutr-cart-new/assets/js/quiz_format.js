function nextQuestion(questionId) {
    var currentQuestion = document.getElementById(questionId);
    if (currentQuestion) {
        var questions = document.querySelectorAll('.question');
        questions.forEach(function(question) {
            question.style.display = "none";
        });
        currentQuestion.style.display = "block";
    } else {
        var endMsg = document.getElementById("end");
        if (endMsg) {
            endMsg.style.display = "block";
        }
    }
}

function endQuiz() {
    window.location.href = "user.html";
}