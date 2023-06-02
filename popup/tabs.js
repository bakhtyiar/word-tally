document.addEventListener("click", e => {
	if (e.target.id === "filterTab") {
		openTab(e, "filter-tab");
		return;
	} else if (e.target.id === "accountTab") {
		openTab(e, "account-tab");
		return;
	}
});

document.getElementById("filterTab").click();

function openTab(e, tabName) {
	let tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (let i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (let i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(tabName).style.display = "block";
	e.target.className += " active";
}
