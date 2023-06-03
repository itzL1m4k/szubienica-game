//! Hasło do odgadnięcia (Kiedyś zrobić pule haseł i je losować)
var password = "No pain no gain";
password = password.toUpperCase();

//! Zadeklarowanie potrzebnych zmiennych, które są potrzebne w programie
var length = password.length;
var wrongGuesses = 0;
var password1 = "";
var yes = new Audio("yes.wav");
var no = new Audio("no.wav");

//! Zamiana hasła na myślniki
for (i = 0; i < length; i++) {
	if (password.charAt(i) == " ") password1 += " ";
	else password1 += "-";
}

//! Funkcja wypisująca hasło
function displayPassword() {
	document.querySelector("#board").innerHTML = password1;
}

//! Po załadowaniu strony wywołaj funkcje start()
window.onload = start;

//! Zadeklarowanie alfabetu polskiego
var letters = new Array(35);

letters[0] = "A";
letters[1] = "Ą";
letters[2] = "B";
letters[3] = "C";
letters[4] = "Ć";
letters[5] = "D";
letters[6] = "E";
letters[7] = "Ę";
letters[8] = "F";
letters[9] = "G";
letters[10] = "H";
letters[11] = "I";
letters[12] = "J";
letters[13] = "K";
letters[14] = "L";
letters[15] = "Ł";
letters[16] = "M";
letters[17] = "N";
letters[18] = "Ń";
letters[19] = "O";
letters[20] = "Ó";
letters[21] = "P";
letters[22] = "Q";
letters[23] = "R";
letters[24] = "S";
letters[25] = "Ś";
letters[26] = "T";
letters[27] = "U";
letters[28] = "V";
letters[29] = "W";
letters[30] = "X";
letters[31] = "Y";
letters[32] = "Z";
letters[33] = "Ż";
letters[34] = "Ź";

//! Wypisanie bloków literek na stronie
function start() {
	var divContent = " ";
	for (i = 0; i < 35; i++) {
		var element = "letter" + i;

		divContent +=
			'<div class="letter" onclick="check(' +
			i +
			')" id="' +
			element +
			'">' +
			letters[i] +
			"</div>";
		if ((i + 1) % 7 == 0) divContent += '<div style="clear: both;"</div>';
	}

	document.querySelector("#alphabet").innerHTML = divContent;

	//! Po zamianie styli zamień myślniki na litery, które zostaly odgadnięte
	displayPassword();
}

//! Własna metoda biblioteki String do zamiany myślników na litery
String.prototype.setCharacter = function (position, character) {
	if (position > this.length - 1) return this.toString();
	else return this.substr(0, position) + character + this.substr(position + 1);
};

function check(nr) {
	var hit = false;
	//! Pętla, która sprawdza czy wybrana przez nas litera jest pasująca do hasła
	for (i = 0; i < length; i++) {
		if (password.charAt(i) == letters[nr]) {
			password1 = password1.setCharacter(i, letters[nr]);
			hit = true;
		}
	}

	//! Jeżeli litera pasuje to wykonuje się wszystko poniżej
	if (hit == true) {
		//! Zagranie dzwięku dobrego wybrania litery
		yes.play();

		//! Podmiana styli dla bloków litery, która pasuje do hasła
		var element = "letter" + nr;
		document.getElementById(element).style.background = "#003300";
		document.getElementById(element).style.color = "#00C000";
		document.getElementById(element).style.border = "3px solid #00C000";
		document.getElementById(element).style.cursor = "default";

		//! Po zamianie styli zamień myślniki na litery, które zostaly odgadnięte
		displayPassword();
	} else {
		//! Zagranie dzwięku skuchy
		no.play();

		//! Podmiana styli dla bloków litery, która nie pasuje do hasła
		var element = "letter" + nr;
		document.getElementById(element).style.background = "#330000";
		document.getElementById(element).style.color = "#C00000";
		document.getElementById(element).style.border = "3px solid #C00000";
		document.getElementById(element).style.cursor = "default";
		document.getElementById(element).setAttribute("onclick", ";");

		//! Nie trafiona litera
		wrongGuesses++;
		var image = "./img/s" + wrongGuesses + ".jpg";
		document.getElementById(
			"gallows"
		).innerHTML = `<img src="${image}" alt="" />`;
	}
	//! Pokazywanie bloku wygranej
	if (password == password1)
		document.querySelector(
			"#alphabet"
		).innerHTML = `Yes! The correct password is: "${password}"<br/><br/><span class="reset" onclick="location.reload()">PLAY AGAIN?</span>`;

	//! Pokazywanie bloku przegranej
	if (wrongGuesses >= 9)
		document.querySelector(
			"#alphabet"
		).innerHTML = `Game over! The correct password is: "${password}"<br/><br/><span class="reset" onclick="location.reload()">PLAY AGAIN?</span>`;
}
