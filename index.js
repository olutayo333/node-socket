const mongoose = require("mongoose")

const express = require("express");
const app = express();

require("dotenv").config()
const cors = require("cors")

//let userRouter = require("./routes/user.route")

app.use(cors());

app.use(express.urlencoded({extended:true, limit:"50mb"})) // For post request from front end
app.use(express.json({limit:"50mb"})) // For POST request from front end.- Help to recieve JSON file from front end

//app.use("/user", userRouter) 

let URI ="mongodb+srv://olutayostephen:AYANRINDE@cluster0.iibdlfl.mongodb.net/front-end-connect-db1?retryWrites=true&w=majority"
mongoose.connect(URI) //UNIFORM RESOURCE IDENTIFIER (URI)
 .then(()=>{console.log("mongo has connect")})
 .catch((err)=>{console.log("mongo refuse" + err)})

 //variable declaration
let PORT = "5000"
let connection = app.listen(PORT,()=>{console.log("app is listening at PORT : " + PORT)})

//SOCKET
const socketClient = require("socket.io");
const io = socketClient(connection,{cors:{origin:"*"}})

io.on("connection", (socket)=>
{
    console.log(socket.id); console.log("user connected successfully");
    socket.on("sendMSG", (message)=>{console.log(message);      // recieving the emit message from the front end
      // YOU CAN SAVE TO DB HERE
    io.emit("broadcastMSG", message) }) //sending broadcast back to the front end  
    socket.on("disconnect", ()=>{console.log("someone disconnected");})

})
//connection.listen(4000, ()=>{console.log("listening at ");})
