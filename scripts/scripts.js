var searchR;
var token = "Bearer "+"BQD-_welPUW-_rIvr21cU0wIhLq4n4KHSYm-EzvJFj9M2M8J6N5cmaVyJikrdKlnLRwyGWAlcBiwdWDJz75IxHztagre9a9_hIsdX8ORjRhQ1-lugAssLIh_uboHD1ifwc2cycWB5d82hIu82ppMzEFaHxDLPxLdxg";
var typeN = 0;
var errorResult;
$( "#search-results" ).empty();
$(document).ready(function(){
    
    $("#searchB").click(function(){
        console.log("Starting search");
    var typeS  = $('select').children(':selected').val();
    var searchTerm = document.getElementById("searchV");
    var query=searchTerm.value;
    if(query=="")
    {
        alert("The query can't be empty");
        return;
    }
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
        generateToken();
        console.log(result);
    }
        
    })
    });

    
    function generateToken()
    {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://accounts.spotify.com/api/token",
            "method": "POST",
            "headers": {
              "Content-Type": "application/x-www-form-urlencoded",
              "cache-control": "no-cache",
              "Authorization": "Basic NTNiODAyMGQ5MmI2NDExMzk3MDI5ZDkwMTQxZTNkZmY6ZGViOTRlMjg2Mjg2NDAwYmFkYzE2NjNiMTk1M2M5OTk="
            },
            "data": {
              "grant_type": "client_credentials"
            }
          }
          
          $.ajax(settings).done(function (response) {
            token= "Bearer " + response["access_token"];
            console.log(token);
          });
    }

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
            var string = "<div class=\"card text-white bg-dark\"><div class=\"card-body\"><a href=\""+sLink+"\"><div class=\"container-fluid\"><div class=\"row\"><img class=\"m-2 rounded-circle float-right\" src=\""+sImg+"\"><h5 class=\"card-title\">"+sN+"</h5></div></div></a><hr class=\"my-2\"><p class=\"card-text h6\"><small>"+sB+"</small></p></div></div>";
            $( "#search-results" ).append( string);
        }
        if(typeN==0 || typeN==2)
        {
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
                var string = "<div class=\"card column text-white bg-dark\"><div class=\"card-body\"><div class=\"container-fluid\"><div class=\"row\"><img class=\"m-2 rounded-circle float-right\" src=\""+sImg+"\"><a href=\""+sLink+"\"><h5 class=\"card-title\" id=\""+sId+"\">"+sN+"</h5></a></div></div><p class=\"card-text lead h6\"><small>"+sAN+"</small></p></div></div></div>";
                $( "#search-results" ).append( string);
            }
            $("h5").click(function(){
                window.localStorage.clear();
                window.localStorage.setItem("id",this.id);
            });
        }

    }
});

