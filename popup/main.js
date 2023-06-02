let minRepeats;
let olElement = document.querySelector(".wordsList");

document.addEventListener("click", async e => {
	if (e.target.classList.contains("parseButton")) {
		browser.tabs.executeScript(null, {
			file: "../content-script/parse.js",
		});
		let activeTab = await browser.tabs.query({
			active: true,
			currentWindow: true,
		});
		minRepeats = document.querySelector(".filterCounters").value;
		olElement.textContent = "";
		browser.tabs.sendMessage(activeTab[0].id, { minRepeats }, response => {
			let popularWords = JSON.parse(response);
			popularWords.sort((a, b) => b[1] - a[1]);
			for (let [word, count] of popularWords) {
				let liElement = document.createElement("li");
				liElement.textContent = `${word} -> ${count} times`;
				olElement.append(liElement);
			}
		});
	} else if (e.target.classList.contains("clear")) {
		olElement.textContent = "";
	}
});
