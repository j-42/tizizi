var screenWidth = $(window).width();
var screenHeight = $(window).height();


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





function events(){
	$(document).keydown(function(e){
		var ouEsPloush = $('#ploush').position().left;

		if ( -10  <= ouEsPloush && ouEsPloush <= (screenWidth - 150) ){ // Si tu peses dans le game
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
}events();















function nabricots(){

	var i = 0;
	var timeTravel = 5000; // 5000
	var interval = 3000; // 3000


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

		var peach = "<img src='images/peach.png' class='peach' id='peach-"+id+"' style='left:"+x+"px;top:-70px;'>";

		$("#game-content").append(peach);
	}

		
		setInterval(function() {
			peach(i);
			i++;

			$(".peach").each(function(){
				var id = $(this).attr("id");

				if ( $(this).position().top < (screenHeight)){
					$(this).animate({
						top: "+=" + screenHeight
					},timeTravel, 'linear');
				} else {
					console.log(id+" perdu");
					$(this).remove();
				}
			});

		}, interval);
}nabricots();




// VARIABLES ABRICOTS
	

function collision(){
	var mesAbricots = [];
	var id = "";
	var PeachObject =  "";
	var toucheXmin = 0;
	var toucheXmax = 0;
	var intervalX = 0;
	var toucheY = 0;
	
	function Abricot(id,toucheXmin,toucheXmax,intervalX,toucheY){
		this.id = id,
		this.toucheXmin = toucheXmin,
		this.toucheXmax = toucheXmax,
		this.intervalX = intervalX,
		this.toucheY = toucheY
	}

	setInterval(function() {
		mesAbricots = [];
		$("#console").html("");
		
		if($(".peach").length != 0){
			$(".peach").each(function(){
				id = $(this).attr("id");
				PeachObject = $(this).attr("id");
				toucheXmin = $(this).position().left;
				toucheXmax = $(this).position().left + $(this).width();
				intervalX = toucheXmax - toucheXmin;
				toucheY = $(this).position().top + $(this).height();

				PeachObject = new Abricot(id, toucheXmin, toucheXmax, intervalX, toucheY);
				mesAbricots.push(PeachObject);
			})
		}
		for(var j=0;j<mesAbricots.length;j++){
				/*
						console.log(mesAbricots); // [Abricot, Abricot]
						console.log("j : "+ mesAbricots[j]);    // j : [object Object]
						console.log("id : "+ mesAbricots[0]["id"]); // id : peach-0 // id : peach-4
						console.log("j[id] : "+ mesAbricots[j]["id"]);    // j[id] : peach-4
				*/

			for (var prop = 0 in mesAbricots[j]) {
				$("#console").append("<div>"+ prop + " : " + mesAbricots[j][prop] +"</div>");
				console.log(prop + " : " + mesAbricots[j][prop]);
			}
		}
		

	}, 2000);
}
collision();

/*
var bibou1 = new Abricot(11,22,55,44, 66);
mesAbricots.push(bibou1);

var bibou2 = new Abricot("11","22","55","44", "66");
mesAbricots.push(bibou2);

alert(mesAbricots[1]["i"]);


for (var p=1;p<Abricot.length;p++){

	biboux.push("bibou"+p);
	alert(biboux);

	for (var j=0 in bibou1) {
		console.log( bibou1[j]);
	}
}

	*/
