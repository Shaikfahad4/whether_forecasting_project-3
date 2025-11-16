let cityName=document.getElementById("cityName");
let Temp=document.getElementById("Temp");
let Status=document.getElementById("Status");
let extraInfoFeellike=document.getElementById("extraInfoFeellike");
let extraInfoHumidity=document.getElementById("extraInfoHumidity");
let extraInfoPressure=document.getElementById("extraInfoPressure");
let extraInfoWindSpeed=document.getElementById("extraInfoWindSpeed");
let searchCity=document.getElementById("searchCity");
let searchCityBtn=document.getElementById("searchCityBtn");
let bottomDetailsTemp=document.getElementById("bottomDetailsTemp");
let forecastCard=document.getElementById("forecastCard");


// fetch("https://ipinfo.io/json?token=e23525ef0e6b03")
// .then(function(response){
//     return response.json();
// })
// .then(function(jsonData){
//     // console.log(jsonData)
//     cityName.textContent=jsonData.city+", "+jsonData.country;

// })

function weatherforecast(cityname){
let options={
    method:"GET"
}
let apiKey="c151a70f06926d104f04691c8adba60c";
let url=`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}`;
fetch(url,options)
.then(function(response){
    return response.json();
})
.then(function(jsonData){
    // console.log(jsonData)
    let kelvin=jsonData.main.temp;
    let celcius=kelvin-273.15;
    Temp.textContent=celcius.toFixed(1)+"°"+"C";
    Status.textContent=jsonData.weather[0].main;
    let feelslike=((jsonData.main.feels_like-273.15)*9/5+32).toFixed(1);
    extraInfoFeellike.textContent=feelslike+"°F";
    extraInfoHumidity.textContent=jsonData.main.humidity+"%";
    extraInfoPressure.textContent=jsonData.main.pressure+" hPa";
    extraInfoWindSpeed.textContent=((jsonData.wind.speed)*2.237).toFixed(1)+" mph";
    console.log(jsonData)
})
}


fetch("https://ipinfo.io/json?token=e23525ef0e6b03")
.then(function(response){
    return response.json();
})
.then(function(jsonData){
    cityName.textContent=jsonData.city+", "+jsonData.country;
    weatherforecast(jsonData.city);

});


// searchCityBtn.addEventListener("click",function(event){
//     event.preventDefault();
//     let usercityname=searchCity.value.trim();
//     if(usercityname==="") return;
//     cityName.textContent=searchCity.value;
//     weatherforecast(usercityname);
// });


let options={
    method:"GET"
}
let apiKey="c151a70f06926d104f04691c8adba60c";
let cityname="kadapa";
let url=`https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${apiKey}`;
fetch(url,options)
.then(function(response){
    return response.json();
})
.then(function(jsonData){
    let today = new Date().toISOString().split("T")[0];
    jsonData.list.forEach(item =>{
        let forecastDate = item.dt_txt.split(" ")[0];

        if(forecastDate===today){
        let dateTime = new Date(item.dt * 1000);
        let hours = dateTime.getHours(); // 0-23
        let timeStr = hours + ":00";
        let tempC = (item.main.temp - 273.15).toFixed(1);

        let bottomHourlyData = document.createElement("div");
        bottomHourlyData.className = "extra-info bottomcard";
        bottomHourlyData.id = "bottomhourlydata";
        forecastCard.appendChild(bottomHourlyData);

        let bottomDetailsLabel = document.createElement("p");
        bottomDetailsLabel.className = "bottomdetails";
        bottomDetailsLabel.textContent =timeStr;
        bottomHourlyData.appendChild(bottomDetailsLabel);
        
        // Create the temperature element
        let bottomDetailsTemp = document.createElement("p");
        bottomDetailsTemp.id = "bottomDetailsTemp";
        bottomDetailsTemp.textContent = tempC+" C"; 
        bottomHourlyData.appendChild(bottomDetailsTemp);
        }

    })
})



