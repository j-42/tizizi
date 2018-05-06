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




	
var screenWidth = $(window).width();
var ouEsPloush = $('#ploush').position().left;
var keys = [];
var tirs = [];

function simulateKeydowm(trigcode) {
	jQuery.event.trigger({ type : 'keydown', which : trigcode });
}

$(document).keydown(function(e){

	if ( -10  <= ouEsPloush && ouEsPloush <= (screenWidth - 150) ){ // Si tu peses dans le game
		if (e.which == 39){ // right
			ouEsPloush = ouEsPloush + 30;
			$('#ploush').css('left', ouEsPloush);
				if((keys.indexOf(39) == -1)){
					keys = [];
					keys.push(39);
				}
		} else if (e.which == 37){ // left
			ouEsPloush = ouEsPloush - 30;
			$('#ploush').css('left', ouEsPloush);

				if((keys.indexOf(37) == -1)){
					keys = [];
					keys.push(37);
				}
		} else if ((e.which == 32) && keys == 37){
			tirs = [];
			tirs.push(32);
			ouEsPloush = ouEsPloush - 30;
			$('#ploush').css('left', ouEsPloush);
		} else if((e.which == 32) && keys == 39){
			tirs = [];
			tirs.push(32);
			ouEsPloush = ouEsPloush + 30;
			$('#ploush').css('left', ouEsPloush);
		} else if (e.which == 32) {
			tirs = [];
			tirs.push(32);
		} else {
			simulateKeydowm(keys);
		}


	} else if ( ouEsPloush < -10 ){           // Si t'es a gauche
		if (e.which == 39){ // right
			ouEsPloush = ouEsPloush + 30;
			$('#ploush').css('left', ouEsPloush);

				if((keys.indexOf(39) == -1)){
						keys = [];
						keys.push(39);
					}

		} if (e.which == 37){ // left
			ouEsPloush = ouEsPloush;
			$('#ploush').css('left', ouEsPloush);

				if((keys.indexOf(37) == -1)){
						keys = [];
						keys.push(37);
					}
		}
	} else if ( (screenWidth - 150) < ouEsPloush ){  // Si t'es a droite
		if (e.which == 39){ // right
			ouEsPloush = ouEsPloush;
			$('#ploush').css('left', ouEsPloush);

				if((keys.indexOf(39) == -1)){
					keys = [];
					keys.push(39);
				}
		} if (e.which == 37){ // left
			ouEsPloush = ouEsPloush - 30;
			$('#ploush').css('left', ouEsPloush);
				if((keys.indexOf(37) == -1)){
					keys = [];
					keys.push(37);
				}
		}
	}

	console.log(keys);

	
}).keyup(function(e){
	
})


$(document).click(function(){
	
	var ploush = $('#ploush').data('src');
	var ploushclick  = $('#ploush').data("clicksrc");
	$('#ploush').attr('src', ploushclick);

	var tirImage = "<img src='images/drop.png' class='tir' style='left:"+parseInt(40+ouEsPloush)+"px;'>";
	$("#game-content").append(tirImage);

	var ploush = $('#ploush').data('src');
	$('#ploush').attr('src', ploush);



	$('.tir').each(function(){
		var ouEsLaGougoutte = $(this).position().top;
		
		if ( ouEsLaGougoutte > (-20) ){
			$(this).animate({
				top: "-30"
			},1000, 'linear');
		} else {
			$(this).remove();
		}
	})
});


function colision(){
	//console.log("bite");
	//setTimeout(colision(),2000);
}
 
//colision();