var spel = document.getElementById('spel');
var button = document.getElementById('startButton');
var Column = 1; 
var Row = 1;
var Typing = true;
var randomWord = words[Math.floor(Math.random()*words.length)];
var typeWord = new Array(5);
var correctLetters = [randomWord.charAt(0), '', '', '', ''];


console.log(randomWord);

function onclickButton() {
	start();
	
	Letters();
	button.style.display='none';
}



function start() {
	for (i = 0; i < 5; i++) {
		var letterBox = document.createElement('div');
		spel.appendChild(letterBox);
		letterBox.id = "r" + (i+1); 

	for (j = 0; j < 5; j++) {
	var letterBoxColumn = document.createElement('div');
	letterBox.appendChild(letterBoxColumn);
			letterBoxColumn.id = "r" + (i+1) + "c" + (j+1);

	var paragraph = document.createElement('p');
	letterBoxColumn.appendChild(paragraph);
	}
	}
}

document.addEventListener("keydown", function(e) {
	var x = e.keyCode;
	var y = String.fromCharCode(x);

	if (Typing == true && y.match(/[a-z]/i)){
		var letterBox = document.getElementById('r' + Row + 'c' + Column).firstChild;
		letterBox.innerHTML = y.toUpperCase();
		letterBox.style.opacity='1.0';
		typeWord[Column-1]=y.toLowerCase();
		Column++;
	}

	if (Column > 5) {
		checkWord();
		Typing = false;
		Column = 1;
		setTimeout(function(){ 
			Typing=true;
			Row++;
		if (Row<6) {
		Letters();
			}
		if (Row > 5) {
		setTimeout(function(){
			alert('jammer, het word was ' + randomWord + '!');
			location.reload();
		}, 500);
			}
			
		}, 500);
	}
});

function checkWord() {
	var goodWord = randomWord.split('');
	for (i = 0; i < 5; i++) {
		if (typeWord[i]==goodWord[i]) {
			var letterBox = document.getElementById('r' + Row + 'c' + (i+1));
			correctLetters[i]=goodWord[i];
			letterBox.style.backgroundColor='green';
			typeWord[i]= '#';
			goodWord[i]= '*';
		}
	}
	if (values(typeWord)==true) {
		setTimeout(function(){
			alert('Je hebt gewonnen!');
			location.reload();
		}, 500);
	}
	for (var i = 0; i < 5; i++) {
	for (var j = 0; j < 5; j++) {
	if (typeWord[i]==goodWord[j]) {
	var letterBox = document.getElementById('r' + Row + 'c' + (i+1));
	letterBox.style.backgroundColor='yellow';
	letterBox.style.borderRadius='90px';
	typeWord[i]= '#';
	goodWord[j]= '*';
			}
		}
	}
	console.log(typeWord, goodWord);
}

function values(myArray) {
	for (i=0; i < 5; i++) {
		if (myArray[i]!='#') {
			return false;
		}
	} 
	return true;
}

function Letters() {
	for (var i = 0; i < 5; i++) {
		var letterBox = document.getElementById('r' + Row + 'c' + (i+1)).firstChild;
		letterBox.innerHTML=correctLetters[i].toUpperCase();
		
	}
}
