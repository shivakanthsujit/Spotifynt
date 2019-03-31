var searchR;
var token = "Bearer "+"BQBCHaLw7iZ6JIidDX4-gD7CDgLHSMvg5ClvvCaqxqvYeu9SZ-1o_yzgHS1rd8y4k0LGCV_gXqjBlw8YQkc";
var typeN = 0;
var errorResult;
$( "#search-results" ).empty();
$(document).ready(function(){
    
    $("#searchB").click(function(){
        console.log("Starting search");
    var typeS  = $('select').children(':selected').val();
    var searchTerm = document.getElementById("searchV");
    var query=searchTerm.value;
    if(typeS == "album,artist")
        typeN = 0;
    if(typeS == "artist")
        typeN = 1;
    if(typeS == "album")
        typeN = 2;
    query.replace(/ /g, "%20");
    $.ajax({
    type: "GET",
    url: "https://api.spotify.com/v1/search",
    data: { q: query, type: typeS, limit: 5},
    contentType: "application/json",
    headers: {"Authorization": token},
    dataType: 'json',
    success: function(result){
        searchR = result;
        createResults(searchR, typeN);
        console.log(result);
    },
    error: function(result){
        errorResult = result;
        console.log(result);
    }
        
    })
    });


    function createResults(results)
    {
        $( "#search-results" ).empty();
        var x = document.getElementById("noText");
        x.style.display = "none";
        if(typeN==0 || typeN==1)
        for(var i=0; i < results.artists.items.length; ++i)
        {
            var sN = results["artists"]["items"][i]["name"];
            var sLink = results["artists"]["items"][i]["external_urls"]["spotify"];
            var sB = results["artists"]["items"][i]["genres"];
            sB = sB.slice(0,2);
            sB = sB.toString();
            if(searchR.artists.items[i].images.length != 0)
                var sImg = results["artists"]["items"][i]["images"][0]["url"];
            var string = "<div class=\"card text-white bg-dark\"><div class=\"card-body\"><a href=\""+sLink+"\"><div class=\"container-fluid\"><div class=\"row\"><img class=\"m-2 rounded-circle float-right\" src=\""+sImg+"\"><h5 class=\"card-title\" >"+sN+"</h5></div></div></a><hr class=\"my-2\"><p class=\"card-text h6\"><small>"+sB+"</small></p></div></div>";
            $( "#search-results" ).append( string);
        }
        if(typeN==0 || typeN==2)
        for(var j=0; j < results.albums.items.length; ++j)
        {
            var sN = searchR["albums"]["items"][j]["name"];
            var sId = searchR["albums"]["items"][j]["id"];
            var sAN = searchR["albums"]["items"][j]["artists"][0]["name"];
            var sLink = results["albums"]["items"][j]["external_urls"]["spotify"];
            var sD = results["albums"]["items"][j]["release_date"].toString();
            var date = new Date(sD);
            var newDate = date.toString('MMM yyyy');
            sD = newDate;
            var sImg = results["albums"]["items"][j]["images"][0]["url"];
            var string = "<div class=\"card column text-white bg-dark\"><div class=\"card-body\"><div class=\"container-fluid\"><div class=\"row\"><img class=\"m-2 rounded-circle float-right\" src=\""+sImg+"\"><h5 class=\"card-title\" id=\""+sId+"\">"+sN+"</h5></div></div><p class=\"card-text lead h6\"><small>"+sAN+"</small></p></div></div></div>";
            $( "#search-results" ).append( string);
        }
    }
    
    function getAlbumTrack(trackId)
    {
        $.ajax({
            type: "GET",
            url: "https://api.spotify.com/v1/albums/trackId/tracks",
            data: { q: query, type: typeS, limit: 5},
            contentType: "application/json",
            headers: {"Authorization": token},
            dataType: 'json',
            success: function(result){
                searchR = result;
                console.log(result);
            },
            error: function(result){
                console.log(result);
            }
            
        });
    }
});