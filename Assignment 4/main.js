let educationURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
let countryURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

let educationdata;
let countrydata;

let canvas = d3.select('#canvas');
let tooltip = d3.select('#tooltip');



let drawmap = () => {
    canvas.selectAll('path')
        .data(countrydata)
        .enter()
        .append('path')
        .attr('d',d3.geoPath())
        .attr('class','county')
        .attr('fill', (countrydataItem) => {

            let id = countrydataItem['id']

            let county = educationdata.find((item) =>{
                return item['fips'] === id;
            })

            let percentage = county['bachelorsOrHigher'];
            if(percentage <= 15)
            {
                return 'lightgreen';
            }
            else if(percentage <= 30)
            {
                return 'limegreen';
            }
            else if(percentage <= 45)
            {
                return 'green';
            }
            else
            {
                return 'darkgreen';
            }
        })
        .attr('data-fips',(countrydataItem) => {
            return countrydataItem['id'];

        })
        .attr('data-education' ,(countrydataItem) => {
            let id = countrydataItem['id'];

            let county = educationdata.find((item) =>{
                return item['fips'] === id;
            })

            let percentage = county['bachelorsOrHigher'];

            return percentage;
        })
    
        .on('mouseover' , (event,countrydataItem) => {
             tooltip.transition()
                 .style('visibility', 'visible')
            let id = countrydataItem['id'];
            console.log(countrydataItem);

            let county = educationdata.find((item) =>{
                return item['fips'] === id;
            })

            tooltip.text(county['fips'] + ' - ' + county['area_name'] + ','+ county['state'] +' : ' +county['bachelorsOrHigher'] + '%')
        })
        .on('mouseout' , (countrydataItem) => {
            tooltip.transition().style('visibility', 'hidden')
        })

}


d3.json(countryURL).then (
    (data,error) =>{
        if(error)
        {
            console.log(log);
        }
        else
        {
            countrydata = topojson.feature(data,data.objects.counties).features;
            console.log(countrydata)
            d3.json(educationURL).then (
                (data,error) =>{
                    if(error)
                    {
                        console.log(log);
                    }
                    else
                    {
                        educationdata = data;
                        console.log(educationdata);
                        drawmap();
                    }
                }
            )
        }
    }
)



