$(document).ready(function() {

  // Volume

  var volume1 = document.getElementById("volume1");
  var volume2 = document.getElementById("volume2");
  volume1.volume = 0.1;
  volume2.volume = 0.1;

$("#hide").click(function(){
  $('#side-view').hide();
  $('#show').removeClass('d-none');
})

$("#show").click(function(){
  $('#side-view').show();
  $('#show').addClass('d-none');
})
  //Music Toggles

  $(".switch").each(function() {
    $(this).click(function() {
      source = "#" + $(this).attr("id") + "-toggle"
      if ($(this).prop("checked") == true) {
        $(source)[0].volume = 0.2;
        $(source)[0].play();
      } else if ($(this).prop("checked") == false) {
        $(source)[0].pause();
      }
    });
  });
  // Click Functions

  $(".musicButton").each(function() {
    $(this).click(function() {
      getFlickrJSON($(this).val());
      getMusicJSON($(this).attr("name"));
    });
  });

  $(".soundButton").each(function() {
    $(this).click(function() {
      getSoundJSON($(this).attr("name"));
    });
  });

  $(".dropdown-menu a").click(function() {
    $(this).closest(".dropdown-menu").prev().dropdown("toggle");
  });

  $(".dropdown-menu input").click(function() {
    selection = $(this).parent().siblings().find(".active-selection")
    $(this).closest(".dropdown-menu").prev().dropdown("toggle");
    $(this).addClass('bg-primary text-light').siblings().removeClass('bg-primary text-light');
    $(selection).empty();
    $(selection).append($(this).val());
  });


  // FlickR API //

  function getFlickrJSON(buttonText) {
    var buttonValue = buttonText
    var flickrURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3c4d06636e9aab9e37cce43ac03a4544&format=json&text=medieval " + buttonValue + "&nojsoncallback=1&sort=interestingness-desc&privacy_filter=1"
    $("#carouselInner").empty();
    $("#carouselInner").append("<div class='carousel-item active w-100 h-100'>" +
      "<div class='progress'>" +
      "<div class='progress-bar progress-bar-striped progress-bar-animated' role='progressbar' aria-valuenow='100' aria-valuemin='0' aria-valuemax='100' style='width: 100%'></div>" +
      "</div>" +
      "</div>");
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
        alert("Error. Please try again.");
      });
  };

  // Music API //
  // Playlist

  function getMusicJSON(buttonText) {
    var buttonValue = buttonText
    var soundURL = "https://freesound.org/apiv2/search/text/?token=opEsO9zEL9n9vCfBDwgleOGT9EpXXs31r9h2SJSz&fields=name,previews,duration&sort=score&page_size=150&filter=duration:[60 TO *]&query=" + buttonText
    $("#playlist").empty();
    $("#playlist").append(" Loading...");
    $.getJSON(soundURL, function(val) {
        var result = val.results;
        $("#playlist").empty();
        $.each(result, function(i, val) {
          title = result[i].name;
          src = result[i].previews["preview-lq-mp3"];
          src2 = result[i].previews["preview-lq-mp3"];
          $("#playlist").append(
            "<li class='list-group-item'><a href=" + src + ">" + title + "</a></li>");
        });
      })
      .done(function() {
        init();
      });
  };

  function getSoundJSON(buttonText) {
    var buttonValue = buttonText
    var soundURL = "https://freesound.org/apiv2/search/text/?token=opEsO9zEL9n9vCfBDwgleOGT9EpXXs31r9h2SJSz&fields=name,previews,duration&sort=score&page_size=150&filter=duration:[60 TO *]&query=loop," + buttonText
    $("#playlist2").empty();
    $("#playlist2").append(" Loading...");
    $.getJSON(soundURL, function(val) {
        var result = val.results;
        $("#playlist2").empty();
        $.each(result, function(i, val) {
          title = result[i].name;
          src = result[i].previews["preview-lq-mp3"];
          src2 = result[i].previews["preview-lq-mp3"];
          $("#playlist2").append(
            "<li class='list-group-item'><a href=" + src + ">" + title + "</a></li>");
        });
      })
      .done(function() {
        init2();
      });
  };

  var audio;
  var playlist;
  var tracks;
  var current;
  var audio2;
  var playlist2;
  var tracks2;
  var current2;



  function init() {
    current = 0;
    audio = $('.audio1');
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
    //audio[0].addEventListener('ended', function(e) {
    //  current++;
    //  if (current == len) {
    //    current = 0;
    //    link = playlist.find('a')[0];
    //    } else {
    //      link = playlist.find('a')[current];
    //    }
    //    run($(link), audio[0]);
    //  });
  }


  function init2() {
    current2 = 0;
    audio2 = $('.audio2');
    playlist2 = $('#playlist2');
    tracks2 = playlist2.find('li a');
    len = tracks2.length - 1;
    audio2[0].volume = .10;
    audio2[0].play();
    playlist2.find('a').click(function(event) {
      event.preventDefault();
      link = $(this);
      current2 = link.parent().index();
      run2(link, audio2[0]);
    });
  }

  function run(link, player) {
    player.src = link.attr('href');
    songTitle = link.text();
    par = link.parent();
    par.addClass('active').siblings().removeClass('active');
    $("#active-song").empty();
    $("#active-song").append(songTitle);
    audio[0].load();
    audio[0].play();
  }

  function run2(link, player) {
    player.src = link.attr('href');
    songTitle = link.text();
    par = link.parent();
    par.addClass('active').siblings().removeClass('active');
    $("#active-sound2").empty();
    $("#active-sound2").append(songTitle);
    audio2[0].load();
    audio2[0].play();
  }

  // Media Player



});
