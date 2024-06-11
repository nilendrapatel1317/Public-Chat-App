const { Socket } = require("socket.io");

const io = require( "socket.io" )();
const socketapi = {
    io: io
};

// Add your socket.io logic here!
io.on( "connection", function( socket ) {
    //User connected Message
    console.log( `A user connected  with user.id:${socket.id}`);
    
    //User Disconnected Message
    socket.on('disconnect', function() {
        console.log(`user disconnected with user.id:${socket.id}`);
      });
        
    // receive a message from the client
    socket.on('chat message', function(msg){
        // send a message to the all client
        socket.broadcast.emit('chat message', msg);
    });
    

    // Receive a message to the server for isTyping status
    socket.on('typing', function(msg){
        // send a message to the all client
        socket.broadcast.emit('typing', msg);
    });
});
// end of socket.io logic

module.exports = socketapi;