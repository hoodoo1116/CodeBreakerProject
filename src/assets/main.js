let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if(answer.value === '' || attempt.value === '') {
        setHiddenFields();
    }

    if(!validateInput(input.value))
        return false;

    attempt.value = +attempt.value + 1;

    if(getResults(input.value)) {
        setMessage("You Win! :)");
        showAnswer(true);
        showReplay();
    } else if(!getResults(input.value) && attempt.value >= 10) {
        setMessage("You Lose! :(");
        showAnswer(false);
        showReplay();
    } else {
        setMessage("Incorrect, try again.");
    }
}

function setHiddenFields() {
    let rand = Math.random();
    let value = Math.floor(rand * Math.floor(9999));
    answer.value = value.toString();

    while(answer.value.length < 4) {
        answer.value = '0' + answer.value;
    }
    attempt.value = 0;
}

//implement new functions here
function setMessage(message) {
   document.getElementById('message').innerHTML = message;
}

function validateInput(guess) {
    if(guess.length === 4)
        return true;

    setMessage("Guesses must be exactly 4 characters long.");
    return false;
}

function getResults(guess) {
    let result = document.getElementById('results');
    let content = '<div class="row"><span class="col-md-6">' + guess + '</span><div class="col-md-6">';
    let numCorrect = 0;
    for(let index = 0; index < guess.length; index++) {
        if(guess.charAt(index) === answer.value.charAt(index)) {
            content += '<span class="glyphicon glyphicon-ok"></span>';
            numCorrect += 1;
        } else if(answer.value.includes(guess.charAt(index))) {
            content += '<span class="glyphicon glyphicon-transfer"></span>';
        } else {
            content += '<span class="glyphicon glyphicon-remove"></span>';
        }
    }
    content += '</div></div>';
    result.innerHTML = content;

    if(numCorrect === 4)
        return true;

    return false;
}

function showAnswer(success) {
    var code = document.getElementById('code');
    code.innerHTML = answer.value;
    code.className = success ? ' success' : ' failure';
}

function showReplay() {
    document.getElementById('guessing-div').style.display = 'none';
    document.getElementById('replay-div').style.display = 'block';
}