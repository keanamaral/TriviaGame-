//jQuery file for Basic Trivia Game
$(document).ready(function (){

//initiating variables and question/answer array
var timerNumber = 101;
var numCorrect = 0;
var numIncorrect = 0;
var numAnswered = 0;
var allResults = [];
var answers = [];
var currentQuestion = 0;
var counter;

var trivia = [
    q1 = {
        question: "What is the only manmade object that is observable from the moon?",
        correct: 3,
        multChoice: ['Pyramids of Egypt', 'Eiffel Tower', 'The Great Wall Of China', 'Statue of Liberty'],
        gif: 'Images/01greatWallofChina.gif'
    },
    q2 = {
        question: "In Peter Pan, Captain Hook had a hook on which part of his body?",
        correct: 2,
        multChoice: ['Right Foot', 'Left Hand', 'Left Foot', 'Right Hand'],
        gif: 'Images/02captainHook.gif'
    },
    q3 = {
        question: "On which island was Napoleon exiled following his defeat at Waterloo?",
        correct: 4,
        multChoice: ['Patmos Island', 'Virgin Islands', 'Sicily', 'St. Helena'],
        gif: 'Images/03StHelena.gif'
    },
    q4 = {
        question: "What is the capital of Australia?",
        correct: 3,
        multChoice: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
        gif: 'Images/04Canberra.gif'
    },
    q5 = {
        question: "What color is NOT on the Flag of India?",
        correct: 1,
        multChoice: ['Red', 'Blue', 'Green', 'Orange'],
        gif: 'Images/05IndiaFlag.gif'
    },
    q6 = {
        question: "Who was the mad monk of Russian history?",
        correct: 4,
        multChoice: ['Vladimir Putin', 'Stalin', 'Vladimir Lenin', 'Rasputin'],
        gif: 'Images/06rasputin.gif'
    },
    q7 = {
        question: "What is the largest fish in the ocean?",
        correct: 3,
        multChoice: ['Blue Whale', 'Giant Squid', 'Whale Shark', 'Jaws'],
        gif: 'Images/07whaleShark.gif'
    },
    q8 = {
        question: "What is the most popular drink in the world that does NOT contain alcohol?",
        correct: 4,
        multChoice: ['Beer', 'Coca-Cola', 'Tea', 'Coffee'],
        gif: 'Images/08coffee.gif'
    },
    q9 = {
        question: "Which is the only vowel on a standard keyboard that is not on the top line of letters?",
        correct: 1,
        multChoice: ["A", "E", "O", "U"],
        gif: 'Images/09letterA.gif'
    },
    q10 = {
        question: 'What is a "skink"?',
        correct: 1,
        multChoice: ['Chocolate Bar', 'Lizard', 'Small River', 'Tree'],
        gif: 'Images/10skink.gif'
    },
    q11 = {
        question: 'In the TV show "South Park," after Kenny died "for good", this character was the gang\'s first replacement:',
        correct: 2,
        multChoice: ['Token', 'Jimmy', 'Butters', 'Timmy'],
        gif: 'Images/11butters.gif'
    },
    q12 = {
        question: "Which is the highest selling music album of all time?",
        correct: 2,
        multChoice: ['Dark Side of the Moon', 'Thriller', 'Metallica', 'Saturday Night Fever'],
        gif: 'Images/12thriller.gif'
    },
    q13 = {
        question: "Most popular basketball team of the NBA of ALL Time?",
        correct: 4,
        multChoice: ['1971-72 L.A. Lakers', '1969-70 New York Knicks', '1966-67 Philadelphia 76ers', '1995-96 Chicago Bulls'],
        gif: 'Images/13chicagoBulls.gif'
    },
    q14 = {
        question: "Most popular music artist of ALL Time?",
        correct: 4,
        multChoice: ['Madonna', 'Elton John', 'Elvis Presley', 'The Beatles'],
        gif: 'Images/14beatles.gif'
    },
    q15 = {
        question: "Most popular Cartoon of ALL Time?",
        correct: 2,
        multChoice: ['The Flintstones', 'Mickey Mouse', 'The Simpsons', 'Tom and Jerry'],
        gif: 'Images/15mickey.gif'
    },
    q16 = {
        question: "Which actor who has one the most Oscar Academy Awards ever?",
        correct: 4,
        multChoice: ['Jack Nicholson', 'Tom Hanks', 'Meryl Streep', 'Katherine Hepburn'],
        gif: 'Images/16katherineHepburn.gif'
    },
    q17 = {
        question: 'Which color is NOT represented on the Mexican flag?',
        correct: 3,
        multChoice: ['Green', 'Red', 'Yellow', 'White'],
        gif: 'Images/17mex.gif'
    }
];

//Functions======================================================
//===============================================================
// helper functions
//  helper function to hide html elements
var hide = function (elementId) {
		$(elementId).css("visibility", "hidden");
	};
// helper function to show html elements
var show = function (elementId) {
		$(elementId).css("visibility", "visible");
	};
// helper function for writing html elements
var write = function (elementId, thing) {
		$(elementId).html('<h3>' + thing + "</h3>")
	};
var start = function() {
	// starts timer counter and loads countDown function
	var counter = setInterval(countDown, 1000);
	// removes start button
	$("#startBtn").remove();
    //write question & answers to DOM
    //show
    show('#timerDiv');
	questionWrite();
};
var countDown = function () {
    // decrement timerNumber
    timerNumber --;
    // write timer to html timerDiv
    $('#timerDiv').html('<h2> Time Remaining: ' + timerNumber + '</h2>');
    // when timer reaches 0
    if (timerNumber == 0) {
       gameOver();
    }
};
//stop timer
var stop = function () {
    clearInterval(counter);
};
// clears all content
var clearScreen = function () {
    $('#timerDiv').empty();
	$('#questionDiv').remove();
}
var gameOver = function(){
	// stop the timer
    stop();
    // clear the question and answers
    clearScreen();
    // show results with game over
    var gameoverMessage = $("<div>");
    gameoverMessage.text("!!! G A M E  O V E R !!!");
    gameoverMessage.attr("id", "endMsg");
    $("#timerDiv").html(gameoverMessage);

	$('#scoreDiv').append('<h3>Here are your results:</h3>');
	$('#scoreDiv').append('<h3>Total Questions Answered: ' + numAnswered + '</h3>');
	$('#scoreDiv').append('<h3>Number of correct answers: ' + numCorrect + '</h3>');
	$('#scoreDiv').append('<h3>Number of incorrect answers: ' + numIncorrect + '</h3>');

    //Create and Show Re-Start button on page loading
    var resetBtn = $("<button>");
    resetBtn.addClass("reset");
    resetBtn.text("Reset Trivia Game");
    resetBtn.attr("id","restartBtn");
    $("#page").append(resetBtn);
};
var reset = function(){
    window.location.reload();
};


//Updating answers array as user keeps clicking and updating the scoring variables
var updateScoring = function(){

    //go through each radio button
    for(var i = 0; i < $('div input[type=radio]').length; i++){
        answers[i] = choice1[i].value;
        console.log("Answers: " + answers);
    };

//    $('div input[type=radio]').each(function(){
        
//        if($(this).is(":checked")){
//            answers.push($(this).attr("value"));
//        }
//    });
//    var length = $('div input[type=radio]').length
    //var allResults = document.getElementById("questionDiv").innerHTML;
    //console.log("Results: " + allResults);
    //for(var i = 0; i < allResults.length; i++){
    //    var answers = allResults[i].value;
    //    console.log("Answers: " + answers);
    //};
}
//Writing Questions and Answer Choices to the page
var questionWrite = function () {
    for(var i = 0; i < trivia.length; i++){
        //Create variable eachQuestion to hold question
        var eachQuestion = $("<div>");
        eachQuestion.addClass("Question");
        eachQuestion.text("Q" + i +": " + trivia[i].question);
        eachQuestion.attr("id","q"+i);
        //Create variable choice1 to hold first choice
        var choice1 = $('<input type="radio">');
        choice1.addClass("Choice");
        choice1.text(trivia[i].multChoice[0]);
        choice1.attr("name",trivia[i].multChoice[0]);
        choice1.attr("value","");
        choice1.attr("checked", false);
        choice1.attr("id","a"+i);
        choice1.attr("a_count","1");
        var label1 = $("<label>");
        label1.attr("for","radio_a");
        label1.text(trivia[i].multChoice[0]);
        //Create variable choice2 to hold second choice
        var choice2 = $('<input type="radio">');
        choice2.addClass("Choice");
        choice2.text(trivia[i].multChoice[1]);
        choice2.attr("name",trivia[i].multChoice[1]);
        choice2.attr("value","");
        choice2.attr("checked", false);
        choice2.attr("id","a"+i);
        choice2.attr("a_count","2");
        var label2 = $("<label>");
        label2.attr("for","radio_b");
        label2.text(trivia[i].multChoice[1]);
        //Create variable choice3 to hold third choice
        var choice3 = $('<input type="radio">');
        choice3.addClass("Choice");
        choice3.text(trivia[i].multChoice[2]);
        choice3.attr("name",trivia[i].multChoice[2]);
        choice3.attr("value","");
        choice3.attr("checked", false);
        choice3.attr("id","a"+i);
        choice3.attr("a_count","3");
        var label3 = $("<label>");
        label3.attr("for","radio_c");
        label3.text(trivia[i].multChoice[2]);
        //Create variable choice4 to hold fourth choice
        var choice4 = $('<input type="radio">');
        choice4.addClass("Choice");
        choice4.text(trivia[i].multChoice[3]);
        choice4.attr("name",trivia[i].multChoice[3]);
        choice4.attr("value","");
        choice4.attr("checked", false);
        choice4.attr("id","a"+i);
        choice4.attr("a_count","4");
        var label4 = $("<label>");
        label4.attr("for","radio_d");
        label4.text(trivia[i].multChoice[3]);
        //add question to the page
        $("#questionDiv").append(eachQuestion)+"<br>";
        //add 4 multiple choice answers radio buttons and answers to the page
        $("#questionDiv").append(choice1);
        $("#questionDiv").append(label1);
        $("#questionDiv").append(choice2);
        $("#questionDiv").append(label2);
        $("#questionDiv").append(choice3);
        $("#questionDiv").append(label3);
        $("#questionDiv").append(choice4);
        $("#questionDiv").append(label4);
    };
};
//Capturing User "choice" clicks and updating variables
$(document).on("click", ".Choice", function(){
    
    var clicked = $(this);
    var idClicked = clicked.attr('id');
    var idChecked = clicked.attr('checked');
    var idValue = clicked.attr('value');
    var ida_count = clicked.attr('a_count');
    console.log("Choice: " + clicked.attr('name')+" "+clicked.attr('value')+" "+clicked.attr('id')+" "+clicked.attr('a_count'));
    switch(idClicked) {
        case "a0":
            if((ida_count == "1")&&(idClicked="a0")){
                $('#a0[a_count="1"]').attr('value',"1");
                $('#a0[a_count="1"]').attr('checked',true);
                $('#a0[a_count="2"]').attr('value',"0");
                $('#a0[a_count="2"]').prop('checked',false);
                $('#a0[a_count="3"]').attr('value',"0");
                $('#a0[a_count="3"]').prop('checked', false);
                $('#a0[a_count="4"]').attr('value',"0");
                $('#a0[a_count="4"]').prop('checked', false);
            } else if((ida_count == "2")&&(idClicked="a0")){
                $('#a0[a_count="1"]').attr('value',"0");
                $('#a0[a_count="1"]').prop('checked',false);
                $('#a0[a_count="2"]').attr('value',"1");
                $('#a0[a_count="2"]').attr('checked',true);
                $('#a0[a_count="3"]').attr('value',"0");
                $('#a0[a_count="3"]').prop('checked',false);
                $('#a0[a_count="4"]').attr('value',"0");
                $('#a0[a_count="4"]').prop('checked',false);
            } else if((ida_count == "3")&&(idClicked="a0")){
                $('#a0[a_count="1"]').attr('value',"0");
                $('#a0[a_count="1"]').prop('checked',false);
                $('#a0[a_count="2"]').attr('value',"0");
                $('#a0[a_count="2"]').prop('checked',false);
                $('#a0[a_count="3"]').attr('value',"1");
                $('#a0[a_count="3"]').attr('checked',true);
                $('#a0[a_count="4"]').attr('value',"0");
                $('#a0[a_count="4"]').prop('checked',false);
            } else if((ida_count == "4")&&(idClicked="a0")){
                $('#a0[a_count="1"]').attr('value',"0");
                $('#a0[a_count="1"]').prop('checked',false);
                $('#a0[a_count="2"]').attr('value',"0");
                $('#a0[a_count="2"]').prop('checked',false);
                $('#a0[a_count="3"]').attr('value',"0");
                $('#a0[a_count="3"]').prop('checked',false);
                $('#a0[a_count="4"]').attr('value',"1");
                $('#a0[a_count="4"]').attr('checked',true);
            };
        break;
        case "a1":
            if((ida_count == "1")&&(idClicked="a1")){
                $('#a1[a_count="1"]').attr('value',"1");
                $('#a1[a_count="1"]').attr('checked',true);
                $('#a1[a_count="2"]').attr('value',"0");
                $('#a1[a_count="2"]').prop('checked',false);
                $('#a1[a_count="3"]').attr('value',"0");
                $('#a1[a_count="3"]').prop('checked', false);
                $('#a1[a_count="4"]').attr('value',"0");
                $('#a1[a_count="4"]').prop('checked', false);
            } else if((ida_count == "2")&&(idClicked="a1")){
                $('#a1[a_count="1"]').attr('value',"0");
                $('#a1[a_count="1"]').prop('checked',false);
                $('#a1[a_count="2"]').attr('value',"1");
                $('#a1[a_count="2"]').attr('checked',true);
                $('#a1[a_count="3"]').attr('value',"0");
                $('#a1[a_count="3"]').prop('checked',false);
                $('#a1[a_count="4"]').attr('value',"0");
                $('#a1[a_count="4"]').prop('checked',false);
            } else if((ida_count == "3")&&(idClicked="a1")){
                $('#a1[a_count="1"]').attr('value',"0");
                $('#a1[a_count="1"]').prop('checked',false);
                $('#a1[a_count="2"]').attr('value',"0");
                $('#a1[a_count="2"]').prop('checked',false);
                $('#a1[a_count="3"]').attr('value',"1");
                $('#a1[a_count="3"]').attr('checked',true);
                $('#a1[a_count="4"]').attr('value',"0");
                $('#a1[a_count="4"]').prop('checked',false);
            } else if((ida_count == "4")&&(idClicked="a1")){
                $('#a1[a_count="1"]').attr('value',"0");
                $('#a1[a_count="1"]').prop('checked',false);
                $('#a1[a_count="2"]').attr('value',"0");
                $('#a1[a_count="2"]').prop('checked',false);
                $('#a1[a_count="3"]').attr('value',"0");
                $('#a1[a_count="3"]').prop('checked',false);
                $('#a1[a_count="4"]').attr('value',"1");
                $('#a1[a_count="4"]').attr('checked',true);
            };
        break;
        case "a2":
            if((ida_count == "1")&&(idClicked="a2")){
                $('#a2[a_count="1"]').attr('value',"1");
                $('#a2[a_count="1"]').attr('checked',true);
                $('#a2[a_count="2"]').attr('value',"0");
                $('#a2[a_count="2"]').prop('checked',false);
                $('#a2[a_count="3"]').attr('value',"0");
                $('#a2[a_count="3"]').prop('checked', false);
                $('#a2[a_count="4"]').attr('value',"0");
                $('#a2[a_count="4"]').prop('checked', false);
            } else if((ida_count == "2")&&(idClicked="a2")){
                $('#a2[a_count="1"]').attr('value',"0");
                $('#a2[a_count="1"]').prop('checked',false);
                $('#a2[a_count="2"]').attr('value',"1");
                $('#a2[a_count="2"]').attr('checked',true);
                $('#a2[a_count="3"]').attr('value',"0");
                $('#a2[a_count="3"]').prop('checked',false);
                $('#a2[a_count="4"]').attr('value',"0");
                $('#a2[a_count="4"]').prop('checked',false);
            } else if((ida_count == "3")&&(idClicked="a2")){
                $('#a2[a_count="1"]').attr('value',"0");
                $('#a2[a_count="1"]').prop('checked',false);
                $('#a2[a_count="2"]').attr('value',"0");
                $('#a2[a_count="2"]').prop('checked',false);
                $('#a2[a_count="3"]').attr('value',"1");
                $('#a2[a_count="3"]').attr('checked',true);
                $('#a2[a_count="4"]').attr('value',"0");
                $('#a2[a_count="4"]').prop('checked',false);
            } else if((ida_count == "4")&&(idClicked="a2")){
                $('#a2[a_count="1"]').attr('value',"0");
                $('#a2[a_count="1"]').prop('checked',false);
                $('#a2[a_count="2"]').attr('value',"0");
                $('#a2[a_count="2"]').prop('checked',false);
                $('#a2[a_count="3"]').attr('value',"0");
                $('#a2[a_count="3"]').prop('checked',false);
                $('#a2[a_count="4"]').attr('value',"1");
                $('#a2[a_count="4"]').attr('checked',true);
            };
        break;
        case "a3":
            if((ida_count == "1")&&(idClicked="a3")){
                $('#a3[a_count="1"]').attr('value',"1");
                $('#a3[a_count="1"]').attr('checked',true);
                $('#a3[a_count="2"]').attr('value',"0");
                $('#a3[a_count="2"]').prop('checked',false);
                $('#a3[a_count="3"]').attr('value',"0");
                $('#a3[a_count="3"]').prop('checked', false);
                $('#a3[a_count="4"]').attr('value',"0");
                $('#a3[a_count="4"]').prop('checked', false);
            } else if((ida_count == "2")&&(idClicked="a3")){
                $('#a3[a_count="1"]').attr('value',"0");
                $('#a3[a_count="1"]').prop('checked',false);
                $('#a3[a_count="2"]').attr('value',"1");
                $('#a3[a_count="2"]').attr('checked',true);
                $('#a3[a_count="3"]').attr('value',"0");
                $('#a3[a_count="3"]').prop('checked',false);
                $('#a3[a_count="4"]').attr('value',"0");
                $('#a3[a_count="4"]').prop('checked',false);
            } else if((ida_count == "3")&&(idClicked="a3")){
                $('#a3[a_count="1"]').attr('value',"0");
                $('#a3[a_count="1"]').prop('checked',false);
                $('#a3[a_count="2"]').attr('value',"0");
                $('#a3[a_count="2"]').prop('checked',false);
                $('#a3[a_count="3"]').attr('value',"1");
                $('#a3[a_count="3"]').attr('checked',true);
                $('#a3[a_count="4"]').attr('value',"0");
                $('#a3[a_count="4"]').prop('checked',false);
            } else if((ida_count == "4")&&(idClicked="a3")){
                $('#a3[a_count="1"]').attr('value',"0");
                $('#a3[a_count="1"]').prop('checked',false);
                $('#a3[a_count="2"]').attr('value',"0");
                $('#a3[a_count="2"]').prop('checked',false);
                $('#a3[a_count="3"]').attr('value',"0");
                $('#a3[a_count="3"]').prop('checked',false);
                $('#a3[a_count="4"]').attr('value',"1");
                $('#a3[a_count="4"]').attr('checked',true);
            };
        break;
        case "a4":
            if((ida_count == "1")&&(idClicked="a4")){
                $('#a4[a_count="1"]').attr('value',"1");
                $('#a4[a_count="1"]').attr('checked',true);
                $('#a4[a_count="2"]').attr('value',"0");
                $('#a4[a_count="2"]').prop('checked',false);
                $('#a4[a_count="3"]').attr('value',"0");
                $('#a4[a_count="3"]').prop('checked', false);
                $('#a4[a_count="4"]').attr('value',"0");
                $('#a4[a_count="4"]').prop('checked', false);
            } else if((ida_count == "2")&&(idClicked="a4")){
                $('#a4[a_count="1"]').attr('value',"0");
                $('#a4[a_count="1"]').prop('checked',false);
                $('#a4[a_count="2"]').attr('value',"1");
                $('#a4[a_count="2"]').attr('checked',true);
                $('#a4[a_count="3"]').attr('value',"0");
                $('#a4[a_count="3"]').prop('checked',false);
                $('#a4[a_count="4"]').attr('value',"0");
                $('#a4[a_count="4"]').prop('checked',false);
            } else if((ida_count == "3")&&(idClicked="a4")){
                $('#a4[a_count="1"]').attr('value',"0");
                $('#a4[a_count="1"]').prop('checked',false);
                $('#a4[a_count="2"]').attr('value',"0");
                $('#a4[a_count="2"]').prop('checked',false);
                $('#a4[a_count="3"]').attr('value',"1");
                $('#a4[a_count="3"]').attr('checked',true);
                $('#a4[a_count="4"]').attr('value',"0");
                $('#a4[a_count="4"]').prop('checked',false);
            } else if((ida_count == "4")&&(idClicked="a4")){
                $('#a4[a_count="1"]').attr('value',"0");
                $('#a4[a_count="1"]').prop('checked',false);
                $('#a4[a_count="2"]').attr('value',"0");
                $('#a4[a_count="2"]').prop('checked',false);
                $('#a4[a_count="3"]').attr('value',"0");
                $('#a4[a_count="3"]').prop('checked',false);
                $('#a4[a_count="4"]').attr('value',"1");
                $('#a4[a_count="4"]').attr('checked',true);
            };
        break;
        case "a5":
            if((ida_count == "1")&&(idClicked="a5")){
                $('#a5[a_count="1"]').attr('value',"1");
                $('#a5[a_count="1"]').attr('checked',true);
                $('#a5[a_count="2"]').attr('value',"0");
                $('#a5[a_count="2"]').prop('checked',false);
                $('#a5[a_count="3"]').attr('value',"0");
                $('#a5[a_count="3"]').prop('checked', false);
                $('#a5[a_count="4"]').attr('value',"0");
                $('#a5[a_count="4"]').prop('checked', false);
            } else if((ida_count == "2")&&(idClicked="a5")){
                $('#a5[a_count="1"]').attr('value',"0");
                $('#a5[a_count="1"]').prop('checked',false);
                $('#a5[a_count="2"]').attr('value',"1");
                $('#a5[a_count="2"]').attr('checked',true);
                $('#a5[a_count="3"]').attr('value',"0");
                $('#a5[a_count="3"]').prop('checked',false);
                $('#a5[a_count="4"]').attr('value',"0");
                $('#a5[a_count="4"]').prop('checked',false);
            } else if((ida_count == "3")&&(idClicked="a5")){
                $('#a5[a_count="1"]').attr('value',"0");
                $('#a5[a_count="1"]').prop('checked',false);
                $('#a5[a_count="2"]').attr('value',"0");
                $('#a5[a_count="2"]').prop('checked',false);
                $('#a5[a_count="3"]').attr('value',"1");
                $('#a5[a_count="3"]').attr('checked',true);
                $('#a5[a_count="4"]').attr('value',"0");
                $('#a5[a_count="4"]').prop('checked',false);
            } else if((ida_count == "4")&&(idClicked="a5")){
                $('#a5[a_count="1"]').attr('value',"0");
                $('#a5[a_count="1"]').prop('checked',false);
                $('#a5[a_count="2"]').attr('value',"0");
                $('#a5[a_count="2"]').prop('checked',false);
                $('#a5[a_count="3"]').attr('value',"0");
                $('#a5[a_count="3"]').prop('checked',false);
                $('#a5[a_count="4"]').attr('value',"1");
                $('#a5[a_count="4"]').attr('checked',true);
            };
        break;
        case "a6":
            if((ida_count == "1")&&(idClicked="a6")){
                $('#a6[a_count="1"]').attr('value',"1");
                $('#a6[a_count="1"]').attr('checked',true);
                $('#a6[a_count="2"]').attr('value',"0");
                $('#a6[a_count="2"]').prop('checked',false);
                $('#a6[a_count="3"]').attr('value',"0");
                $('#a6[a_count="3"]').prop('checked', false);
                $('#a6[a_count="4"]').attr('value',"0");
                $('#a6[a_count="4"]').prop('checked', false);
            } else if((ida_count == "2")&&(idClicked="a6")){
                $('#a6[a_count="1"]').attr('value',"0");
                $('#a6[a_count="1"]').prop('checked',false);
                $('#a6[a_count="2"]').attr('value',"1");
                $('#a6[a_count="2"]').attr('checked',true);
                $('#a6[a_count="3"]').attr('value',"0");
                $('#a6[a_count="3"]').prop('checked',false);
                $('#a6[a_count="4"]').attr('value',"0");
                $('#a6[a_count="4"]').prop('checked',false);
            } else if((ida_count == "3")&&(idClicked="a6")){
                $('#a6[a_count="1"]').attr('value',"0");
                $('#a6[a_count="1"]').prop('checked',false);
                $('#a6[a_count="2"]').attr('value',"0");
                $('#a6[a_count="2"]').prop('checked',false);
                $('#a6[a_count="3"]').attr('value',"1");
                $('#a6[a_count="3"]').attr('checked',true);
                $('#a6[a_count="4"]').attr('value',"0");
                $('#a6[a_count="4"]').prop('checked',false);
            } else if((ida_count == "4")&&(idClicked="a6")){
                $('#a6[a_count="1"]').attr('value',"0");
                $('#a6[a_count="1"]').prop('checked',false);
                $('#a6[a_count="2"]').attr('value',"0");
                $('#a6[a_count="2"]').prop('checked',false);
                $('#a6[a_count="3"]').attr('value',"0");
                $('#a6[a_count="3"]').prop('checked',false);
                $('#a6[a_count="4"]').attr('value',"1");
                $('#a6[a_count="4"]').attr('checked',true);
            };
        break;
        case "a7":
            if((ida_count == "1")&&(idClicked="a7")){
                $('#a7[a_count="1"]').attr('value',"1");
                $('#a7[a_count="1"]').attr('checked',true);
                $('#a7[a_count="2"]').attr('value',"0");
                $('#a7[a_count="2"]').prop('checked',false);
                $('#a7[a_count="3"]').attr('value',"0");
                $('#a7[a_count="3"]').prop('checked', false);
                $('#a7[a_count="4"]').attr('value',"0");
                $('#a7[a_count="4"]').prop('checked', false);
            } else if((ida_count == "2")&&(idClicked="a7")){
                $('#a7[a_count="1"]').attr('value',"0");
                $('#a7[a_count="1"]').prop('checked',false);
                $('#a7[a_count="2"]').attr('value',"1");
                $('#a7[a_count="2"]').attr('checked',true);
                $('#a7[a_count="3"]').attr('value',"0");
                $('#a7[a_count="3"]').prop('checked',false);
                $('#a7[a_count="4"]').attr('value',"0");
                $('#a7[a_count="4"]').prop('checked',false);
            } else if((ida_count == "3")&&(idClicked="a7")){
                $('#a7[a_count="1"]').attr('value',"0");
                $('#a7[a_count="1"]').prop('checked',false);
                $('#a7[a_count="2"]').attr('value',"0");
                $('#a7[a_count="2"]').prop('checked',false);
                $('#a7[a_count="3"]').attr('value',"1");
                $('#a7[a_count="3"]').attr('checked',true);
                $('#a7[a_count="4"]').attr('value',"0");
                $('#a7[a_count="4"]').prop('checked',false);
            } else if((ida_count == "4")&&(idClicked="a7")){
                $('#a7[a_count="1"]').attr('value',"0");
                $('#a7[a_count="1"]').prop('checked',false);
                $('#a7[a_count="2"]').attr('value',"0");
                $('#a7[a_count="2"]').prop('checked',false);
                $('#a7[a_count="3"]').attr('value',"0");
                $('#a7[a_count="3"]').prop('checked',false);
                $('#a7[a_count="4"]').attr('value',"1");
                $('#a7[a_count="4"]').attr('checked',true);
            };
        break;
        case "a8":
            if((ida_count == "1")&&(idClicked="a8")){
                $('#a8[a_count="1"]').attr('value',"1");
                $('#a8[a_count="1"]').attr('checked',true);
                $('#a8[a_count="2"]').attr('value',"0");
                $('#a8[a_count="2"]').prop('checked',false);
                $('#a8[a_count="3"]').attr('value',"0");
                $('#a8[a_count="3"]').prop('checked', false);
                $('#a8[a_count="4"]').attr('value',"0");
                $('#a8[a_count="4"]').prop('checked', false);
            } else if((ida_count == "2")&&(idClicked="a8")){
                $('#a8[a_count="1"]').attr('value',"0");
                $('#a8[a_count="1"]').prop('checked',false);
                $('#a8[a_count="2"]').attr('value',"1");
                $('#a8[a_count="2"]').attr('checked',true);
                $('#a8[a_count="3"]').attr('value',"0");
                $('#a8[a_count="3"]').prop('checked',false);
                $('#a8[a_count="4"]').attr('value',"0");
                $('#a8[a_count="4"]').prop('checked',false);
            } else if((ida_count == "3")&&(idClicked="a8")){
                $('#a8[a_count="1"]').attr('value',"0");
                $('#a8[a_count="1"]').prop('checked',false);
                $('#a8[a_count="2"]').attr('value',"0");
                $('#a8[a_count="2"]').prop('checked',false);
                $('#a8[a_count="3"]').attr('value',"1");
                $('#a8[a_count="3"]').attr('checked',true);
                $('#a8[a_count="4"]').attr('value',"0");
                $('#a8[a_count="4"]').prop('checked',false);
            } else if((ida_count == "4")&&(idClicked="a8")){
                $('#a8[a_count="1"]').attr('value',"0");
                $('#a8[a_count="1"]').prop('checked',false);
                $('#a8[a_count="2"]').attr('value',"0");
                $('#a8[a_count="2"]').prop('checked',false);
                $('#a8[a_count="3"]').attr('value',"0");
                $('#a8[a_count="3"]').prop('checked',false);
                $('#a8[a_count="4"]').attr('value',"1");
                $('#a8[a_count="4"]').attr('checked',true);
            };
        break;
        case "a9":
            if((ida_count == "1")&&(idClicked="a9")){
                $('#a9[a_count="1"]').attr('value',"1");
                $('#a9[a_count="1"]').attr('checked',true);
                $('#a9[a_count="2"]').attr('value',"0");
                $('#a9[a_count="2"]').prop('checked',false);
                $('#a9[a_count="3"]').attr('value',"0");
                $('#a9[a_count="3"]').prop('checked', false);
                $('#a9[a_count="4"]').attr('value',"0");
                $('#a9[a_count="4"]').prop('checked', false);
            } else if((ida_count == "2")&&(idClicked="a9")){
                $('#a9[a_count="1"]').attr('value',"0");
                $('#a9[a_count="1"]').prop('checked',false);
                $('#a9[a_count="2"]').attr('value',"1");
                $('#a9[a_count="2"]').attr('checked',true);
                $('#a9[a_count="3"]').attr('value',"0");
                $('#a9[a_count="3"]').prop('checked',false);
                $('#a9[a_count="4"]').attr('value',"0");
                $('#a9[a_count="4"]').prop('checked',false);
            } else if((ida_count == "3")&&(idClicked="a9")){
                $('#a9[a_count="1"]').attr('value',"0");
                $('#a9[a_count="1"]').prop('checked',false);
                $('#a9[a_count="2"]').attr('value',"0");
                $('#a9[a_count="2"]').prop('checked',false);
                $('#a9[a_count="3"]').attr('value',"1");
                $('#a9[a_count="3"]').attr('checked',true);
                $('#a9[a_count="4"]').attr('value',"0");
                $('#a9[a_count="4"]').prop('checked',false);
            } else if((ida_count == "4")&&(idClicked="a9")){
                $('#a9[a_count="1"]').attr('value',"0");
                $('#a9[a_count="1"]').prop('checked',false);
                $('#a9[a_count="2"]').attr('value',"0");
                $('#a9[a_count="2"]').prop('checked',false);
                $('#a9[a_count="3"]').attr('value',"0");
                $('#a9[a_count="3"]').prop('checked',false);
                $('#a9[a_count="4"]').attr('value',"1");
                $('#a9[a_count="4"]').attr('checked',true);
            };
        break;
        case "a10":
            if((ida_count == "1")&&(idClicked="a10")){
                $('#a10[a_count="1"]').attr('value',"1");
                $('#a10[a_count="1"]').attr('checked',true);
                $('#a10[a_count="2"]').attr('value',"0");
                $('#a10[a_count="2"]').prop('checked',false);
                $('#a10[a_count="3"]').attr('value',"0");
                $('#a10[a_count="3"]').prop('checked', false);
                $('#a10[a_count="4"]').attr('value',"0");
                $('#a10[a_count="4"]').prop('checked', false);
            } else if((ida_count == "2")&&(idClicked="a10")){
                $('#a10[a_count="1"]').attr('value',"0");
                $('#a10[a_count="1"]').prop('checked',false);
                $('#a10[a_count="2"]').attr('value',"1");
                $('#a10[a_count="2"]').attr('checked',true);
                $('#a10[a_count="3"]').attr('value',"0");
                $('#a10[a_count="3"]').prop('checked',false);
                $('#a10[a_count="4"]').attr('value',"0");
                $('#a10[a_count="4"]').prop('checked',false);
            } else if((ida_count == "3")&&(idClicked="a10")){
                $('#a10[a_count="1"]').attr('value',"0");
                $('#a10[a_count="1"]').prop('checked',false);
                $('#a10[a_count="2"]').attr('value',"0");
                $('#a10[a_count="2"]').prop('checked',false);
                $('#a10[a_count="3"]').attr('value',"1");
                $('#a10[a_count="3"]').attr('checked',true);
                $('#a10[a_count="4"]').attr('value',"0");
                $('#a10[a_count="4"]').prop('checked',false);
            } else if((ida_count == "4")&&(idClicked="a10")){
                $('#a10[a_count="1"]').attr('value',"0");
                $('#a10[a_count="1"]').prop('checked',false);
                $('#a10[a_count="2"]').attr('value',"0");
                $('#a10[a_count="2"]').prop('checked',false);
                $('#a10[a_count="3"]').attr('value',"0");
                $('#a10[a_count="3"]').prop('checked',false);
                $('#a10[a_count="4"]').attr('value',"1");
                $('#a10[a_count="4"]').attr('checked',true);
            };
        break;
        case "a11":
            if((ida_count == "1")&&(idClicked="a11")){
                $('#a11[a_count="1"]').attr('value',"1");
                $('#a11[a_count="1"]').attr('checked',true);
                $('#a11[a_count="2"]').attr('value',"0");
                $('#a11[a_count="2"]').prop('checked',false);
                $('#a11[a_count="3"]').attr('value',"0");
                $('#a11[a_count="3"]').prop('checked', false);
                $('#a11[a_count="4"]').attr('value',"0");
                $('#a11[a_count="4"]').prop('checked', false);
            } else if((ida_count == "2")&&(idClicked="a11")){
                $('#a11[a_count="1"]').attr('value',"0");
                $('#a11[a_count="1"]').prop('checked',false);
                $('#a11[a_count="2"]').attr('value',"1");
                $('#a11[a_count="2"]').attr('checked',true);
                $('#a11[a_count="3"]').attr('value',"0");
                $('#a11[a_count="3"]').prop('checked',false);
                $('#a11[a_count="4"]').attr('value',"0");
                $('#a11[a_count="4"]').prop('checked',false);
            } else if((ida_count == "3")&&(idClicked="a11")){
                $('#a11[a_count="1"]').attr('value',"0");
                $('#a11[a_count="1"]').prop('checked',false);
                $('#a11[a_count="2"]').attr('value',"0");
                $('#a11[a_count="2"]').prop('checked',false);
                $('#a11[a_count="3"]').attr('value',"1");
                $('#a11[a_count="3"]').attr('checked',true);
                $('#a11[a_count="4"]').attr('value',"0");
                $('#a11[a_count="4"]').prop('checked',false);
            } else if((ida_count == "4")&&(idClicked="a11")){
                $('#a11[a_count="1"]').attr('value',"0");
                $('#a11[a_count="1"]').prop('checked',false);
                $('#a11[a_count="2"]').attr('value',"0");
                $('#a11[a_count="2"]').prop('checked',false);
                $('#a11[a_count="3"]').attr('value',"0");
                $('#a11[a_count="3"]').prop('checked',false);
                $('#a11[a_count="4"]').attr('value',"1");
                $('#a11[a_count="4"]').attr('checked',true);
            };
        break;
        case "a12":
            if((ida_count == "1")&&(idClicked="a12")){
                $('#a12[a_count="1"]').attr('value',"1");
                $('#a12[a_count="1"]').attr('checked',true);
                $('#a12[a_count="2"]').attr('value',"0");
                $('#a12[a_count="2"]').prop('checked',false);
                $('#a12[a_count="3"]').attr('value',"0");
                $('#a12[a_count="3"]').prop('checked', false);
                $('#a12[a_count="4"]').attr('value',"0");
                $('#a12[a_count="4"]').prop('checked', false);
            } else if((ida_count == "2")&&(idClicked="a12")){
                $('#a12[a_count="1"]').attr('value',"0");
                $('#a12[a_count="1"]').prop('checked',false);
                $('#a12[a_count="2"]').attr('value',"1");
                $('#a12[a_count="2"]').attr('checked',true);
                $('#a12[a_count="3"]').attr('value',"0");
                $('#a12[a_count="3"]').prop('checked',false);
                $('#a12[a_count="4"]').attr('value',"0");
                $('#a12[a_count="4"]').prop('checked',false);
            } else if((ida_count == "3")&&(idClicked="a12")){
                $('#a12[a_count="1"]').attr('value',"0");
                $('#a12[a_count="1"]').prop('checked',false);
                $('#a12[a_count="2"]').attr('value',"0");
                $('#a12[a_count="2"]').prop('checked',false);
                $('#a12[a_count="3"]').attr('value',"1");
                $('#a12[a_count="3"]').attr('checked',true);
                $('#a12[a_count="4"]').attr('value',"0");
                $('#a12[a_count="4"]').prop('checked',false);
            } else if((ida_count == "4")&&(idClicked="a12")){
                $('#a12[a_count="1"]').attr('value',"0");
                $('#a12[a_count="1"]').prop('checked',false);
                $('#a12[a_count="2"]').attr('value',"0");
                $('#a12[a_count="2"]').prop('checked',false);
                $('#a12[a_count="3"]').attr('value',"0");
                $('#a12[a_count="3"]').prop('checked',false);
                $('#a12[a_count="4"]').attr('value',"1");
                $('#a12[a_count="4"]').attr('checked',true);
            };
        break;
        case "a13":
            if((ida_count == "1")&&(idClicked="a13")){
                $('#a13[a_count="1"]').attr('value',"1");
                $('#a13[a_count="1"]').attr('checked',true);
                $('#a13[a_count="2"]').attr('value',"0");
                $('#a13[a_count="2"]').prop('checked',false);
                $('#a13[a_count="3"]').attr('value',"0");
                $('#a13[a_count="3"]').prop('checked', false);
                $('#a13[a_count="4"]').attr('value',"0");
                $('#a13[a_count="4"]').prop('checked', false);
            } else if((ida_count == "2")&&(idClicked="a13")){
                $('#a13[a_count="1"]').attr('value',"0");
                $('#a13[a_count="1"]').prop('checked',false);
                $('#a13[a_count="2"]').attr('value',"1");
                $('#a13[a_count="2"]').attr('checked',true);
                $('#a13[a_count="3"]').attr('value',"0");
                $('#a13[a_count="3"]').prop('checked',false);
                $('#a13[a_count="4"]').attr('value',"0");
                $('#a13[a_count="4"]').prop('checked',false);
            } else if((ida_count == "3")&&(idClicked="a13")){
                $('#a13[a_count="1"]').attr('value',"0");
                $('#a13[a_count="1"]').prop('checked',false);
                $('#a13[a_count="2"]').attr('value',"0");
                $('#a13[a_count="2"]').prop('checked',false);
                $('#a13[a_count="3"]').attr('value',"1");
                $('#a13[a_count="3"]').attr('checked',true);
                $('#a13[a_count="4"]').attr('value',"0");
                $('#a13[a_count="4"]').prop('checked',false);
            } else if((ida_count == "4")&&(idClicked="a13")){
                $('#a13[a_count="1"]').attr('value',"0");
                $('#a13[a_count="1"]').prop('checked',false);
                $('#a13[a_count="2"]').attr('value',"0");
                $('#a13[a_count="2"]').prop('checked',false);
                $('#a13[a_count="3"]').attr('value',"0");
                $('#a13[a_count="3"]').prop('checked',false);
                $('#a13[a_count="4"]').attr('value',"1");
                $('#a13[a_count="4"]').attr('checked',true);
            };
        break;
        case "a14":
            if((ida_count == "1")&&(idClicked="a14")){
                $('#a14[a_count="1"]').attr('value',"1");
                $('#a14[a_count="1"]').attr('checked',true);
                $('#a14[a_count="2"]').attr('value',"0");
                $('#a14[a_count="2"]').prop('checked',false);
                $('#a14[a_count="3"]').attr('value',"0");
                $('#a14[a_count="3"]').prop('checked', false);
                $('#a14[a_count="4"]').attr('value',"0");
                $('#a14[a_count="4"]').prop('checked', false);
            } else if((ida_count == "2")&&(idClicked="a14")){
                $('#a14[a_count="1"]').attr('value',"0");
                $('#a14[a_count="1"]').prop('checked',false);
                $('#a14[a_count="2"]').attr('value',"1");
                $('#a14[a_count="2"]').attr('checked',true);
                $('#a14[a_count="3"]').attr('value',"0");
                $('#a14[a_count="3"]').prop('checked',false);
                $('#a14[a_count="4"]').attr('value',"0");
                $('#a14[a_count="4"]').prop('checked',false);
            } else if((ida_count == "3")&&(idClicked="a14")){
                $('#a14[a_count="1"]').attr('value',"0");
                $('#a14[a_count="1"]').prop('checked',false);
                $('#a14[a_count="2"]').attr('value',"0");
                $('#a14[a_count="2"]').prop('checked',false);
                $('#a14[a_count="3"]').attr('value',"1");
                $('#a14[a_count="3"]').attr('checked',true);
                $('#a14[a_count="4"]').attr('value',"0");
                $('#a14[a_count="4"]').prop('checked',false);
            } else if((ida_count == "4")&&(idClicked="a14")){
                $('#a14[a_count="1"]').attr('value',"0");
                $('#a14[a_count="1"]').prop('checked',false);
                $('#a14[a_count="2"]').attr('value',"0");
                $('#a14[a_count="2"]').prop('checked',false);
                $('#a14[a_count="3"]').attr('value',"0");
                $('#a14[a_count="3"]').prop('checked',false);
                $('#a14[a_count="4"]').attr('value',"1");
                $('#a14[a_count="4"]').attr('checked',true);
            };
        break;
        case "a15":
            if((ida_count == "1")&&(idClicked="a15")){
                $('#a15[a_count="1"]').attr('value',"1");
                $('#a15[a_count="1"]').attr('checked',true);
                $('#a15[a_count="2"]').attr('value',"0");
                $('#a15[a_count="2"]').prop('checked',false);
                $('#a15[a_count="3"]').attr('value',"0");
                $('#a15[a_count="3"]').prop('checked', false);
                $('#a15[a_count="4"]').attr('value',"0");
                $('#a15[a_count="4"]').prop('checked', false);
            } else if((ida_count == "2")&&(idClicked="a15")){
                $('#a15[a_count="1"]').attr('value',"0");
                $('#a15[a_count="1"]').prop('checked',false);
                $('#a15[a_count="2"]').attr('value',"1");
                $('#a15[a_count="2"]').attr('checked',true);
                $('#a15[a_count="3"]').attr('value',"0");
                $('#a15[a_count="3"]').prop('checked',false);
                $('#a15[a_count="4"]').attr('value',"0");
                $('#a15[a_count="4"]').prop('checked',false);
            } else if((ida_count == "3")&&(idClicked="a15")){
                $('#a15[a_count="1"]').attr('value',"0");
                $('#a15[a_count="1"]').prop('checked',false);
                $('#a15[a_count="2"]').attr('value',"0");
                $('#a15[a_count="2"]').prop('checked',false);
                $('#a15[a_count="3"]').attr('value',"1");
                $('#a15[a_count="3"]').attr('checked',true);
                $('#a15[a_count="4"]').attr('value',"0");
                $('#a15[a_count="4"]').prop('checked',false);
            } else if((ida_count == "4")&&(idClicked="a15")){
                $('#a15[a_count="1"]').attr('value',"0");
                $('#a15[a_count="1"]').prop('checked',false);
                $('#a15[a_count="2"]').attr('value',"0");
                $('#a15[a_count="2"]').prop('checked',false);
                $('#a15[a_count="3"]').attr('value',"0");
                $('#a15[a_count="3"]').prop('checked',false);
                $('#a15[a_count="4"]').attr('value',"1");
                $('#a15[a_count="4"]').attr('checked',true);
            };
        break;
        case "a16":
            if((ida_count == "1")&&(idClicked="a16")){
                $('#a16[a_count="1"]').attr('value',"1");
                $('#a16[a_count="1"]').attr('checked',true);
                $('#a16[a_count="2"]').attr('value',"0");
                $('#a16[a_count="2"]').prop('checked',false);
                $('#a16[a_count="3"]').attr('value',"0");
                $('#a16[a_count="3"]').prop('checked', false);
                $('#a16[a_count="4"]').attr('value',"0");
                $('#a16[a_count="4"]').prop('checked', false);
            } else if((ida_count == "2")&&(idClicked="a16")){
                $('#a16[a_count="1"]').attr('value',"0");
                $('#a16[a_count="1"]').prop('checked',false);
                $('#a16[a_count="2"]').attr('value',"1");
                $('#a16[a_count="2"]').attr('checked',true);
                $('#a16[a_count="3"]').attr('value',"0");
                $('#a16[a_count="3"]').prop('checked',false);
                $('#a16[a_count="4"]').attr('value',"0");
                $('#a16[a_count="4"]').prop('checked',false);
            } else if((ida_count == "3")&&(idClicked="a16")){
                $('#a16[a_count="1"]').attr('value',"0");
                $('#a16[a_count="1"]').prop('checked',false);
                $('#a16[a_count="2"]').attr('value',"0");
                $('#a16[a_count="2"]').prop('checked',false);
                $('#a16[a_count="3"]').attr('value',"1");
                $('#a16[a_count="3"]').attr('checked',true);
                $('#a16[a_count="4"]').attr('value',"0");
                $('#a16[a_count="4"]').prop('checked',false);
            } else if((ida_count == "4")&&(idClicked="a16")){
                $('#a16[a_count="1"]').attr('value',"0");
                $('#a16[a_count="1"]').prop('checked',false);
                $('#a16[a_count="2"]').attr('value',"0");
                $('#a16[a_count="2"]').prop('checked',false);
                $('#a16[a_count="3"]').attr('value',"0");
                $('#a16[a_count="3"]').prop('checked',false);
                $('#a16[a_count="4"]').attr('value',"1");
                $('#a16[a_count="4"]').attr('checked',true);
            };
        break;
        default:
        text = "This game is awesome...";
    }
    console.log(idClicked);
});


//Main Game Start================================================
//===============================================================
//Show Start button on page loading
var startBtn = $("<button>");
startBtn.addClass("startButton");
startBtn.text("Start Trivia Game");
startBtn.attr("id","startBtn");
$("#page").append(startBtn);
//Show starting message on page loading
var startMessage = $("<div>");
startMessage.text("You have " + timerNumber + " seconds to answer" + trivia.length + " questions.  Good Luck!");
startMessage.attr("id", "startMsg");
$("#timerDiv").html(startMessage);
//hide when page loads
//hide('#timerDiv');
// click handlers
$('#startBtn').on("click", start);
$('#reset').on('click', reset);
});