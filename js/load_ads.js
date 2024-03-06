function loadAds(adClass) {
  var ads = document.getElementsByClassName(adClass);
  for(var i = 0; i < ads.length; i++) {
    var ad = ads[i];
    var idx = Math.floor(Math.random() * 16) + 1
    ad.src = "img/ads/" + idx + ".jpg"
  }
}
loadAds("vertical-add");
loadAds("horizontal-add");
