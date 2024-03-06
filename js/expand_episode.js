function expandEpisode(banner) {
  var video = banner.querySelector(".episode-details");
  var arrow = banner.querySelector(".expand-arrow");
  video.classList.toggle("revealed");
  if(video.classList.contains("revealed")) {
    arrow.innerHTML = "ʌ";
  } else {
    arrow.innerHTML = "v";
  }
}
