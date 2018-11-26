
	$('.background').each(function(){
		var element = $(this);

		var imageName = $(this).attr('id');
		var image =  new Image();

		image.src = "images/"+imageName+".png";
		
		image.onload = function(){

		element.css({
			"background-image":"url(" + image.src + ")",
			"background-repeat":"repeat",
			"height": "calc(100% + "+ image.height +"px)"
		});

		endlessBackgound(element, image);

		}


	})

function endlessBackgound(element, image){
	var element = element;
	var image = image;


  	element.animate({
     top: "'" +image.height+"'"
  }, 

  1000,

  'linear', 

  function(){
    element.css('top', 0);
    endlessBackgound(element, image);
  });
}