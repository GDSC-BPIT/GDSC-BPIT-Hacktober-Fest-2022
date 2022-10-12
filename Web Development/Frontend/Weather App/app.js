const API_KEY = `3265874a2c77ae4a04bb96236a642d2f`
const form = $("form")
const search = $("#search")

async function getWeather(city){
    $("h4").html("Loading...")
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    const response = await fetch(url);
    const data = await response.json()
    showWeather(data)
    time(city)
}

function showWeather(data){
    if (data.cod == "404") {
        $("h2").html("City Not Found")
        return;
    }
    
    const data2 = {
        temp : Math.round(data.main.temp),
        desc : data.weather[0].main,
        icon : data.weather[0].icon
    }

    $("img.icon").attr("src", "https://openweathermap.org/img/wn/"+data2.icon+"@2x.png")
    $("h2").html(data2.temp+" ℃")
    $("h4").html(data2.desc)
    showImage(data2.desc);
}

function showImage(keyword){
    switch (keyword) {
        case "Fog":
            $(".backimage").attr("src", "images/fog.png");
            break;
        case "Clouds":
            $(".backimage").attr("src", "images/cloudy.webp");
            break;
        case "Fair":
            $(".backimage").attr("src", "images/fair.webp");
            break;        
        case "Sunny"||"Clear":
            $(".backimage").attr("src", "images/sunny.webp");
            break;
        case "Rain"||"Drizzle":
            $(".backimage").attr("src", "images/rain.webp");
            break;
        case "Mist":
            $(".backimage").attr("src", "images/mist.jpg");
            break;
        case "Thunderstorm":
            $(".backimage").attr("src", "images/thunder.webp");
            break;
        case "Haze":
            $(".backimage").attr("src", "images/haze.webp");
            break;
        default:
            break;
    }
}
function time(city){
    cityName = (city.charAt(0).toUpperCase() + city.slice(1)).bold();
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes();
    var nameWithTime = cityName+","+ " As of "+time+" IST";
    $("#time").addClass("time");
    $(".time p").html(nameWithTime);

}

form.submit(function(event){
        getWeather(search.val())
        event.preventDefault();
});
    