var numberOfButtons = document.querySelectorAll(".Button").length;

for (var i = 0; i < numberOfButtons; i++) {
document.querySelectorAll(".Button")[i]
	.addEventListener("click", function() {
	var buttonStyle = this.innerHTML;
	sound(buttonStyle.toLowerCase());
	animation(buttonStyle.toLowerCase());
});
}



document.addEventListener("keypress",function(event){
  sound(event.key);
  animation(event.key);
});


function sound(letter)
{
  switch (letter.toLowerCase())
  {
    case 'a':
      var sound=new Audio('A.mp3');
      sound.play();
      break;
    case 's':
      var sound=new Audio('B.mp3');
      sound.play();
      break;
    case 'd':
      var sound=new Audio('C.mp3');
      sound.play();
      break;
    case 'f':
      var sound=new Audio('D.mp3');
      sound.play();
      break;
    case 'g':
      var sound=new Audio('E.mp3');
      sound.play();
    case 'h':
      var sound=new Audio('F.mp3');
      sound.play();
      break;
    default:
        console.log(letter);
  }
}

function animation(currentKey) {
var activeButton = document.querySelector("." + currentKey.toUpperCase());

activeButton.classList.add("pressed");

setTimeout(function() {
	activeButton.classList.remove("pressed");
}, 100);
}
