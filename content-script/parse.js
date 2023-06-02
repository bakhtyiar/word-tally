function handler(request, sender, sendResponse) {
	let data = JSON.stringify(searchPopularWords(request.minRepeats));
	sendResponse(data);
}

function searchPopularWords(minRepeats) {
	let collectionOfWords = {};
	let articles = ["an", "a", "the"];
	let correctWords = document.body.innerText
		.split("")
		.map(validateChars)
		.join("")
		.split(" ")
		.filter(word => word.length && !articles.includes(word));
	for (let word of correctWords) {
		collectionOfWords[word] = (collectionOfWords[word] || 0) + 1;
	}
	let n = minRepeats ? +minRepeats : 0;
	let counter = [];
	for (let word in collectionOfWords) {
		counter.push([word, collectionOfWords[word]]);
	}
	let popularWords = counter.filter(arr => arr[1] >= n);
	return popularWords;
}

function validateChars(char) {
	let badChars = [".", "!", "?", ",", '"', ":", ";", "/", "*", "+", "-"];
	if (badChars.includes(char)) {
		return " ";
	} else if (!Number.isNaN(+char)) {
		return " ";
	}
	return char.toLowerCase();
}

browser.runtime.onMessage.addListener(handler);