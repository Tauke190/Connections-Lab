



let worldatlasURL = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

let worldmapdata;


const svg = d3.select('svg');                                                                                     // D3 Function to select the svg element in the HTML
const projection = d3.geoMercator();                                                                              // Intializing the projector
const pathgenerator = d3.geoPath().projection(projection);                                                        // Intializing the pathgenerator


window.addEventListener('load',(args) =>
{
    weather.getweather("Abu Dhabi");
    loadworlddata();
}) 

let weather = {                                                                                                     // An object that encapsulates all the function about retriveing data from the API and displaying them in the webpage
    "apikey" : "8bb258cb533c024bda6d526ee6aa49d3",

    getweather : function(city)                                                                                         
    {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+ "&units=metric&appid=" +  this.apikey)     // Using Fetch API to get the API
        .then((response) =>response.json())
        .then((data) => this.displayweather(data));
    },

    displayweather: function(data)                                                                                  // Displayweather updates the CSS selectors and the HTML tags and populate them with the relevant information
    {
        const { name } = data;
        const {icon,description } = data.weather[0];
        const { temp ,humidity } = data.main;
        const { speed } = data.wind;
        console.log(name,icon,description,temp,humidity,speed)


        document.querySelector(".city").innerText = " Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "C";
        document.querySelector(".humidity").innerText = "Humidity :" + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed :" + speed + "km/h"
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =  "url('https://source.unsplash.com/1600x900/?"+name+ "')"

     
        if(description === "clear sky")
        {
            document.querySelector("#videoBG").src = "/Project 1 - Weather App/Videos/Sunny.mp4";                                           // Sets the background according to the description of the weather
        }
        if(description === "overcast clouds" || description === "broken clouds" || description === "scattered clouds" || description === "few clouds")
        {
            document.querySelector("#videoBG").src = "/Project 1 - Weather App/Videos/Overcast.mp4";
        }
        if(description === "light rain" || description === "moderate rain")
        {
            document.querySelector("#videoBG").src = "/Project 1 - Weather App/Videos/Rainy.mp4";
        }
    },
    
    search: function() {                                                                                            // Finds the search bar in the CSS and HTML
        let value = document.querySelector(".search-bar").value;
        console.log(value);
        this.getweather(value);
      
    }
};

document.querySelector(".search button").addEventListener('click',function()                                        //Finds the search button
{
   weather.search();
})

document.querySelector(".search-bar").addEventListener('keyup',function(event)                                      
{
    if(event.key === "Enter")
    {
        weather.search();
    }
   
})


function loadworlddata()
{
    d3.json(worldatlasURL).then((data,error)=>{

        if(error)
        {
            console.log(error);
        }
        else
        {
            worldmapdata = topojson.feature(data,data.objects.countries);                                        // Extract the information the JSON file and puts it in the worldmap data
            drawmap();
           
        }
    })
}


function drawmap()
{
    svg.selectAll('path')                                                                                        // Darws the boundries of the countries using the extracted data
        .data(worldmapdata.features)
        .enter()
        .append('path')
        .attr('class','country')                                                                                 // Adds a div class to this element
        .attr('d', pathgenerator)                                                                                // Generates the path using the mercantile projection
        .on('click' , (event,d) => {                                                                             // Whenever you click in the map , it returns the country name
            const countryname = d.properties.name;                                                               // Use that name to get the weather of that country with the get weather function
            weather.getweather(countryname);                                                            
       })
        .append('title')
        .text((d) => d.properties.name)}

