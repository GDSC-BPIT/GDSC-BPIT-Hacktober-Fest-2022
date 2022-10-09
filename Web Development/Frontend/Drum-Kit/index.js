var no_of_buttons=document.querySelectorAll(".drum").length;
//Detecting button press
for(var i=0;i<no_of_buttons;i++)
{
document.querySelectorAll(".drum")[i].addEventListener("click", function()
{
  var button_innerHTML=this.innerHTML;
  makesound(button_innerHTML);
  buttonAnimation(button_innerHTML);
});
} 
//Detecting keyboard press
document.addEventListener("keypress",function(event){
  makesound(event.key);
  buttonAnimation(event.key);
});

function makesound(key)
{
  switch (key) {
    case 'w':
      var tom1= new Audio('sounds/tom-1.mp3');
      tom1.play();
      break;
      case 'a':
        var tom2= new Audio('sounds/tom-2.mp3');
        tom2.play();
        break;
        case 's':
      var tom3= new Audio('sounds/tom-3.mp3');
      tom3.play();
      break;
      case 'd':
      var tom4= new Audio('sounds/tom-4.mp3');
      tom4.play();
      break;
      case 'j':
      var snare= new Audio('sounds/snare.mp3');
      snare.play();
      break;
      case 'k':
      var crash= new Audio('sounds/crash.mp3');
      crash.play();
      break;
      case 'l':
      var kick= new Audio('sounds/kick-bass.mp3');
      kick.play();
      break;
    default:console.log(buttonInnerHTML)
      break;
  }
}
function buttonAnimation(currentKey)
{
 var activeButton= document.querySelector("." +currentKey);
 activeButton.classList.add("pressed");
 setTimeout(function(){
   activeButton.classList.remove("pressed");
 },100);
}
// function add(num1,num2)
// {
//     return num1+num2;
// }

// function multiply(num1,num2)
// {
//     return num1*num2;
// }

// function calculator(num1,num2,operator){
//     return operator(num1,num2);
// }

// calculator(3,4,multiply)
