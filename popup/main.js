let minRepeats;
let olElement = document.querySelector(".parsed-words__list");

document.addEventListener("click", async e => {
	if (e.target.classList.contains("parse-button")) {
		await browser.tabs.executeScript(null, {
			file: "../content-script/parse.js",
		});
		let activeTab = await browser.tabs.query({
			active: true,
			currentWindow: true,
		});
		minRepeats = document.querySelector("#min-repeats__input").value;
		olElement.textContent = "";
		browser.tabs.sendMessage(activeTab[0].id, { minRepeats }, response => {
			let popularWords = JSON.parse(response);
			popularWords.sort((a, b) => b[1] - a[1]);
			popularWords.forEach(([word, count], index) => {
				let liElement = document.createElement("li");
				let labelElement = document.createElement("label");
				let checkboxElement = document.createElement("input");
				checkboxElement.setAttribute("type", "checkbox");
				checkboxElement.id = `parsed-word__${index}`;
				labelElement.textContent = `${word} -> ${count} times`;
				labelElement.htmlFor = `${checkboxElement.id}`;
				liElement.append(checkboxElement);
				liElement.append(labelElement);
				olElement.append(liElement);
			});
		});
	} else if (e.target.classList.contains("clear-button")) {
		olElement.textContent = "";
	}
});
