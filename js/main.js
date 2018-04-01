$("button").each(function() {
  $(this).click(function() {
    getFlickrJSON($(this).text());
  });
});


function getFlickrJSON(buttonText) {
  var buttonValue = buttonText
  var flickrURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3c4d06636e9aab9e37cce43ac03a4544&per_page=10&format=json&text=" + buttonValue + "&nojsoncallback=1"
  $.getJSON(flickrURL)
    .done(function(val) {
      var result = val.photos.photo;
      $.each(result, function(i, val) {
        var farmId = result[i].farm;
        var serverId = result[i].server;
        var id = result[i].id;
        var secret = result[i].secret;
        var photoURL = "https://farm" + farmId + ".staticflickr.com/" + serverId + "/" + id + "_" + secret + ".jpg"
        console.log(photoURL);
      });
    })
    .fail(function() {
      console.log("error");
    });
}
