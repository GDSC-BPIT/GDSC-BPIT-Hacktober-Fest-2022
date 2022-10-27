var board;
var finish=false;
var currentplayer='O';
const restartbtn=document.querySelector('#reset');
startgame();
restartbtn.addEventListener('click',reset)
function reset()
{
  board = [['','',''],['','',''],['','','']];

      for (var x=0;x<3;x++)
      {
        for (var y = 0; y<3; y++)
        {
          var box=document.getElementById(y.toString()+'-'+x.toString());
          box.innerText='';
          if (box.classList.contains('box'))
          {
            box.classList.remove('win');
          }
        }
      }
      finish=false;
      currentplayer='O';
      var winner=document.getElementById('declare');
      winner.innerText='';
}
function startgame()
{
  board = [['','',''],['','',''],['','','']];
  for (var i=0;i<3;i++)
  {
    for (var j = 0; j < 3;j++)
    {
      var box = document.createElement('div');
      box.id = i.toString()+'-'+j.toString();
      box.classList.add('box');
      if (i==0 || i==1)
      {
        box.classList.add('hline');
      }
      if (j==0 || j==1)
      {
        box.classList.add('cline');
      }
      box.innerText='';
      box.addEventListener('click',settile);
      document.getElementById('board').appendChild(box);
    }
  }
}
function resetBoard()
{
  for (var i = 0; i <3; i++)
  {
    for (var j = 0; j < 3; j++)
    {
      if (board[i][j]!='')
      {
        board[i][j]='';
        box = document.getElementById(i.toString()+'-'+j.toString())
        box.innerText='';
      }
    }
  }
}
function settile()
{
  if (finish)
  {
    return;
  }
  var r,c;
  axes=this.id.split('-');
  var r=parseInt(axes[0]);
  var c=parseInt(axes[1]);

  if (board[r][c]!='')
  {
    return;
  }
  board[r][c]=currentplayer;
  this.innerText=currentplayer;
  checkwinner();
  if (currentplayer=='O')
  {
    currentplayer='X';
  }
  else
  {
    currentplayer='O';
  }
}
function checkwinner()
{
  for (var x=0;x<3;x++)
  {
    if (board[x][0]==board[x][1] && board[x][1]==board[x][2] && board[x][2]!='')
    {
      for (var y = 0; y<3; y++)
      {
        var box=document.getElementById(x.toString()+'-'+y.toString());
        box.classList.add('win');
      }
      finish=true;
      var winner=document.getElementById('declare');
      winner.innerText='Winner - '+currentplayer;
      return;
    }
  }
  for (var x=0;x<3;x++)
  {
    if (board[0][x]==board[1][x] && board[2][x]==board[1][x] && board[2][x]!='')
    {
      for (var y = 0; y<3; y++)
      {
        var box=document.getElementById(y.toString()+'-'+x.toString());
        box.classList.add('win');
      }
      finish=true;
      var winner=document.getElementById('declare');
      winner.innerText='Winner - '+currentplayer;
      return;
    }
  }

  if (board[0][0]==board[1][1] && board[1][1]==board[2][2] && board[2][2]!='')
  {
    for (var y = 0; y<3; y++)
    {
      var box=document.getElementById(y.toString()+'-'+y.toString());
      box.classList.add('win');
    }
    finish=true;
    var winner=document.getElementById('declare');
    winner.innerText='Winner - '+currentplayer;
    return;
  }

  if (board[2][0]==board[1][1] && board[1][1]==board[0][2] && board[0][2]!='')
  {
    var box=document.getElementById('0-2');
    box.classList.add('win');
    var box=document.getElementById('1-1');
    box.classList.add('win');
    var box=document.getElementById('2-0');
    box.classList.add('win');
    finish=true;
    var winner=document.getElementById('declare');
    winner.innerText='Winner - '+currentplayer;
    return;
  }
}
