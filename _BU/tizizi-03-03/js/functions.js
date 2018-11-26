// Interval for target generation loop
var intervalApparitionTarget = 2000; // 3000

// Collision calcution interval
var calculationInterval = 100;

// Fall duration
var timeTravel = 5000; // 5000


// Screen size
var screenWidth = $(window).width();
var screenHeight = $(window).height();
$(window).resize(function() {
    screenWidth = $(window).width();
    screenHeight = $(window).height();
});


// Shot
var shotID = 0;

var shotIntervalID;
var fallIntervalID;

// Current score HTML counter
var currentScore = 0;
$("#current-score").html(currentScore);


// Targets & Shots
var myTargets = [];
var myshots = [];

// touched target index
var touchTargetIndex = [];



// Put the Best Score in a cookie
if (typeof $.cookie("bestScoreCookie") == 'undefined') {
    $.cookie("bestScoreCookie", "0", { expires: 70, path: '/' });
}
// and in a variable to read it
var bestScore = $.cookie("bestScoreCookie");



/*  Animated background image for next level some day

function endlessBackgound(element){
    var element = element;
    var image =  new Image();

    // PARAMETRAGE DE L'IMAGE
    image.src = element.data('source');

    image.onload = function(){
        element.css({
            "background-image":"url("+image.src+")",
            "background-repeat":"repeat",
            "height": "calc(100% + "+ image.height +"px)"
        });

        var timing = parseInt(element.height());

        element.animate({
            top: '-='+image.height
        },
            timing * 8,
            'linear',
            function(){
                element.css('top', 0);
                endlessBackgound(element);
            }
        );
    }
}
var element = $('.background');
endlessBackgound(element);
*/








