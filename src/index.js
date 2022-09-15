let now= new Date();
function dates(){
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day=days[now.getDay()];
    let date=now.getDate();
    let months=["January", "February","March","April","May","June","July","August","September","October","November","December"];
    let month=months[now.getMonth()];
    let year=now.getFullYear();
    let hour=now.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
      }
    let minutes=now.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
      }
    let h4=document.querySelector("#current-date");
    h4.innerHTML=`${day}, ${date}th ${month}, ${year}. ${hour}:${minutes}`;
}
dates();
// // let temperature=(Math.round(Math.random()*100));
// function displayCity(){
//     let input=document.querySelector("#city-input").value;
//     let firstLetter=input[0].toUpperCase();
//     let otherLetters=input.slice(1,input.length).toLowerCase();
//     let inputCity=firstLetter+otherLetters;
//     let place=document.querySelector(".place");
//     if(input){
//         place.innerHTML=inputCity;
//     }
//     else{
//         place.innerHTML=null;
//         alert(`You have not entered a city yet. Please enter a city😊`);
//     }
// }
// let showCity=document.querySelector("#click-search");
// showCity.addEventListener("click",displayCity);

// function displayTemp(){
//     let span=document.querySelector("#c-temp");
//     span.innerHTML=temperature;
//     let monday=document.querySelector(".c-temp");
//     monday.innerHTML=temperature;
// }
// let showTemp=document.querySelector("#click-search");
// showTemp.addEventListener("click",displayTemp)



function searchCity(city) {
    let apiKey = "f5984f7bc966396e1be817c3ac20863d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showUserData);
  }
  
  function search(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#city-input").value;
    searchCity(searchInput);
}
  let form = document.querySelector("#search-form");
  form.addEventListener("submit", search);

  function click(){
      let enter=document.querySelector("#click-search");
      enter.addEventListener("click",search);
  }
  click();
  //   function displayCelc(response){
  //       let celcTemp=Math.round(response.data.main.temp);
  //     let celcius=document.querySelector("#c-temp");
  //      celcius.innerHTML=`${celcTemp}`;
  //  }
  //  let celcDisplay=document.querySelector("#celc-temp");
  //  celcDisplay.addEventListener("click",displayCelc);
  
  //  function displayFahr(response){
  //      let fahrTemp=Math.round(response.data.main.temp);
  //      let fahrenheit=document.querySelector("strong#c-temp");
  //      let fahrValue=Math.round((fahrTemp*(9/5)+32));
  //      fahrenheit.innerHTML=fahrValue;
  //  }
  //  let fahrDisplay=document.querySelector("#fahr-temp");
  //  fahrDisplay.addEventListener("click",showUserData);
  
  function showUserData(response){
      place(response);
      temp(response);
      desc(response);
      humid(response);
      wind(response);
    //   displayCelc(response);
      //  displayFahr(response);
    console.log(response.data.wind.speed);
}
function place(response){
    let name=response.data.name;
    if(name){
    let country=response.data.sys.country;
    let placeElement=document.querySelector(".place");
    placeElement.innerHTML=`${name}, ${country}.`;}
    else{
      name=null;
      alert(`Please enter a city or refresh and allow access to location request`);
    }
}
function temp(response){
    let temperature=Math.round(response.data.main.temp);
    let temperatureElement=document.querySelector("#c-temp");
    temperatureElement.innerHTML=temperature;
}
function desc(response){
      let descElement=document.querySelector("#desc");
      let descValue=response.data.weather[0].description;
      let firstChar=descValue[0].toUpperCase();
      let otherChar=descValue.slice(1,descValue.length).toLowerCase();
      let desc=firstChar+otherChar;
      descElement.innerHTML=desc;
  }
  function humid(response){
    let humidValue=Math.round(response.data.main.humidity);
    let humidElement=document.querySelector("#humid");
    humidElement.innerHTML=`Humidity: ${humidValue}%`;
  }
  function wind(response){
    let windValue=Math.round(response.data.wind.speed);
    let windElement=document.querySelector("#wind");
    windElement.innerHTML=`Wind: ${windValue}m/s`;
  }

  function showPosition(position){
    let lat=position.coords.latitude;
    let lon=position.coords.longitude;
    let apiKey = "f5984f7bc966396e1be817c3ac20863d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showUserData);
  }
  function getCurrentPosition(){
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  let button=document.querySelector("#live-loc");
  button.addEventListener("click",getCurrentPosition);

  
