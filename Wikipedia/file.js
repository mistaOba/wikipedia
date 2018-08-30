$('document').ready(function(){
    $("#input").autocomplete({
        source: function(request, response) {
            $.ajax({
                url:"https://en.wikipedia.org/w/api.php",
                dataType: "jsonp",
                data: {
                    'action': "opensearch",
                    'format': "json",
                    'search': request.term
                },
                success: function(data) {
                    response(data[1]);
                }
            });
        }
    });
$('#searchClick').on("click", function(event) {
    event.preventDefault();
    
    var searchTerm = $('#input').val();
        
    $('form').toggleClass('open');
    $('#searchClick').toggleClass('black-button');
    
    // Search / Close toggle
    if ($("#searchClick").hasClass('black-button')) {
      $("#searchClick").html('Close');
    } else {
      $("#searchClick").html('Search');
      $('#input').val('');
    }
    
    $('#wiki').fadeToggle('fast', 'swing');
    $('.typed-cursor').toggleClass('display-none');
    $('#data').toggleClass('display-none');
   
    
    $.ajax({
      dataType: "jsonp",
      url: "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + searchTerm + "&limit=10&namespace=0",
      type: "GET",
      success: function(wikiData) {
        
        // Clear old results
        $('#data').empty();
        
        // If no results, error msg
        if (wikiData[1].length == 0) {
          $('#data').append('<div id="search-item"><h1>Sorry, no results.</h1></div>');
        }
        
        // Populate new results
        for (var i = 1; i < wikiData[1].length; i++) {
          for (var j = 0; j < wikiData[1].length; j++) {
            $('#data').append('<div id="search-item"><h1><a target="_blank" href="' + wikiData[i + 2][j] + '">' + wikiData[i][j] + '</a></h1><p>' + wikiData[i + 1][j] + '</p></div>');
          }
        }
      },
      error: function() {
        console.log('Wiki Data Error');
      }
    }); // Ajax
  }); // Search click
}); // document ready