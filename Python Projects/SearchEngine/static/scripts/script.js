var query = document.querySelector('#query')
var searchBtn = document.querySelector('#searchBtn')
searchBtn.onClick=function(){
    var url = 'https://www.google.com/search?q='+query.value
    window.open(url)
}

