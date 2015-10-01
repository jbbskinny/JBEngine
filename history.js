window.onload = function () {
	var searchagain;
	var searchBox = localStorage.getItem('searchBox');
	if (searchBox != null) $("input:text").val(searchBox);
	else searchagain = true;
	newSearch(searchagain);
}
window.onpopstate = popState;
window.onbeforeunload = function () {
	localStorage.setItem('searchBox', $("input:text").val());
}
var state, ui;

$(document).ready(startSearch);

function newSearch(searchagain) {
	ui = {
		input: null
	};

	for (var id in ui) ui[id] = document.getElementById(id);

	state = {
		search: $("input:text").val()
	};

	display(state);
	if (searchagain === true) save(state);
}

function startSearch() {
	$("button").on("click", function (event) {
		state.search = $("input:text").val();
		save(state);
		display(state);
	});
}

function save(state) {
	if (history.pushState) return; // Do nothing if pushState() not defined.
	if (state.search === "") return;

	url = "#search: " + state.search;
	history.pushState(state, "", "");
}

function popState(event) {
	if (event.state) {
		state = event.state;
		display(state);
	}
	else {
		history.replaceState(state, "", "#search: " + state.search);
	}
}

function display(state) {
	return;
}