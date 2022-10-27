var ch=document.getElementById('character');
var block=document.getElementById('block');
var score=0;
// if already animate is present in classList don't add again.
function jump()
{
    if (ch.classList !='animate')
    {
        ch.classList.add('animate');
    }
   setTimeout(function (){ch.classList.remove('animate');},500);
}

var finish=setInterval(function () {
  var chTop=parseInt(window.getComputedStyle(ch).getPropertyValue('top'));
  console.log(chTop);
  var blockLeft=parseInt(window.getComputedStyle(block).getPropertyValue('left'));
  console.log(blockLeft);

  if (blockLeft > 0 && blockLeft < 20 && chTop>=130)
  {
    console.log(chTop,blockLeft);
    alert('Game Over\n'+'Your Score - '+Math.floor(score/100).toString());
    location.reload()
  }
  else
  {
    score++;
  }
},10);
