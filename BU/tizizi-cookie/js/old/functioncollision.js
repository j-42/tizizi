
			for(var a=0;a<mesAbricots.length;a++){
				for (var propA = 0 in mesAbricots[a]) {
					$("#console").append("<div>"+ propA + " : " + mesAbricots[a][propA] +"</div>");
					console.log(propA + " : " + mesAbricots[a][propA]);
				}
			}

			for(var t=0;t<mesTirs.length;t++){
		
		
				for (var propT = 0 in mesTirs[t]) {
					$("#console-tir").append("<div>"+ propT + " : " + mesTirs[t][propT] +"</div>");
					console.log(propT + " : " + mesTirs[t][propT]);


				}
			}

////////////////////////////////////////////////////////////////////////////////////

if ( a > t ) { K = a ;} else { K = t;};
			alert(K);
			for(var i=0;i<K;i++){

				for (var propA = 0 in mesAbricots[K]) {
					$("#console").append("<div>"+ propA + " : " + mesAbricots[K][propA] +"</div>");
					console.log(propA + " : " + mesAbricots[K][propA]);
				}

				for (var propT = 0 in mesTirs[K]) {

					$("#console-tir").append("<div>"+ propT + " : " + mesTirs[K][propT] +"</div>");
					console.log(propT + " : " + mesTirs[K][propT]);
				}

			}

					
						console.log(mesAbricots); // [Abricot, Abricot]
						console.log("j : "+ mesAbricots[j]);    // j : [object Object]
						console.log("id : "+ mesAbricots[0]["id"]); // id : peach-0 // id : peach-4
						console.log("j[id] : "+ mesAbricots[j]["id"]);    // j[id] : peach-4
				



/////////////////////////////////////////////////////////////////////


// Qui qui k'a lplus gros kiki 
			var kiki = 0;
			if ( mesAbricots.length > mesTirs.length ) { 
				kiki = mesAbricots.length ;
			} else { 
				kiki = mesTirs.length;
			};




			for(var i=0;i< kiki;i++){

				$("#console").append("<div>" + mesAbricots[i]["id"] +"</div>");

				if ( mesTirs[i]["id"]){
									$("#console-tir").append("<div>"+ mesTirs[i]["id"] +"</div>");
				}



				for (var propA = 0 in mesAbricots[i]) {
					console.log(propA + " : " + mesAbricots[i][propA]);
				}
				for (var propT = 0 in mesTirs[i]) {
					console.log(propT + " : " + mesTirs[i][propT]);
				}



			}








////////////////////////////////////////////////////////


//				var id = "";
//				var tirObject =  "";
//				var toucheXmin = 0;
//				var toucheXmax = 0;
//				var intervalX = 0;
//				var toucheY = 0;
//			console.log(mesAbricots); // [Abricot, Abricot]
//			console.log("j : "+ mesAbricots[j]);    // j : [object Object]
//			console.log("id : "+ mesAbricots[0]["id"]); // id : peach-0 // id : peach-4
//			console.log("j[id] : "+ mesAbricots[j]["id"]);    // j[id] : peach-4