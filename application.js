var answer;
var highScore = 0;
var score = 0;
var correct = false;
$('#high-score').html('High score: ' + highScore);

$('#input').on('keyup', function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    $('#submit').click();
  }
});

$(document).ready(function () {
  hideElements();
});

var hideElements = function () {
  $('#input').hide();
  $('#submit').hide();
  $('#timer').hide();
  $('#problem').hide();
}

$('#play').click(function () {
  score = 0;
  $('#input').val('');
  $('#score').html('Score: ' + score);
  $('#play').hide();
  $('#input').show();
  $('#input').focus();
  $('#submit').show();
  $('#timer').show();
  $('#problem').show();
  $('#tip').hide();
  mathProblem();
  timer();
});

var timer = function () {
  $('#timer').html('10');
  var start = Date.now();
  var timeInterval = setInterval(function () {
  var elapsedTime = Date.now() - start;
  var timeRemaining = 10000 - elapsedTime;
    var timeRemainingDom = Math.round((timeRemaining) / 100) / 10;
    $('#timer').html(timeRemainingDom.toFixed(1));
    if (timeRemaining <= 0) {
      clearInterval(timeInterval);
      hideElements();
      $('#play').show();
    } else if (correct) {
      start += 1000;
      correct = false;
    }
  }, 100);
}

$('#submit').click(function () {
    compareInputAndAnswer();
});

var mathProblem = function () {
  var operators = ['+', '-', '/', '*'];
  var randOperator = operators[Math.floor(Math.random() * 4)];
  var num1 = 1 + Math.floor(Math.random() * 9);
  var num2 = 1 + Math.floor(Math.random() * 9);
  var num3 = num1 * num2;
  var problem;
  if (randOperator == '/') {
    problem = num3 + ' ' + randOperator + ' ' + num1;
  } else if (num1 < num2) {
    problem = num2 + ' ' + randOperator + ' ' + num1;
  } else {
    problem = num1 + ' ' + randOperator + ' ' + num2;
  }
  $('#problem').html(problem);
  answer = Math.round(eval(problem) * 100) / 100;
}

var compareInputAndAnswer = function () {
  var userInput = $('#input').val();
  if (answer == userInput) {
    mathProblem();
    $('#input').val('');
    score += 1;
    if (score > highScore) {
      highScore = score;
      $('#high-score').html('High score: ' + highScore);
    }
    correct = true;
    $('#score').html('Score: ' + score);
  } 
}
