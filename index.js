const express = require("express");
const http = require("http");
const socket = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socket(server);

// app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat', (data) => {
    console.log('Message received', data);
    io.emit('chat', data);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  })

});


server.listen(3000, () => console.log("Server started on port 3000"));


