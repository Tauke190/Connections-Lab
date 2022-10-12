let express = require("express");
let app = express();

const PORT = 3000;


let users = {
    
        "0": {
            "username": "admin",
            "password": "admin"
        },
        "1": {
            "username": "avinash",
            "password": "avinash"
        },
        "2": {
            "username": "connectionlab",
            "password": "connectionlab"
        }
    
    
}

let myarray = Object.values(users);


let logged = {
    "logged":"true"
}
   


// Get for/
// app.get("/",(req,res)=>{
//     res.send("Home Page");
// })







app.use("/", express.static("public"));

app.get("/login",(req,res)=> {   
  

    let username = req.query.username;
    let password = req.query.password;

   console.log("Username :"+ username);
   console.log("Password :"+ password);
    
    for (let i = 0; i < 3; i++) {

        if(username  ==  myarray[i].username && password ==  myarray[i].password)
        {
            res.send(logged);
            console.log("You are in");
        }
    }
})


//spin up a server on port 3000

app.listen(PORT,()=>{
    console.log("Server is running on port " + PORT)
});