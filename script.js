
 
const Url = "https://api.openweathermap.org/data/2.5/weather?"
const getCord = `${Url}q=Helsingborg&appid=6a5f19d8f42a5b5921f5b030701c91eb`
 
const ApiKey = "6a5f19d8f42a5b5921f5b030701c91eb"
 
// Denna funktionen gör själva hämtningen och returnerar json
// Använder try och catch för att fånga upp fel
// Använder await för att vänta in svar innan koden forsätter.
async function fetchApi(url) {
    try{
        const response = await fetch(url);
        if(response.ok){
            console.log(response.ok)
            //.json gör det till ett objekt som går att hantera i javascript .json är asynkront 
            const jsonResponse = await response.json(); 
            return jsonResponse;
        }
        //Felhantering la även in ifall det skulle bli något fel 
        else{
            console.log("Ett fel uppstod vid hämtningen");
        }
    }catch (error){
        console.log(error);
    }
}
 //Huvudfunktion hämtar lon och lat utifrån stadsnamnet 
async function getData() {
    let lon, lat;
    await fetchApi(getCord)
        .then(response => {
            lon = response.coord.lon;
            lat = response.coord.lat;
            console.log(response);
        })
        // Allt inom ` (backticks) översätts till strängvärde. Man använder det för att kunna lägga in variabler lätt
    const weatherUrl = `${Url}lat=${lat}&lon=${lon}&units=metric&appid=${ApiKey}`;
    console.log(weatherUrl);
    //Hämtar vädret utifrån log och lat som hämtades ovanför
    await fetchApi(weatherUrl)
        .then(response => {
            //Väljer id result 
            const weatherOutput = document.querySelector("#result");
            //Skapar en paragref
            const paragraph = document.createElement("p");
            //Lägger till paragrafen i #result
            weatherOutput.append(paragraph);
            //Skriver ut på webbläsaren och iconen är tagen från openweather och ändras beroende på väder
            const iconPrefix = "https://openweathermap.org/img/w/";
            paragraph.innerHTML = `${Math.round(response.main.temp)} &#176;C <img src="${iconPrefix}${response.weather[0].icon}.png" />${response.weather[0].main}`;
            //Lägger på en klass för att styla
            paragraph.classList.add("weatherOutput");
        })

}

getData();
 