
 
 var slide;
 var uparrow;
 var downarrow;
 var bigimage;
 var countertext;

 let x = 0;
 let counter = 1;
 
 
 window.onload = (event) => 
 {
    slide = document.getElementById("slide");
    uparrow = document.getElementById("up-arrow");
    downarrow = document.getElementById("down-arrow");
    bigimage = document.getElementById("bigimage");
    countertext = document.getElementById("counter");
};

function myFunction(smallimg)
{ 
    var fullimg = document.getElementById("bigimage");
    console.log(fullimg);
    fullimg.src = smallimg.src;
}

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return; 
    }
  
    switch (event.key) {
    
      case "ArrowUp":
        if(x > -900)
        {
            x = x-300;
            counter++;
            document.getElementById('counter').innerHTML = "Review : "+counter;
           slide.style.top = x + "px"; 
          
        }
        break;
      case "ArrowDown":
        if(x < 0)
        {
           counter--; 
           document.getElementById('counter').innerHTML = "Review : "+counter;
           x = x+300;
           slide.style.top = x + "px"; 
        }
        break;
      default:
        return; 
    }
    event.preventDefault();
  }, true);



  document.getElementById("up-arrow").addEventListener("mousedown", function(e){

    if(x > -900 && counter > -1)
    {
        counter++;
        document.getElementById('counter').innerHTML = "Review : "+counter;
        x = x-300;
       slide.style.top = x + "px"; 
    }
  });



  document.getElementById("down-arrow").addEventListener("mousedown", function(e){

    if(x < 0)
    {
      counter--; 
      document.getElementById('counter').innerHTML = "Review : "+counter;
      x = x +300;
      slide.style.top = x + "px"; 
    }
  });


  



 
      