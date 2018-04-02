$(document).ready(function() {

  $(".musicButton").each(function() {
    $(this).click(function() {
      getFlickrJSON($(this).text());
      getFreesoundJSON($(this).text());
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
    $.getJSON(soundURL, function() {
      console.log('It worked.')
    })
    .done(function(val){
      var result = val.results;
      $.each(result, function(i, val){
        title = result[i].name;
        mp3 = result[i].previews["preview-lq-mp3"];
        oga = result[i].previews["preview-lq-ogg"];
        console.log(title + ", " + mp3 + ", " + oga);
      })
    });
  };

  // Media Player

  var musicList = [
    {
      title:"whaddafuk",
      mp3:"http://www.jplayer.org/audio/mp3/TSP-01-Cro_magnon_man.mp3",
      oga:"http://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg"
    },
    {
      title:"Your Face",
      mp3:"http://www.jplayer.org/audio/mp3/TSP-05-Your_face.mp3",
      oga:"http://www.jplayer.org/audio/ogg/TSP-05-Your_face.ogg"
    },
    {
      title:"Cyber Sonnet",
      mp3:"http://www.jplayer.org/audio/mp3/TSP-07-Cybersonnet.mp3",
      oga:"http://www.jplayer.org/audio/ogg/TSP-07-Cybersonnet.ogg"
    },
    {
      title:"Tempered Song",
      mp3:"http://www.jplayer.org/audio/mp3/Miaow-01-Tempered-song.mp3",
      oga:"http://www.jplayer.org/audio/ogg/Miaow-01-Tempered-song.ogg"
    },
    {
      title:"Hidden",
      mp3:"http://www.jplayer.org/audio/mp3/Miaow-02-Hidden.mp3",
      oga:"http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg"
    },
    {
      title:"Lentement",
      free:true,
      mp3:"http://www.jplayer.org/audio/mp3/Miaow-03-Lentement.mp3",
      oga:"http://www.jplayer.org/audio/ogg/Miaow-03-Lentement.ogg"
    },
    {
      title:"Lismore",
      mp3:"http://www.jplayer.org/audio/mp3/Miaow-04-Lismore.mp3",
      oga:"http://www.jplayer.org/audio/ogg/Miaow-04-Lismore.ogg"
    },
    {
      title:"The Separation",
      mp3:"http://www.jplayer.org/audio/mp3/Miaow-05-The-separation.mp3",
      oga:"http://www.jplayer.org/audio/ogg/Miaow-05-The-separation.ogg"
    },
    {
      title:"Beside Me",
      mp3:"http://www.jplayer.org/audio/mp3/Miaow-06-Beside-me.mp3",
      oga:"http://www.jplayer.org/audio/ogg/Miaow-06-Beside-me.ogg"
    },
    {
      title:"Bubble",
      free:true,
      mp3:"http://www.jplayer.org/audio/mp3/Miaow-07-Bubble.mp3",
      oga:"http://www.jplayer.org/audio/ogg/Miaow-07-Bubble.ogg"
    },
    {
      title:"Stirring of a Fool",
      mp3:"http://www.jplayer.org/audio/mp3/Miaow-08-Stirring-of-a-fool.mp3",
      oga:"http://www.jplayer.org/audio/ogg/Miaow-08-Stirring-of-a-fool.ogg"
    },
    {
      title:"Partir",
      free: true,
      mp3:"http://www.jplayer.org/audio/mp3/Miaow-09-Partir.mp3",
      oga:"http://www.jplayer.org/audio/ogg/Miaow-09-Partir.ogg"
    },
    {
      title:"Thin Ice",
      mp3:"http://www.jplayer.org/audio/mp3/Miaow-10-Thin-ice.mp3",
      oga:"http://www.jplayer.org/audio/ogg/Miaow-10-Thin-ice.ogg"
    }
  ]

  // Playlist
  new jPlayerPlaylist({
  jPlayer: "#jquery_jplayer_1",
  cssSelectorAncestor: "#jp_container_1"
}, musicList, {
  swfPath: "http://jplayer.org/latest/dist/jplayer",
  supplied: "oga, mp3",
  wmode: "window",
  useStateClassSkin: true,
  autoBlur: false,
  smoothPlayBar: true,
  keyEnabled: true
});

});
