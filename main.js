var imgdata = { //add 9 image URLs and a title in the end, you may do up to 6 slides
  firstimgURL: [
    "https://medr0k.github.io/fakeCAPTCHAtest/food/cheese.jpg",
    "https://medr0k.github.io/fakeCAPTCHAtest/food/pen.jpg",
    "https://medr0k.github.io/fakeCAPTCHAtest/food/ram.jpg",
    "https://medr0k.github.io/fakeCAPTCHAtest/food/dirt.jpg",
    "https://medr0k.github.io/fakeCAPTCHAtest/food/burger.jpg",
    "https://medr0k.github.io/fakeCAPTCHAtest/food/ram1.jpeg",
    "https://medr0k.github.io/fakeCAPTCHAtest/food/pizza.jpg",
    "https://medr0k.github.io/fakeCAPTCHAtest/food/mac.jpg",
    "https://medr0k.github.io/fakeCAPTCHAtest/food/ram2.jpg",
    "Food" //title goes last
  ],
};

var correctanswers = { //0 is wrong, 1 is right
  firstimgURL: [
    1,
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    0
  ],
};

var answerdb = [];

function insertimages(slidenum) {
  var arrayToGet = slidenum + "imgURL";
  window.currentimgset = arrayToGet;
  for(let i = 1; i < 10; i++) { //indexing at 1 bc I don't feel like going back and renumbering everything
    var atimage = i.toString();
    document.getElementById(atimage).src = imgdata[arrayToGet][i-1]; //big brain moment right there by storing arrays in an array so I can call them by name
  }
  document.getElementById("target-img-name").innerText = imgdata[arrayToGet][9];
}

function resetcaptcha() {
    answerdb = [];
    for(let i = 1; i < 10; i++) {
      if(document.getElementById(i).className === "selected") {
        answerdb.push(1); //selected
      } else {
        answerdb.push(0); //unselected
      }
    }

    if(arrayEquals(answerdb, correctanswers[currentimgset]) == false) { //check if answers are correct
      //incorrect
      for(let i = 1; i < 10; i++) {
        if(document.getElementById(i).className === "selected") {
          document.getElementById(i).className = "selected wrong";
        }
      }
      document.getElementsByClassName("try-again")[0].style.display = "block";
    } else {
      for(let i = 1; i < 10; i++) {
        if(document.getElementById(i).className === "selected") {
          document.getElementById(i).className = "selected correct";
        }
      }
      setTimeout(function() {nextimg()}, 2000); //for some reason this seems to work
    }
}

function nextimg() {
  for(let i = 1; i < 10; i++) {
    if(document.getElementById(i).className === "selected" || document.getElementById(i).className === "selected correct") {
      document.getElementById(i).className = "unselected";
    }
  }
  initimg()
}

function captchaclick(num) {
  if(document.getElementById(num).className !== "selected" && document.getElementById(num).className !== "selected wrong" ) {
    document.getElementById(num).className = "selected";
  } else {
    document.getElementById(num).className = "unselected";
  }
}

var place = "none";
function initimg() {
  switch(place) {
    case "none":
      insertimages("first");
      place = "first";
      break;
    case "first":
      insertimages("second");
      place = "second";
      break;
    case "second":
      insertimages("third");
      place = "third";
      break;
    case "third":
      insertimages("fourth");
      place = "fourth";
      break;
    case "fourth":
      insertimages("fifth");
      place = "fifth";
      break;
    case "fifth":
      insertimages("sixth");
      place = "sixth";
      break;
    default:
      insertimages("first");
      place = "first";
  }

}

function arrayEquals(a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}
