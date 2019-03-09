var express = require('express');
var serverSide = require('src/server/index');
var http = require('http');
var path = require("path");
var mongoose = require("mongoose");
var app = express();

app.use(serverSide);

app.set("view engine", "ejs");

app.use(express.static("client"));

app.get('/', (req, res) => {
    res.render('index')
})

var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

numConnects = [];
usersOnline = [];
rooms = []

io.on('connection', function(socket){
    numConnects.push(socket);
    console.log("Connected");

    socket.defaultName = "Anon"

    socket.on("Setting username", function(data, callback){
        callback(true);
        if(rooms.includes(data.room)){
            socket.join(data.room);
            socket.defaultName = data.defaultName;
            socket.room = data.room;
            numConnects[numConnects.indexOf(socket)].defaultName = socket.defaultName
            usersOnline.push({id: socket.id, usersOnline: socket.defaultName, room: socket.room})
            console.log(usersOnline);
            io.sockets.in(data.room).emit("Users online: ", usersOnline);
        }
    })
    //messaging
    socket.on('chat', function(data){
        io.sockets.to(data.room).emit('chat', data);
    });
    socket.on("typing", function(data){
        socket.broadcast.to(data.room).emit(data.usersOnline, " is typing...");
    });
    //disconnecting
    socket.on("Disconnected", function(data){
        usersOnline.splice(usersOnline.indexOf({id: socket.id, defaultName: socket.defaultName, room: socket.room}), 1);
        socket.broadcast.emit("Users online", usersOnline);
    })

})
