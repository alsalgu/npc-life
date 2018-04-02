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

  function getFreesoundJSON(buttonText) {
    var buttonValue = buttonText
    var soundURL = "https://freesound.org/apiv2/search/text/?token=opEsO9zEL9n9vCfBDwgleOGT9EpXXs31r9h2SJSz&fields=name,previews,duration&sort=rating_desc&filter=duration:[10 TO *]&query=" + buttonText
    $("#playlist").empty();
    $.getJSON(soundURL, function(val) {
        var result = val.results;
        $.each(result, function(i, val) {
          title = result[i].name;
          src = result[i].previews["preview-lq-mp3"];
          src2 = result[i].previews["preview-lq-mp3"];
          $("#playlist").append(
            "<li><a href=" + src + ">" + title + "</a></li>");
        });
      })
      .done(function() {
        init();
      });
  };

  var audio;
  var playlist;
  var tracks;
  var current;



  function init() {
    current = 0;
    audio = $('audio');
    playlist = $('#playlist');
    tracks = playlist.find('li a');
    len = tracks.length - 1;
    audio[0].volume = .10;
    audio[0].play();
    playlist.find('a').click(function(event) {
      event.preventDefault();
      link = $(this);
      current = link.parent().index();
      run(link, audio[0]);
    });
    audio[0].addEventListener('ended', function(e) {
      current++;
      if (current == len) {
        current = 0;
        link = playlist.find('a')[0];
      } else {
        link = playlist.find('a')[current];
      }
      run($(link), audio[0]);
    });
  }

  function run(link, player) {
    player.src = link.attr('href');
    par = link.parent();
    par.addClass('active').siblings().removeClass('active');
    audio[0].load();
    audio[0].play();
  }

  // Media Player



});
