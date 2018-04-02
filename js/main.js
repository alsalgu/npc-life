$(document).ready(function() {

  $(".musicButton").each(function() {
    $(this).click(function() {
      getFlickrJSON($(this).val());
      getFreesoundJSON($(this).attr("name"));
    });
  });

  // FlickR API //

  function getFlickrJSON(buttonText) {
    var buttonValue = buttonText
    var flickrURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3c4d06636e9aab9e37cce43ac03a4544&format=json&text=medieval " + buttonValue + "&nojsoncallback=1&sort=interestingness-desc&privacy_filter=1"
    $.getJSON(flickrURL, function() {
        $("#carouselInner").empty();
        $("#carouselInner").append("<div class='carousel-item active text-center'>" +
          "<span class='display-1'>NPC Life</span>" + "<h1>" + buttonValue + "</h1>" +
          "</div>");
      })
      .done(function(val) {
        var result = val.photos.photo;
        $.each(result, function(i, val) {
          var farmId = result[i].farm;
          var serverId = result[i].server;
          var id = result[i].id;
          var secret = result[i].secret;
          var photoURL = "https://farm" + farmId + ".staticflickr.com/" + serverId + "/" + id + "_" + secret + ".jpg"
          $("#carouselInner").append("<div class='carousel-item text-center w-100 h-100'>" +
            "<img class='h-100' src='" + photoURL + "' />" +
            "</div>");
        });
      })
      .fail(function() {
        console.log("Error");
      });
  };

  // Music API //
  // Playlist
  var cssSelector = {
    jPlayer: "#jplayer_1",
    cssSelectorAncestor: "#jp_container_1"
  };

  var playlist = [];

  var options = {
    playlistOptions: {
      enableRemoveControls: true,
      autoPlay: true
    },
    swfPath: "js/jPlayer",
    supplied: "webmv, ogv, m4v, oga, mp3",
    smoothPlayBar: true,
    keyEnabled: true,
    audioFullScreen: false
  };

  var musicList = new jPlayerPlaylist({
    cssSelector,
    playlist,
    options
  });

  function getFreesoundJSON(buttonText) {
    var buttonValue = buttonText
    var soundURL = "https://freesound.org/apiv2/search/text/?token=opEsO9zEL9n9vCfBDwgleOGT9EpXXs31r9h2SJSz&fields=name,previews,duration&sort=rating_desc&filter=duration:[10 TO *]&query=" + buttonText
    musicList.remove();
    $.getJSON(soundURL, function(val) {
        var result = val.results;
        $.each(result, function(i, val) {
          musicList.add({
            title: result[i].name,
            mp3: result[i].previews["preview-lq-mp3"],
            oga: result[i].previews["preview-lq-ogg"]
          });
        })
      })
      .done(function() {
        console.log("pls")
      });
  };

  // Media Player



});
