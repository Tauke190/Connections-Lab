



let worldatlasURL = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

let worldmapdata;


const svg = d3.select('svg');
const projection = d3.geoMercator();
const pathgenerator = d3.geoPath().projection(projection);


window.addEventListener('load',(args) =>
{
    weather.getweather("Abu Dhabi");
    loadworlddata();
}) 

let weather = {
    "apikey" : "8bb258cb533c024bda6d526ee6aa49d3",

    getweather : function(city)
    {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+ "&units=metric&appid=" +  this.apikey)
        .then((response) =>response.json())
        .then((data) => this.displayweather(data));
    },

    displayweather: function(data)
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
            document.querySelector("#videoBG").src = "/Videos/Sunny.mp4";
        }
        if(description === "overcast clouds" || description === "broken clouds" || description === "scattered clouds" || description === "few clouds")
        {
            document.querySelector("#videoBG").src = "/Videos/Overcast.mp4";
        }
        if(description === "light rain" || description === "moderate rain")
        {
            document.querySelector("#videoBG").src = "/Videos/Rainy.mp4";
        }
    },
    
    search: function() {
        let value = document.querySelector(".search-bar").value;
        console.log(value);
        this.getweather(value);
      
    }
};

document.querySelector(".search button").addEventListener('click',function()
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
            worldmapdata = topojson.feature(data,data.objects.countries);
            console.log(worldmapdata);
            drawmap();
           
        }
    })
}


function drawmap()
{
    svg.selectAll('path')
        .data(worldmapdata.features)
        .enter()
        .append('path')
        .attr('class','country')
        .attr('d', pathgenerator)
        .on('click' , (event,d) => {

            const countryname = d.properties.name;
            console.log(countryname);
            weather.getweather(countryname);
       })
        .append('title')
        .text((d) => d.properties.name)}

