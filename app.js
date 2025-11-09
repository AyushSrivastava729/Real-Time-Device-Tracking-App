const express = require('express');
const app = express();
const path = require("path");

const http = require("http");
const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server);

// ✅ Fix: use 'use', not 'set'
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

io.on("connection", function (socket) {
    socket.on("send-location",function(data){
        io.emit("receive-location",{id:socket.id,...data});
    });
    socket.on("disconnect",function(){
        io.emit("user-disconnected",socket.id);
    })
    console.log("connected");
});

app.get("/", function (req, res) {
    res.render("index"); // looks for 'views/index.ejs'
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
