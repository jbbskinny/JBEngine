window.onload = function () {
	var searchBox = localStorage.getItem('searchBox');
	if (searchBox != null) $("input:text").val(searchBox);
}

window.onbeforeunload = function () {
	localStorage.setItem('searchBox', $("input:text").val());
}

// Anonymous "self-invoking" function
(function() {
    // Load the script
    var script = document.createElement("SCRIPT");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName("head")[0].appendChild(script);

    // Poll for jQuery to come into existance
    var checkReady = function(callback) {
        if (window.jQuery) {
            callback(jQuery);
        }
        else {
            window.setTimeout(function() { checkReady(callback); }, 100);
        }
    };

    // Start polling...
    checkReady(function($) {
        window.onload = function () {
			var searchBox = localStorage.getItem('searchBox');
			if (searchBox != null) $("input:text").val(searchBox);
		}

		window.onbeforeunload = function () {
			localStorage.setItem('searchBox', $("input:text").val());
		}
    });
})();