/* --------------------------------- GAME--------------------------------------*/
function game(){

        // Events set up
        function events(){

            // On key down
            $(document).keydown(function(e){

                // Weapon location
                var whereIsTheWeapon = $('#weapon').position().left;

                // If the weapon is in the screen
                if ( -10  <= whereIsTheWeapon && whereIsTheWeapon <= (screenWidth - $('#weapon').width()) -10){

                     // on move right
                    if (e.which == 39){
                        // The weapon can go to the right
                        whereIsTheWeapon = whereIsTheWeapon + 30;
                        $('#weapon').css('left', whereIsTheWeapon);
                    }

                    // on move left
                    if (e.which == 37){
                        // The weapon can go to the left
                        whereIsTheWeapon = whereIsTheWeapon - 30;
                        $('#weapon').css('left', whereIsTheWeapon);
                    }

                }

                // If the weapon is to close to the left
                else if ( whereIsTheWeapon < -10 ){

                    // on move right
                    if (e.which == 39){
                        // The weapon can go to the right
                        whereIsTheWeapon = whereIsTheWeapon + 30;
                        $('#weapon').css('left', whereIsTheWeapon);
                    }

                    // on move left
                    if (e.which == 37){
                        // The weapon stays where it is
                        whereIsTheWeapon = whereIsTheWeapon;
                        $('#weapon').css('left', whereIsTheWeapon);
                    }
                }

                // If the weapon is to close to the right
                else if ( (screenWidth - 150) < whereIsTheWeapon ){

                    // on move right
                    if (e.which == 39){
                        // The weapon stays where it is
                        whereIsTheWeapon = whereIsTheWeapon;
                        $('#weapon').css('left', whereIsTheWeapon);
                    }

                    // on move left
                    if (e.which == 37){
                        // The weapon can go to the left
                        whereIsTheWeapon = whereIsTheWeapon - 30;
                        $('#weapon').css('left', whereIsTheWeapon);
                    }
                }
            })
            // On mouse down
            .mousedown(function(){
                // We get the clicked image from HTML data-clicksrc
                var weaponclick  = $('#weapon').data("clicksrc");
                $('#weapon').attr('src', weaponclick);
            })
            // On click
            .click(function(){
                // We get the weapon position
                var whereIsTheWeapon = $('#weapon').position().left;
                 // We get the image from HTML data-src
                var weapon = $('#weapon').data('src');
                $('#weapon').attr('src', weapon);


                 // Shot image generation and positioning
                var shotImage = "<img src='images/drop.png' id='shot-"+shotID+"' class='shot' style='left:"+parseInt(40+whereIsTheWeapon)+"px;'>";
                shotID++;

                // Shot
                $("#game-content").append(shotImage);

                // For each shot
                $('.shot').each(function(){
                    // We get offset Top
                    var shotPosition = $(this).position().top;

                     // If the Shot is in the screen
                    if ( shotPosition > (-20) ){
                         // Make it fall
                        $(this).animate({
                            top: "-30"
                        },1000, 'linear');
                    }
                })
            });
        }
        // Event init
        events();



        // Targets set up
        function TargetSetUp(timeTravel){

                // Fall duration
                timeTravel = timeTravel;

                var i=0;

                function target(id){
                    var x = 0;
                    var y = 0;
                    var id = id;

                    function getRandomX() {
                        var min = 10;
                        var max = (screenWidth - 60);
                        return Math.floor(Math.random() * (max - min)) + min;
                    }
                    x = getRandomX();

                    // Set up for lucky targets
                    var luck = Math.random();

                    if (luck<0.6){
                        var target = "<img src='images/peach.png' class='target superluck' id='peach-"+id+"' style='left:"+x+"px;top:-70px;'>";
                    }
                    else if (luck < 0.8){
                        var target = "<img src='images/oignon.png' class='target goodluck' id='oignon-"+id+"' style='left:"+x+"px;top:-70px;'>";
                    }
                    else {
                        // Ennmey
                        var target = "<img src='images/aubergine.png' class='target badluck' id='aubergine-"+id+"' style='left:"+x+"px;top:-70px;'>";
                    }
                        $("#game-content").append(target);
                }



                var TagetFallSetup = function() {
                    var count = 5;

                    var TagetFallTimer = function() {
                        fallIntervalID = setInterval(TagetFall, intervalApparitionTarget);
                    };


                    var TagetFall = function() {

                                target(i);
                                i++;

                                // Target loop
                                $(".target").each(function(){

                                    // Target ID
                                    var id = $(this).attr("id");

                                    // If the target is in the screen
                                    if ( $(this).position().top < (screenHeight)){
                                        // Fall down
                                        $(this).animate({
                                            top: "+=" + (screenHeight - $(this).height())
                                        },timeTravel, 'linear');
                                    }

                                    // If the target is out of the screen
                                    else {
                                        // If the ennemy shouldn't be touched
                                        if ( $(this).hasClass('badluck') ){
                                            // Remove it only
                                             $(this).remove();
                                        }
                                        // If the target has been missed
                                        else{
                                            // To see what is falling out     console.log(id+" out");

                                            // Remove a life and remove
                                            $("#lifebox p:first-of-type").remove();
                                            $(this).remove();
                                        }
                                    }
                                });

                    }; TagetFallTimer();

                }; TagetFallSetup();


                function TargetInit(){

                    var id = "";
                    var TargetObject =  "";
                    var touchXmin = 0;
                    var touchXmax = 0;
                    var intervalX = 0;
                    var touchY = 0;
                    var splouchColor = 0;


                    // Target constructor
                    function Target(id,touchXmin,touchXmax,intervalX,touchY){
                        this.id = id,
                        this.touchXmin = touchXmin,
                        this.touchXmax = touchXmax,
                        this.intervalX = intervalX,
                        this.touchY = touchY
                    }

                    // Target genetation
                    var abricotInterval = setInterval(function() {

                        // Targets index
                        myTargets = [];

                        // DEBUG $("#console").html("");

                        // If there is targets
                        if ($(".target").length != 0){

                           // fr each target
                            $(".target").each(function(){

                                 // We get needed parameters
                                id = $(this).attr("id");
                                touchXmin = $(this).position().left;
                                touchXmax = $(this).position().left + $(this).width();
                                intervalX = touchXmax - touchXmin;
                                touchY = $(this).position().top + $(this).height();

                                // We create the target object
                                TargetObject = new Target(id, touchXmin, touchXmax, intervalX, touchY);

                                // And push it in the index
                                myTargets.push(TargetObject);

                                // If the target touch the weapon
                                function targetTouchWeapn(){

                                    if ( ($("#weapon").position().left + $("#weapon").width()) - 20 > touchXmin && ($("#weapon").position().left + 40) < touchXmax && touchY >= $("#weapon").position().top &&  touchY > 50){

                                        // If the target ID isn't already in the touched target index
                                        if (touchTargetIndex.indexOf(id) == -1)  {
                                            // We put it in and remove a life
                                            touchTargetIndex.push(id);
                                            $("#lifebox p:first-of-type").remove();
                                        }

                                        // DEBUG console.log("touches : " + touch);

                                        // Remove the target
                                        $(this).remove();

                                        // The Weapon get sick
                                        splouchColor += 10;
                                        return;

                                    }
                                } targetTouchWeapn();
                            })
                        }

                        // The Weapon get sick
                        $("#weapon").css("filter", "hue-rotate("+splouchColor+"deg)");

                    }, calculationInterval);
                }TargetInit();

        } TargetSetUp(timeTravel);





        // Shots set up
        function shotInit(){
            var id = "";
            var shotObject =  "";
            var touchXmin = 0;
            var touchXmax = 0;
            var intervalX = 0;
            var touchY = 0;

            // constructor
            function shot(id,touchXmin,touchXmax,intervalX,touchY){
                this.id = id,
                this.touchXmin = touchXmin,
                this.touchXmax = touchXmax,
                this.intervalX = intervalX,
                this.touchY = touchY
            }

            var shotsIntervalTimer = function() {
                shotIntervalID = setInterval(shotsInterval, calculationInterval);
            };


            // Shots generation
            function shotsInterval() {

                // shotsIndex
                myshots = [];

               // DEBUG  $("#console-shot").html("");

                // If there is shots
                if($(".shot").length != 0){
                    // For each shots
                    $(".shot").each(function(){

                        // We get needed parameters
                        id = $(this).attr("id");
                        touchXmin = $(this).position().left;
                        touchXmax = $(this).position().left + $(this).width();
                        intervalX = touchXmax - touchXmin;
                        touchY = $(this).position().top;

                        shotObject = new shot(id, touchXmin, touchXmax, intervalX, touchY);

                        // and push it in the index
                        myshots.push(shotObject);
                    })
                }

                // Remove the shots when the get out of view
                $('.shot').each(function(){
                    if ($(this).position().top <= (-20)){
                        $(this).remove();
                    }
                });

            };shotsIntervalTimer();



        } shotInit();







        function collision(){

            var collisionInterval = setInterval(function() {

                // We there is shots and target
                if(($(".shot").length != 0) && ($(".target").length != 0)){

                    // Target loop
                    for(var a=0;a<myTargets.length;a++){
                        //  DEBUG for (var propA = 0 in myTargets[a]) {
                        //  DEBUG $("#console").append("<div>"+ propA + " : " + myTargets[a][propA] +"</div>");

                            // Shots loop
                            for(var t=0;t<myshots.length;t++){
                                //  DEBUG for (var propT = 0 in myshots[t]) {
                                //   DEBUG  $("#console-shot").append("<div>"+ propT + " : " + myshots[t][propT] +"</div>");

                                    // If the shot touch a Target
                                    if (myshots[t].touchXmax > myTargets[a].touchXmin && myshots[t].touchXmin < myTargets[a].touchXmax && myshots[t].touchY <= myTargets[a].touchY){

                                        // Music on touch index
                                        var soundEffectIndex = [];

                                        // Sounds for peaches
                                        if(myTargets[a].id.indexOf("peach") != -1){
                                            soundEffectIndex = [new Audio('son/aaah.mp3'),new Audio('son/bonjour-madame.mp3'),new Audio('son/han.mp3'),new Audio('son/oaah.mp3'),new Audio('son/ohohohoh.mp3'),new Audio('son/pop.mp3')];
                                            currentScore += 200;
                                        }
                                        // Sounds for oignons
                                        else if (myTargets[a].id.indexOf("oignon") != -1){
                                            soundEffectIndex = [new Audio('son/pioui.mp3')];
                                            currentScore += 100;
                                        }
                                        // Sounds for aubergines
                                        else if (myTargets[a].id.indexOf("aubergine") != -1){
                                            soundEffectIndex = [new Audio('son/bah.mp3')];
                                            currentScore -= 500;
                                        }

                                        // Pick a sound and play
                                        var randomize = Math.floor(soundEffectIndex.length * Math.random());
                                        soundEffectIndex[randomize].play();

                                        // Make a heart
                                        $('#'+myshots[t].id).attr("src","images/heart.png");

                                        // remove touched target
                                        $('#'+myTargets[a].id).remove();

                                        // Update score and if new record, put in in a coockie
                                        $("#current-score").html(currentScore);
                                            if(currentScore > bestScore ){
                                                bestScore = currentScore;
                                                $.cookie("bestScoreCookie", bestScore, { expires: 70, path: '/' });
                                                bestScore = $.cookie("bestScoreCookie");
                                            }
                                        return;
                                    }
                            }

                    }
                }
            },calculationInterval);
        }collision();





} /* --------------------------------- GAME--------------------------------------*/




function gameStop(){
    $(".target").remove();
    clearInterval(fallIntervalID );
    clearInterval(shotIntervalID);
}




function lives(){
    setInterval(function() {
        if (($("#lifebox")).children().length <= 0){

            gameStop()

            $(".overlay").show();
            $(".overlay").html("");
            $(".overlay").append("<div class='retry'><p>Meilleur score : "+bestScore+"</p><br><br><span>AZY JE PESE DANS LE GAME</span></div>'");
            $("#lifebox").append("<p>❤</p><p>❤</p><p>❤</p><p>❤</p><p>❤</p><p>❤</p>");
        }
    }, calculationInterval);
}lives();




if (bestScore > 0){
    $("#bestScore-score").html(bestScore);
    $("#first-start").remove();
}




$(document).keydown(function(e){
    if (e.which == 32){

        game();

        $("div.first-start").remove();
        $(".overlay").hide();
    }

})




//   MUSIC
/*
    var kassos = new Audio("son/darktek-kassos.mp3");
    kassos.play();

    kassos.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
*/