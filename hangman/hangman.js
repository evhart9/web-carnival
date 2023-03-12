for (let i = 0; i < phrases.length; i++) {
	console.log(phrases[i]);
}

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

let phrase = phrases[getRandom(0, phrases.length)];
console.log("random phrase: " + phrase);