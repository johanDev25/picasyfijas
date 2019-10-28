var random = [];
var guess;
var picas;
var fijas;
game();

$(document).on("keyup", "#num" , function(e) {
	var noValido = /[^0-9]/;
	if(e.which == 13){
		guess = $('#num').val();
		if (guess.length != 4) {
			$('#num').addClass('is-invalid');
			$('#num').siblings('p.error').html('Debe contener exactamente 4 digitos');
		}else if(noValido.test(guess)){
            $('#num').addClass('is-invalid');
            $('#num').siblings('p.error').html('Debe ser solo numeros');
		}else if(hasDuplicates(guess)){
            $('#num').addClass('is-invalid');
            $('#num').siblings('p.error').html('No se pueden repetir los numeros');
		}else{
			if (guess == random.join('')) {
				$('table').append("<tr><td>"+ guess + 
					"</td><td>" + 0 +
					"</td><td>" + 4 + 
					"</td></tr>");
				$('.option').addClass('scale');
				$('.result.won').show();
			}else{
				compareNumbers(guess);
				$('table').append("<tbody>");
				$('table').append("<tr><td>"+ guess + 
					"</td><td>" + picas +
					"</td><td>" + fijas + 
					"</td></tr>");
			}
			$('table').append("</tbody>");
			$('#num').removeClass('is-invalid');
			$('#num').val('');
		}
	}
});

$('.close a').on('click', function(){
	$('.result').hide();
	$('.option').removeClass('scale');

	game();
});

function hasDuplicates(array) {
	return (new Set(array)).size !== array.length;
}

function game(){
	random = [];
	var num = shuffle(Array.from(Array(10).keys()));
	for (i = 0; i < 4;i++){
		random.push(num[i]);
	}
	console.log(random.join(''));
}

function shuffle(a) {
	var j, x, i;
	for (i = a.length; i; i--) {
		j = Math.floor(Math.random() * i);
		x = a[i - 1];
		a[i - 1] = a[j];
		a[j] = x;
	}
	return a;
}


function compareNumbers(num) {
	picas = 0;
	fijas = 0;
	random.forEach(function(item, index) {
		if (num.indexOf(item) !== -1 && num.indexOf(item) === random.indexOf(item)) {
			fijas++
		}else if(num.indexOf(item) !== -1){
			picas++;
		}
	});
}