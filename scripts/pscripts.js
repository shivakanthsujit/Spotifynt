var searchR;
var token = "Bearer "+"BQAUcNDZ1N-x9n82SoCRO7EMftrZnrWUxugnBlJUhTSpKVpRPXi99rvz_pK1xtzgBDw7fazZ4OYUJGgf9gQ";
var typeN = 0;
var errorResult;
var tt = window.localStorage.getItem("id");
var playName = window.localStorage.getItem("title");
var aId = document.getElementById("searchV");

$(document).ready(function(){
    
    aId = document.getElementById("searchV");
    aId = tt;;
    console.log("hello");
    $.ajax({
        type: "GET",
        url: "https://api.spotify.com/v1/albums/"+aId+"/tracks",
        contentType: "application/json",
        headers: {"Authorization": token},
        dataType: 'json',
        success: function(result){
            searchR =result;
            getTrackDetails( searchR["items"][0].id);
        },
        error: function(result){
            console.log(result);
        }
            
        });
    

    function dispPlay(link)
    {
        $("#pName").append(playName);
        for(var i=0; i < searchR["items"].length; ++i)
        {
            var artists = [], aLink = [];
            var artistHTML="";
            for(var j = 0; j<searchR["items"][i].artists.length; ++j)
            {
                artists[j] = searchR["items"][i].artists[j]["name"];
                aLink[j] = searchR["items"][i].artists[j]["external_urls"]["spotify"];
                artistHTML+="<a href=\""+aLink[j]+"\"><p>"+artists[j]+"</p></a>";
            }
            var trackID = searchR["items"][i].id;
            var imgLink = link;
            var imgHTML = "<img src=\""+imgLink+"\" class=\"rounded-circle m-3\" >";
            var trackLink = searchR["items"][i].external_urls.spotify;
            var trackName = searchR["items"][i].name;
            var string = "<div class=\"tracks m-3\"><a href=\""+trackLink+"\">"+imgHTML+"<div><h6>"+trackName+"</h6></a><p><small>"+artistHTML+"</small></p></div><br class=\"clearBoth\"></div>";
            $("#songs").append(string);
        }
    }

    function getTrackDetails(trackID)
    {
        $.ajax({
            type: "GET",
            url: "https://api.spotify.com/v1/tracks/"+trackID,
            contentType: "application/json",
            headers: {"Authorization": token},
            dataType: 'json',
            success: function(result){
                console.log(result.album.images[2].url);
                dispPlay(result.album.images[2].url);
            },
            error: function(result){
                console.log(result);
            }
                
            });
    }
});
