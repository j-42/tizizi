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

$(document).keydown(function(e){

  
	if ( -10  < ouEsPloush && ouEsPloush < (screenWidth - 150) ){ // Si tu peses dans le game
		if (e.which == 39){ // right
			ouEsPloush = ouEsPloush + 30;
			$('#ploush').css('left', ouEsPloush);
		} if (e.which == 37){ // left
			ouEsPloush = ouEsPloush - 30;
			$('#ploush').css('left', ouEsPloush);
		}
	}
})


$(document).mousedown(function(){
	
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
			},5000, 'linear');
		} else {
			$(this).remove();
		}
	})
});


function colision(){
	//console.log("bite");
	//setTimeout(colision(),2000);
}
 
colision();