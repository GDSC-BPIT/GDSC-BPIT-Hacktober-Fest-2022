console.log("welcome to spotify");
// initialize variables
let songIndex=0;
let audioElement=new Audio('songs/1.mp3');

let masterPlay=document.getElementById("masterPlay");
let masterSongName=document.getElementById("masterSongName");
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById("gif");
let songItems=Array.from(document.getElementsByClassName("songItem"));
let songs=[
    {songname: "90 Degree", filepath:"songs/1.mp3",coverpath:"covers/1.jpg"},
    {songname: "Black Effect", filepath:"songs/2.mp3",coverpath:"covers/2.jpg"},
    {songname: "Diamond koka", filepath:"songs/3.mp3",coverpath:"covers/3.jpg"},
    {songname: "Dil Diyan Gallan", filepath:"songs/4.mp3",coverpath:"covers/4.jpg"},
    {songname: "Dont Care", filepath:"songs/5.mp3",coverpath:"covers/5.jpg"},
    {songname: "Dreams unfold", filepath:"songs/6.mp3",coverpath:"covers/6.jpg"},
    {songname: "Ohi A ni Ohi A", filepath:"songs/7.mp3",coverpath:"covers/7.jpg"},
    {songname: "Pent Straight", filepath:"songs/8.mp3",coverpath:"covers/8.jpg"},
    {songname: "Teri Jatti", filepath:"songs/9.mp3",coverpath:"covers/9.jpg"},
    {songname: "Untouchable", filepath:"songs/10.mp3",coverpath:"covers/10.jpg"},

]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src= songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songname;
});
// audioElement.play()
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to events
//Handle previous play clicks
// for(i=0;i<10;i++){
    audioElement.addEventListener('timeupdate',()=>{
        progress=  parseInt((audioElement.currentTime/audioElement.duration)*100);
        myProgressBar.value=progress;
    })
    myProgressBar.addEventListener('change',()=>{
        audioElement.currentTime=(myProgressBar.value*audioElement.duration)/100;
    })

// }
//  
// Handle play/pause clicks



const makeAllPlays= ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
     makeAllPlays();
     songIndex= parseInt(e.target.id);
     e.target.classList.remove('fa-play-circle');
     e.target.classList.add('fa-pause-circle');
     audioElement.src=`songs/${songIndex+1}.mp3`;
     masterSongName.innerText = songs[songIndex].songname;
     audioElement.currentTime=0;
     audioElement.play();  
     gif.style.opacity=1;
     masterPlay.classList.remove('fa-play-circle');
     masterPlay.classList.add('fa-pause-circle');
    })
})
document.getElementById('next').addEventListener('click', ()=>{
    console.log(songIndex);
    if(songIndex>=10){
       songIndex=0;
    }
    else{
        songIndex += 1;
    }
        audioElement.src=`songs/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex-1].songname;
     audioElement.currentTime=0;
     audioElement.play();  
     
     masterPlay.classList.remove('fa-play-circle');
     masterPlay.classList.add('fa-pause-circle');
    })
document.getElementById('previous').addEventListener('click', ()=>{
    console.log(songIndex)
    if(songIndex<=0){
       songIndex=0;
    }
    else{
        songIndex-=1;}

        audioElement.src=`songs/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex-1].songname;
     audioElement.currentTime=0;
     audioElement.play();  
    
     masterPlay.classList.remove('fa-play-circle');
     masterPlay.classList.add('fa-pause-circle');
    })