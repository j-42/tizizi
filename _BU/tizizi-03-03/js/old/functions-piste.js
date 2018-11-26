var screenWidth = $(window).width();
var screenHeight = $(window).height();
var tirID = 0;
var counter = 0;
var best = 0;
var touch = [];

var intervalApparitionAbricot = 1000; // 3000

// VARIABLES GESTION DES COLLISIONS ABRICOTS // TIR
var intervalCalcul = 100;
var mesAbricots = [];
var mesTirs = [];


function endlessBackgound(element){
	var element = element;
	var image =  new Image();

	// PARAMETRAGE DE L'IMAGE
	var imageName = element.attr('id');
	image.src = "images/"+imageName+".png";

	image.onload = function(){
		element.css({
			"background-image":"url(" + image.src + ")",
			"background-repeat":"repeat",
			"height": "calc(100% + "+ image.height +"px)"
		});

		element.animate({
			top: '-='+image.height
		},
			1000,
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





$("#current-score").html(counter);


/* --------------------------------- GAME--------------------------------------*/
function game(on){




    var startGame = function() {
        var count = 5;
        var intervalID ;

        var countdownTimer = function() {
            //Store the intervalID
            intervalID = setInterval(countdown, 1000);
        };

        var countdown = function() {
        	if (on === true){
	            if (count < 10) {
	                count++;
	                $('.timer').html(count);
	            } else {
	                if (intervalID) {
	                    clearInterval(intervalID);
	                }
	            }
	        } else if (on === false){
	            if (count > 0) {
	                count--;
	                $('.timer').html(count);
	            } else {
	                if (intervalID) {
	                    clearInterval(intervalID);
	                }
	            }
	        }
        };
        countdownTimer();
    };
    startGame();




		function events(){
			$(document).keydown(function(e){
				var ouEsPloush = $('#ploush').position().left;

				if ( -10  <= ouEsPloush && ouEsPloush <= (screenWidth - $('#ploush').width()) -10){ // Si tu peses dans le game
					if (e.which == 39){ // right
						ouEsPloush = ouEsPloush + 30;
						$('#ploush').css('left', ouEsPloush);
					} if (e.which == 37){ // left
						ouEsPloush = ouEsPloush - 30;
						$('#ploush').css('left', ouEsPloush);
					}
				} else if ( ouEsPloush < -10 ){ // Si t'es a gauche
					if (e.which == 39){ // right
						ouEsPloush = ouEsPloush + 30;
						$('#ploush').css('left', ouEsPloush);
					} if (e.which == 37){ // left
						ouEsPloush = ouEsPloush;
						$('#ploush').css('left', ouEsPloush);
					}
				} else if ( (screenWidth - 150) < ouEsPloush ){
					if (e.which == 39){  // right
						ouEsPloush = ouEsPloush;
						$('#ploush').css('left', ouEsPloush);
					} if (e.which == 37){  // left
						ouEsPloush = ouEsPloush - 30;
						$('#ploush').css('left', ouEsPloush);
					}
				}
			})
			.mousedown(function(){
				var ploushclick  = $('#ploush').data("clicksrc");

				$('#ploush').attr('src', ploushclick);
				$('#game-content').css('cursor','-webkit-grabbing');
			})
			.mouseup(function(){
				$('#game-content').css('cursor',' -webkit-grab');
			})
			.click(function(){
				var ouEsPloush = $('#ploush').position().left;
				var ploush = $('#ploush').data('src');

				$('#game-content').css('cursor',' -webkit-grab');

				var tirImage = "<img src='images/drop.png' id='tir-"+tirID+"' class='tir' style='left:"+parseInt(40+ouEsPloush)+"px;'>";
				tirID++;

				$("#game-content").append(tirImage);

				var ploush = $('#ploush').data('src');
				$('#ploush').attr('src', ploush);

				$('.tir').each(function(){
					var ouEsLaGougoutte = $(this).position().top;

					if ( ouEsLaGougoutte > (-20) ){
						$(this).animate({
							top: "-30"
						},1000, 'linear');
					}
				})
			});
		}events();




		// on me voit plus
		var tirInterval = setInterval(function() {
			$('.tir').each(function(){
				if ($(this).position().top <= (-20)){
					$(this).remove();
				}
			});
		}, intervalCalcul);

        if (on === false){
             clearInterval(tirInterval);
        }

		// animation des pitis abricots
		function nabricots(){

				var i = 0;
				var timeTravel = 5000; // 5000

				function peach(id){
					var x = 0;
					var y = 0;
					var id = id;

					function getRandomX() {
						var min = 10;
						var max = (screenWidth - 60);
						return Math.floor(Math.random() * (max - min)) + min;
					}
					x = getRandomX();


					var luck = Math.random();

					if (luck<0.6){
						var peach = "<img src='images/peach.png' class='peach' id='peach-"+id+"' style='left:"+x+"	px;top:-70px;'>";
					} else if (luck < 0.8){
						var peach = "<img src='images/oignon.png' class='peach' id='oignon-"+id+"' style='left:"+x+"	px;top:-70px;'>";
					} else {
						var peach = "<img src='images/aubergine.png' class='peach' id='aubergine-"+id+"' 	style='left:"+x+"px;top:-70px;'>";
					}
						$("#game-content").append(peach);
				}


					var abricotIntervaldown = setInterval(function() {
						peach(i);
							i++;


						$(".peach").each(function(){
							var id = $(this).attr("id");

							if ( $(this).position().top < (screenHeight)){
								$(this).animate({
									top: "+=" + (screenHeight - $(this).height())
								},timeTravel, 'linear');
							} else {
								// console.log(id+" out");
								$("#lifebox p:first-of-type").remove();
								$(this).remove();
							}
						});
					}, intervalApparitionAbricot);


                if (on === false){
                    clearInterval(abricotIntervaldown);
                }

		} nabricots();



		function ouLestNabricot(){
			var id = "";
			var PeachObject =  "";
			var toucheXmin = 0;
			var toucheXmax = 0;
			var intervalX = 0;
			var toucheY = 0;
			var splouchColor = 0;

		// GESTION DES N'ABRICOTS

			// constructeur
			function Abricot(id,toucheXmin,toucheXmax,intervalX,toucheY){
				this.id = id,
				this.toucheXmin = toucheXmin,
				this.toucheXmax = toucheXmax,
				this.intervalX = intervalX,
				this.toucheY = toucheY
			}

			// récupération des données abricots
			var abricotInterval = setInterval(function() {
				mesAbricots = [];

				$("#console").html("");

				if($(".peach").length != 0){
					$(".peach").each(function(){
						id = $(this).attr("id");
						var peche = $(this).attr("class");
						PeachObject = $(this).attr("id");
						toucheXmin = $(this).position().left;
						toucheXmax = $(this).position().left + $(this).width();
						intervalX = toucheXmax - toucheXmin;
						toucheY = $(this).position().top + $(this).height();

						PeachObject = new Abricot(id, toucheXmin, toucheXmax, intervalX, toucheY);
						mesAbricots.push(PeachObject);

						if ( ($("#ploush").position().left + $("#ploush").width()) - 20 > toucheXmin && ($("#ploush").position().left + 40) < toucheXmax && toucheY >= $("#ploush").position().top &&  toucheY > 50){

								if (touch.indexOf(id) == -1)  {
									touch.push(id);
									$("#lifebox p:first-of-type").remove();
								}

							// console.log("touches : " + touch);

							$(this).remove();
							splouchColor += 10;
							return;
						}
					})
				}
                if (on === false){
                   clearInterval(abricotInterval);
                }

				$("#ploush").css("filter", "hue-rotate("+splouchColor+"deg)");
			}, intervalCalcul);
		}ouLestNabricot();




		function ouLestPiouPiou(){
			var id = "";
			var tirObject =  "";
			var toucheXmin = 0;
			var toucheXmax = 0;
			var intervalX = 0;
			var toucheY = 0;


		// GESTION DES TIRS

			//constructeur
			function Tir(id,toucheXmin,toucheXmax,intervalX,toucheY){
				this.id = id,
				this.toucheXmin = toucheXmin,
				this.toucheXmax = toucheXmax,
				this.intervalX = intervalX,
				this.toucheY = toucheY
			}

			// récupération des données tir
			var tirsInterval = setInterval(function() {
				mesTirs = [];
				$("#console-tir").html("");

				if($(".tir").length != 0){
					$(".tir").each(function(){
						id = $(this).attr("id");
						tirObject = $(this).attr("id");
						toucheXmin = $(this).position().left;
						toucheXmax = $(this).position().left + $(this).width();
						intervalX = toucheXmax - toucheXmin;
						toucheY = $(this).position().top;

						tirObject = new Tir(id, toucheXmin, toucheXmax, intervalX, toucheY);
						mesTirs.push(tirObject);
					})
				}
                if (on === false){
                    clearInterval(tirsInterval);
                }

			}, intervalCalcul);
		} ouLestPiouPiou();







		function collision(){

			var collisionInterval = setInterval(function() {
				if(($(".tir").length != 0) && ($(".peach").length != 0)){


		//id //tirObject //toucheXmin //toucheXmax //intervalX //toucheY


					for(var a=0;a<mesAbricots.length;a++){
						//for (var propA = 0 in mesAbricots[a]) {
						//	$("#console").append("<div>"+ propA + " : " + mesAbricots[a][propA] +"</div>");

		                    for(var t=0;t<mesTirs.length;t++){
		                        //for (var propT = 0 in mesTirs[t]) {
		                        //    $("#console-tir").append("<div>"+ propT + " : " + mesTirs[t][propT] +"</div>");

		 							if (mesTirs[t].toucheXmax > mesAbricots[a].toucheXmin && mesTirs[t].toucheXmin < mesAbricots[a].toucheXmax && mesTirs[t].toucheY <= mesAbricots[a].toucheY){

			 							var audio = [];

			 							if(mesAbricots[a].id.indexOf("peach") != -1){
			 								audio = [new Audio('son/aaah.mp3'),new Audio('son/bonjour-madame.mp3'),new Audio('son/han.mp3'),new Audio('son/oaah.mp3'),new Audio('son/ohohohoh.mp3'),new Audio('son/pop.mp3')];
			 								counter += 200;
										} else if (mesAbricots[a].id.indexOf("oignon") != -1){
			 								audio = [new Audio('son/pioui.mp3')];
			 								counter += 100;
										} else if (mesAbricots[a].id.indexOf("aubergine") != -1){
			 								audio = [new Audio('son/bah.mp3')];
			 								counter -= 500;
			 							}
			 								var randomize = Math.floor(audio.length * Math.random());
											audio[randomize].play();


			 							$('#'+mesTirs[t].id).attr("src","images/heart.png");
			 							$('#'+mesAbricots[a].id).remove();

										$("#current-score").html(counter);
											if(counter > best ){
												best = counter;
											}
			                            return;
		                            }
		                    }

					}
				}
			},intervalCalcul);
		}collision();

} /* --------------------------------- GAME--------------------------------------*/




function vies(){
	setInterval(function() {
		if (($("#lifebox")).children().length <= 0){
            game(false);
            $('.peach').hide();
			$(".overlay").show();
			$(".overlay").html("");
			$(".overlay").append("<div class='retry'><p>Meilleur score : "+best+"</p><br><br><span>AZY JE PESE DANS LE GAME</span></div>'");
			$("#lifebox").append("<p>❤</p><p>❤</p><p>❤</p><p>❤</p><p>❤</p><p>❤</p>");
		}
	},intervalCalcul);
}vies();




if(best > 0){
	$("#best-score").html(best);
	$("#first-start").remove();
}




$(".retry").click(function(){
	alert("retry");
	$("div.retry").remove();
	$(".overlay").hide();

	game(true);
});

$(document).keydown(function(e){
    if (e.which == 32){
        game(true);
        $("div.first-start").remove();
        $(".overlay").hide();
    }

})


/*
	var kassos = new Audio("son/darktek-kassos.mp3");
	kassos.play();

	kassos.addEventListener('ended', function() {
	    this.currentTime = 0;
	    this.play();
	}, false);
*/