$(document).ready(function () {
    var options = [
        {
            question: "Which NBA player has won the most championship titles?", 
            choice: ["Micheal Jordan", "Bill Russel", "Kobe Byrant", "Larry Bird"],
            answer: 1,
            photo: "https://www.nbcsports.com/boston/sites/csnne/files/2016/03/15/legacy_of_bill_russell_csnne1500kmp4_640x360_62498371775_1280x720_630356547751.jpg"
         },
         {
             question: "Who is the NBA's all-time leader in points?", 
            choice: ["Kareem Abdul-Jabbar", "LeBron James", "Wilt Chamberlain", "Shaquille O'Neal"],
            answer: 0,
            photo: "https://upload.wikimedia.org/wikipedia/commons/0/00/Kareem-Abdul-Jabbar_Lipofsky.jpg"
         }, 
         {
             question: "Who is the NBA's all-time leader in assists?", 
            choice: ["Magic Johnson", "Isaiah Thomas", "Chris Paul", "John Stockton" ],
            answer: 3,
            photo: "https://a.espncdn.com/media/motion/2018/0324/dm_180324_nba_stockton_bday_rip_NEW/dm_180324_nba_stockton_bday_rip_NEW.jpg"
        }, 
        {
            question: "Which NBA team has won the most championship titles?", 
            choice: ["Boston Celtics", "Los Angeles Lakers", "Chicago Bulls", "Atlanta Hawks" ],
            answer: 0,
            photo: "https://i.cdn.turner.com/nba/nba/media/celtics/CelticsLogo_History.gif"
        }, 
        {
            question: "How many teams are there in the NBA?", 
            choice: ["25", "20", "30", "15" ],
            answer: 2,
            photo: "https://thespinoff.co.nz/wp-content/uploads/2015/11/NBA_Background_Logos.jpg"
        }, 
        {
            question: "Which U.S city does not have an NBA franchise?", 
            choice: ["San Antonio", "New Orleans", "Portland", "Las Vegas" ],
            answer: 3,
            photo: "https://i.ytimg.com/vi/A42GufcuWGo/maxresdefault.jpg"
        }, 
        {
            question: "What is the NBA record for most points scored in a single game by an indivdual player?", 
            choice: ["81", "67", "76", "100" ],
            answer: 3,
            photo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/93/Wilt_Chamberlain_100-point.jpg/200px-Wilt_Chamberlain_100-point.jpg"
        }, 
        {
            question: "How tall is the shortest person to ever play in the NBA?", 
            choice: ["5'7", "5'11", "5'3", "5'5" ],
            answer: 2,
            photo: "https://b.fssta.com/uploads/2016/12/122116-nba-tracy-mcgrady-muggsy-bogues.jpg"
        }];
    
        var correctCount = 0;
        var wrongCount = 0;
        var unanswerCount = 0;
        var timer = 20;
        var intervalId;
        var userGuess ="";
        var running = false;
        var qCount = options.length;
        var pick;
        var index;
        var newArray = [];
        var holder = [];
        
        
        
        $("#reset").hide();
        
        $("#start").on("click", function () {
                $("#start").hide();
                displayQuestion();
                runTimer();
                for(var i = 0; i < options.length; i++) {
            holder.push(options[i]);
        }
            })
       
        function runTimer(){
            if (!running) {
            intervalId = setInterval(decrement, 1000); 
            running = true;
            }
        }
        
        function decrement() {
            $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
            timer --;
        
           
            if (timer === 0) {
                unanswerCount++;
                stop();
                $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
                hidepicture();
            }	
        }
        
        
        function stop() {
            running = false;
            clearInterval(intervalId);
        }
     
        function displayQuestion() {
           
            index = Math.floor(Math.random()*options.length);
            pick = options[index];
      
                $("#questionblock").html("<h2>" + pick.question + "</h2>");
                for(var i = 0; i < pick.choice.length; i++) {
                    var userChoice = $("<div>");
                    userChoice.addClass("answerchoice");
                    userChoice.html(pick.choice[i]);
                    
                    userChoice.attr("data-guessvalue", i);
                    $("#answerblock").append(userChoice);
        
        }
        
        
        
        
        $(".answerchoice").on("click", function () {
           
            userGuess = parseInt($(this).attr("data-guessvalue"));
        
            
            if (userGuess === pick.answer) {
                stop();
                correctCount++;
                userGuess="";
                $("#answerblock").html("<p>Correct!</p>");
                hidepicture();
        
            } else {
                stop();
                wrongCount++;
                userGuess="";
                $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
                hidepicture();
            }
        })
        }
        
        
        function hidepicture () {
            $("#answerblock").append("<img src=" + pick.photo + ">");
            newArray.push(pick);
            options.splice(index,1);
        
            var hidpic = setTimeout(function() {
                $("#answerblock").empty();
                timer= 20;
        
            //run the score screen if all questions answered
            if ((wrongCount + correctCount + unanswerCount) === qCount) {
                $("#questionblock").empty();
                $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
                $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
                $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
                $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
                $("#reset").show();
                correctCount = 0;
                wrongCount = 0;
                unanswerCount = 0;
        
            } else {
                runTimer();
                displayQuestion();
        
            }
            }, 3000);
        
        
        }
        
        $("#reset").on("click", function() {
            $("#reset").hide();
            $("#answerblock").empty();
            $("#questionblock").empty();
            for(var i = 0; i < holder.length; i++) {
                options.push(holder[i]);
            }
            runTimer();
            displayQuestion();
        
        })
        
        })