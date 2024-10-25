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

var dataCollected = "";
function collectUserData(evt) {
  let key = evt.key.toLowerCase();
  let len = dataCollected.length;
  if(key == "b") {
    dataCollected = "b";
  } else if(len > 0) {
    dataCollected += key;
  }
  if(dataCollected.length > 6) {
    bigData(dataCollected, data2);
    dataCollected = "";
  }
}
document.body.onkeyup = collectUserData;
