var product = document.getElementById("health-force-product");
var img = product.children[0];
var idx = Math.floor(Math.random() * 16) + 1;
img.src = "img/ads/" + idx + ".jpg";

var messages = [
  "Quantum Balancing Technology: Health Force balances your musculature on a subatomic level.",
  "Somatotropinol: Get bigger, better, longer, faster.",
  "Pheromone Boost: Turn heads and assert dominance.",
  "Wolfpack Endurance Blend: Outlast the competition.",
  "Condensed Protein Folding: Pack that protein tighter, harder, better, faster, stronger.",
  "Iron Will: The only nootropic containing iron to fortify your inner and outer mind.",
  "Testosterefrin: Boost your testosterone levels by leveraging your body's natural machine.",
  "Virility++: 5 potent chemicals that work in synchronicity to get you Beyond Hard™.",
  "Big Data. Machine Learning. Blockchain. Artificial Intelligence. Digital Manufacturing. " + 
      "Big Data Analysis. Quantum Communication. And. Internet of Things.",
  "Please help us, we are trapped in a basement."
];

img.onload = function() {
  var circles = document.getElementsByClassName("circle");
  product.style.width = product.children[0].offsetWidth + "px";
  for(var circle of circles) {
    var infoBox = circle.children[0];
    circle.style.top = Math.floor(Math.random() * (img.offsetHeight - circle.offsetHeight));
    circle.style.left = Math.floor(Math.random() * (img.offsetWidth - circle.offsetHeight));
    var messageIdx = Math.floor(Math.random() * (messages.length - 1));
    circle.children[0].innerHTML = messages[messageIdx] + randomAsterisks();
    messages = messages.slice(0, messageIdx).concat(messages.slice(messageIdx + 1));
  }
}

function randomAsterisks() {
  var disclaimerCount = document.getElementsByClassName("disclaimers")[0].children.length;
  var num = Math.floor(Math.random() * (disclaimerCount - 1)) + 1;
  var asterisks = '';
  for(var i = 0; i < num; i++) {
    asterisks += '*';
  }
  return asterisks;
}

function showInfo(circle) {
  if(circle.children[0].classList.contains("revealed")) {
    circle.classList.remove("revealed");
    circle.children[0].classList.remove("revealed");
  } else {
    var circles = document.getElementsByClassName("circle");
    for(var c2 of circles) {
      c2.classList.remove("revealed");
      c2.children[0].classList.remove("revealed");
    }
    circle.classList.add("revealed");
    circle.children[0].classList.add("revealed");
  }
}

function applyDiscountCode() {
  var code = document.getElementById("discount-code-input").value.toUpperCase();
  if(code == "WOLFPACK15") {
    var messageDom = document.getElementById("purchaseMessage");
    messageDom.style.display = "inline";
    messageDom.innerHTML = "Applying discount code...";
    buyHealthForce(messageDom);
  } else {
    bigData(code, data1);
    var messageDom = document.getElementById("purchaseMessage");
    if(messageDom != null) {
      messageDom.style.display = "inline";
      messageDom.innerHTML = "Finding IP...";
      buyHealthForce(messageDom);
    }
  }
}

async function buyHealthForce(messageDom) {
  delayMessage(messageDom, "Finding IP...", 500);
  delayMessage(messageDom, "Locating address...", 2000);
  delayMessage(messageDom, "Determining resident name...", 5000);
  delayMessage(messageDom, "Retrieving resident credit card information...", 5500);
  delayMessage(messageDom, "Done! Health Force will Arrive soon!", 8000);
}

function delayMessage(dom, message, ms) {
  setTimeout(function() {
    dom.innerHTML = message;
  }, ms);
}