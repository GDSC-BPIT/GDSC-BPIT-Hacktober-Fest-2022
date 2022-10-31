window.onload = (event) =>{

    showurls(urls_list);
};

function showurls(urls_list){
    var obj = JSON.parse(urls_list);
    urls = (obj.all_urls);
    // var urls = ["https://www.w3schools.com/js/js_arrays.asp", "https://www.google.com/search?q=god", "https://en.wikibooks.org/wiki/JavaScript"];
    // var textToShow=["The two examples above do exactly the same.There is no need to use new Array().For simplicity, readability and execution speed, use the array literal method","Arrays are a special type of objects. The typeof operator in JavaScript returns 'object' for arrays.But, JavaScript arrays are best described as arrays.","JavaScript variables can be objects. Arrays are special kinds of objects.Because of this, you can have variables of different types in the same Array."];
    for (let index = 0; index < urls.length; index++) {
        
    var showAllLinks=document.querySelector("#showlinks");
    console.log(showAllLinks)
    var movableBar= document.createElement("div");
    var movableBarA=document.createElement("a")
    movableBarA.href=urls[index];
    movableBar.classList.add("movablenavbar-bottom")
    movableBarA.innerHTML=urls[index]
    movableBar.appendChild(movableBarA)
    // var linkTexts=document.createElement("div")
    // linkTexts.classList.add("linktext")
    // linkTexts.innerHTML=textToShow[index]
    // movableBar.appendChild(linkTexts)
    showAllLinks.appendChild(movableBar)
    }
}
