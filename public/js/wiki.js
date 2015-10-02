$(document).ready(wikiSearch);

function wikiSearch() {

    $("button").on("click", function (event) {
        search = $("input:text").val();

        $.ajax( {
            url: 'https://en.wikipedia.org/w/api.php',
            data: {
                action: 'query',
                list: 'search',
                srsearch: search,
                format: 'json',
                //origin: 'https://www.mediawiki.org'
            },
            xhrFields: {
                withCredentials: true
            },
            dataType: 'jsonp'
        }).done( function ( data ) {
            searchParser(data);
        });

    });
}

function searchParser (data) {
    var results = data.query.search;
    var html;

    html = "<h2>Wiki Results</h2>";
    html += "<dl>";

    for (var entry in results) {
        if (results.hasOwnProperty(entry)) {
            curr = results[entry] // Keeps current obect for cleanliness.
            currURL = "https://en.wikipedia.org/wiki/" + 
                        curr.title.replace(' ', '_');

            html += "<dt>" + "<a target='_blank' href='" + currURL + "'>" + 
                    curr.title + "</a>" + "</dt>" + "<dd>" + curr.snippet + 
                    "</dd>";
        }
    }
    html += "</dl>";

    document.getElementById("wiki-results").innerHTML = html
}