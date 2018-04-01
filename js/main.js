$(document).ready(function() {

  $(".musicButton").each(function() {
    $(this).click(function() {
      getFlickrJSON($(this).text());
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

  function getFreesoundJSON(buttonText) {
    var buttonValue = buttonText
    var soundURL = "https://freesound.org/apiv2/search/text/?token=opEsO9zEL9n9vCfBDwgleOGT9EpXXs31r9h2SJSz&fields=name,previews,duration&sort=score&filter=duration:[60 TO *]&query=medieval,music," + buttonText
  };

  // Media Player

  var musicList = {
    title: "Not Bubble Bubble",
    m4a: "http://jplayer.org/audio/mp3/Miaow-07-Bubble.mp3",
    oga: "http://jplayer.org/audio/ogg/Miaow-07-Bubble.ogg"
  }

  $("#jquery_jplayer_1").jPlayer({
    ready: function(event) {
      $(this).jPlayer("setMedia", musicList);
    },
    swfPath: "http://jplayer.org/latest/dist/jplayer",
    supplied: "mp3, oga",
    wmode: "window",
    useStateClassSkin: true,
    autoBlur: false,
    smoothPlayBar: true,
    keyEnabled: true,
    remainingDuration: true,
    toggleDuration: true
  })
});
