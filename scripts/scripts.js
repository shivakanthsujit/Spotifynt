var searchR;
$(document).ready(function(){
    
    $("#searchB").click(function(){
        console.log("Starting search");
        var searchTerm = document.getElementById("searchV");
        var query=searchTerm.value;
        query.replace(/ /g, "%20");
        $.ajax({
        type: "GET",
        url: "https://api.spotify.com/v1/search?q="+query+"&type=album,artist&limit=5",
        contentType: "application/json",
        headers: {"Authorization": "Bearer BQCaGau-Z84RDZd0ibwdTIcQQkoeCZx5Fmq6-bHnBf8XbJFyim5ZgGocdfOHL0BzQuTC5YhwIdfD4ej_Xd8"},
        dataType: 'json',
        success: function(result){
            searchR = result;
            createResults(searchR);
            console.log(result);
        },
        error: function(result){
            console.log(result);
        }
        
    })
    });

    $("#login").click(function(){
        console.log("Starting login");
        var uri = encodeURIComponent("file:///home/shivakanth/Documents/Spotifynt/index.html");
        $.ajax({
        type: "GET",
        url: "https://accounts.spotify.com/authorize",
        data: { client_id: "53b8020d92b6411397029d90141e3dff", response_type: "code", redirect_uri: uri},
        contentType: "application/json",
        headers: {"Authorization": "Bearer BQCaGau-Z84RDZd0ibwdTIcQQkoeCZx5Fmq6-bHnBf8XbJFyim5ZgGocdfOHL0BzQuTC5YhwIdfD4ej_Xd8"},
        dataType: 'json',
        success: function(result){
            searchR = result;
            createResults(searchR);
            console.log(result);
        },
        error: function(result){
            console.log(result);
        }
    });
    function createResults(results)
    {
        $( "#search-results" ).empty();
        var x = document.getElementById("noText");
        x.style.display = "none";
        for(var i=0; i < 5; ++i)
        {
            var sN = results["artists"]["items"][i]["name"]
            var sLink = results["artists"]["items"][i]["external_urls"]["spotify"];
            var sB = results["artists"]["items"][i]["genres"].toString()
            var sImg = results["artists"]["items"][i]["images"][0]["url"]
            var string = "<div class=\"card text-white bg-dark\"><div class=\"card-body\"><a href=\""+sLink+"\"><div class=\"container-fluid\"><div class=\"row\"><i class=\"fas fa-user m-3\"></i><h5 class=\"card-title\" >"+sN+"</h5></div></div><hr class=\"my-2\"><p class=\"card-text h6\"><small>"+sB+"</small></p></div></a></div>";
            $( "#search-results" ).append( string);
        }
        for(var i=0; i < 5; ++i)
        {
            var sN = searchR["albums"]["items"][i]["artists"][0]["name"]
            var sLink = results["albums"]["items"][i]["external_urls"]["spotify"];
            var sB = results["albums"]["items"][i]["genres"].toString()
            var sImg = results["albums"]["items"][i]["images"][0]["url"]
            var string = "<div class=\"card text-white bg-dark\"><div class=\"card-body\"><a href=\""+sLink+"\"><div class=\"container-fluid\"><div class=\"row\"><i class=\"fas fa-compact-disc\"></i><h5 class=\"card-title\" >"+sN+"</h5></div></div><hr class=\"my-2\"><p class=\"card-text h6\"><small>"+sB+"</small></p></div></a></div>";
            $( "#search-results" ).append( string);
        }
    }
    
});