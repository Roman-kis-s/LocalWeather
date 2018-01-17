function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById("container").innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let myObj = JSON.parse(this.responseText);
            document.getElementById("lon").innerHTML = myObj.coord.lon + String.fromCharCode(176);
            document.getElementById("lat").innerHTML = myObj.coord.lat + String.fromCharCode(176);
            document.getElementById("description").innerHTML = myObj.weather[0].main;
            // document.getElementById("icon").src = "http://openweathermap.org/img/w/" + myObj.weather[1].icon +".png";
            document.getElementById("icon").src = myObj.weather[0].icon;
            document.getElementById("temp").innerHTML = myObj.main.temp + String.fromCharCode(176) + "C";
            document.getElementById("pressure").innerHTML = myObj.main.pressure + " mb";
            document.getElementById("humidity").innerHTML = myObj.main.humidity + "%";
            document.getElementById("temp_min").innerHTML = myObj.main.temp_min + String.fromCharCode(176) + "C";
            document.getElementById("temp_max").innerHTML = myObj.main.temp_max + String.fromCharCode(176) + "C";
            document.getElementById("visibility").innerHTML = myObj.visibility + " m";
            document.getElementById("speed").innerHTML = myObj.wind.speed + " km/h";
            document.getElementById("deg").innerHTML = myObj.wind.deg + String.fromCharCode(176);
            document.getElementById("dayTime").innerHTML = new Date().getHours() + ":" + new Date().getMinutes();
            document.getElementById("sunrise").innerHTML = new Date(myObj.sys.sunrise*1000).getHours() + ":" +
                                                                        new Date(myObj.sys.sunrise*1000).getMinutes();
            document.getElementById("sunset").innerHTML = new Date(myObj.sys.sunset*1000).getHours() + ":" +
                                                                        new Date(myObj.sys.sunset*1000).getMinutes();
            document.getElementById("region").innerHTML = myObj.name +", " + myObj.sys.country;
        }
    };
    xmlhttp.open("GET", "https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude +
                                                                            "&lon=" + position.coords.longitude, true);
    xmlhttp.send();
}

getLocation();

